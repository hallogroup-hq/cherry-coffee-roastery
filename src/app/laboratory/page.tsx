"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { fermentationLogs } from "@/data/laboratory";
import RoastCurveGraph from "@/components/laboratory/RoastCurveGraph";
import BrewCalculator from "@/components/laboratory/BrewCalculator";
import FlavorRadar from "@/components/laboratory/FlavorRadar";
import GoalparaExtractionCanvas from "@/components/hero/GoalparaExtractionCanvas";
import {
  FlaskConical,
  Flame,
  Droplets,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Activity,
} from "lucide-react";

export default function LaboratoryPage() {
  const { language } = useLanguage();

  const handleInquireBatch = (batchCode: string, batchTitle: string) => {
    const text = encodeURIComponent(
      `Halo Roastery Laboratory Cherry! Saya ingin mendaftar kuota private cupping untuk batch eksperimental *${batchCode} — ${batchTitle}*. Mohon informasi ketersediaan slotnya.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 bg-[#F7F4EE] text-[#181715]">
      {/* 1. Laboratory Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        {/* Wax Seal Monogram Badge */}
        <div className="inline-flex items-center justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-[#721C24] border-2 border-[#56151B] shadow-[0_4px_16px_rgba(114,28,36,0.3)] flex items-center justify-center text-center text-white">
            <span className="text-[8px] font-editorial italic tracking-widest uppercase block leading-none font-bold">
              CCR<br />
              <span className="text-[6px] font-mono tracking-normal opacity-90">LAB</span>
            </span>
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#F2ECE0] border border-[#C5BCAB] text-[#721C24] text-xs font-mono uppercase tracking-widest font-bold">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>SENSORY R&amp;D · THERMAL KINETICS · 1.250 MDPL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-bold text-[#181715] tracking-tight">
          Laboratoire d&apos;Extraction
        </h1>

        <p className="text-base sm:text-lg font-sans text-[#4A433B] leading-relaxed max-w-2xl mx-auto">
          Area roastery di Goalpara Estate Camp adalah laboratorium botani kami. Di sini, kami menggabungkan kimia fermentasi mikro, permodelan termodinamika drum sangrai besi tuang, dan instrumen ekstraksi presisi untuk menghadirkan karakter terroir Gunung Gede yang paling murni.
        </p>
      </div>

      {/* 2. Interactive Roast Curve Telemetry */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#721C24] uppercase tracking-wider font-bold">
          <Flame className="w-4 h-4" />
          <span>FASE 01 · REKAYASA TERMAL &amp; PROFILAGE SANGRAI</span>
        </div>
        <RoastCurveGraph />
      </section>

      {/* 3. Sensory Cupping Radar */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#721C24] uppercase tracking-wider font-bold">
          <Sparkles className="w-4 h-4" />
          <span>FASE 02 · ANALISIS SPEKTRUM RASA &amp; CUPPING SCORE</span>
        </div>
        <FlavorRadar />
      </section>

      {/* 4. Slow Bar Extraction Matrix & Pour Calculator */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#721C24] uppercase tracking-wider font-bold">
          <Droplets className="w-4 h-4" />
          <span>FASE 03 · SAINS SEDUH SLOW BAR &amp; RASIO EMAS</span>
        </div>
        <BrewCalculator />
      </section>

      {/* 4. Goalpara Extraction Anatomy (Option 2 Precision Canvas in Botanical Theme) */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#721C24] uppercase tracking-wider font-bold">
          <Activity className="w-4 h-4" />
          <span>FASE 04 · ANATOMIE D&apos;EXTRACTION GOALPARA &amp; DISSOLUTION</span>
        </div>
        <GoalparaExtractionCanvas />
      </section>

      {/* 5. The R&D Fermentation Vault (Exclusive Micro-Batches) */}
      <section className="space-y-8 pt-6 border-t border-[#E5DFD3]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5DFD3] pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#721C24] uppercase tracking-widest font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>ARSIP EKSPERIMEN &amp; ALOKASI TERBATAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#181715] mt-1">
              The R&amp;D Fermentation Vault
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#7A7268] mt-1">
              Catatan register batch uji coba fermentasi anaerobik mikro di Goalpara. Disediakan terbatas untuk private tasting.
            </p>
          </div>
        </div>

        {/* Fermentation Logs Grid: Archival Jar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fermentationLogs.map((log) => {
            const statusConfig = {
              active_slowbar: {
                label: "Tersedia di Slow Bar",
                color: "text-[#181715] border-[#8C6E2E] bg-[#F2ECE0]",
              },
              in_roastery: {
                label: "Tahap Cupping Roastery",
                color: "text-[#721C24] border-[#721C24]/40 bg-[#FAF8F5]",
              },
              archived: {
                label: "Arsip Private Tasting",
                color: "text-[#7A7268] border-[#D5CEC2] bg-[#F2EFE8]",
              },
            }[log.status];

            return (
              <div
                key={log.id}
                className="bg-[#FAF8F5] border-2 border-[#D5CEC2] hover:border-[#721C24] p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-[0_8px_24px_rgba(74,67,59,0.06)] relative"
              >
                <div className="space-y-4">
                  {/* Status & Batch Code */}
                  <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
                    <span className="text-xs font-mono font-bold text-[#721C24]">
                      {log.batchCode}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 border uppercase tracking-wider font-medium ${statusConfig.color}`}
                    >
                      {statusConfig.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-editorial font-bold text-[#181715]">
                      {log.title}
                    </h3>
                    <p className="text-xs font-mono text-[#7A7268] mt-0.5">
                      {log.cultivar} · {log.harvestAltitude}
                    </p>
                  </div>

                  {/* Chemistry & Telemetry metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E5DFD3] text-[11px] font-mono">
                    <div>
                      <span className="text-[#7A7268] block text-[9px] uppercase">Fermentasi</span>
                      <span className="text-[#181715] font-bold">{log.fermentationHours} Jam</span>
                    </div>
                    <div>
                      <span className="text-[#7A7268] block text-[9px] uppercase">Brix Awal/Akhir</span>
                      <span className="text-[#721C24] font-bold">
                        {log.startingBrix}° → {log.finalBrix}°
                      </span>
                    </div>
                    <div>
                      <span className="text-[#7A7268] block text-[9px] uppercase">Target pH</span>
                      <span className="text-[#8C6E2E] font-bold">{log.targetPh}</span>
                    </div>
                  </div>

                  {/* Sensory notes */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono text-[#7A7268] block font-bold">
                      Profil Spektrum:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {log.sensoryOutcome.map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-sans px-2 py-0.5 bg-[#F2ECE0] border border-[#D5CEC2] text-[#4A433B]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-sans text-[#5A534B] leading-relaxed pt-1 italic">
                    &ldquo;{log.notes[language]}&rdquo;
                  </p>
                </div>

                {/* Inquiry Action */}
                <button
                  onClick={() => handleInquireBatch(log.batchCode, log.title)}
                  className="w-full py-2.5 px-3 bg-[#721C24] hover:bg-[#8B2635] text-white text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center space-x-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ajukan Reservasi Cupping</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
