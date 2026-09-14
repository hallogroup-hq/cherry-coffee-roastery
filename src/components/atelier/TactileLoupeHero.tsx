"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mountain,
  Compass,
  ArrowRight,
  Maximize2,
  Crosshair,
  Sliders,
  Activity,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StageData {
  id: number;
  label: string;
  subLabel: string;
  image: string;
  elevation: string;
  metric: string;
  metricLabel: string;
  notes: string[];
  quote: string;
  colorHex: string;
}

const TERROIR_STAGES: StageData[] = [
  {
    id: 0,
    label: "Fresh Harvest Cherry",
    subLabel: "Goalpara Terroir · 1.250 mdpl",
    image: "/assets/terroir/stage-0-cherry.jpg",
    elevation: "1.250 MASL",
    metric: "22.4°",
    metricLabel: "Brix Sugar Density",
    notes: ["Volcanic Loam Soil", "Morning Mountain Dew", "Hand-Picked Ripe Red"],
    quote: "Dipetik selektif hanya saat ceri merah merekah sempurna di lereng Gunung Gede Pangrango.",
    colorHex: "#931A25",
  },
  {
    id: 1,
    label: "Honey Mucilage & Ferment",
    subLabel: "Controlled Anaerobic Vault",
    image: "/assets/terroir/stage-1-mucilage.jpg",
    elevation: "72 Jam",
    metric: "3.8 pH",
    metricLabel: "Acidity Equilibrium",
    notes: ["Pectin Retention", "Wild Mountain Yeast", "Slow Maceration"],
    quote: "Fermentasi anaerobik lambat menjaga getah manis pektin untuk profil aroma floral dan stone fruit.",
    colorHex: "#D4A054",
  },
  {
    id: 2,
    label: "Lab-Graded Green Bean",
    subLabel: "Density & Moisture Inspection",
    image: "/assets/terroir/stage-2-green.jpg",
    elevation: "Screen 16-18",
    metric: "10.8%",
    metricLabel: "Water Activity / Moisture",
    notes: ["Defect Count 0%", "Strict Density Sort", "Specialty Grade 1"],
    quote: "Penyortiran fisik berulang memastikan kepadatan seluler biji siap menerima panas sangrai presisi.",
    colorHex: "#7C8C69",
  },
  {
    id: 3,
    label: "Artisan Specialty Roast",
    subLabel: "CCR Profiling · Drop 208°C",
    image: "/assets/terroir/stage-3-roasted.jpg",
    elevation: "RoR 7.2°C/min",
    metric: "Agtron 62.4",
    metricLabel: "Specialty Color Index",
    notes: ["Golden Chaff Retention", "First Crack + 1:45", "Aromatic Lipids"],
    quote: "Kopi disajikan untuk mereka yang tidak tergesa-gesa. Profil sangrai menonjolkan keaslian terroir.",
    colorHex: "#C99454",
  },
];

export default function TactileLoupeHero() {
  const { t } = useLanguage();
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const activeStage = TERROIR_STAGES[activeStageIdx];

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loupePos, setLoupePos] = useState({ x: 0, y: 0, percentX: 50, percentY: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Handle cursor move across image container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setMousePos({ x, y });
    setLoupePos({ x, y, percentX, percentY });

    // Subtle 3D tilt calculation (-8deg to +8deg)
    const tiltX = -((y / rect.height) - 0.5) * 12;
    const tiltY = ((x / rect.width) - 0.5) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambience / Subtle Terroir Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 opacity-25"
        style={{ backgroundColor: activeStage.colorHex }}
      />

      {/* Floating Mountain Dust Particles (Pure CSS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <div className="absolute w-1 h-1 bg-[#D8A86E] rounded-full top-1/4 left-1/6 animate-pulse" />
        <div className="absolute w-1.5 h-1.5 bg-[#FFF7ED] rounded-full top-1/3 right-1/4 animate-ping duration-1000" />
        <div className="absolute w-1 h-1 bg-[#C99454] rounded-full bottom-1/3 left-1/3 animate-pulse" />
      </div>

      {/* 1. Header Badges & Editorial Subtext */}
      <div className="relative z-10 text-center space-y-4 max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#1C1A17]/80 backdrop-blur-md border border-[#D8A86E]/20 text-[#C99454] text-xs font-mono-data tracking-widest uppercase shadow-lg">
          <Mountain className="w-3.5 h-3.5 text-[#C99454]" />
          <span>Goalpara Estate Camp · 1.250 mdpl · Roastery Laboratory</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-bold text-white tracking-tight leading-[1.1]">
          Menyeduh Perlahan, <br />
          <span className="italic font-normal text-[#E6D9C8]/90">
            Merawat Keaslian Terroir.
          </span>
        </h1>

        <p className="text-base sm:text-lg font-sans text-[#B0A799] max-w-2xl mx-auto leading-relaxed">
          Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Kopi disajikan untuk mereka yang tidak tergesa-gesa di kaki Gunung Gede Pangrango.
        </p>
      </div>

      {/* 2. Flagship Centerpiece: The Tactile Atelier & Interactive Loupe */}
      <div className="relative z-10 my-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Telemetry Card */}
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
          <div className="p-6 rounded-2xl bg-[#151412]/85 backdrop-blur-md border border-[#D8A86E]/20 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-mono-data text-[#8C827A] uppercase tracking-wider">
              <span>Telemetry HUD</span>
              <Activity className="w-3.5 h-3.5 text-[#C99454] animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono-data text-[#A09589]">Primary Metric</span>
              <div className="text-3xl font-editorial font-bold text-[#F4EDE4]">
                {activeStage.metric}
              </div>
              <p className="text-xs font-mono-data text-[#C99454]">{activeStage.metricLabel}</p>
            </div>

            <div className="border-t border-[#D8A86E]/15 pt-4 space-y-2">
              <span className="text-[11px] font-mono-data text-[#8C827A] uppercase tracking-wider">
                Elevation / Cycle
              </span>
              <p className="text-sm font-sans font-medium text-white">{activeStage.elevation}</p>
            </div>

            <div className="border-t border-[#D8A86E]/15 pt-4 space-y-2">
              <span className="text-[11px] font-mono-data text-[#8C827A] uppercase tracking-wider">
                Laboratory Hallmarks
              </span>
              <ul className="space-y-1.5">
                {activeStage.notes.map((note, i) => (
                  <li key={i} className="flex items-center space-x-2 text-xs font-sans text-[#DCD5C8]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C99454]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Center: The Tactile Optical Frame */}
        <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovered ? "none" : "transform 0.5s ease-out",
            }}
            className="relative w-full max-w-[460px] aspect-square rounded-3xl overflow-hidden cursor-crosshair border border-[#D8A86E]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] group select-none bg-[#0D0C0A]"
          >
            {/* Active Stage High-Res Macro Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={activeStage.image}
                  alt={activeStage.label}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 460px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle Vignette & Frame Glare */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Interactive Optical Loupe / Magnifying Glass */}
            {isHovered && (
              <div
                className="pointer-events-none absolute w-44 h-44 rounded-full border-2 border-[#D8A86E] shadow-[0_0_35px_rgba(201,148,84,0.45)] overflow-hidden z-30 -translate-x-1/2 -translate-y-1/2 backdrop-contrast-125"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                }}
              >
                {/* 2.5x Zoomed Mirror Inside Loupe */}
                <div
                  className="absolute w-[1150px] h-[1150px]"
                  style={{
                    left: `${-loupePos.percentX * 11.5 + 88}px`,
                    top: `${-loupePos.percentY * 11.5 + 88}px`,
                  }}
                >
                  <Image
                    src={activeStage.image}
                    alt="Magnified View"
                    fill
                    className="object-cover"
                    sizes="1150px"
                  />
                </div>

                {/* Laboratory Loupe Reticle & Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-[1px] bg-[#D8A86E]/40" />
                  <div className="h-full w-[1px] bg-[#D8A86E]/40 absolute" />
                  <div className="w-8 h-8 rounded-full border border-[#D8A86E]/70 absolute" />
                  <span className="absolute bottom-3 text-[9px] font-mono-data text-white font-bold bg-black/60 px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/10">
                    2.5X OPTICAL
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Floating Inspector Pill */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#0E0D0C]/80 backdrop-blur-md border border-white/10 text-xs font-mono-data text-[#DCD5C8]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeStage.colorHex }} />
                <span className="font-bold text-white uppercase">{activeStage.label}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[#C99454]">
                <Crosshair className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">
                  {isHovered ? "INSPECTING..." : "HOVER TO MAGNIFY"}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Terroir Stage Switcher Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#161513]/90 backdrop-blur-md border border-[#D8A86E]/20">
            {TERROIR_STAGES.map((stg, idx) => {
              const isSelected = idx === activeStageIdx;
              return (
                <button
                  key={stg.id}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono-data transition-all flex items-center space-x-2 ${
                    isSelected
                      ? "bg-[#C99454] text-[#0E0D0C] font-bold shadow-lg"
                      : "text-[#B0A799] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="opacity-70">0{stg.id + 1}.</span>
                  <span className="hidden sm:inline">{stg.label.split(" ")[0]}</span>
                  <span className="sm:hidden">{stg.id + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Story & Quick Lab Access Card */}
        <div className="lg:col-span-3 space-y-4 order-3">
          <div className="p-6 rounded-2xl bg-[#151412]/85 backdrop-blur-md border border-[#D8A86E]/20 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-mono-data text-[#8C827A] uppercase tracking-wider">
              <span>Field Notes</span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#C99454]">
                Phase 0{activeStage.id + 1}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-sans italic text-[#E6D9C8]/90 leading-relaxed">
              &ldquo;{activeStage.quote}&rdquo;
            </p>

            <div className="border-t border-[#D8A86E]/15 pt-4 space-y-3">
              <Link
                href="/laboratory"
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-data text-[#DCD5C8] hover:text-white flex items-center justify-between transition-all group"
              >
                <span>Buka Roasting Lab</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C99454] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/beans"
                className="w-full py-2.5 px-4 rounded-xl bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono-data text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all shadow-md group"
              >
                <span>Koleksi Beans CCR</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0E0D0C] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Architectural Metrics Ribbon */}
      <div className="relative z-10 pt-4 border-t border-[#D8A86E]/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="space-y-1">
          <span className="text-[11px] font-mono-data text-[#8C827A] uppercase tracking-wider">
            Location
          </span>
          <p className="text-sm font-sans font-medium text-[#F4EDE4]">Goalpara Estate Camp</p>
        </div>
        <div className="space-y-1">
          <span className="text-[11px] font-mono-data text-[#8C827A] uppercase tracking-wider">
            Altitude
          </span>
          <p className="text-sm font-sans font-medium text-[#C99454]">1.250 MDPL (Cold Mist)</p>
        </div>
        <div className="space-y-1">
          <span className="text-[11px] font-mono-data text-[#8C827A] uppercase tracking-wider">
            Slow Bar Hours
          </span>
          <p className="text-sm font-sans font-medium text-[#F4EDE4]">Sabtu & Minggu · Walk-ins</p>
        </div>
        <div className="space-y-1">
          <span className="text-[11px] font-mono-data text-[#8C827A] uppercase tracking-wider">
            Roasting Ethos
          </span>
          <p className="text-sm font-sans font-medium text-[#C99454]">Specialty Micro-Batch</p>
        </div>
      </div>
    </section>
  );
}
