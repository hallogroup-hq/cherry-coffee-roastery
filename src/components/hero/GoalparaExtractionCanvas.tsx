"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, Thermometer, Droplets, Activity } from "lucide-react";

export type BrewMethod = "pourover" | "chemex" | "aeropress";

export interface BrewConfig {
  id: BrewMethod;
  name: string;
  subtitle: string;
  dose: string;
  water: string;
  ratio: string;
  temp: string;
  tds: string;
  yield: string;
  totalSeconds: number;
  phases: {
    1: { name: string; range: string; compounds: string[]; note: string; color: string; ringColor: string };
    2: { name: string; range: string; compounds: string[]; note: string; color: string; ringColor: string };
    3: { name: string; range: string; compounds: string[]; note: string; color: string; ringColor: string };
  };
}

export const BREW_CONFIGS: Record<BrewMethod, BrewConfig> = {
  pourover: {
    id: "pourover",
    name: "Origami Dripper",
    subtitle: "Slow Pour Ritual · Goalpara Anaerobic",
    dose: "15.0g",
    water: "225ml",
    ratio: "1:15",
    temp: "92.4°C",
    tds: "1.35%",
    yield: "20.4%",
    totalSeconds: 180,
    phases: {
      1: {
        name: "Phase 1 — Bloom & Bright Acids",
        range: "00:00 – 00:45",
        compounds: ["CO₂ Degassing", "Citric Acid (Lemon Zest)", "Malic Acid (Green Apple)", "Jasmine Aromatics"],
        note: "Pelepasan gas karbon dioksida membuka pori seluler biji kopi. Asam buah larut paling cepat, menetapkan kilau kesegaran.",
        color: "#E5B869",
        ringColor: "rgba(229, 184, 105, 0.85)",
      },
      2: {
        name: "Phase 2 — Sweet Spot & Body",
        range: "00:45 – 02:00",
        compounds: ["Sucrose Caramelization", "Wild Honey Notes", "Yellow Peach", "Lipids & Silky Mouthfeel"],
        note: "Jantung ekstraksi slow bar. Gula kompleks dan minyak volatil larut membentuk rasa manis buah batu dan kekentalan tubuh kopi.",
        color: "#C99454",
        ringColor: "rgba(201, 148, 84, 0.95)",
      },
      3: {
        name: "Phase 3 — Clarity & Clean Finish",
        range: "02:00 – 03:00",
        compounds: ["Volatile Terpenes", "Subtle Caffeine Balance", "Delicate Tea-like Finish", "Zero Astringency"],
        note: "Fase pengenceran berimbang. Mengunci kejernihan rasa dan aftertaste teh hitam tanpa menarik tanin pahit yang berlebih.",
        color: "#8C6339",
        ringColor: "rgba(140, 99, 57, 0.75)",
      },
    },
  },
  chemex: {
    id: "chemex",
    name: "Chemex Bonded",
    subtitle: "Triple-Filter Clarity · Clean Profile",
    dose: "20.0g",
    water: "320ml",
    ratio: "1:16",
    temp: "94.0°C",
    tds: "1.22%",
    yield: "19.8%",
    totalSeconds: 240,
    phases: {
      1: {
        name: "Phase 1 — Heavy Paper Bloom",
        range: "00:00 – 01:00",
        compounds: ["Pectin Dissolution", "Floral Monoterpenes", "Phosphoric Crispness"],
        note: "Filter tebal menahan minyak kasar, membiarkan asam bunga murni meluncur dengan kejernihan seperti teh.",
        color: "#E5B869",
        ringColor: "rgba(229, 184, 105, 0.85)",
      },
      2: {
        name: "Phase 2 — Long Sweet Column",
        range: "01:00 – 02:45",
        compounds: ["Cane Sugar", "Apricot Sweetness", "Clean Amber Body"],
        note: "Aliran laminar kolom panjang memaksimalkan difusi gula tanpa sedimentasi mikroskopis.",
        color: "#C99454",
        ringColor: "rgba(201, 148, 84, 0.95)",
      },
      3: {
        name: "Phase 3 — Ultra Clean Finish",
        range: "02:45 – 04:00",
        compounds: ["Light Esters", "Crystalline Finish"],
        note: "Hasil akhir tanpa endapan, menonjolkan profil aroma buah batu Goalpara yang jernih.",
        color: "#8C6339",
        ringColor: "rgba(140, 99, 57, 0.75)",
      },
    },
  },
  aeropress: {
    id: "aeropress",
    name: "Aeropress Lab",
    subtitle: "Inverted Full Contact · Concentrated Cup",
    dose: "18.0g",
    water: "200ml",
    ratio: "1:11",
    temp: "88.0°C",
    tds: "1.65%",
    yield: "21.2%",
    totalSeconds: 120,
    phases: {
      1: {
        name: "Phase 1 — Full Immersion Bloom",
        range: "00:00 – 00:30",
        compounds: ["Intense Volatiles", "Rapid Acidity Bloom", "Emulsified Crema"],
        note: "Semua bubuk terendam sempurna, pelepasan instan aroma buah tropis dan bunga melati.",
        color: "#E5B869",
        ringColor: "rgba(229, 184, 105, 0.85)",
      },
      2: {
        name: "Phase 2 — Thermal Stir & Steep",
        range: "00:30 – 01:15",
        compounds: ["Dark Caramel", "Syrupy Mouthfeel", "Spicy Aromas"],
        note: "Maserasi cepat menghasilkan body tebal dengan kadar gula pekat.",
        color: "#C99454",
        ringColor: "rgba(201, 148, 84, 0.95)",
      },
      3: {
        name: "Phase 3 — Pneumatic Plunge",
        range: "01:15 – 02:00",
        compounds: ["Even Pressure Bed", "Rich Lingering Cocoa Finish"],
        note: "Dorongan udara halus menuntaskan ekstraksi tanpa merusak kelembutan rasa.",
        color: "#8C6339",
        ringColor: "rgba(140, 99, 57, 0.75)",
      },
    },
  },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface GoalparaExtractionCanvasProps {
  onTimeUpdate?: (seconds: number, phase: 1 | 2 | 3) => void;
}

export default function GoalparaExtractionCanvas({ onTimeUpdate }: GoalparaExtractionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [brewMethod, setBrewMethod] = useState<BrewMethod>("pourover");
  const [seconds, setSeconds] = useState(38); // Starts during bloom/phase 1
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredPhase, setHoveredPhase] = useState<1 | 2 | 3 | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<1 | 2 | 3>(1);
  const [showTemp, setShowTemp] = useState(true);
  const [showParticles, setShowParticles] = useState(true);

  const config = BREW_CONFIGS[brewMethod];

  // Determine active phase from seconds
  const currentPhase: 1 | 2 | 3 =
    seconds < config.totalSeconds * 0.25
      ? 1
      : seconds < config.totalSeconds * 0.65
      ? 2
      : 3;

  // Notify parent on update
  useEffect(() => {
    onTimeUpdate?.(seconds, currentPhase);
  }, [seconds, currentPhase, onTimeUpdate]);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= config.totalSeconds) {
          return 0; // loop
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, config.totalSeconds]);

  // Particles array
  const particlesRef = useRef<Particle[]>([]);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = (time: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Background clear
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.42;
      const maxR = Math.min(width, height) * 0.35;

      const p1R = maxR * 0.42;
      const p2R = maxR * 0.72;
      const p3R = maxR * 1.0;

      // 1. Temperature Isothermal Contours (if enabled)
      if (showTemp) {
        const contours = [
          { r: maxR * 1.15, label: "92.4°C WATER", alpha: 0.18 },
          { r: maxR * 0.85, label: "90.0°C SLURRY", alpha: 0.12 },
          { r: maxR * 0.55, label: "86.5°C EXTRACTION", alpha: 0.08 },
        ];

        contours.forEach((c) => {
          ctx.beginPath();
          ctx.arc(cx, cy, c.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(201, 148, 84, ${c.alpha})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Contour label
          ctx.font = "500 9px 'Space Mono', monospace";
          ctx.fillStyle = `rgba(201, 148, 84, ${c.alpha * 2.2})`;
          ctx.textAlign = "left";
          ctx.fillText(c.label, cx + c.r + 6, cy - 2);
        });
      }

      // 2. Annular Phase Rings
      const phases = [
        { phase: 1 as const, innerR: maxR * 0.16, outerR: p1R, color: config.phases[1].color },
        { phase: 2 as const, innerR: p1R, outerR: p2R, color: config.phases[2].color },
        { phase: 3 as const, innerR: p2R, outerR: p3R, color: config.phases[3].color },
      ];

      const activeTargetPhase = hoveredPhase || currentPhase;

      phases.forEach(({ phase, innerR, outerR }) => {
        const isActive = activeTargetPhase === phase;
        const isPast = currentPhase >= phase;

        const baseAlpha = isActive ? 0.38 : isPast ? 0.20 : 0.08;
        const ringGlow = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);

        if (phase === 1) {
          ringGlow.addColorStop(0, `rgba(229, 184, 105, ${baseAlpha * 1.4})`);
          ringGlow.addColorStop(1, `rgba(229, 184, 105, ${baseAlpha * 0.4})`);
        } else if (phase === 2) {
          ringGlow.addColorStop(0, `rgba(201, 148, 84, ${baseAlpha * 1.2})`);
          ringGlow.addColorStop(1, `rgba(201, 148, 84, ${baseAlpha * 0.5})`);
        } else {
          ringGlow.addColorStop(0, `rgba(140, 99, 57, ${baseAlpha * 1.2})`);
          ringGlow.addColorStop(1, `rgba(140, 99, 57, ${baseAlpha * 0.3})`);
        }

        ctx.beginPath();
        ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
        ctx.arc(cx, cy, innerR, Math.PI * 2, 0, true);
        ctx.fillStyle = ringGlow;
        ctx.fill();

        // Ring outer perimeter line
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
        ctx.strokeStyle = isActive
          ? "rgba(216, 168, 110, 0.9)"
          : `rgba(216, 168, 110, ${isPast ? 0.3 : 0.12})`;
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.stroke();

        // Animated pulse ring if active
        if (isActive) {
          const pulseR = innerR + ((time * 0.04) % (outerR - innerR));
          ctx.beginPath();
          ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(229, 184, 105, 0.25)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // 3. Center Puck (Ground Coffee Bed)
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.16, 0, Math.PI * 2);
      const puckGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.16);
      puckGrad.addColorStop(0, "#2D2218");
      puckGrad.addColorStop(0.8, "#1A1510");
      puckGrad.addColorStop(1, "#0E0D0C");
      ctx.fillStyle = puckGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(201, 148, 84, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Puck Core icon / text
      ctx.font = "600 9px 'Space Mono', monospace";
      ctx.fillStyle = "#D8A86E";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("BED 15g", cx, cy - 4);
      ctx.font = "400 8px 'Space Mono', monospace";
      ctx.fillStyle = "rgba(220, 213, 200, 0.7)";
      ctx.fillText("GOALPARA", cx, cy + 6);

      // 4. Waterfall Extraction Stream & Particle Physics
      if (showParticles) {
        // Spawn new particles from center bottom
        if (Math.random() < 0.6) {
          const spawnAngle = Math.PI * 0.5 + (Math.random() - 0.5) * 0.4;
          const speed = 1.2 + Math.random() * 1.5;
          particlesRef.current.push({
            x: cx + (Math.random() - 0.5) * 12,
            y: cy + maxR * 0.14,
            vx: Math.cos(spawnAngle) * speed * 0.3,
            vy: Math.sin(spawnAngle) * speed + 1.0,
            alpha: 0.9,
            life: 0,
            maxLife: 50 + Math.random() * 40,
            size: 1.2 + Math.random() * 1.8,
            color: currentPhase === 1 ? "#FFD580" : currentPhase === 2 ? "#C99454" : "#8C6339",
          });
        }

        // Draw and update particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life++;
          p.alpha = 1 - p.life / p.maxLife;

          if (p.life >= p.maxLife || p.y > height - 10) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.75;
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // Fluid Stream Silhouette
        const streamTopY = cy + maxR * 0.14;
        const streamBottomY = height * 0.88;
        const streamWidth = 8 + Math.sin(time * 0.005) * 2;

        const streamGrad = ctx.createLinearGradient(cx, streamTopY, cx, streamBottomY);
        streamGrad.addColorStop(0, "rgba(201, 148, 84, 0.45)");
        streamGrad.addColorStop(0.5, "rgba(216, 168, 110, 0.7)");
        streamGrad.addColorStop(1, "rgba(140, 99, 57, 0.2)");

        ctx.beginPath();
        ctx.moveTo(cx - 3, streamTopY);
        ctx.quadraticCurveTo(cx - streamWidth, (streamTopY + streamBottomY) / 2, cx - 1, streamBottomY);
        ctx.lineTo(cx + 1, streamBottomY);
        ctx.quadraticCurveTo(cx + streamWidth, (streamTopY + streamBottomY) / 2, cx + 3, streamTopY);
        ctx.closePath();
        ctx.fillStyle = streamGrad;
        ctx.fill();
      }

      // 5. Phase Labels & Tick Markers
      const labelData = [
        { phase: 1, r: (maxR * 0.16 + p1R) / 2, name: "PHASE 1", sub: "Bloom & Acids" },
        { phase: 2, r: (p1R + p2R) / 2, name: "PHASE 2", sub: "Sweet Spot" },
        { phase: 3, r: (p2R + p3R) / 2, name: "PHASE 3", sub: "Clarity & Finish" },
      ];

      const labelAngle = -Math.PI * 0.22; // 2 o'clock

      labelData.forEach((ld) => {
        const lx = cx + Math.cos(labelAngle) * ld.r;
        const ly = cy + Math.sin(labelAngle) * ld.r;
        const isHovered = activeTargetPhase === ld.phase;

        ctx.font = "600 10px 'Space Mono', monospace";
        ctx.fillStyle = isHovered ? "#F7F5F0" : "rgba(220, 213, 200, 0.6)";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(ld.name, lx + 12, ly - 6);

        ctx.font = "400 9px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = isHovered ? "#C99454" : "rgba(166, 158, 144, 0.5)";
        ctx.fillText(ld.sub, lx + 12, ly + 6);

        // Dot connector
        ctx.beginPath();
        ctx.arc(lx, ly, isHovered ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#C99454" : "rgba(216, 168, 110, 0.4)";
        ctx.fill();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [brewMethod, currentPhase, hoveredPhase, showTemp, showParticles, config]);

  // Mouse hover detection on rings
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const cx = rect.width / 2;
      const cy = rect.height * 0.42;
      const maxR = Math.min(rect.width, rect.height) * 0.35;

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const p1R = maxR * 0.42;
      const p2R = maxR * 0.72;
      const p3R = maxR * 1.0;

      if (dist >= maxR * 0.16 && dist < p1R) {
        setHoveredPhase(1);
      } else if (dist >= p1R && dist < p2R) {
        setHoveredPhase(2);
      } else if (dist >= p2R && dist <= p3R * 1.1) {
        setHoveredPhase(3);
      } else {
        setHoveredPhase(null);
      }
    },
    []
  );

  const handleMouseLeave = () => {
    setHoveredPhase(null);
  };

  const activePhaseInfo = config.phases[hoveredPhase || selectedPhase || currentPhase];

  const formatMinutes = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#0E0D0C] border border-[#D8A86E]/20 shadow-2xl relative flex flex-col overflow-hidden text-[#F5F2EB]"
    >
      {/* 1. Header Bar with Method Selectors */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#141311]/90 gap-3">
        <div className="flex items-center space-x-3">
          <Activity className="w-4 h-4 text-[#C99454] animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-[#C99454] font-bold">
            Goalpara Extraction Anatomy
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-[11px] font-mono text-[#8C8375]">
            Scientific Slow-Bar Model
          </span>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex items-center space-x-1 p-0.5 bg-black/40 border border-white/10">
          {(["pourover", "chemex", "aeropress"] as BrewMethod[]).map((m) => {
            const isActive = brewMethod === m;
            return (
              <button
                key={m}
                onClick={() => {
                  setBrewMethod(m);
                  setSeconds(0);
                }}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-[#C99454] text-[#0E0D0C] font-bold"
                    : "text-[#8C8375] hover:text-white"
                }`}
              >
                {BREW_CONFIGS[m].name.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Canvas Area */}
      <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            if (hoveredPhase) setSelectedPhase(hoveredPhase);
          }}
          className="w-full h-full cursor-crosshair block"
        />

        {/* Dynamic Floating HUD: Compounds Active in Current / Hovered Phase */}
        <div className="absolute top-4 left-4 sm:left-6 max-w-[240px] pointer-events-none space-y-1 p-3 bg-[#141311]/85 border border-[#D8A86E]/20 backdrop-blur-md">
          <span className="text-[9px] font-mono text-[#C99454] uppercase tracking-wider block">
            {activePhaseInfo.range}
          </span>
          <h4 className="text-xs font-serif font-bold italic text-[#F7F5F0]">
            {activePhaseInfo.name}
          </h4>
          <div className="space-y-0.5 pt-1">
            {activePhaseInfo.compounds.slice(0, 3).map((cmp, idx) => (
              <div key={idx} className="flex items-center text-[10px] font-mono text-[#B5ABA0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99454] mr-1.5 opacity-80" />
                <span className="truncate">{cmp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas Layer Toggles (Top-Right) */}
        <div className="absolute top-4 right-4 sm:right-6 flex flex-col sm:flex-row gap-1.5">
          <button
            onClick={() => setShowTemp(!showTemp)}
            className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider border transition-colors flex items-center gap-1 ${
              showTemp
                ? "border-[#C99454] bg-[#C99454]/15 text-[#D8A86E]"
                : "border-white/10 bg-[#141311]/80 text-[#8C8375] hover:text-white"
            }`}
          >
            <Thermometer className="w-2.5 h-2.5" />
            <span>Thermal {config.temp}</span>
          </button>
          <button
            onClick={() => setShowParticles(!showParticles)}
            className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider border transition-colors flex items-center gap-1 ${
              showParticles
                ? "border-[#C99454] bg-[#C99454]/15 text-[#D8A86E]"
                : "border-white/10 bg-[#141311]/80 text-[#8C8375] hover:text-white"
            }`}
          >
            <Droplets className="w-2.5 h-2.5" />
            <span>Fluid Stream</span>
          </button>
        </div>
      </div>

      {/* 3. Interactive Chronograph Scrubber & Playback Controls */}
      <div className="px-4 sm:px-6 py-3 bg-[#141311] border-t border-white/10 space-y-3">
        {/* Scrubber Track with Phase Dividers */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8375]">
            <div className="flex items-center gap-2">
              <span className="text-[#C99454] font-bold">
                {formatMinutes(seconds)}
              </span>
              <span className="text-white/20">/</span>
              <span>{formatMinutes(config.totalSeconds)}</span>
            </div>
            <span className="uppercase text-[#A69E90] tracking-wider">
              {currentPhase === 1 ? "Bloom / Acidity" : currentPhase === 2 ? "Sugar Development" : "Finish Clarity"}
            </span>
          </div>

          {/* Range Slider */}
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max={config.totalSeconds}
              value={seconds}
              onChange={(e) => {
                setSeconds(parseInt(e.target.value));
              }}
              className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-[#C99454] focus:outline-none"
            />
          </div>
        </div>

        {/* Control Buttons & Telemetry Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Play/Pause & Reset */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Pause" : "Start"}</span>
            </button>
            <button
              onClick={() => setSeconds(0)}
              className="p-1.5 border border-white/15 hover:border-white/30 text-[#8C8375] hover:text-white transition-colors"
              title="Reset Timeline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Telemetry Numbers */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-[9px] text-[#8C8375] uppercase block">TDS</span>
              <span className="font-bold text-[#F7F5F0]">{config.tds}</span>
            </div>
            <div className="border-l border-white/10 pl-3">
              <span className="text-[9px] text-[#8C8375] uppercase block">Yield</span>
              <span className="font-bold text-[#D8A86E]">{config.yield}</span>
            </div>
            <div className="border-l border-white/10 pl-3">
              <span className="text-[9px] text-[#8C8375] uppercase block">Ratio</span>
              <span className="font-bold text-[#F7F5F0]">{config.ratio}</span>
            </div>
            <div className="border-l border-white/10 pl-3 hidden sm:block">
              <span className="text-[9px] text-[#8C8375] uppercase block">Dose</span>
              <span className="font-bold text-[#C99454]">{config.dose}</span>
            </div>
          </div>
        </div>

        {/* Active Phase Note Callout */}
        <div className="pt-2 border-t border-white/5 text-[11px] font-sans text-[#A69E90] italic">
          &ldquo;{activePhaseInfo.note}&rdquo;
        </div>
      </div>
    </div>
  );
}
