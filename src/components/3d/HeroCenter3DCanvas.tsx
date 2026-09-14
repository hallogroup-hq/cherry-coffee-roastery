"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

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

  // Group references for seamless morphing
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
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 7.6);
    cameraRef.current = camera;

    // 3. High Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Studio Cinematic 4-Point Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    // Key warm Goalpara dawn gold light
    const keyLight = new THREE.DirectionalLight(0xfcd34d, 3.4);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Cool mountain rim light (pinpoints glass edges and chrome/brass)
    const rimLight = new THREE.DirectionalLight(0xa7f3d0, 2.5);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Warm amber ground bounce light
    const fillLight = new THREE.PointLight(0xc99454, 2.2, 14);
    fillLight.position.set(1, -2.5, 3.5);
    scene.add(fillLight);

    // Top spotlight illuminating the dripper bed
    const topSpot = new THREE.SpotLight(0xffedd5, 2.8, 10, Math.PI / 4, 0.4);
    topSpot.position.set(0, 5, 0.5);
    scene.add(topSpot);

    // Ground shadow contact plane
    const shadowGeom = new THREE.PlaneGeometry(6, 6);
    shadowGeom.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050403,
      transparent: true,
      opacity: 0.68,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.position.y = -2.1;
    scene.add(shadowMesh);

    // =========================================================================
    // BUILD MODE 1: THE KINETIC SLOW-BAR POUR-OVER RIG
    // =========================================================================
    const dripperGroup = new THREE.Group();
    dripperGroup.position.set(0, -0.2, 0);
    scene.add(dripperGroup);
    dripperGroupRef.current = dripperGroup;

    // A. Matte Obsidian & Brushed Brass Stand Base
    const basePlateGeom = new THREE.BoxGeometry(2.3, 0.18, 2.7);
    const basePlateMat = new THREE.MeshPhysicalMaterial({
      color: 0x141311,
      roughness: 0.5,
      metalness: 0.3,
      clearcoat: 0.2,
    });
    const basePlate = new THREE.Mesh(basePlateGeom, basePlateMat);
    basePlate.position.y = -1.88;
    basePlate.receiveShadow = true;
    dripperGroup.add(basePlate);

    // Brass accent rim around base plate
    const baseRimGeom = new THREE.BoxGeometry(2.34, 0.04, 2.74);
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4a054,
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.6,
    });
    const baseRim = new THREE.Mesh(baseRimGeom, brassMat);
    baseRim.position.y = -1.94;
    dripperGroup.add(baseRim);

    // B. Vertical Brass Stand Rod & Adjustment Collar
    const rodGeom = new THREE.CylinderGeometry(0.045, 0.045, 3.4, 24);
    const standRod = new THREE.Mesh(rodGeom, brassMat);
    standRod.position.set(0.88, -0.18, -0.88);
    standRod.castShadow = true;
    dripperGroup.add(standRod);

    // Knurled locking knob
    const knobGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.16, 24);
    knobGeom.rotateZ(Math.PI / 2);
    const knob = new THREE.Mesh(knobGeom, brassMat);
    knob.position.set(0.88, 0.72, -0.88);
    dripperGroup.add(knob);

    // Cantilever horizontal arm holding the dripper collar
    const armGeom = new THREE.BoxGeometry(0.9, 0.06, 0.08);
    const standArm = new THREE.Mesh(armGeom, brassMat);
    standArm.position.set(0.44, 0.72, -0.88);
    dripperGroup.add(standArm);

    // Dripper holder ring
    const holderRingGeom = new THREE.TorusGeometry(0.72, 0.045, 16, 32);
    holderRingGeom.rotateX(Math.PI / 2);
    const holderRing = new THREE.Mesh(holderRingGeom, brassMat);
    holderRing.position.set(0, 0.72, 0);
    dripperGroup.add(holderRing);

    // C. 20-Faceted Smoked Crystal Origami Dripper
    const coneRadiusTop = 0.98;
    const coneRadiusBottom = 0.16;
    const coneHeight = 1.15;
    const radialSegments = 20; // 20 origami pleats
    const heightSegments = 16;
    const dripperGeom = new THREE.CylinderGeometry(
      coneRadiusTop,
      coneRadiusBottom,
      coneHeight,
      radialSegments,
      heightSegments,
      true
    );

    // Apply origami star/pleat indentation along radial vertices
    const dripperPos = dripperGeom.attributes.position;
    const vDrip = new THREE.Vector3();
    for (let i = 0; i < dripperPos.count; i++) {
      vDrip.fromBufferAttribute(dripperPos, i);
      const angle = Math.atan2(vDrip.z, vDrip.x);
      const r = Math.sqrt(vDrip.x * vDrip.x + vDrip.z * vDrip.z);
      const flute = Math.cos(angle * 20) * 0.045 * (r / coneRadiusTop);
      vDrip.x += Math.cos(angle) * flute;
      vDrip.z += Math.sin(angle) * flute;
      dripperPos.setXYZ(i, vDrip.x, vDrip.y, vDrip.z);
    }
    dripperGeom.computeVertexNormals();

    const smokedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xebd9c8,
      transparent: true,
      opacity: 0.92,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.88,
      ior: 1.52,
      thickness: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });

    const dripperMesh = new THREE.Mesh(dripperGeom, smokedGlassMat);
    dripperMesh.position.set(0, 1.25, 0);
    dripperMesh.castShadow = true;
    dripperGroup.add(dripperMesh);

    // D. Fluted Bleached Paper Filter
    const filterGeom = new THREE.CylinderGeometry(
      coneRadiusTop * 0.95,
      coneRadiusBottom * 1.05,
      coneHeight * 0.94,
      radialSegments,
      8,
      true
    );
    const filterMat = new THREE.MeshStandardMaterial({
      color: 0xf5eee6,
      roughness: 0.9,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
    const filterMesh = new THREE.Mesh(filterGeom, filterMat);
    filterMesh.position.set(0, 1.27, 0);
    dripperGroup.add(filterMesh);

    // E. Coffee Grounds Slurry Bed (Blooming & Steaming)
    const slurryGeom = new THREE.CylinderGeometry(0.68, 0.28, 0.45, 24);
    const slurryMat = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      roughness: 0.75,
      metalness: 0.05,
    });
    const slurryMesh = new THREE.Mesh(slurryGeom, slurryMat);
    slurryMesh.position.set(0, 1.08, 0);
    dripperGroup.add(slurryMesh);

    // F. Borosilicate Glass Carafe / Decanter
    const carafePoints: THREE.Vector2[] = [];
    carafePoints.push(new THREE.Vector2(0.0, -1.82));
    carafePoints.push(new THREE.Vector2(0.85, -1.82));
    carafePoints.push(new THREE.Vector2(0.92, -1.75));
    carafePoints.push(new THREE.Vector2(0.88, -1.05));
    carafePoints.push(new THREE.Vector2(0.48, -0.42));
    carafePoints.push(new THREE.Vector2(0.55, -0.22));
    carafePoints.push(new THREE.Vector2(0.52, -0.20));

    const carafeGeom = new THREE.LatheGeometry(carafePoints, 36);
    const borosilicateMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.94,
      roughness: 0.04,
      metalness: 0.05,
      transmission: 0.92,
      ior: 1.48,
      thickness: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });
    const carafeMesh = new THREE.Mesh(carafeGeom, borosilicateMat);
    carafeMesh.position.set(0, 0, 0);
    carafeMesh.castShadow = true;
    dripperGroup.add(carafeMesh);

    // Carafe Glass Handle
    const handleGeom = new THREE.TorusGeometry(0.38, 0.04, 16, 24, Math.PI * 0.85);
    handleGeom.rotateZ(-Math.PI * 0.42);
    const carafeHandle = new THREE.Mesh(handleGeom, borosilicateMat);
    carafeHandle.position.set(0.82, -1.0, 0);
    dripperGroup.add(carafeHandle);

    // G. Amber Coffee Liquid Brew inside Carafe
    const liquidPoints: THREE.Vector2[] = [];
    liquidPoints.push(new THREE.Vector2(0.0, -1.8));
    liquidPoints.push(new THREE.Vector2(0.82, -1.8));
    liquidPoints.push(new THREE.Vector2(0.85, -1.15));
    liquidPoints.push(new THREE.Vector2(0.72, -0.92));
    liquidPoints.push(new THREE.Vector2(0.0, -0.92));

    const liquidGeom = new THREE.LatheGeometry(liquidPoints, 32);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      emissive: 0x3f1f05,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.88,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.4,
    });
    const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
    dripperGroup.add(liquidMesh);
    liquidMeshRef.current = liquidMesh;

    // Liquid surface ripple mesh
    const rippleGeom = new THREE.RingGeometry(0.02, 0.28, 24);
    rippleGeom.rotateX(-Math.PI / 2);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const rippleMesh = new THREE.Mesh(rippleGeom, rippleMat);
    rippleMesh.position.set(0, -0.915, 0);
    dripperGroup.add(rippleMesh);
    rippleMeshRef.current = rippleMesh;

    // H. Dynamic Falling Golden Coffee Droplets
    const dropletGeom = new THREE.SphereGeometry(0.038, 12, 12);
    dropletGeom.scale(0.8, 1.4, 0.8);
    const dropletMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.9,
    });

    const droplets: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const drop = new THREE.Mesh(dropletGeom, dropletMat);
      drop.position.set(0, 0.65 - i * 0.45, 0);
      dripperGroup.add(drop);
      droplets.push(drop);
    }
    dropletsRef.current = droplets;

    // I. Volumetric Steam Vapor Particles
    const steamCount = 38;
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
      size: 0.09,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(steamGeom, steamMat);
    dripperGroup.add(steamParticles);
    steamParticlesRef.current = steamParticles;

    // J. Futuristic 360° Orbit Wireframe Ring
    const orbitRingGeom = new THREE.TorusGeometry(2.1, 0.012, 16, 64);
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

    // Glowing orbiting cursor indicator tick
    const tracerGeom = new THREE.SphereGeometry(0.045, 12, 12);
    const tracerMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
    const tracerMesh = new THREE.Mesh(tracerGeom, tracerMat);
    dripperGroup.add(tracerMesh);
    tracerOrbitRef.current = tracerMesh;

    // =========================================================================
    // BUILD MODE 2: THE MASTER SPECIALTY BEAN & FLAVOR CONSTELLATION
    // =========================================================================
    const beanGroup = new THREE.Group();
    scene.add(beanGroup);
    beanGroupRef.current = beanGroup;

    // Sculpted Arabica Coffee Bean Geometry with Deep Center Fissure
    const beanRadius = 1.6;
    const beanGeom = new THREE.SphereGeometry(beanRadius, 64, 48);
    const beanPos = beanGeom.attributes.position;
    const vBean = new THREE.Vector3();

    for (let i = 0; i < beanPos.count; i++) {
      vBean.fromBufferAttribute(beanPos, i);

      // Arabica proportions
      vBean.z *= 0.62;
      vBean.y *= 1.38;

      // Flat planar back
      if (vBean.z < 0) {
        vBean.z *= 0.72;
      }

      // Deep characteristic longitudinal center fissure on front
      if (vBean.z > 0.05) {
        const distFromCenterLine = Math.abs(vBean.x);
        if (distFromCenterLine < 0.38) {
          const depth = (0.38 - distFromCenterLine) * 0.95;
          const sCurve = Math.sin((vBean.y / beanRadius) * Math.PI) * 0.08;
          vBean.z -= depth * Math.cos((vBean.y / 2.2) * Math.PI * 0.5);
          vBean.x += sCurve;
        }
      }

      beanPos.setXYZ(i, vBean.x, vBean.y, vBean.z);
    }
    beanGeom.computeVertexNormals();

    const beanMat = new THREE.MeshPhysicalMaterial({
      color: 0x22150e,
      roughness: 0.5,
      metalness: 0.12,
      clearcoat: 0.38,
      clearcoatRoughness: 0.3,
      reflectivity: 0.7,
    });
    const beanMesh = new THREE.Mesh(beanGeom, beanMat);
    beanMesh.castShadow = true;
    beanGroup.add(beanMesh);

    // Golden Chaff Inlay in the Center Groove
    const chaffGeom = new THREE.PlaneGeometry(0.18, 2.7, 8, 32);
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
      color: 0xecd098,
      metalness: 0.55,
      roughness: 0.35,
      clearcoat: 0.8,
      side: THREE.DoubleSide,
    });
    const chaffMesh = new THREE.Mesh(chaffGeom, chaffMat);
    beanGroup.add(chaffMesh);

    // Orbital Telemetry Rings around the Bean
    const ring1Geom = new THREE.TorusGeometry(2.35, 0.012, 16, 72);
    ring1Geom.rotateX(Math.PI * 0.4);
    ring1Geom.rotateY(Math.PI * 0.15);
    const ring1 = new THREE.Mesh(ring1Geom, orbitRingMat);
    beanGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.65, 0.009, 16, 72);
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
        roughness: 0.2,
        metalness: 0.9,
      });
      const wireMesh = new THREE.Mesh(spec.geom, wireMat);
      g.add(wireMesh);

      const coreMat = new THREE.MeshBasicMaterial({ color: spec.color });
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), coreMat);
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

    // =========================================================================
    // MAIN ANIMATION LOOP
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

      // Seamless scale lerp between Dripper Mode and Bean Mode
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

      // A. Animate Falling Droplets & Surface Ripple
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

      // B. Animate Sloshing Coffee Liquid in Carafe
      if (liquidMeshRef.current) {
        stateRef.current.sloshX *= 0.95;
        stateRef.current.sloshZ *= 0.95;
        liquidMeshRef.current.rotation.z = Math.sin(elapsed * 3) * 0.02 + stateRef.current.sloshX;
        liquidMeshRef.current.rotation.x = Math.cos(elapsed * 3) * 0.02 + stateRef.current.sloshZ;
      }

      // C. Animate Rising Steam Particles
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

      // D. Animate Orbit Tracer
      if (tracerOrbitRef.current) {
        const angle = elapsed * 1.8;
        tracerOrbitRef.current.position.set(
          Math.cos(angle) * 2.1,
          Math.sin(angle * 0.6) * 0.5 - 0.2,
          Math.sin(angle) * 2.1
        );
      }

      // E. Animate Aroma Terpene Nodes
      aromaNodesRef.current.forEach((node, idx) => {
        node.rotation.x += 0.02;
        node.rotation.y += 0.03;
        node.position.y += Math.sin(elapsed * 2 + idx) * 0.003;
      });

      keyLight.position.x = 4 + Math.sin(stateRef.current.currRotY) * 2;

      renderer.render(scene, camera);
    };

    renderLoop();

    // Cleanup
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
      basePlateGeom.dispose();
      basePlateMat.dispose();
      baseRimGeom.dispose();
      brassMat.dispose();
      rodGeom.dispose();
      knobGeom.dispose();
      armGeom.dispose();
      holderRingGeom.dispose();
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
