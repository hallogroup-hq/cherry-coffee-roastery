"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { fermentationLogs } from "@/data/laboratory";
import RoastCurveGraph from "@/components/laboratory/RoastCurveGraph";
import BrewCalculator from "@/components/laboratory/BrewCalculator";
import FlavorRadar from "@/components/laboratory/FlavorRadar";
import {
  FlaskConical,
  Flame,
  Droplets,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* 1. Laboratory Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C1A17] border border-[#D8A86E]/20 text-[#C99454] text-xs font-mono-data uppercase tracking-widest">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Sensory R&D & Extraction Physics</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-bold text-white tracking-tight">
          Laboratorium Roastery
        </h1>

        <p className="text-base sm:text-lg font-sans text-[#B0A799] leading-relaxed max-w-2xl mx-auto">
          Area roastery di Goalpara Estate Camp adalah laboratorium kami. Di sini, kami menggabungkan kimia fermentasi mikro, permodelan kurva sangrai termal, dan sains ekstraksi presisi untuk menghasilkan kopi yang jujur dan berkarakter.
        </p>
      </div>

      {/* 2. Interactive Roast Curve Telemetry */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-mono-data text-[#C99454] uppercase tracking-wider">
          <Flame className="w-4 h-4" />
          <span>Fase 01 · Rekayasa Termal Sangrai</span>
        </div>
        <RoastCurveGraph />
      </section>

      {/* 3. Sensory Cupping Radar */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-mono-data text-[#C99454] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Fase 02 · Analisis Spektrum Rasa & Cupping Score</span>
        </div>
        <FlavorRadar />
      </section>

      {/* 4. Slow Bar Extraction Matrix & Pour Calculator */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-mono-data text-[#C99454] uppercase tracking-wider">
          <Droplets className="w-4 h-4" />
          <span>Fase 03 · Sains Seduh Slow Bar & Rasio Emas</span>
        </div>
        <BrewCalculator />
      </section>

      {/* 5. The R&D Fermentation Vault (Exclusive Micro-Batches) */}
      <section className="space-y-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-data text-[#C99454] uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" />
              <span>Arsip Eksperimen & Alokasi Terbatas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white mt-1">
              The R&D Fermentation Vault
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#A69E90] mt-1">
              Catatan batch uji coba fermentasi anaerobik mikro di Goalpara. Tersedia terbatas untuk private tasting.
            </p>
          </div>
        </div>

        {/* Fermentation Logs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fermentationLogs.map((log) => {
            const statusConfig = {
              active_slowbar: {
                label: "Tersedia di Slow Bar",
                color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
              },
              in_roastery: {
                label: "Tahap Cupping Roastery",
                color: "text-[#C99454] border-[#C99454]/30 bg-[#C99454]/10",
              },
              archived: {
                label: "Arsip Private Tasting",
                color: "text-purple-300 border-purple-500/30 bg-purple-950/20",
              },
            }[log.status];

            return (
              <div
                key={log.id}
                className="bg-[#141311] border border-white/10 hover:border-[#C99454]/30 rounded-3xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xl"
              >
                <div className="space-y-4">
                  {/* Status & Batch Code */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-data font-bold text-[#E6DFD5]">
                      {log.batchCode}
                    </span>
                    <span
                      className={`text-[10px] font-mono-data px-2.5 py-0.5 rounded-full border ${statusConfig.color}`}
                    >
                      {statusConfig.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-editorial font-bold text-white">
                      {log.title}
                    </h3>
                    <p className="text-xs font-mono-data text-[#8C8375] mt-0.5">
                      {log.cultivar} · {log.harvestAltitude}
                    </p>
                  </div>

                  {/* Chemistry & Telemetry metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-[11px] font-mono-data">
                    <div>
                      <span className="text-[#8C8375] block">Fermentasi</span>
                      <span className="text-white font-bold">{log.fermentationHours} Jam</span>
                    </div>
                    <div>
                      <span className="text-[#8C8375] block">Brix Awal/Akhir</span>
                      <span className="text-[#C99454] font-bold">
                        {log.startingBrix}° → {log.finalBrix}°
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8C8375] block">Target pH</span>
                      <span className="text-emerald-400 font-bold">{log.targetPh}</span>
                    </div>
                  </div>

                  {/* Sensory notes */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono-data text-[#8C8375] block">
                      Karakter Sensorik:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {log.sensoryOutcome.map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-sans px-2 py-0.5 rounded bg-[#1C1A17] border border-white/5 text-[#E6DFD5]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-sans text-[#A69E90] leading-relaxed pt-1">
                    {log.notes[language]}
                  </p>
                </div>

                {/* Inquiry Action */}
                <button
                  onClick={() => handleInquireBatch(log.batchCode, log.title)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#1C1A17] hover:bg-[#26231E] border border-white/10 text-xs font-mono-data text-[#DCD5C8] hover:text-white flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C99454]" />
                  <span>Ajukan Reservasi Tasting</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
