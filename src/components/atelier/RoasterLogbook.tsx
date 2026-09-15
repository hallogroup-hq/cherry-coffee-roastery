"use client";

import React from "react";
import Link from "next/link";
import RoastCurveGraph from "@/components/laboratory/RoastCurveGraph";
import { ArrowRight, Activity, Thermometer, Flame } from "lucide-react";

export default function RoasterLogbook() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#E5DFD3]">
      <div className="space-y-12">
        {/* Editorial Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DFD3] pb-8">
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#721C24] uppercase tracking-widest flex items-center space-x-2 font-bold">
              <span>[ REGISTRE DU TORRÉFACTEUR ]</span>
              <span>·</span>
              <span>KONTROL TERMAL PRESISI</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#181715]">
              Logika Sangrai di Udara Dingin.
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#4A433B] max-w-2xl leading-relaxed">
              Di ketinggian 1.250 mdpl, tekanan udara lebih rendah dan suhu ruang dingin mempengaruhi konduksi panas di dalam drum. Kami mencatat setiap derajat kenaikan suhu (Rate of Rise) per 30 detik untuk memastikan karamelisasi gula berjalan utuh tanpa rasa gosong (<em>scorching</em>).
            </p>
          </div>

          <Link
            href="/laboratory"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#721C24] hover:text-[#8C6E2E] uppercase tracking-wider transition-colors pb-1 font-bold"
          >
            <span>Laboratorium Lengkap (Radar &amp; Brew Matrix)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* The Interactive Thermal Graph */}
        <RoastCurveGraph />

        {/* Technical Patent Footnotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-mono text-[#7A7268]">
          <div className="p-3 bg-[#FAF8F5] border border-[#E5DFD3]">
            <span className="text-[#721C24] block uppercase text-[10px] font-bold">Spécification Tambour</span>
            <span className="text-[#181715] font-medium mt-0.5 block">Solid Cast-Iron Double Wall Drum</span>
          </div>
          <div className="p-3 bg-[#FAF8F5] border border-[#E5DFD3]">
            <span className="text-[#721C24] block uppercase text-[10px] font-bold">Development Time Ratio</span>
            <span className="text-[#181715] font-medium mt-0.5 block">15.2% · First Crack vers Drop</span>
          </div>
          <div className="p-3 bg-[#FAF8F5] border border-[#E5DFD3]">
            <span className="text-[#721C24] block uppercase text-[10px] font-bold">Trempe Thermique</span>
            <span className="text-[#181715] font-medium mt-0.5 block">&lt; 3 Menit pada Baki Perforasi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
