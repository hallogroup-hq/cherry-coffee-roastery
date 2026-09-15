"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Thermometer, Droplets, Gauge, Sparkles, Activity } from "lucide-react";
import GoalparaExtractionCanvas, { BREW_CONFIGS } from "@/components/hero/GoalparaExtractionCanvas";
import { useLanguage } from "@/context/LanguageContext";

interface StageDetail {
  id: string;
  stepNumber: string;
  title: string;
  sub: string;
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
    metric: "Agtron 62.4",
    metricLabel: "Indeks Warna Spesialti",
    elevation: "Drop 208°C",
    fieldNote: "Disangrai perlahan untuk mengunci golden chaff di belahan tengah, menghadirkan body tebal tanpa menutupi keaslian terroir.",
  },
];

export default function EditorialHero() {
  const { language } = useLanguage();
  const [extractionSeconds, setExtractionSeconds] = useState(38);
  const [activePhase, setActivePhase] = useState<1 | 2 | 3>(1);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const currentStage = STAGES[activeStageIdx];

  const formatChronograph = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}s`;
  };

  const currentPhaseConfig = BREW_CONFIGS.pourover.phases[activePhase];

  return (
    <section className="relative pt-6 pb-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto overflow-hidden">
      {/* 1. Top Architectural Folio Line */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#D8A86E]/20 pb-3 text-[11px] font-mono text-[#8C8375] uppercase tracking-widest gap-2">
        <div className="flex items-center space-x-3">
          <span className="text-[#C99454] font-bold">CCR · VOL. 2026</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline">SLOW BAR &amp; ROASTERY LABORATORY</span>
        </div>
        <div className="flex items-center space-x-4 text-[#A69E90]">
          <span>06°53′3″S 106°58′E</span>
          <span>·</span>
          <span className="text-[#C99454]">1.250 MDPL</span>
        </div>
      </div>

      {/* 2. Main 3-Column Centerpiece Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 pt-8 items-start">
        
        {/* LEFT COLUMN: Poetic Narrative */}
        <div className="lg:col-span-3 xl:col-span-3 space-y-6 order-2 lg:order-1">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C99454] block">
              Goalpara Estate Camp · Sukabumi
            </span>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-editorial font-bold tracking-tight text-[#F7F5F0] leading-[1.06]">
              Menyeduh <br />
              <span className="italic font-light text-[#D8A86E]">Tanpa Ketergesaan.</span>
            </h1>
          </div>

          <div className="space-y-3 text-sm sm:text-base font-sans text-[#B5ABA0] leading-relaxed">
            <p>
              Di lereng Gunung Gede Pangrango, di antara kabut dingin dan rimbun pepohonan pinus Goalpara, kami memilih jalan yang lambat.
            </p>
            <p className="text-xs font-sans text-[#8C8375] border-l-2 border-[#C99454]/50 pl-3 py-1 italic">
              &ldquo;Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Kopi disajikan untuk mereka yang bersedia jeda sejenak.&rdquo;
            </p>
          </div>

          {/* Sanctuary Schedule Badge */}
          <div className="p-4 bg-[#141311] border border-white/10 space-y-1.5 text-xs font-mono">
            <div className="text-[#8C8375] text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99454]" />
              <span>Ritual Slow Bar Goalpara</span>
            </div>
            <div className="text-[#DCD5C8] font-medium">Setiap Akhir Pekan (Sabtu – Minggu)</div>
            <div className="text-[#C99454] text-[10px]">Pukul 08.00 – 17.00 WIB</div>
          </div>
        </div>

        {/* CENTER COLUMN: The Goalpara Extraction Anatomy Canvas */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2 w-full">
          <GoalparaExtractionCanvas
            onTimeUpdate={(secs, phase) => {
              setExtractionSeconds(secs);
              setActivePhase(phase);
            }}
          />
        </div>

        {/* RIGHT COLUMN: Live Scientific Extraction Telemetry */}
        <div className="lg:col-span-3 xl:col-span-3 space-y-4 order-3">
          <div className="p-5 bg-[#141311] border border-[#D8A86E]/20 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono text-[#C99454] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse text-[#C99454]" />
                Live Telemetry
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#C99454]/15 text-[#D8A86E] border border-[#C99454]/30">
                PHASE {activePhase}
              </span>
            </div>

            <div className="space-y-4 font-mono">
              {/* Active Extraction Phase Name */}
              <div>
                <div className="text-[10px] text-[#8C8375] uppercase">Active Extraction State</div>
                <div className="text-sm font-bold text-[#F7F5F0] font-editorial italic">
                  {currentPhaseConfig.name.split("—")[1]?.trim() || currentPhaseConfig.name}
                </div>
                <div className="text-[10px] text-[#C99454] pt-0.5">
                  Linimasa: {currentPhaseConfig.range}
                </div>
              </div>

              {/* Extraction Time Chronograph */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#8C8375]">
                  <span className="uppercase">Extraction Time</span>
                  <span className="text-sm font-bold text-[#D8A86E]">
                    {formatChronograph(extractionSeconds)}
                  </span>
                </div>
                <div className="flex gap-1 pt-1.5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 transition-colors duration-150 ${
                        (extractionSeconds % 12) >= i ? "bg-[#D8A86E]" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* TDS & Extraction Yield Sweet Spot Bars */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C8375]">
                    <span className="uppercase">TDS (Total Dissolved)</span>
                    <span className="font-bold text-[#F7F5F0]">1.35%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 mt-1 relative">
                    {/* Golden target sweet spot marker */}
                    <div className="absolute left-[35%] right-[30%] top-0 bottom-0 bg-[#C99454]/30" />
                    <div className="h-full bg-[#C99454] w-[55%]" />
                  </div>
                  <span className="text-[8px] text-[#8C8375] block text-right pt-0.5">Sweet Spot: 1.15–1.45%</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C8375]">
                    <span className="uppercase">Extraction Yield</span>
                    <span className="font-bold text-[#D8A86E]">20.4%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 mt-1 relative">
                    <div className="absolute left-[30%] right-[25%] top-0 bottom-0 bg-[#D8A86E]/30" />
                    <div className="h-full bg-[#D8A86E] w-[62%]" />
                  </div>
                  <span className="text-[8px] text-[#8C8375] block text-right pt-0.5">Target: 18.0–22.0%</span>
                </div>
              </div>

              {/* Temperature & Water Pressure */}
              <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#8C8375] uppercase flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-[#C99454]" />
                    Water Temp
                  </span>
                  <span className="text-sm font-bold text-[#F7F5F0]">92.4°C</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8C8375] uppercase flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-[#D8A86E]" />
                    Flow Rate
                  </span>
                  <span className="text-sm font-bold text-[#F7F5F0]">2.4 g/s</span>
                </div>
              </div>

              {/* Active Dissolved Compounds in Cup */}
              <div className="pt-2 border-t border-white/5 space-y-1">
                <span className="text-[10px] text-[#8C8375] uppercase block">Dissolved Compounds</span>
                <div className="flex flex-wrap gap-1 pt-1">
                  {currentPhaseConfig.compounds.map((compound, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#1C1A17] border border-white/10 text-[10px] text-[#DCD5C8]"
                    >
                      {compound}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: Terroir Steps, Phase Details & CTAs */}
      <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
        {/* Phase Selectors */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-[#8C8375] uppercase tracking-widest block">
            Tahapan Terroir ke Biji Sangrai:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 max-w-2xl">
            {STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIdx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`text-left p-2.5 border transition-all duration-200 ${
                    isActive
                      ? "border-[#C99454] bg-[#1C1A17] text-white shadow-lg shadow-[#C99454]/10"
                      : "border-white/10 hover:border-white/25 bg-transparent text-[#8C8375]"
                  }`}
                >
                  <span className="text-[10px] font-mono block text-[#C99454] opacity-90">
                    [{stage.stepNumber}]
                  </span>
                  <span className="text-xs font-sans font-medium block truncate mt-0.5">
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Readout & Action Buttons */}
        <div className="p-4 bg-[#141311] border border-[#D8A86E]/15 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3">
            <span className="text-[10px] font-mono text-[#8C8375] uppercase block">Parameter Kritis</span>
            <span className="text-sm font-bold font-mono text-[#F7F5F0]">{currentStage.metric}</span>
            <span className="text-[10px] font-mono text-[#A69E90] block">{currentStage.metricLabel}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-[10px] font-mono text-[#8C8375] uppercase block">Lingkungan</span>
            <span className="text-sm font-bold font-mono text-[#C99454]">{currentStage.elevation}</span>
            <span className="text-[10px] font-mono text-[#A69E90] block">Goalpara Lab</span>
          </div>
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-2 md:pt-0 md:pl-4">
            <span className="text-[10px] font-mono text-[#8C8375] uppercase block">Catatan Roaster</span>
            <p className="text-[11px] font-sans text-[#B5ABA0] line-clamp-2 mt-0.5">
              {currentStage.fieldNote}
            </p>
          </div>
          <div className="md:col-span-3 flex flex-wrap items-center justify-end gap-2 pt-2 md:pt-0">
            <Link
              href="/beans"
              className="px-5 py-2.5 bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 shadow-md shadow-[#C99454]/20"
            >
              <span>Beli Biji Kopi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/sanctuary"
              className="px-4 py-2.5 border border-white/15 hover:border-[#C99454] text-[#DCD5C8] hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200"
            >
              <span>Slow Bar</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
