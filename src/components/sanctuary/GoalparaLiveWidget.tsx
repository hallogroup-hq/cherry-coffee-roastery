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
    <div className="w-full bg-[#161513] border border-[#D8A86E]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono-data text-[#C99454] uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>Terroir Telemetry · Goalpara Estate Camp</span>
          </div>
          <h3 className="text-2xl font-editorial font-bold text-white mt-1">
            Status Terkini Kawasan Slow Bar
          </h3>
        </div>

        {/* Live Weekend Status Pill */}
        <div className="flex items-center space-x-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isWeekend ? "bg-emerald-400 animate-pulse" : "bg-[#C99454]"
            }`}
          />
          <span className="text-xs font-mono-data uppercase font-bold text-white">
            {isWeekend
              ? language === "id"
                ? "Slow Bar Buka Hari Ini (08.00 - 18.00)"
                : "Slow Bar Open Today (08:00 - 18:00)"
              : language === "id"
              ? "Roasting Laboratory & R&D Mode"
              : "Roasting Laboratory & R&D Mode"}
          </span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono-data">
        <div className="p-4 rounded-2xl bg-[#1D1B18] border border-white/5 space-y-1">
          <span className="text-[#8C8375] flex items-center">
            <Mountain className="w-3.5 h-3.5 mr-1 text-[#C99454]" />
            Elevasi Terroir
          </span>
          <p className="text-lg font-bold text-white">1.250 – 1.350 mdpl</p>
          <span className="text-[10px] text-[#A69E90]">Kaki Gn. Gede Pangrango</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#1D1B18] border border-white/5 space-y-1">
          <span className="text-[#8C8375] flex items-center">
            <Thermometer className="w-3.5 h-3.5 mr-1 text-sky-400" />
            Suhu Rata-rata
          </span>
          <p className="text-lg font-bold text-sky-200">17°C – 21°C</p>
          <span className="text-[10px] text-[#A69E90]">Sejuk & Berkabut</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#1D1B18] border border-white/5 space-y-1">
          <span className="text-[#8C8375] flex items-center">
            <CloudFog className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            Kelembapan Udara
          </span>
          <p className="text-lg font-bold text-emerald-200">84% – 92%</p>
          <span className="text-[10px] text-[#A69E90]">Kabut Lembah Sore</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#1D1B18] border border-white/5 space-y-1">
          <span className="text-[#8C8375] flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" />
            Waktu Lokal
          </span>
          <p className="text-sm font-bold text-white capitalize">{currentDay || "Sabtu & Minggu"}</p>
          <span className="text-[10px] text-[#A69E90]">WIB (UTC+7)</span>
        </div>
      </div>

      {/* Location CTA & Directions */}
      <div className="bg-[#1D1B18] p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold font-sans text-white">
            Menuju Goalpara Estate Camp
          </h4>
          <p className="text-xs font-sans text-[#A69E90]">
            Kecamatan Cisarua, Kabupaten Sukabumi, Jawa Barat. Dikelilingi hutan pinus dan hamparan kebun teh.
          </p>
        </div>

        <a
          href="https://maps.google.com/?q=Goalpara+Estate+Camp+Sukabumi"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-[#232B25] hover:bg-[#2C362F] border border-emerald-500/30 text-emerald-300 text-xs font-mono-data font-bold flex items-center space-x-2 transition-all shrink-0"
        >
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          <span>Buka di Google Maps</span>
        </a>
      </div>
    </div>
  );
}
