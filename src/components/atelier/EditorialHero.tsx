"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import BotanicalExtractionApparatus from "@/components/atelier/BotanicalExtractionApparatus";
import { useLanguage } from "@/context/LanguageContext";

interface BotanicalStage {
  id: string;
  numeral: string;
  title: string;
  sub: string;
  botanicalNote: string;
}

const BOTANICAL_STAGES: BotanicalStage[] = [
  {
    id: "cherry",
    numeral: "I",
    title: "Ceri Merah Goalpara",
    sub: "Panen Selektif di Lereng Gunung Gede",
    botanicalNote: "Dipetik tangan hanya saat buah matang merata (22.4° Brix). Embun pagi menjaga kesegaran pektin alami ceri.",
  },
  {
    id: "maceration",
    numeral: "II",
    title: "Maserasi Getah Madu",
    sub: "Fermentasi Anaerobik 72 Jam",
    botanicalNote: "Getah manis dipertahankan dalam tangki nir-oksigen untuk memicu kompleksitas asam malat dan bunga melati.",
  },
  {
    id: "density",
    numeral: "III",
    title: "Seleksi Densitas Biji",
    sub: "Laboratorium Grading Gravitasi",
    botanicalNote: "Kerapatan seragam (Moisture 10.8%, Screen 16–18) menjamin penyerapan energi panas konstan saat disangrai.",
  },
  {
    id: "roast",
    numeral: "IV",
    title: "Sangrai Cast Iron",
    sub: "Profil Slow Bar CCR (Drop 208°C)",
    botanicalNote: "Disangrai perlahan untuk mengunci golden chaff di belahan tengah, menghasilkan body tebal tanpa menutupi terroir.",
  },
];

export default function EditorialHero() {
  const { language } = useLanguage();
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const currentStage = BOTANICAL_STAGES[activeStageIdx];

  return (
    <section className="relative pt-8 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1380px] mx-auto overflow-hidden">
      
      {/* 1. Top Botanical Archive Folio Line */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#E5DFD3] pb-3 text-[11px] font-mono tracking-widest text-[#7A7268] uppercase gap-2">
        <div className="flex items-center space-x-3">
          <span className="text-[#721C24] font-bold">L&apos;ATELIER BOTANIQUE CCR</span>
          <span className="text-[#B8B0A2]">/</span>
          <span>ROASTERY &amp; EXTRACTION LABORATORY</span>
        </div>
        <div className="flex items-center space-x-4 text-[#8A8278]">
          <span>06°53′3″S 106°58′E</span>
          <span>·</span>
          <span className="text-[#8C6E2E] font-medium">1.250 MDPL GOALPARA</span>
        </div>
      </div>

      {/* 2. Monumental Calligraphic Header & Wax Seal Emblem */}
      <div className="text-center pt-10 pb-6 space-y-4 max-w-4xl mx-auto">
        {/* Wax Seal Monogram Badge */}
        <div className="inline-flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#721C24] border-2 border-[#56151B] shadow-[0_4px_16px_rgba(114,28,36,0.35)] flex items-center justify-center text-center text-white relative group">
            <span className="text-[9px] font-editorial italic tracking-widest uppercase block leading-none font-bold">
              CCR<br />
              <span className="text-[7px] font-mono tracking-normal opacity-90">1803</span>
            </span>
          </div>
        </div>

        {/* Monumental Serif Title */}
        <div className="space-y-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-editorial font-bold tracking-tight text-[#181715] leading-[1.04]">
            Menyeduh <br />
            <span className="italic font-light text-[#721C24]">Tanpa Ketergesaan.</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-[#7A7268] uppercase max-w-2xl mx-auto pt-2">
            Exquisite Artisanal Single-Origin Harvest · Mount Gede Pangrango Slopes
          </p>
        </div>

        <p className="text-sm sm:text-base font-sans text-[#5A534B] leading-relaxed max-w-2xl mx-auto pt-1">
          Di lereng berkabut dingin Goalpara Estate, di antara rimbun pinus dan tanah mineral vulkanik, 
          kami memperlakukan tiap seduhan sebagai ritual botani yang hening. Kopi disajikan khusus bagi mereka yang bersedia jeda sejenak.
        </p>
      </div>

      {/* 3. CENTERPIECE: The Antique Brass Botanical Extraction Apparatus (Option 2 adapted into Option 3) */}
      <BotanicalExtractionApparatus />

      {/* 4. Bottom Botanical Specimen Stages & Field Notes */}
      <div className="mt-12 pt-8 border-t border-[#E5DFD3] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-xs font-mono text-[#7A7268] uppercase tracking-widest block">
            ETAPES BOTANIQUES DU TERROIR:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 max-w-2xl">
            {BOTANICAL_STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIdx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`text-left p-3 border transition-all duration-200 ${
                    isActive
                      ? "border-[#721C24] bg-[#FAF8F5] text-[#181715] shadow-xs shadow-[#721C24]/10"
                      : "border-[#E5DFD3] hover:border-[#B8B0A2] bg-[#F2EFE8]/50 text-[#7A7268]"
                  }`}
                >
                  <span className="text-[10px] font-mono block text-[#721C24] font-bold">
                    PL. {stage.numeral}
                  </span>
                  <span className="text-xs font-sans font-medium block truncate mt-0.5 text-[#181715]">
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Botanical Note Callout & Action Links */}
        <div className="p-5 bg-[#FAF8F5] border border-[#D5CEC2] grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xs">
          <div className="md:col-span-8 space-y-1">
            <span className="text-[10px] font-mono text-[#721C24] uppercase tracking-wider block font-bold">
              OBSERVATION DE TERROIR · {currentStage.title.toUpperCase()}
            </span>
            <p className="text-xs sm:text-sm font-sans text-[#4A433B] leading-relaxed italic">
              &ldquo;{currentStage.botanicalNote}&rdquo;
            </p>
          </div>

          <div className="md:col-span-4 flex flex-wrap items-center justify-end gap-3">
            <Link
              href="/beans"
              className="px-5 py-2.5 bg-[#721C24] hover:bg-[#8B2635] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 shadow-xs"
            >
              <span>Explore Specimens</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/laboratory"
              className="px-4 py-2.5 border border-[#C5BCAB] hover:border-[#721C24] text-[#4A433B] hover:text-[#181715] font-mono text-xs uppercase tracking-wider bg-[#F2EFE8] transition-colors"
            >
              <span>Extraction Lab</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
