"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Crosshair, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StageDetail {
  id: string;
  stepNumber: string;
  title: string;
  sub: string;
  image: string;
  metric: string;
  metricLabel: string;
  elevation: string;
  fieldNote: string;
}

const STAGES: StageDetail[] = [
  {
    id: "cherry",
    stepNumber: "01",
    title: "Ceri Merah Goalpara",
    sub: "Panen Selektif di Lereng Gunung Gede",
    image: "/assets/terroir/stage-0-cherry.jpg",
    metric: "22.4° Brix",
    metricLabel: "Kadar Gula Alami",
    elevation: "1.250 MDPL",
    fieldNote: "Dipetik tangan hanya saat buah matang merata. Embun pagi menjaga kesegaran kulit ceri sebelum masuk meja sortir.",
  },
  {
    id: "mucilage",
    stepNumber: "02",
    title: "Fermentasi Getah Madu",
    sub: "Maserasi Anaerobik Lambat",
    image: "/assets/terroir/stage-1-mucilage.jpg",
    metric: "72 Jam",
    metricLabel: "Waktu Penguraian Pektin",
    elevation: "Vault Lab",
    fieldNote: "Getah manis dipertahankan selama fermentasi terkontrol untuk memicu kompleksitas aroma floral dan keasaman buah batu.",
  },
  {
    id: "green",
    stepNumber: "03",
    title: "Seleksi Biji Hijau",
    sub: "Laboratorium Grading Kerapatan",
    image: "/assets/terroir/stage-2-green.jpg",
    metric: "10.8%",
    metricLabel: "Moisture Content Presisi",
    elevation: "Screen 16–18",
    fieldNote: "Pemisahan densitas memastikan tiap biji memiliki massa seragam sehingga merespons panas sangrai secara konstan.",
  },
  {
    id: "roast",
    stepNumber: "04",
    title: "Sangrai Cast Iron",
    sub: "Profil Khusus Slow Bar CCR",
    image: "/assets/terroir/stage-3-roasted.jpg",
    metric: "Agtron 62.4",
    metricLabel: "Indeks Warna Spesialti",
    elevation: "Drop 208°C",
    fieldNote: "Disangrai perlahan untuk mengunci golden chaff di belahan tengah, menghadirkan body tebal tanpa menutupi keaslian terroir.",
  },
];

export default function EditorialHero() {
  const { language } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const current = STAGES[activeIdx];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loupe, setLoupe] = useState({ x: 0, y: 0, percentX: 50, percentY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setLoupe({ x, y, percentX, percentY });
  };

  return (
    <section className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Top Architectural Folio Line */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#D8A86E]/20 pb-3 text-[11px] font-mono-data text-[#8C8375] uppercase tracking-widest gap-2">
        <div className="flex items-center space-x-3">
          <span className="text-[#C99454] font-bold">CCR · VOL. 2026</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline">SLOW BAR &amp; ROASTERY LABORATORY</span>
        </div>
        <div className="flex items-center space-x-4 text-[#A69E90]">
          <span>06°53′S 106°58′E</span>
          <span>·</span>
          <span className="text-[#C99454]">1.250 MDPL</span>
        </div>
      </div>

      {/* Main Asymmetrical Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">
        {/* Left Editorial Narrative Column (7 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono-data uppercase tracking-[0.25em] text-[#C99454] block">
              Goalpara Estate Camp · Sukabumi
            </span>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-editorial font-bold tracking-tight text-[#F7F5F0] leading-[1.05]">
              Menyeduh <br />
              <span className="italic font-light text-[#D8A86E]">Tanpa Ketergesaan.</span>
            </h1>
          </div>

          <div className="space-y-4 text-base sm:text-lg font-sans text-[#B5ABA0] leading-relaxed max-w-xl">
            <p>
              Di lereng Gunung Gede Pangrango, di antara dinginnya kabut dan rimbun pepohonan pinus Goalpara, kami memilih jalan yang lambat.
            </p>
            <p className="text-sm font-sans text-[#8C8375] border-l-2 border-[#C99454]/50 pl-4 py-1 italic">
              &ldquo;Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Kopi disajikan untuk mereka yang bersedia jeda sejenak.&rdquo;
            </p>
          </div>

          {/* Minimalist Phase Linimasa */}
          <div className="pt-4 space-y-3">
            <span className="text-[11px] font-mono-data text-[#8C8375] uppercase tracking-widest block">
              Tahapan Terroir ke Biji Sangrai
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STAGES.map((stage, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`text-left p-3 border transition-all duration-200 ${
                      isActive
                        ? "border-[#C99454] bg-[#1C1A17] text-white"
                        : "border-white/10 hover:border-white/25 bg-transparent text-[#8C8375]"
                    }`}
                  >
                    <span className="text-[10px] font-mono-data block text-[#C99454] opacity-90">
                      [{stage.stepNumber}]
                    </span>
                    <span className="text-xs font-sans font-medium block truncate mt-0.5">
                      {stage.title.split(" ")[0]} {stage.title.split(" ")[1] || ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Stage Telemetry Readout */}
          <div className="p-4 bg-[#141311] border border-[#D8A86E]/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono-data">
            <div>
              <span className="text-[10px] text-[#8C8375] uppercase block">Parameter</span>
              <span className="text-sm font-bold text-[#F7F5F0]">{current.metric}</span>
              <span className="text-[10px] text-[#A69E90] block">{current.metricLabel}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8C8375] uppercase block">Lingkungan</span>
              <span className="text-sm font-bold text-[#C99454]">{current.elevation}</span>
              <span className="text-[10px] text-[#A69E90] block">Goalpara Lab</span>
            </div>
            <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
              <span className="text-[10px] text-[#8C8375] uppercase block">Catatan Roaster</span>
              <p className="text-[11px] font-sans text-[#B5ABA0] line-clamp-2 mt-0.5">
                {current.fieldNote}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/beans"
              className="px-7 py-3.5 bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono-data text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>Koleksi Biji Kopi CCR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/sanctuary"
              className="px-6 py-3.5 border border-white/15 hover:border-[#C99454] text-[#DCD5C8] hover:text-white font-mono-data text-xs uppercase tracking-wider transition-all duration-200"
            >
              <span>Menuju Slow Bar Goalpara</span>
            </Link>
          </div>
        </div>

        {/* Right Tactical Visual Frame with Optical Loupe (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full aspect-square max-w-[540px] overflow-hidden bg-[#0A0908] border border-[#D8A86E]/30 shadow-2xl cursor-crosshair group select-none"
          >
            {/* Active Stage High-Res Macro Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Corner Crop Marks & Archival Lab Frame */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D8A86E]/60 pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D8A86E]/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D8A86E]/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D8A86E]/60 pointer-events-none" />

            {/* Micro Archival Stamp Over Image */}
            <div className="absolute top-4 left-5 pointer-events-none text-[10px] font-mono-data text-white/70 uppercase tracking-widest bg-black/60 px-2 py-0.5 border border-white/10">
              SPECIMEN {current.stepNumber} · GOALPARA TERROIR
            </div>

            {/* 2.5X Precision Optical Loupe */}
            {isHovered && (
              <div
                className="pointer-events-none absolute w-48 h-48 rounded-full border-2 border-[#D8A86E] shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden z-30 -translate-x-1/2 -translate-y-1/2 bg-black"
                style={{
                  left: `${loupe.x}px`,
                  top: `${loupe.y}px`,
                }}
              >
                <div
                  className="absolute w-[1350px] h-[1350px]"
                  style={{
                    left: `${-loupe.percentX * 13.5 + 96}px`,
                    top: `${-loupe.percentY * 13.5 + 96}px`,
                  }}
                >
                  <Image
                    src={current.image}
                    alt="Magnified View"
                    fill
                    className="object-cover"
                    sizes="1350px"
                  />
                </div>
                {/* Loupe Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-[1px] bg-[#D8A86E]/50" />
                  <div className="h-full w-[1px] bg-[#D8A86E]/50 absolute" />
                  <div className="w-10 h-10 rounded-full border border-[#D8A86E]/80 absolute" />
                  <span className="absolute bottom-3 text-[9px] font-mono-data text-white font-bold bg-black/70 px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/10">
                    2.5X LOUPE
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Bar: Instructions */}
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none text-[11px] font-mono-data text-[#DCD5C8]/80 bg-black/70 backdrop-blur-sm px-3 py-1.5 border border-white/10">
              <span className="uppercase">{current.title}</span>
              <span className="text-[#C99454] flex items-center space-x-1">
                <Crosshair className="w-3 h-3" />
                <span>{isHovered ? "INSPECTING..." : "ARAHKAN MOUSE"}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
