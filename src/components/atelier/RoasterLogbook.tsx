"use client";

import React from "react";
import Link from "next/link";
import RoastCurveGraph from "@/components/laboratory/RoastCurveGraph";
import { ArrowRight, Activity, Thermometer, Flame } from "lucide-react";

export default function RoasterLogbook() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#D8A86E]/15">
      <div className="space-y-12">
        {/* Editorial Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D8A86E]/15 pb-8">
          <div className="space-y-3">
            <div className="text-[11px] font-mono-data text-[#C99454] uppercase tracking-widest flex items-center space-x-2">
              <span>[ ROASTERY LAB LOGBOOK ]</span>
              <span>·</span>
              <span>KONTROL TERMAL PRESISI</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#F7F5F0]">
              Logika Sangrai di Udara Dingin.
            </h2>
            <p className="text-sm font-sans text-[#A69E90] max-w-2xl leading-relaxed">
              Di ketinggian 1.250 mdpl, tekanan udara lebih rendah dan suhu ruang dingin mempengaruhi konduksi panas di dalam drum. Kami mencatat setiap derajat kenaikan suhu (Rate of Rise) per 30 detik untuk memastikan karamelisasi gula berjalan utuh tanpa rasa gosong (*scorching*).
            </p>
          </div>

          <Link
            href="/laboratory"
            className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#C99454] hover:text-white uppercase tracking-wider transition-colors pb-1"
          >
            <span>Buka Laboratorium Lengkap (Radar &amp; Brew Matrix)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* The Interactive Thermal Graph */}
        <RoastCurveGraph />

        {/* Technical Footer Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-mono-data text-[#8C8375]">
          <div>
            <span className="text-[#C99454] block uppercase text-[10px]">Tipe Mesin</span>
            <span className="text-[#DCD5C8]">Solid Cast-Iron Double Wall Drum</span>
          </div>
          <div>
            <span className="text-[#C99454] block uppercase text-[10px]">Development Time Ratio</span>
            <span className="text-[#DCD5C8]">15.2% · First Crack ke Drop</span>
          </div>
          <div>
            <span className="text-[#C99454] block uppercase text-[10px]">Pendinginan Cepat</span>
            <span className="text-[#DCD5C8]">&lt; 3 Menit pada Baki Perforasi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
