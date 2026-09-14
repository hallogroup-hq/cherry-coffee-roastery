"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type Hero3DMode = "dripper" | "bean";

interface HeroCenter3DCanvasProps {
  mode: Hero3DMode;
  onModeToggle?: () => void;
}

export default function HeroCenter3DCanvas({
  mode,
  onModeToggle,
}: HeroCenter3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // References for Three.js lifecycle
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Groups for seamless morphing
  const dripperGroupRef = useRef<THREE.Group | null>(null);
  const beanGroupRef = useRef<THREE.Group | null>(null);
  const aromaNodesRef = useRef<THREE.Group[]>([]);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const dropletsRef = useRef<THREE.Mesh[]>([]);
  const rippleMeshRef = useRef<THREE.Mesh | null>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);
  const tracerOrbitRef = useRef<THREE.Mesh | null>(null);

  // Physics & interaction state
  const stateRef = useRef({
    targetRotX: 0.12,
    targetRotY: 0.35,
    currRotX: 0.12,
    currRotY: 0.35,
    isDragging: false,
    prevX: 0,
    prevY: 0,
    zoom: 1.0,
    targetZoom: 1.0,
    dripperScale: mode === "dripper" ? 1.0 : 0.0,
    beanScale: mode === "bean" ? 1.0 : 0.0,
    targetDripperScale: mode === "dripper" ? 1.0 : 0.0,
    targetBeanScale: mode === "bean" ? 1.0 : 0.0,
    sloshX: 0,
    sloshZ: 0,
  });

  // Synchronize target scales when mode changes
  useEffect(() => {
    stateRef.current.targetDripperScale = mode === "dripper" ? 1.0 : 0.0;
    stateRef.current.targetBeanScale = mode === "bean" ? 1.0 : 0.0;
  }, [mode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with cinematic focal length
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 7.8);
    cameraRef.current = camera;

    // 3. High Performance WebGL Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. STUDIO ENVIRONMENT (PMREM Image-Based Lighting for Real Glass & Gold Reflections)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTexture;

    // 5. CINEMATIC 5-POINT STUDIO LIGHTING (Warm Goalpara Dawn + Amber Rim + Caustics)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.85);
    scene.add(ambientLight);

    // Key Light: Golden Goalpara morning sun (sharp specular highlights on brass and glass facets)
    const keyLight = new THREE.DirectionalLight(0xffd580, 4.2);
    keyLight.position.set(4.5, 6.0, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Rim Backlight: High-contrast cyan-white rim outlining glass edges from behind
    const rimBacklight = new THREE.DirectionalLight(0xbbf2f6, 3.8);
    rimBacklight.position.set(-4.5, 4.0, -4.5);
    scene.add(rimBacklight);

    // Warm Amber Side Softbox: Warms up the coffee liquid and grounds
    const amberFillLight = new THREE.PointLight(0xf59e0b, 3.2, 12);
    amberFillLight.position.set(-2.5, -0.5, 3.0);
    scene.add(amberFillLight);

    // Top Down Spotlight: Focused squarely on the dripper cone and grounds bed
    const topSpot = new THREE.SpotLight(0xffeedd, 4.5, 12, Math.PI / 4, 0.5);
    topSpot.position.set(0, 5.5, 0.5);
    topSpot.target.position.set(0, 1.2, 0);
    scene.add(topSpot);
    scene.add(topSpot.target);

    // Internal Caustic Glow Light: Placed right at the center of the coffee server
    const causticLight = new THREE.PointLight(0xd97706, 2.8, 4.5);
    causticLight.position.set(0, -1.2, 0);
    scene.add(causticLight);

    // Ground Shadow Contact Plane
    const shadowGeom = new THREE.PlaneGeometry(6.5, 6.5);
    shadowGeom.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x060504,
      transparent: true,
      opacity: 0.75,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.position.y = -2.15;
    scene.add(shadowMesh);

    // =========================================================================
    // PROCEDURAL TEXTURE GENERATORS (For Micro-Realism)
    // =========================================================================
    // A. Coffee grounds bump texture
    const generateGroundsTexture = () => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#1e130c";
      ctx.fillRect(0, 0, 512, 512);

      // Micro speckles and coffee granules
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 2.5 + 0.8;
        const shade = Math.random() > 0.4 ? "#2e190d" : Math.random() > 0.5 ? "#120a06" : "#4a2a14";
        ctx.fillStyle = shade;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      return tex;
    };

    // B. Roasted coffee bean cellular bump texture
    const generateBeanBumpTexture = () => {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 1024;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, 1024, 1024);

      // Roasted micro-cracks
      ctx.strokeStyle = "#404040";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 120; i++) {
        ctx.beginPath();
        let px = Math.random() * 1024;
        let py = Math.random() * 1024;
        ctx.moveTo(px, py);
        for (let step = 0; step < 4; step++) {
          px += (Math.random() - 0.5) * 35;
          py += (Math.random() - 0.5) * 35;
          ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Fine cellular pore noise
      for (let i = 0; i < 6000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        ctx.fillStyle = Math.random() > 0.5 ? "#999999" : "#666666";
        ctx.fillRect(x, y, 2, 2);
      }

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    // C. Caustic light pool texture on the base stand
    const generateCausticTexture = () => {
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, "rgba(245, 158, 11, 0.75)");
      grad.addColorStop(0.4, "rgba(217, 119, 6, 0.4)");
      grad.addColorStop(0.8, "rgba(180, 83, 9, 0.1)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    };

    const groundsTexture = generateGroundsTexture();
    const beanBumpTexture = generateBeanBumpTexture();
    const causticTexture = generateCausticTexture();

    // =========================================================================
    // BUILD MODE 1: KINETIC SLOW-BAR POUR-OVER RIG (Photorealistic PBR)
    // =========================================================================
    const dripperGroup = new THREE.Group();
    dripperGroup.position.set(0, -0.2, 0);
    scene.add(dripperGroup);
    dripperGroupRef.current = dripperGroup;

    // A. Matte Obsidian & Brushed Brass Stand Base
    const basePlateGeom = new THREE.BoxGeometry(2.4, 0.2, 2.8);
    const basePlateMat = new THREE.MeshPhysicalMaterial({
      color: 0x11100e,
      roughness: 0.42,
      metalness: 0.35,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      reflectivity: 0.8,
    });
    const basePlate = new THREE.Mesh(basePlateGeom, basePlateMat);
    basePlate.position.y = -1.88;
    basePlate.receiveShadow = true;
    dripperGroup.add(basePlate);

    // Warm Caustic Light Pool on the Base Plate
    const causticDiscGeom = new THREE.PlaneGeometry(1.6, 1.6);
    causticDiscGeom.rotateX(-Math.PI / 2);
    const causticDiscMat = new THREE.MeshBasicMaterial({
      map: causticTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
    });
    const causticDisc = new THREE.Mesh(causticDiscGeom, causticDiscMat);
    causticDisc.position.set(0, -1.77, 0);
    dripperGroup.add(causticDisc);

    // Precision Brushed Brass Accent Trim
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4a054,
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 1.0,
      envMapIntensity: 2.2,
    });

    const baseRimGeom = new THREE.BoxGeometry(2.44, 0.045, 2.84);
    const baseRim = new THREE.Mesh(baseRimGeom, brassMat);
    baseRim.position.y = -1.95;
    dripperGroup.add(baseRim);

    // B. Vertical Solid Brass Support Rod & Knurled Collar
    const rodGeom = new THREE.CylinderGeometry(0.048, 0.048, 3.4, 32);
    const standRod = new THREE.Mesh(rodGeom, brassMat);
    standRod.position.set(0.92, -0.18, -0.92);
    standRod.castShadow = true;
    dripperGroup.add(standRod);

    const knobGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.18, 32);
    knobGeom.rotateZ(Math.PI / 2);
    const knob = new THREE.Mesh(knobGeom, brassMat);
    knob.position.set(0.92, 0.72, -0.92);
    dripperGroup.add(knob);

    const armGeom = new THREE.BoxGeometry(0.95, 0.065, 0.085);
    const standArm = new THREE.Mesh(armGeom, brassMat);
    standArm.position.set(0.46, 0.72, -0.92);
    dripperGroup.add(standArm);

    // Matte Obsidian Octagonal Collar holding the dripper
    const collarGeom = new THREE.CylinderGeometry(0.92, 0.88, 0.08, 8);
    const collarMat = new THREE.MeshPhysicalMaterial({
      color: 0x161513,
      metalness: 0.4,
      roughness: 0.35,
      clearcoat: 0.4,
    });
    const collar = new THREE.Mesh(collarGeom, collarMat);
    collar.position.set(0, 0.72, 0);
    dripperGroup.add(collar);

    // C. 20-Faceted Smoked Crystal Origami Dripper (True Refractive Glass)
    const coneRadiusTop = 0.98;
    const coneRadiusBottom = 0.16;
    const coneHeight = 1.15;
    const radialSegments = 20;
    const dripperGeom = new THREE.CylinderGeometry(
      coneRadiusTop,
      coneRadiusBottom,
      coneHeight,
      radialSegments,
      16,
      true
    );

    const dripperPos = dripperGeom.attributes.position;
    const vDrip = new THREE.Vector3();
    for (let i = 0; i < dripperPos.count; i++) {
      vDrip.fromBufferAttribute(dripperPos, i);
      const angle = Math.atan2(vDrip.z, vDrip.x);
      const r = Math.sqrt(vDrip.x * vDrip.x + vDrip.z * vDrip.z);
      const flute = Math.cos(angle * 20) * 0.048 * (r / coneRadiusTop);
      vDrip.x += Math.cos(angle) * flute;
      vDrip.z += Math.sin(angle) * flute;
      dripperPos.setXYZ(i, vDrip.x, vDrip.y, vDrip.z);
    }
    dripperGeom.computeVertexNormals();

    const smokedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      transparent: true,
      opacity: 1.0,
      roughness: 0.04,
      metalness: 0.05,
      ior: 1.54,
      thickness: 0.75,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      attenuationColor: 0xebd9c8,
      attenuationDistance: 0.8,
      envMapIntensity: 2.2,
    });

    const dripperMesh = new THREE.Mesh(dripperGeom, smokedGlassMat);
    dripperMesh.position.set(0, 1.25, 0);
    dripperMesh.castShadow = true;
    dripperGroup.add(dripperMesh);

    // D. Fluted Bleached Wave Paper Filter
    const filterGeom = new THREE.CylinderGeometry(
      coneRadiusTop * 0.96,
      coneRadiusBottom * 1.04,
      coneHeight * 0.95,
      radialSegments,
      8,
      true
    );
    const filterMat = new THREE.MeshStandardMaterial({
      color: 0xfbf7f0,
      roughness: 0.88,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
    const filterMesh = new THREE.Mesh(filterGeom, filterMat);
    filterMesh.position.set(0, 1.27, 0);
    dripperGroup.add(filterMesh);

    // E. Realistic Coffee Grounds Slurry Bed with Extraction Crater
    const slurryGeom = new THREE.CylinderGeometry(0.72, 0.28, 0.48, 32);
    // Indent center crater where water pours into the slurry
    const sPos = slurryGeom.attributes.position;
    const vS = new THREE.Vector3();
    for (let i = 0; i < sPos.count; i++) {
      vS.fromBufferAttribute(sPos, i);
      if (vS.y > 0.15) {
        const distCenter = Math.sqrt(vS.x * vS.x + vS.z * vS.z);
        if (distCenter < 0.45) {
          vS.y -= Math.cos((distCenter / 0.45) * Math.PI * 0.5) * 0.14;
        }
      }
      sPos.setXYZ(i, vS.x, vS.y, vS.z);
    }
    slurryGeom.computeVertexNormals();

    const slurryMat = new THREE.MeshStandardMaterial({
      color: 0x22150e,
      map: groundsTexture,
      bumpMap: groundsTexture,
      bumpScale: 0.04,
      roughness: 0.65,
      metalness: 0.08,
    });
    const slurryMesh = new THREE.Mesh(slurryGeom, slurryMat);
    slurryMesh.position.set(0, 1.08, 0);
    dripperGroup.add(slurryMesh);

    // F. Borosilicate Glass Decanter Server (Ultra Clear Refraction)
    const carafePoints: THREE.Vector2[] = [];
    carafePoints.push(new THREE.Vector2(0.0, -1.82));
    carafePoints.push(new THREE.Vector2(0.86, -1.82));
    carafePoints.push(new THREE.Vector2(0.94, -1.74));
    carafePoints.push(new THREE.Vector2(0.90, -1.05));
    carafePoints.push(new THREE.Vector2(0.48, -0.42));
    carafePoints.push(new THREE.Vector2(0.56, -0.22));
    carafePoints.push(new THREE.Vector2(0.52, -0.20));

    const carafeGeom = new THREE.LatheGeometry(carafePoints, 48);
    const borosilicateMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.98,
      transparent: true,
      opacity: 1.0,
      roughness: 0.02,
      metalness: 0.03,
      ior: 1.51,
      thickness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.015,
      envMapIntensity: 2.4,
    });
    const carafeMesh = new THREE.Mesh(carafeGeom, borosilicateMat);
    carafeMesh.position.set(0, 0, 0);
    carafeMesh.castShadow = true;
    dripperGroup.add(carafeMesh);

    // Delicate Glass Handle
    const handleGeom = new THREE.TorusGeometry(0.4, 0.045, 16, 32, Math.PI * 0.86);
    handleGeom.rotateZ(-Math.PI * 0.42);
    const carafeHandle = new THREE.Mesh(handleGeom, borosilicateMat);
    carafeHandle.position.set(0.85, -1.0, 0);
    dripperGroup.add(carafeHandle);

    // G. Volumetric Amber Coffee Liquid with Internal Light Scattering
    const liquidPoints: THREE.Vector2[] = [];
    liquidPoints.push(new THREE.Vector2(0.0, -1.8));
    liquidPoints.push(new THREE.Vector2(0.84, -1.8));
    liquidPoints.push(new THREE.Vector2(0.87, -1.15));
    liquidPoints.push(new THREE.Vector2(0.74, -0.92));
    liquidPoints.push(new THREE.Vector2(0.0, -0.92));

    const liquidGeom = new THREE.LatheGeometry(liquidPoints, 36);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      emissive: 0x451a03,
      emissiveIntensity: 0.6,
      transmission: 0.72,
      transparent: true,
      opacity: 1.0,
      roughness: 0.08,
      metalness: 0.06,
      ior: 1.34,
      thickness: 1.3,
      attenuationColor: 0x7c2d12,
      attenuationDistance: 0.45,
      envMapIntensity: 1.8,
    });
    const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
    dripperGroup.add(liquidMesh);
    liquidMeshRef.current = liquidMesh;

    // Surface Ripple Ring
    const rippleGeom = new THREE.RingGeometry(0.02, 0.32, 32);
    rippleGeom.rotateX(-Math.PI / 2);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const rippleMesh = new THREE.Mesh(rippleGeom, rippleMat);
    rippleMesh.position.set(0, -0.915, 0);
    dripperGroup.add(rippleMesh);
    rippleMeshRef.current = rippleMesh;

    // H. Dynamic Falling Amber Coffee Droplets
    const dropletGeom = new THREE.SphereGeometry(0.042, 16, 16);
    dropletGeom.scale(0.75, 1.4, 0.75);
    const dropletMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0x78350f,
      emissiveIntensity: 0.4,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.7,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.95,
      ior: 1.34,
    });

    const droplets: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const drop = new THREE.Mesh(dropletGeom, dropletMat);
      drop.position.set(0, 0.65 - i * 0.45, 0);
      dripperGroup.add(drop);
      droplets.push(drop);
    }
    dropletsRef.current = droplets;

    // I. Hot Volumetric Steam Vapor Particles
    const steamCount = 42;
    const steamGeom = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamOffsets = new Float32Array(steamCount);

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3 + 0] = (Math.random() - 0.5) * 0.55;
      steamPositions[i * 3 + 1] = 1.3 + Math.random() * 1.5;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.55;
      steamOffsets[i] = Math.random() * Math.PI * 2;
    }
    steamGeom.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xffedd5,
      size: 0.1,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(steamGeom, steamMat);
    dripperGroup.add(steamParticles);
    steamParticlesRef.current = steamParticles;

    // J. Golden 360° Orbit Ring with Degree Hash Marks
    const orbitRingGeom = new THREE.TorusGeometry(2.15, 0.012, 16, 72);
    orbitRingGeom.rotateX(Math.PI * 0.38);
    orbitRingGeom.rotateY(Math.PI * 0.12);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xd4a054,
      transparent: true,
      opacity: 0.45,
    });
    const orbitRingMesh = new THREE.Mesh(orbitRingGeom, orbitRingMat);
    orbitRingMesh.position.set(0, -0.2, 0);
    dripperGroup.add(orbitRingMesh);

    const tracerGeom = new THREE.SphereGeometry(0.048, 16, 16);
    const tracerMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
    const tracerMesh = new THREE.Mesh(tracerGeom, tracerMat);
    dripperGroup.add(tracerMesh);
    tracerOrbitRef.current = tracerMesh;

    // =========================================================================
    // BUILD MODE 2: MASTER SPECIALTY BEAN & FLAVOR CONSTELLATION
    // =========================================================================
    const beanGroup = new THREE.Group();
    scene.add(beanGroup);
    beanGroupRef.current = beanGroup;

    // Sculpted Arabica Bean with Micro-Bump & Fissure
    const beanRadius = 1.6;
    const beanGeom = new THREE.SphereGeometry(beanRadius, 64, 48);
    const beanPos = beanGeom.attributes.position;
    const vBean = new THREE.Vector3();

    for (let i = 0; i < beanPos.count; i++) {
      vBean.fromBufferAttribute(beanPos, i);

      // Arabica oval seed proportions
      vBean.z *= 0.64;
      vBean.y *= 1.38;

      if (vBean.z < 0) {
        vBean.z *= 0.74;
      }

      // Organic center fissure on front
      if (vBean.z > 0.05) {
        const distFromCenterLine = Math.abs(vBean.x);
        if (distFromCenterLine < 0.4) {
          const depth = (0.4 - distFromCenterLine) * 0.96;
          const sCurve = Math.sin((vBean.y / beanRadius) * Math.PI) * 0.08;
          vBean.z -= depth * Math.cos((vBean.y / 2.2) * Math.PI * 0.5);
          vBean.x += sCurve;
        }
      }

      beanPos.setXYZ(i, vBean.x, vBean.y, vBean.z);
    }
    beanGeom.computeVertexNormals();

    const beanMat = new THREE.MeshPhysicalMaterial({
      color: 0x241710,
      bumpMap: beanBumpTexture,
      bumpScale: 0.022,
      roughness: 0.44,
      metalness: 0.12,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
      envMapIntensity: 1.8,
    });
    const beanMesh = new THREE.Mesh(beanGeom, beanMat);
    beanMesh.castShadow = true;
    beanGroup.add(beanMesh);

    // Golden Chaff Inlay in Center Fissure
    const chaffGeom = new THREE.PlaneGeometry(0.2, 2.7, 8, 32);
    const chaffPos = chaffGeom.attributes.position;
    const vChaff = new THREE.Vector3();
    for (let i = 0; i < chaffPos.count; i++) {
      vChaff.fromBufferAttribute(chaffPos, i);
      vChaff.z = 0.58 + Math.sin(vChaff.y * 3) * 0.04;
      vChaff.x += Math.sin((vChaff.y / 1.35) * Math.PI) * 0.06;
      chaffPos.setXYZ(i, vChaff.x, vChaff.y, vChaff.z);
    }
    chaffGeom.computeVertexNormals();

    const chaffMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5d996,
      metalness: 0.65,
      roughness: 0.28,
      clearcoat: 0.85,
      side: THREE.DoubleSide,
      envMapIntensity: 2.2,
    });
    const chaffMesh = new THREE.Mesh(chaffGeom, chaffMat);
    beanGroup.add(chaffMesh);

    // Orbital Rings
    const ring1Geom = new THREE.TorusGeometry(2.38, 0.012, 16, 72);
    ring1Geom.rotateX(Math.PI * 0.4);
    ring1Geom.rotateY(Math.PI * 0.15);
    const ring1 = new THREE.Mesh(ring1Geom, orbitRingMat);
    beanGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.68, 0.009, 16, 72);
    ring2Geom.rotateX(-Math.PI * 0.3);
    ring2Geom.rotateZ(Math.PI * 0.25);
    const ring2 = new THREE.Mesh(ring2Geom, orbitRingMat);
    beanGroup.add(ring2);

    // Floating Crystalline Aroma Terpene Nodes
    const aromaNodes: THREE.Group[] = [];
    const aromaSpecs = [
      { geom: new THREE.IcosahedronGeometry(0.16, 0), color: 0xfcd34d, pos: [1.8, 1.2, 0.8] },
      { geom: new THREE.OctahedronGeometry(0.15, 0), color: 0xffedd5, pos: [-1.9, 0.9, -0.6] },
      { geom: new THREE.DodecahedronGeometry(0.14, 0), color: 0xf59e0b, pos: [1.5, -1.4, -0.7] },
      { geom: new THREE.IcosahedronGeometry(0.13, 0), color: 0xf43f5e, pos: [-1.6, -1.1, 0.9] },
    ];

    aromaSpecs.forEach((spec) => {
      const g = new THREE.Group();
      const wireMat = new THREE.MeshStandardMaterial({
        color: spec.color,
        wireframe: true,
        roughness: 0.15,
        metalness: 0.95,
      });
      const wireMesh = new THREE.Mesh(spec.geom, wireMat);
      g.add(wireMesh);

      const coreMat = new THREE.MeshBasicMaterial({ color: spec.color });
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), coreMat);
      g.add(core);

      g.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
      beanGroup.add(g);
      aromaNodes.push(g);
    });
    aromaNodesRef.current = aromaNodes;

    // Initial scale state
    dripperGroup.scale.set(stateRef.current.dripperScale, stateRef.current.dripperScale, stateRef.current.dripperScale);
    beanGroup.scale.set(stateRef.current.beanScale, stateRef.current.beanScale, stateRef.current.beanScale);

    // =========================================================================
    // MOUSE & TOUCH EVENT LISTENERS (360° Drag + Momentum)
    // =========================================================================
    const handleMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.prevX = e.clientX;
      stateRef.current.prevY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!stateRef.current.isDragging) return;
      const deltaX = e.clientX - stateRef.current.prevX;
      const deltaY = e.clientY - stateRef.current.prevY;

      stateRef.current.targetRotY += deltaX * 0.007;
      stateRef.current.targetRotX += deltaY * 0.007;
      stateRef.current.targetRotX = Math.max(-0.55, Math.min(0.55, stateRef.current.targetRotX));

      stateRef.current.sloshX = Math.max(-0.15, Math.min(0.15, deltaX * 0.004));
      stateRef.current.sloshZ = Math.max(-0.15, Math.min(0.15, deltaY * 0.004));

      stateRef.current.prevX = e.clientX;
      stateRef.current.prevY = e.clientY;
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        stateRef.current.isDragging = true;
        stateRef.current.prevX = e.touches[0].clientX;
        stateRef.current.prevY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!stateRef.current.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - stateRef.current.prevX;
      const deltaY = e.touches[0].clientY - stateRef.current.prevY;

      stateRef.current.targetRotY += deltaX * 0.007;
      stateRef.current.targetRotX += deltaY * 0.007;
      stateRef.current.targetRotX = Math.max(-0.55, Math.min(0.55, stateRef.current.targetRotX));

      stateRef.current.sloshX = Math.max(-0.15, Math.min(0.15, deltaX * 0.004));
      stateRef.current.sloshZ = Math.max(-0.15, Math.min(0.15, deltaY * 0.004));

      stateRef.current.prevX = e.touches[0].clientX;
      stateRef.current.prevY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      stateRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.0012;
      stateRef.current.targetZoom = Math.max(0.8, Math.min(1.35, stateRef.current.targetZoom + zoomDelta));
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("wheel", handleWheel, { passive: false });

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // =========================================================================
    // MAIN ANIMATION RENDER LOOP
    // =========================================================================
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animFrameRef.current = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      if (!stateRef.current.isDragging) {
        stateRef.current.targetRotY += 0.004;
      }

      stateRef.current.currRotX += (stateRef.current.targetRotX - stateRef.current.currRotX) * 0.08;
      stateRef.current.currRotY += (stateRef.current.targetRotY - stateRef.current.currRotY) * 0.08;
      stateRef.current.zoom += (stateRef.current.targetZoom - stateRef.current.zoom) * 0.08;

      stateRef.current.dripperScale += (stateRef.current.targetDripperScale - stateRef.current.dripperScale) * 0.08;
      stateRef.current.beanScale += (stateRef.current.targetBeanScale - stateRef.current.beanScale) * 0.08;

      // Update Dripper Group
      if (dripperGroupRef.current) {
        const dScale = stateRef.current.dripperScale * stateRef.current.zoom;
        dripperGroupRef.current.scale.set(dScale, dScale, dScale);
        dripperGroupRef.current.visible = stateRef.current.dripperScale > 0.005;

        dripperGroupRef.current.rotation.x = stateRef.current.currRotX;
        dripperGroupRef.current.rotation.y = stateRef.current.currRotY;
        dripperGroupRef.current.position.y = -0.2 + Math.sin(elapsed * 1.5) * 0.04;
      }

      // Update Bean Group
      if (beanGroupRef.current) {
        const bScale = stateRef.current.beanScale * stateRef.current.zoom;
        beanGroupRef.current.scale.set(bScale, bScale, bScale);
        beanGroupRef.current.visible = stateRef.current.beanScale > 0.005;

        beanGroupRef.current.rotation.x = stateRef.current.currRotX + Math.sin(elapsed * 0.8) * 0.06;
        beanGroupRef.current.rotation.y = stateRef.current.currRotY + elapsed * 0.08;
        beanGroupRef.current.position.y = Math.sin(elapsed * 1.8) * 0.06;
      }

      // Droplets & Ripple Animation
      dropletsRef.current.forEach((drop, idx) => {
        drop.position.y -= 0.018 + idx * 0.004;
        if (drop.position.y < -0.92) {
          drop.position.y = 0.65;
          if (rippleMeshRef.current) {
            rippleMeshRef.current.scale.set(0.1, 0.1, 0.1);
            (rippleMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8;
          }
        }
      });

      if (rippleMeshRef.current) {
        const rMat = rippleMeshRef.current.material as THREE.MeshBasicMaterial;
        if (rMat.opacity > 0.02) {
          rippleMeshRef.current.scale.x += 0.04;
          rippleMeshRef.current.scale.z += 0.04;
          rMat.opacity *= 0.94;
        }
      }

      // Sloshing Coffee Liquid
      if (liquidMeshRef.current) {
        stateRef.current.sloshX *= 0.95;
        stateRef.current.sloshZ *= 0.95;
        liquidMeshRef.current.rotation.z = Math.sin(elapsed * 3) * 0.02 + stateRef.current.sloshX;
        liquidMeshRef.current.rotation.x = Math.cos(elapsed * 3) * 0.02 + stateRef.current.sloshZ;
      }

      // Volumetric Steam Particles
      if (steamParticlesRef.current) {
        const posAttr = steamParticlesRef.current.geometry.attributes.position;
        for (let i = 0; i < steamCount; i++) {
          let y = posAttr.getY(i);
          y += 0.009;
          if (y > 2.8) {
            y = 1.3;
            posAttr.setX(i, (Math.random() - 0.5) * 0.55);
            posAttr.setZ(i, (Math.random() - 0.5) * 0.55);
          } else {
            const x = posAttr.getX(i) + Math.sin(elapsed * 2 + steamOffsets[i]) * 0.002;
            posAttr.setX(i, x);
          }
          posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
      }

      // Orbit Tracer
      if (tracerOrbitRef.current) {
        const angle = elapsed * 1.8;
        tracerOrbitRef.current.position.set(
          Math.cos(angle) * 2.15,
          Math.sin(angle * 0.6) * 0.5 - 0.2,
          Math.sin(angle) * 2.15
        );
      }

      // Aroma Terpene Nodes
      aromaNodesRef.current.forEach((node, idx) => {
        node.rotation.x += 0.02;
        node.rotation.y += 0.03;
        node.position.y += Math.sin(elapsed * 2 + idx) * 0.003;
      });

      // Key light tracking
      keyLight.position.x = 4.5 + Math.sin(stateRef.current.currRotY) * 2.5;

      renderer.render(scene, camera);
    };

    renderLoop();

    // =========================================================================
    // CLEANUP
    // =========================================================================
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
      pmremGenerator.dispose();
      envTexture.dispose();
      groundsTexture.dispose();
      beanBumpTexture.dispose();
      causticTexture.dispose();

      basePlateGeom.dispose();
      basePlateMat.dispose();
      causticDiscGeom.dispose();
      causticDiscMat.dispose();
      baseRimGeom.dispose();
      brassMat.dispose();
      rodGeom.dispose();
      knobGeom.dispose();
      armGeom.dispose();
      collarGeom.dispose();
      collarMat.dispose();
      dripperGeom.dispose();
      smokedGlassMat.dispose();
      filterGeom.dispose();
      filterMat.dispose();
      slurryGeom.dispose();
      slurryMat.dispose();
      carafeGeom.dispose();
      borosilicateMat.dispose();
      handleGeom.dispose();
      liquidGeom.dispose();
      liquidMat.dispose();
      rippleGeom.dispose();
      rippleMat.dispose();
      dropletGeom.dispose();
      dropletMat.dispose();
      steamGeom.dispose();
      steamMat.dispose();
      orbitRingGeom.dispose();
      orbitRingMat.dispose();
      tracerGeom.dispose();
      tracerMat.dispose();
      beanGeom.dispose();
      beanMat.dispose();
      chaffGeom.dispose();
      chaffMat.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      shadowGeom.dispose();
      shadowMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[580px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
