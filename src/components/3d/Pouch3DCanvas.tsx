"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { WeightOption } from "@/context/CartContext";

interface Pouch3DCanvasProps {
  stickerUrl: string;
  weight: WeightOption;
  isXRay: boolean;
  isAutoRotate: boolean;
}

export default function Pouch3DCanvas({
  stickerUrl,
  weight,
  isXRay,
  isAutoRotate,
}: Pouch3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // References for Three.js lifecycle
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pouchGroupRef = useRef<THREE.Group | null>(null);
  const pouchMeshRef = useRef<THREE.Mesh | null>(null);
  const labelMeshRef = useRef<THREE.Mesh | null>(null);
  const internalBeansGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Rotation physics state
  const rotationState = useRef({
    targetX: 0.1,
    targetY: 0.2,
    currentX: 0.1,
    currentY: 0.2,
    velocityX: 0,
    velocityY: 0,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    zoom: 1.0,
    targetZoom: 1.0,
  });

  // Scale multipliers based on weight
  const weightScales: Record<WeightOption, number> = {
    "200g": 1.0,
    "500g": 1.15,
    "1kg": 1.3,
  };

  // Helper to construct organic 3D standup coffee pouch geometry
  const createPouchGeometry = () => {
    const width = 2.3;
    const height = 3.6;
    const depth = 1.1;

    const geom = new THREE.BoxGeometry(width, height, depth, 32, 48, 16);
    const pos = geom.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);

      // Normalized height: 0 at bottom (-1.8), 1 at top (+1.8)
      const normY = (v.y + height / 2) / height;

      // 1. Top Heat-Seal Crimp: Flatten Z near the top seal
      if (normY > 0.82) {
        const factor = (normY - 0.82) / 0.18;
        v.z *= 1 - factor * 0.95;
        // Subtle heat crimp micro-ridges along Y
        v.z += Math.sin(v.y * 70) * 0.012;
      }

      // 2. Belly Bulge: Coffee beans filling the body in the middle
      if (normY > 0.12 && normY < 0.8) {
        const bulgeFactor = Math.sin((normY - 0.12) / 0.68 * Math.PI);
        if (Math.abs(v.z) > 0.1) {
          v.z += Math.sign(v.z) * bulgeFactor * 0.22;
        }
      }

      // 3. Side Gussets: Inward triangular crease on the lateral sides
      if (Math.abs(v.x) > width * 0.42 && normY < 0.82) {
        const gussetDepth = (1 - Math.abs(v.z) / (depth * 0.65)) * 0.16;
        v.x -= Math.sign(v.x) * Math.max(0, gussetDepth);
      }

      // 4. Standup Oval Base: Expand Z at the very bottom
      if (normY < 0.15) {
        const bottomFactor = (0.15 - normY) / 0.15;
        v.z += Math.sign(v.z) * bottomFactor * 0.08;
      }

      pos.setXYZ(i, v.x, v.y, v.z);
    }

    geom.computeVertexNormals();
    return geom;
  };

  // Helper to construct curved front label decal geometry
  const createLabelGeometry = () => {
    const labelWidth = 2.05;
    const labelHeight = 0.92;
    const geom = new THREE.PlaneGeometry(labelWidth, labelHeight, 24, 12);
    const pos = geom.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // Curve label slightly to conform to the front pouch bulge
      const curve = (1 - Math.pow(v.x / (labelWidth / 2), 2)) * 0.06;
      v.z += curve;
      pos.setXYZ(i, v.x, v.y, v.z);
    }

    geom.computeVertexNormals();
    return geom;
  };

  // Helper to create small procedural coffee bean
  const createSingleBeanGeometry = () => {
    const geom = new THREE.SphereGeometry(0.18, 16, 16);
    const pos = geom.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      v.z *= 0.6;
      v.y *= 1.35;
      if (v.z > 0 && Math.abs(v.x) < 0.04) {
        v.z -= 0.08;
      }
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geom.computeVertexNormals();
    return geom;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High-Performance Settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Lighting Setup (Luxury Dark Studio Atmosphere)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    // Key warm gold light (highlights foil gold stamps)
    const keyLight = new THREE.DirectionalLight(0xfcd34d, 3.2);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Cool mountain rim light (defines bag edges)
    const rimLight = new THREE.DirectionalLight(0xa7f3d0, 2.4);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    // Soft amber fill light
    const fillLight = new THREE.PointLight(0xc99454, 2.0, 15);
    fillLight.position.set(1, -3, 4);
    scene.add(fillLight);

    // 5. Pouch Master Group
    const pouchGroup = new THREE.Group();
    scene.add(pouchGroup);
    pouchGroupRef.current = pouchGroup;

    // Pouch Mesh & Material
    const pouchGeom = createPouchGeometry();
    const pouchMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x141311,
      roughness: 0.58,
      metalness: 0.12,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35,
      reflectivity: 0.6,
    });
    const pouchMesh = new THREE.Mesh(pouchGeom, pouchMaterial);
    pouchMesh.castShadow = true;
    pouchMesh.receiveShadow = true;
    pouchGroup.add(pouchMesh);
    pouchMeshRef.current = pouchMesh;

    // 6. Front Sticker Decal with Official Packaging Label Texture
    const labelGeom = createLabelGeometry();
    const textureLoader = new THREE.TextureLoader();

    const labelTexture = textureLoader.load(stickerUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });

    const labelMaterial = new THREE.MeshPhysicalMaterial({
      map: labelTexture,
      transparent: true,
      roughness: 0.28,
      metalness: 0.15,
      clearcoat: 0.75,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const labelMesh = new THREE.Mesh(labelGeom, labelMaterial);
    labelMesh.position.set(0, -0.22, 0.72);
    pouchGroup.add(labelMesh);
    labelMeshRef.current = labelMesh;

    // 7. Degassing Valve Relief Mesh on Upper Front
    const valveGeom = new THREE.CylinderGeometry(0.11, 0.11, 0.035, 32);
    valveGeom.rotateX(Math.PI / 2);
    const valveMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0908,
      roughness: 0.4,
      metalness: 0.8,
    });
    const valveMesh = new THREE.Mesh(valveGeom, valveMaterial);
    valveMesh.position.set(0, 0.98, 0.62);
    pouchGroup.add(valveMesh);

    // 8. Internal Roasted Coffee Beans (Visible in X-Ray mode)
    const internalBeansGroup = new THREE.Group();
    pouchGroup.add(internalBeansGroup);
    internalBeansGroupRef.current = internalBeansGroup;

    const singleBeanGeom = createSingleBeanGeometry();
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x2b1810,
      roughness: 0.45,
      metalness: 0.1,
    });

    for (let i = 0; i < 35; i++) {
      const bean = new THREE.Mesh(singleBeanGeom, beanMat);
      bean.position.set(
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.8 - 0.3,
        (Math.random() - 0.5) * 0.7
      );
      bean.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      internalBeansGroup.add(bean);
    }
    internalBeansGroup.visible = isXRay;

    // 9. Pedestal Ground Shadow Disc
    const shadowGeom = new THREE.PlaneGeometry(5, 5);
    shadowGeom.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050403,
      transparent: true,
      opacity: 0.65,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.position.y = -2.1;
    scene.add(shadowMesh);

    // 10. Mouse Event Listeners for 360° Rotation & Interaction
    const handleMouseDown = (e: MouseEvent) => {
      rotationState.current.isDragging = true;
      rotationState.current.prevMouseX = e.clientX;
      rotationState.current.prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!rotationState.current.isDragging) return;
      const deltaX = e.clientX - rotationState.current.prevMouseX;
      const deltaY = e.clientY - rotationState.current.prevMouseY;

      rotationState.current.velocityX = deltaX * 0.008;
      rotationState.current.velocityY = deltaY * 0.008;

      rotationState.current.targetY += rotationState.current.velocityX;
      rotationState.current.targetX += rotationState.current.velocityY;

      // Restrict pitch angle so bag doesn't flip upside down
      rotationState.current.targetX = Math.max(-0.6, Math.min(0.6, rotationState.current.targetX));

      rotationState.current.prevMouseX = e.clientX;
      rotationState.current.prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      rotationState.current.isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        rotationState.current.isDragging = true;
        rotationState.current.prevMouseX = e.touches[0].clientX;
        rotationState.current.prevMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!rotationState.current.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - rotationState.current.prevMouseX;
      const deltaY = e.touches[0].clientY - rotationState.current.prevMouseY;

      rotationState.current.velocityX = deltaX * 0.008;
      rotationState.current.velocityY = deltaY * 0.008;

      rotationState.current.targetY += rotationState.current.velocityX;
      rotationState.current.targetX += rotationState.current.velocityY;

      rotationState.current.targetX = Math.max(-0.6, Math.min(0.6, rotationState.current.targetX));

      rotationState.current.prevMouseX = e.touches[0].clientX;
      rotationState.current.prevMouseY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      rotationState.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.0015;
      rotationState.current.targetZoom = Math.max(0.7, Math.min(1.4, rotationState.current.targetZoom + zoomDelta));
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("wheel", handleWheel, { passive: false });

    // 11. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 12. Animation Render Loop with Inertia Damping
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animFrameRef.current = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      // Auto rotation when idle
      if (isAutoRotate && !rotationState.current.isDragging) {
        rotationState.current.targetY += 0.006;
      }

      // Smooth inertia lerp
      rotationState.current.currentX += (rotationState.current.targetX - rotationState.current.currentX) * 0.08;
      rotationState.current.currentY += (rotationState.current.targetY - rotationState.current.currentY) * 0.08;
      rotationState.current.zoom += (rotationState.current.targetZoom - rotationState.current.zoom) * 0.08;

      if (pouchGroupRef.current) {
        pouchGroupRef.current.rotation.x = rotationState.current.currentX;
        pouchGroupRef.current.rotation.y = rotationState.current.currentY;

        // Subtle organic breathing float
        pouchGroupRef.current.position.y = Math.sin(elapsed * 1.4) * 0.06;

        // Apply weight scale dynamically
        const targetScale = weightScales[weight] * rotationState.current.zoom;
        pouchGroupRef.current.scale.set(targetScale, targetScale, targetScale);
      }

      // Subtle key light shift responding to rotation
      keyLight.position.x = 4 + Math.sin(rotationState.current.currentY) * 2;

      renderer.render(scene, camera);
    };

    renderLoop();

    // 13. Cleanup
    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      pouchGeom.dispose();
      pouchMaterial.dispose();
      labelGeom.dispose();
      labelMaterial.dispose();
      labelTexture.dispose();
      valveGeom.dispose();
      valveMaterial.dispose();
      singleBeanGeom.dispose();
      beanMat.dispose();
      shadowGeom.dispose();
      shadowMat.dispose();
    };
  }, []);

  // Update label texture when stickerUrl changes
  useEffect(() => {
    if (!labelMeshRef.current) return;
    const loader = new THREE.TextureLoader();
    loader.load(stickerUrl, (newTex) => {
      newTex.colorSpace = THREE.SRGBColorSpace;
      const mat = labelMeshRef.current?.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.map = newTex;
        mat.needsUpdate = true;
      }
    });
  }, [stickerUrl]);

  // Update X-Ray visual material
  useEffect(() => {
    if (!pouchMeshRef.current || !internalBeansGroupRef.current) return;
    const mat = pouchMeshRef.current.material as THREE.MeshPhysicalMaterial;

    if (isXRay) {
      // Smoked obsidian glass
      mat.color.setHex(0x1a1614);
      mat.transparent = true;
      mat.opacity = 0.32;
      mat.roughness = 0.15;
      mat.metalness = 0.3;
      mat.clearcoat = 0.9;
      internalBeansGroupRef.current.visible = true;
    } else {
      // Matte tactile pouch
      mat.color.setHex(0x141311);
      mat.transparent = false;
      mat.opacity = 1.0;
      mat.roughness = 0.58;
      mat.metalness = 0.12;
      mat.clearcoat = 0.25;
      internalBeansGroupRef.current.visible = false;
    }
    mat.needsUpdate = true;
  }, [isXRay]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full min-h-[420px] lg:min-h-[560px] cursor-grab active:cursor-grabbing select-none"
    />
  );
}
