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
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#E5DFD3]">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DFD3] pb-10">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#721C24] uppercase tracking-widest font-bold">
            <span>[ CONSERVATOIRE &amp; ÉCOLE DU CAFÉ ]</span>
            <span>·</span>
            <span>HULU HINGGA HILIR</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#181715] leading-[1.08]">
            CherryEdu. <br />
            <span className="italic font-light text-[#721C24]">
              Indonesian Specialty Coffee Academy.
            </span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#4A433B] max-w-2xl leading-relaxed">
            Misi kami tidak berhenti pada cangkir yang diseduh di Goalpara. Dibina langsung oleh tim roaster dan barista Cherry Coffee Roastery, CherryEdu hadir memberdayakan siapa pun—dari penikmat rumahan hingga calon profesional—untuk memahami kopi secara utuh dari tanah perkebunan hingga ke ekstraksi presisi.
          </p>
        </div>

        <a
          href="https://edu.cherrycoffeeroastery.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#721C24] hover:bg-[#8B2635] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs group"
        >
          <span>Buka Platform CherryEdu</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Curriculum Tracks: Botanical Folio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {learningPillars.map((pillar) => (
          <div
            key={pillar.num}
            className="p-6 bg-[#FAF8F5] border-2 border-[#D5CEC2] flex flex-col justify-between space-y-6 group hover:border-[#721C24] transition-all shadow-[0_4px_16px_rgba(74,67,59,0.04)] relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#721C24] font-bold">TRACK {pillar.num}</span>
                <span className="text-[10px] text-[#7A7268] uppercase px-2 py-0.5 border border-[#D5CEC2] bg-[#F2EFE8]">
                  {pillar.badge}
                </span>
              </div>
              <h3 className="text-xl font-editorial font-bold text-[#181715] group-hover:text-[#721C24] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs font-sans text-[#5A534B] leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DFD3] text-[10px] font-mono text-[#7A7268] uppercase tracking-wider">
              KURIKULUM RESMI CCR LAB
            </div>
          </div>
        ))}
      </div>

      {/* Academy Callout Bar */}
      <div className="mt-10 p-6 bg-[#FAF8F5] border-2 border-[#D5CEC2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 border border-[#C5BCAB] bg-[#F2ECE0] flex items-center justify-center text-[#721C24] shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-editorial font-bold text-[#181715]">
              Sertifikasi Digital &amp; Jalur Karir Barista
            </h4>
            <p className="text-xs font-sans text-[#7A7268]">
              Dilengkapi ujian kompetensi, Credential ID publik terverifikasi, dan kurikulum spesialisasi siap industri.
            </p>
          </div>
        </div>

        <a
          href="https://edu.cherrycoffeeroastery.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-[#721C24] hover:text-[#8C6E2E] uppercase tracking-wider font-bold flex items-center space-x-1.5 transition-colors self-start sm:self-center"
        >
          <span>Eksplorasi Modul &amp; Sertifikat</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
