"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface CoffeeHeroCanvasProps {
  currentStage?: number; // 0: Cherry, 1: Mucilage/Parchment, 2: Green Bean, 3: Roasted Bean
  onStageChange?: (stage: number) => void;
}

export default function CoffeeHeroCanvas({
  currentStage = 0,
  onStageChange,
}: CoffeeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(currentStage);
  const [isHovered, setIsHovered] = useState(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const cherryMeshRef = useRef<THREE.Mesh | null>(null);
  const beanMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const lightsRef = useRef<{
    pointLight: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
    rimLight: THREE.DirectionalLight;
  } | null>(null);

  // Mouse tracking with lerp
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameId = useRef<number | null>(null);

  const stageMaterials = [
    {
      // Stage 0: Fresh Goalpara Cherry (Deep Crimson, Glossy, Organic)
      color: 0x931a25,
      roughness: 0.28,
      metalness: 0.1,
      clearcoat: 0.7,
      label: "Fresh Coffee Cherry",
    },
    {
      // Stage 1: Mucilage & Fermentation (Golden Honey Amber, Translucent)
      color: 0xd4a054,
      roughness: 0.45,
      metalness: 0.05,
      clearcoat: 0.4,
      label: "Fermented Mucilage",
    },
    {
      // Stage 2: Green Bean Lab Selection (Pale Jade Olive)
      color: 0x7c8c69,
      roughness: 0.6,
      metalness: 0.02,
      clearcoat: 0.1,
      label: "Lab-Graded Green Bean",
    },
    {
      // Stage 3: Specialty Roasted Bean (Dark Espresso Obsidian with Amber sheen)
      color: 0x241812,
      roughness: 0.48,
      metalness: 0.2,
      clearcoat: 0.35,
      label: "Artisan Specialty Roast",
    },
  ];

  // Helper to create a procedural coffee bean geometry
  const createCoffeeBeanGeometry = () => {
    // We create a custom parametric bean geometry by deforming a sphere
    const geom = new THREE.SphereGeometry(2, 64, 64);
    const pos = geom.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);

      // Flatten slightly along Z to create oval bean thickness
      v.z *= 0.65;
      // Elongate along Y
      v.y *= 1.35;

      // Create the characteristic longitudinal coffee bean crease/groove on the front (z > 0)
      if (v.z > 0) {
        const distFromCenterLine = Math.abs(v.x);
        if (distFromCenterLine < 0.45) {
          // Crease indentation
          const depth = (0.45 - distFromCenterLine) * 0.9;
          v.z -= depth * Math.cos((v.y / 2.7) * Math.PI * 0.5);
          // slight wavy curve to the seam
          v.x += Math.sin(v.y * 2.0) * 0.05;
        }
      }

      pos.setXYZ(i, v.x, v.y, v.z);
    }

    geom.computeVertexNormals();
    return geom;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);
    cameraRef.current = camera;

    // 3. Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Lighting setup (Goalpara mountain sunrise & warm studio key light)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xfcd34d, 3.5, 20);
    pointLight.position.set(4, 5, 5);
    scene.add(pointLight);

    const rimLight = new THREE.DirectionalLight(0xa7f3d0, 2.0); // cool mist back rim light
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const softFill = new THREE.PointLight(0xc99454, 1.8, 15);
    softFill.position.set(2, -4, 3);
    scene.add(softFill);

    lightsRef.current = { pointLight, ambientLight, rimLight };

    // 5. Coffee Object Group
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Bean Geometry
    const beanGeom = createCoffeeBeanGeometry();
    const initMat = stageMaterials[activeStage];
    const beanMaterial = new THREE.MeshPhysicalMaterial({
      color: initMat.color,
      roughness: initMat.roughness,
      metalness: initMat.metalness,
      clearcoat: initMat.clearcoat,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const beanMesh = new THREE.Mesh(beanGeom, beanMaterial);
    group.add(beanMesh);
    beanMeshRef.current = beanMesh;

    // 6. Mountain Mist Particles (Floating Terroir Spores)
    const particleCount = 140;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
      particleScales[i / 3] = Math.random() * 0.08 + 0.02;
    }

    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe2d9cb,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse Move Event Listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.current.targetX = x;
      mouse.current.targetY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 7. Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      if (groupRef.current) {
        // Continuous gentle floating + mouse response
        groupRef.current.rotation.y = elapsedTime * 0.35 + mouse.current.x * 0.85;
        groupRef.current.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15 - mouse.current.y * 0.6;
        groupRef.current.position.y = Math.sin(elapsedTime * 0.8) * 0.18;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.04;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      beanGeom.dispose();
      beanMaterial.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  // Update material when activeStage changes
  useEffect(() => {
    if (!beanMeshRef.current) return;
    const targetMat = stageMaterials[activeStage];
    const mat = beanMeshRef.current.material as THREE.MeshPhysicalMaterial;

    if (mat) {
      // Smooth color transition
      mat.color.setHex(targetMat.color);
      mat.roughness = targetMat.roughness;
      mat.metalness = targetMat.metalness;
      mat.clearcoat = targetMat.clearcoat;
    }
  }, [activeStage]);

  const handleSelectStage = (idx: number) => {
    setActiveStage(idx);
    if (onStageChange) {
      onStageChange(idx);
    }
  };

  return (
    <div
      className="relative w-full h-full min-h-[540px] md:min-h-[640px] flex flex-col items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
      />

      {/* Atmospheric Ambient Glow behind the bean */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-[#C99454]/15 via-[#931a25]/10 to-transparent blur-3xl pointer-events-none -z-10 animate-mist-drift" />

      {/* Interactive Metamorphosis Stage Navigator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-3 w-full px-4 max-w-xl">
        <div className="flex items-center space-x-1 sm:space-x-2 bg-[#161513]/85 backdrop-blur-md border border-[#D8A86E]/20 p-1.5 rounded-full shadow-2xl">
          {stageMaterials.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectStage(idx)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono-data tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[#C99454] text-[#0E0D0C] font-bold shadow-lg shadow-[#C99454]/30 scale-105"
                    : "text-[#DCD5C8]/70 hover:text-white hover:bg-white/5"
                }`}
              >
                0{idx + 1}. {stage.label.split(" ")[0]}
              </button>
            );
          })}
        </div>

        {/* Current Active Stage Description Badge */}
        <div className="text-center">
          <p className="text-xs font-mono-data uppercase tracking-widest text-[#C99454]">
            {stageMaterials[activeStage].label}
          </p>
          <p className="text-[11px] text-[#A69E90] font-sans mt-0.5">
            Interaktif: Gerakkan kursor untuk memutar atau pilih tahapan biji di atas
          </p>
        </div>
      </div>
    </div>
  );
}
