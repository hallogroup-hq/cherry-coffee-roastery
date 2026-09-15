"use client";

import React, { useState, useEffect } from "react";
import { CloudFog, Compass, Mountain, Thermometer, Clock, Navigation } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GoalparaLiveWidget() {
  const { language } = useLanguage();
  const [currentDay, setCurrentDay] = useState("");
  const [isWeekend, setIsWeekend] = useState(false);

  useEffect(() => {
    const d = new Date();
    const day = d.getDay(); // 0 is Sunday, 6 is Saturday
    setIsWeekend(day === 0 || day === 6);
    setCurrentDay(
      d.toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [language]);

  return (
    <div className="w-full bg-[#FAF8F5] border-2 border-[#D5CEC2] shadow-[0_12px_40px_rgba(74,67,59,0.08)] p-6 sm:p-8 space-y-6 relative overflow-hidden rounded-xs">
      {/* Fine Margin Etching Border */}
      <div className="absolute inset-1.5 border border-[#E5DFD3] pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD3] pb-5 relative z-10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#721C24] uppercase font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>STATION MÉTÉOROLOGIQUE · GOALPARA 1.250 MDPL</span>
          </div>
          <h3 className="text-2xl font-editorial font-bold text-[#181715] mt-1">
            Status Terkini Kawasan Slow Bar
          </h3>
        </div>

        {/* Live Weekend Status Pill */}
        <div className="flex items-center space-x-2 px-3 py-1 bg-[#F2ECE0] border border-[#C5BCAB]">
          <span
            className={`w-2 h-2 rounded-full ${
              isWeekend ? "bg-[#721C24] animate-pulse" : "bg-[#8C6E2E]"
            }`}
          />
          <span className="text-xs font-mono uppercase font-bold text-[#181715]">
            {isWeekend
              ? language === "id"
                ? "Slow Bar Aktif Hari Ini (09.00 - 18.00)"
                : "Slow Bar Open Today (09:00 - 18:00)"
              : language === "id"
              ? "Roasting Laboratory & R&D Mode"
              : "Roasting Laboratory & R&D Mode"}
          </span>
        </div>
      </div>

      {/* Metric Cards Grid: Antique Inset Telemetry */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono relative z-10">
        <div className="p-4 bg-[#F2ECE0] border border-[#C5BCAB] space-y-1 shadow-xs">
          <span className="text-[#7A7268] flex items-center text-[10px] uppercase font-bold">
            <Mountain className="w-3.5 h-3.5 mr-1 text-[#8C6E2E]" />
            Elevasi Terroir
          </span>
          <p className="text-lg font-bold text-[#181715]">1.250 – 1.350 mdpl</p>
          <span className="text-[10px] text-[#7A7268]">Kaki Gn. Gede Pangrango</span>
        </div>

        <div className="p-4 bg-[#F2ECE0] border border-[#C5BCAB] space-y-1 shadow-xs">
          <span className="text-[#7A7268] flex items-center text-[10px] uppercase font-bold">
            <Thermometer className="w-3.5 h-3.5 mr-1 text-[#721C24]" />
            Suhu Rata-rata
          </span>
          <p className="text-lg font-bold text-[#721C24]">17°C – 21°C</p>
          <span className="text-[10px] text-[#7A7268]">Sejuk &amp; Berkabut</span>
        </div>

        <div className="p-4 bg-[#F2ECE0] border border-[#C5BCAB] space-y-1 shadow-xs">
          <span className="text-[#7A7268] flex items-center text-[10px] uppercase font-bold">
            <CloudFog className="w-3.5 h-3.5 mr-1 text-[#8C6E2E]" />
            Kelembapan Udara
          </span>
          <p className="text-lg font-bold text-[#181715]">84% – 92%</p>
          <span className="text-[10px] text-[#7A7268]">Kabut Lembah Pinus</span>
        </div>

        <div className="p-4 bg-[#F2ECE0] border border-[#C5BCAB] space-y-1 shadow-xs">
          <span className="text-[#7A7268] flex items-center text-[10px] uppercase font-bold">
            <Clock className="w-3.5 h-3.5 mr-1 text-[#8C6E2E]" />
            Waktu Lokal
          </span>
          <p className="text-sm font-bold text-[#181715] capitalize">{currentDay || "Sabtu & Minggu"}</p>
          <span className="text-[10px] text-[#7A7268]">WIB (UTC+7)</span>
        </div>
      </div>

      {/* Location CTA & Directions */}
      <div className="bg-[#F2ECE0] p-5 border border-[#C5BCAB] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold font-editorial text-[#181715]">
            Menuju Goalpara Estate Camp
          </h4>
          <p className="text-xs font-sans text-[#5A534B]">
            Sekitar 35 menit dari pusat Kota Sukabumi, menyusuri rimbun perkebunan teh Cisarua.
          </p>
        </div>

        <a
          href="https://maps.google.com/?q=Goalpara+Estate+Camp+Sukabumi"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[#721C24] hover:bg-[#8B2635] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-xs"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Navigasi Peta</span>
        </a>
      </div>
    </div>
  );
}
