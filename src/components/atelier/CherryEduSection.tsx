"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap, Award, BookOpen, Compass, Sparkles } from "lucide-react";

export default function CherryEduSection() {
  const learningPillars = [
    {
      num: "01",
      title: "Agronomi & Pascapanen",
      desc: "Memahami tanah vulkanik lereng Gunung Gede, pemetikan ceri selektif, dan mikrobiologi fermentasi anaerobik alami.",
      badge: "Hulu / Farm",
    },
    {
      num: "02",
      title: "Sains Roasting & Maillard",
      desc: "Eksplorasi termodinamika drum besi tuang, pemetaan Rate of Rise (RoR), dan pembentukan prekursor rasa pada biji sangrai.",
      badge: "Laboratorium",
    },
    {
      num: "03",
      title: "Kimia Ekstraksi & Air",
      desc: "Pengaruh mineral (kalsium, magnesium, bikarbonat) terhadap pelarutan senyawa volatil dan dial-in rasio seduh presisi.",
      badge: "Slow Bar",
    },
    {
      num: "04",
      title: "Sensory & Sertifikasi",
      desc: "Latihan kalibrasi indera berbasis SCA Flavor Wheel dengan adaptasi spektrum rasa buah dan rempah khas nusantara.",
      badge: "Akademi",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#D8A86E]/15">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D8A86E]/15 pb-10">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[11px] font-mono-data text-[#C99454] uppercase tracking-widest">
            <span>[ ACADEMY WING ]</span>
            <span>·</span>
            <span>EDUKASI DARI HULU KE HILIR</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#F7F5F0] leading-[1.1]">
            CherryEdu. <br />
            <span className="italic font-light text-[#D8A86E]">
              Indonesian Specialty Coffee Academy.
            </span>
          </h2>
          <p className="text-sm font-sans text-[#A69E90] max-w-2xl leading-relaxed">
            Misi kami tidak berhenti pada cangkir yang diseduh di Goalpara. Dibina langsung oleh tim roaster dan barista Cherry Coffee Roastery, CherryEdu hadir memberdayakan siapa pun—dari pemula hingga profesional—untuk memahami kopi secara mendalam dari hulu (kebun) hingga ke hilir (seduhan).
          </p>
        </div>

        <a
          href="https://edu.cherryroastery.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono-data text-xs font-bold uppercase tracking-wider transition-all shadow-lg group"
        >
          <span>Buka Platform CherryEdu</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Curriculum Tracks / Pillars Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {learningPillars.map((pillar) => (
          <div
            key={pillar.num}
            className="p-6 bg-[#131210] border border-[#D8A86E]/15 flex flex-col justify-between space-y-6 group hover:border-[#C99454]/40 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-data">
                <span className="text-[#C99454] font-bold">TRACK {pillar.num}</span>
                <span className="text-[10px] text-[#8C8375] uppercase px-2 py-0.5 border border-white/10">
                  {pillar.badge}
                </span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-[#F7F5F0] group-hover:text-[#C99454] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs font-sans text-[#A69E90] leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 text-[11px] font-mono-data text-[#8C8375]">
              Kurikulum Resmi CCR Lab
            </div>
          </div>
        ))}
      </div>

      {/* Academy Callout Bar */}
      <div className="mt-10 p-6 bg-[#181614] border border-[#D8A86E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 border border-[#C99454]/40 flex items-center justify-center text-[#C99454]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-editorial font-bold text-[#F7F5F0]">
              Sertifikasi Digital &amp; Jalur Karir Barista
            </h4>
            <p className="text-xs font-sans text-[#A69E90]">
              Dilengkapi ujian kelulusan, Credential ID publik, dan kurikulum spesialisasi siap kerja.
            </p>
          </div>
        </div>

        <a
          href="https://edu.cherryroastery.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono-data text-[#C99454] hover:text-white uppercase tracking-wider flex items-center space-x-1.5 transition-colors self-start sm:self-center"
        >
          <span>Eksplorasi Modul &amp; Sertifikat</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
