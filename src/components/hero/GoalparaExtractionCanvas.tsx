"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, Thermometer, Droplets, Activity, Sparkles } from "lucide-react";

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
        color: "#BFA15F",
        ringColor: "rgba(191, 161, 95, 0.85)",
      },
      2: {
        name: "Phase 2 — Sweet Spot & Body",
        range: "00:45 – 02:00",
        compounds: ["Sucrose Caramelization", "Wild Honey Notes", "Yellow Peach", "Lipids & Silky Mouthfeel"],
        note: "Jantung ekstraksi slow bar. Gula kompleks dan minyak volatil larut membentuk rasa manis buah batu dan kekentalan tubuh kopi.",
        color: "#8C6E2E",
        ringColor: "rgba(140, 110, 46, 0.95)",
      },
      3: {
        name: "Phase 3 — Clarity & Clean Finish",
        range: "02:00 – 03:00",
        compounds: ["Volatile Terpenes", "Subtle Caffeine Balance", "Delicate Tea-like Finish", "Zero Astringency"],
        note: "Fase pengenceran berimbang. Mengunci kejernihan rasa dan aftertaste teh hitam tanpa menarik tanin pahit yang berlebih.",
        color: "#721C24",
        ringColor: "rgba(114, 28, 36, 0.85)",
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
        color: "#BFA15F",
        ringColor: "rgba(191, 161, 95, 0.85)",
      },
      2: {
        name: "Phase 2 — Long Sweet Column",
        range: "01:00 – 02:45",
        compounds: ["Cane Sugar", "Apricot Sweetness", "Clean Amber Body"],
        note: "Aliran laminar kolom panjang memaksimalkan difusi gula tanpa sedimentasi mikroskopis.",
        color: "#8C6E2E",
        ringColor: "rgba(140, 110, 46, 0.95)",
      },
      3: {
        name: "Phase 3 — Ultra Clean Finish",
        range: "02:45 – 04:00",
        compounds: ["Light Esters", "Crystalline Finish"],
        note: "Hasil akhir tanpa endapan, menonjolkan profil aroma buah batu Goalpara yang jernih.",
        color: "#721C24",
        ringColor: "rgba(114, 28, 36, 0.85)",
      },
    },
  },
  aeropress: {
    id: "aeropress",
    name: "AeroPress Immersion",
    subtitle: "Full Contact Immersion & Pressure Extraction",
    dose: "18.0g",
    water: "200ml",
    ratio: "1:11",
    temp: "88.0°C",
    tds: "1.65%",
    yield: "21.2%",
    totalSeconds: 120,
    phases: {
      1: {
        name: "Phase 1 — Rapid Dissolution",
        range: "00:00 – 00:30",
        compounds: ["Quick Organic Acids", "Aroma Burst", "Initial Caffeine Surge"],
        note: "Perendaman total mengekstraksi komponen polar tercepat dalam waktu singkat.",
        color: "#BFA15F",
        ringColor: "rgba(191, 161, 95, 0.85)",
      },
      2: {
        name: "Phase 2 — Steep Agitation",
        range: "00:30 – 01:10",
        compounds: ["Full Lipid Suspension", "Dense Viscosity", "Dark Honey"],
        note: "Agitasi mekanikal memecah lapisan selulosa mikroskopis, memperkaya tekstur cairan.",
        color: "#8C6E2E",
        ringColor: "rgba(140, 110, 46, 0.95)",
      },
      3: {
        name: "Phase 3 — Pressure Plunge (0.5 Bar)",
        range: "01:10 – 02:00",
        compounds: ["Emulsified Colloids", "Rich Velvety Body"],
        note: "Tekanan udara lembut mendorong minyak esensial melalui kertas mikro.",
        color: "#721C24",
        ringColor: "rgba(114, 28, 36, 0.85)",
      },
    },
  },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  compound: string;
}

interface GoalparaExtractionCanvasProps {
  onTimeUpdate?: (seconds: number, phase: 1 | 2 | 3) => void;
}

export default function GoalparaExtractionCanvas({ onTimeUpdate }: GoalparaExtractionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [brewMethod, setBrewMethod] = useState<BrewMethod>("pourover");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(35);
  const [hoveredPhase, setHoveredPhase] = useState<1 | 2 | 3 | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<1 | 2 | 3 | null>(null);
  const [showTemp, setShowTemp] = useState<boolean>(true);
  const [showParticles, setShowParticles] = useState<boolean>(true);

  const config = BREW_CONFIGS[brewMethod];

  // Determine current phase based on seconds
  const currentPhase: 1 | 2 | 3 = (() => {
    if (brewMethod === "pourover") {
      if (seconds <= 45) return 1;
      if (seconds <= 120) return 2;
      return 3;
    } else if (brewMethod === "chemex") {
      if (seconds <= 60) return 1;
      if (seconds <= 165) return 2;
      return 3;
    } else {
      if (seconds <= 30) return 1;
      if (seconds <= 70) return 2;
      return 3;
    }
  })();

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

      // Clean transparent background (integrates with parchment)
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.42;
      const maxR = Math.min(width, height) * 0.35;

      const p1R = maxR * 0.42;
      const p2R = maxR * 0.72;
      const p3R = maxR * 1.0;

      // 1. Temperature Isothermal Contours
      if (showTemp) {
        const contours = [
          { r: maxR * 1.15, label: "92.4°C WATER", alpha: 0.22 },
          { r: maxR * 0.85, label: "90.0°C SLURRY", alpha: 0.16 },
          { r: maxR * 0.55, label: "86.5°C EXTRACTION", alpha: 0.12 },
        ];

        contours.forEach((c) => {
          ctx.beginPath();
          ctx.arc(cx, cy, c.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(140, 110, 46, ${c.alpha})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Contour label
          ctx.font = "500 9px 'Space Mono', monospace";
          ctx.fillStyle = `rgba(140, 110, 46, ${c.alpha * 3})`;
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

        const baseAlpha = isActive ? 0.42 : isPast ? 0.22 : 0.08;
        const ringGlow = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);

        if (phase === 1) {
          ringGlow.addColorStop(0, `rgba(191, 161, 95, ${baseAlpha * 1.4})`);
          ringGlow.addColorStop(1, `rgba(191, 161, 95, ${baseAlpha * 0.4})`);
        } else if (phase === 2) {
          ringGlow.addColorStop(0, `rgba(140, 110, 46, ${baseAlpha * 1.2})`);
          ringGlow.addColorStop(1, `rgba(140, 110, 46, ${baseAlpha * 0.5})`);
        } else {
          ringGlow.addColorStop(0, `rgba(114, 28, 36, ${baseAlpha * 1.2})`);
          ringGlow.addColorStop(1, `rgba(114, 28, 36, ${baseAlpha * 0.3})`);
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
          ? "rgba(114, 28, 36, 0.9)"
          : `rgba(140, 110, 46, ${isPast ? 0.4 : 0.15})`;
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.stroke();

        // Animated pulse ring if active
        if (isActive) {
          const pulseR = innerR + ((time * 0.04) % (outerR - innerR));
          ctx.beginPath();
          ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(191, 161, 95, 0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // 3. Center Puck (Ground Coffee Bed)
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.16, 0, Math.PI * 2);
      const puckGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.16);
      puckGrad.addColorStop(0, "#3D3023");
      puckGrad.addColorStop(0.8, "#251E17");
      puckGrad.addColorStop(1, "#181410");
      ctx.fillStyle = puckGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(191, 161, 95, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center bed text
      ctx.font = "bold 9px 'Space Mono', monospace";
      ctx.fillStyle = "#FAF8F5";
      ctx.textAlign = "center";
      ctx.fillText(config.dose, cx, cy - 2);
      ctx.font = "8px 'Space Mono', monospace";
      ctx.fillStyle = "#BFA15F";
      ctx.fillText("BED", cx, cy + 9);

      // 4. Particle Waterfall Dissolution
      if (showParticles) {
        if (particlesRef.current.length < 50 && Math.random() < 0.6) {
          const angle = Math.random() * Math.PI * 2;
          const spawnR = maxR * (0.16 + Math.random() * 0.7);
          const currentPhaseColor = config.phases[currentPhase].color;
          const compounds = config.phases[currentPhase].compounds;

          particlesRef.current.push({
            x: cx + Math.cos(angle) * spawnR,
            y: cy + Math.sin(angle) * spawnR,
            vx: (Math.random() - 0.5) * 0.4,
            vy: 0.8 + Math.random() * 1.4,
            radius: 1.2 + Math.random() * 1.6,
            alpha: 0.8,
            color: currentPhaseColor,
            compound: compounds[Math.floor(Math.random() * compounds.length)],
          });
        }

        particlesRef.current.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.008;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          if (p.alpha <= 0 || p.y > height) {
            particlesRef.current.splice(idx, 1);
          }
        });
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [brewMethod, currentPhase, hoveredPhase, showTemp, showParticles, config]);

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
      className="w-full bg-[#FAF8F5] border border-[#BFA15F]/40 shadow-sm relative flex flex-col overflow-hidden text-[#181715]"
    >
      {/* 1. Header Bar with Method Selectors */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-[#181715]/10 bg-[#EFECE4] gap-3">
        <div className="flex items-center space-x-3">
          <Activity className="w-4 h-4 text-[#721C24] animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-[#721C24] font-bold">
            Anatomie d&apos;Extraction Goalpara
          </span>
          <span className="hidden sm:inline text-[#181715]/20">|</span>
          <span className="hidden sm:inline text-[11px] font-mono text-[#7A7265]">
            Modèle Scientifique de Dissolution
          </span>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex items-center space-x-1 p-0.5 bg-[#FAF8F5] border border-[#181715]/15">
          {(["pourover", "chemex", "aeropress"] as BrewMethod[]).map((m) => {
            const isActive = brewMethod === m;
            return (
              <button
                key={m}
                onClick={() => {
                  setBrewMethod(m);
                  setSeconds(0);
                }}
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-[#721C24] text-white font-bold"
                    : "text-[#595349] hover:text-[#181715]"
                }`}
              >
                {BREW_CONFIGS[m].name.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Canvas Area */}
      <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center bg-[#F7F4EE]">
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
        <div className="absolute top-4 left-4 sm:left-6 max-w-[240px] pointer-events-none space-y-1 p-3 bg-[#FAF8F5]/95 border border-[#BFA15F] shadow-sm">
          <span className="text-[9px] font-mono text-[#721C24] uppercase tracking-wider block font-bold">
            {activePhaseInfo.range}
          </span>
          <h4 className="text-xs font-serif font-bold italic text-[#181715]">
            {activePhaseInfo.name}
          </h4>
          <div className="space-y-0.5 pt-1">
            {activePhaseInfo.compounds.slice(0, 3).map((cmp, idx) => (
              <div key={idx} className="flex items-center text-[10px] font-mono text-[#595349]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C6E2E] mr-1.5 opacity-80" />
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
                ? "border-[#721C24] bg-[#721C24]/10 text-[#721C24] font-bold"
                : "border-[#181715]/15 bg-[#FAF8F5]/90 text-[#7A7265] hover:text-[#181715]"
            }`}
          >
            <Thermometer className="w-2.5 h-2.5" />
            <span>Thermal {config.temp}</span>
          </button>
          <button
            onClick={() => setShowParticles(!showParticles)}
            className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider border transition-colors flex items-center gap-1 ${
              showParticles
                ? "border-[#721C24] bg-[#721C24]/10 text-[#721C24] font-bold"
                : "border-[#181715]/15 bg-[#FAF8F5]/90 text-[#7A7265] hover:text-[#181715]"
            }`}
          >
            <Droplets className="w-2.5 h-2.5" />
            <span>Fluide</span>
          </button>
        </div>
      </div>

      {/* 3. Interactive Chronograph Scrubber & Playback Controls */}
      <div className="px-4 sm:px-6 py-3 bg-[#FAF8F5] border-t border-[#181715]/10 space-y-3">
        {/* Scrubber Track with Phase Dividers */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#7A7265]">
            <div className="flex items-center gap-2">
              <span className="text-[#721C24] font-bold">
                {formatMinutes(seconds)}
              </span>
              <span className="text-[#181715]/30">/</span>
              <span>{formatMinutes(config.totalSeconds)}</span>
            </div>
            <span className="uppercase text-[#8C6E2E] font-bold tracking-wider">
              {currentPhase === 1 ? "Bloom & Acidité" : currentPhase === 2 ? "Développement des Sucres" : "Clarté & Finale"}
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
              className="w-full h-1 bg-[#EFECE4] rounded-none appearance-none cursor-pointer accent-[#721C24] focus:outline-none"
            />
          </div>
        </div>

        {/* Control Buttons & Telemetry Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Play/Pause & Reset */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 bg-[#721C24] hover:bg-[#8A222B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 shadow-xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Pause" : "Start"}</span>
            </button>
            <button
              onClick={() => setSeconds(0)}
              className="p-1.5 border border-[#181715]/15 hover:border-[#721C24] text-[#595349] hover:text-[#721C24] transition-colors"
              title="Reset Linimasa"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Telemetry Numbers */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-[9px] text-[#7A7265] uppercase block">TDS</span>
              <span className="font-bold text-[#181715]">{config.tds}</span>
            </div>
            <div className="border-l border-[#181715]/10 pl-3">
              <span className="text-[9px] text-[#7A7265] uppercase block">Rendement</span>
              <span className="font-bold text-[#8C6E2E]">{config.yield}</span>
            </div>
            <div className="border-l border-[#181715]/10 pl-3">
              <span className="text-[9px] text-[#7A7265] uppercase block">Ratio</span>
              <span className="font-bold text-[#181715]">{config.ratio}</span>
            </div>
            <div className="border-l border-[#181715]/10 pl-3 hidden sm:block">
              <span className="text-[9px] text-[#7A7265] uppercase block">Gramasi</span>
              <span className="font-bold text-[#721C24]">{config.dose}</span>
            </div>
          </div>
        </div>

        {/* Active Phase Note Callout */}
        <div className="pt-2 border-t border-[#181715]/10 text-[11px] font-serif italic text-[#595349]">
          &ldquo;{activePhaseInfo.note}&rdquo;
        </div>
      </div>
    </div>
  );
}
