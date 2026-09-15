"use client";

import React from "react";
import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, ArrowRight, Clock, User } from "lucide-react";

export default function JournalPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 bg-[#F7F4EE] text-[#181715]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        {/* Wax Seal Monogram Badge */}
        <div className="inline-flex items-center justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-[#721C24] border-2 border-[#56151B] shadow-[0_4px_16px_rgba(114,28,36,0.3)] flex items-center justify-center text-center text-white">
            <span className="text-[8px] font-editorial italic tracking-widest uppercase block leading-none font-bold">
              CCR<br />
              <span className="text-[6px] font-mono tracking-normal opacity-90">1803</span>
            </span>
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#F2ECE0] border border-[#C5BCAB] text-[#721C24] text-xs font-mono uppercase tracking-widest font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>JOURNAL D&apos;ATELIER · FEUILLETON &amp; ESSAIS DU TERROIR</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-[#181715] tracking-tight">
          Jurnal &amp; Catatan Rasa
        </h1>

        <p className="text-base sm:text-lg font-sans text-[#4A433B] leading-relaxed max-w-2xl mx-auto">
          Esai tentang seni memperlambat hidup, eksplorasi kopi di pedesaan Jawa Barat, dan sains di balik setiap cangkir yang diseduh di Goalpara Estate.
        </p>
      </div>

      {/* Featured Lead Article: Large Folio Card */}
      {journalArticles[0] && (
        <div className="relative p-8 sm:p-14 bg-[#FAF8F5] border-2 border-[#D5CEC2] shadow-[0_12px_40px_rgba(74,67,59,0.08)] overflow-hidden group rounded-xs">
          {/* Inset Hairline */}
          <div className="absolute inset-1.5 border border-[#E5DFD3] pointer-events-none" />

          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="flex items-center space-x-3 text-xs font-mono text-[#721C24]">
              <span className="uppercase font-bold tracking-wider">
                {journalArticles[0].category}
              </span>
              <span>·</span>
              <span className="text-[#7A7268]">{journalArticles[0].readTime}</span>
              <span>·</span>
              <span className="text-[#7A7268]">{journalArticles[0].date}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#181715] group-hover:text-[#721C24] transition-colors leading-tight">
              {journalArticles[0].title[language]}
            </h2>

            <p className="text-sm sm:text-base font-sans text-[#4A433B] leading-relaxed">
              {journalArticles[0].excerpt[language]}
            </p>

            <div className="pt-4">
              <Link
                href={`/journal/${journalArticles[0].slug}`}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#721C24] hover:bg-[#8B2635] text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-xs"
              >
                <span>Baca Esai Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {journalArticles.slice(1).map((art) => (
          <Link
            key={art.id}
            href={`/journal/${art.slug}`}
            className="group p-8 bg-[#FAF8F5] border-2 border-[#D5CEC2] hover:border-[#721C24] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-[0_8px_24px_rgba(74,67,59,0.06)] relative"
          >
            {/* Inset Hairline */}
            <div className="absolute inset-1.5 border border-[#E5DFD3] pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between text-xs font-mono text-[#7A7268]">
                <span className="text-[#721C24] font-bold uppercase">{art.category}</span>
                <span>{art.readTime}</span>
              </div>

              <h3 className="text-2xl font-editorial font-bold text-[#181715] group-hover:text-[#721C24] transition-colors leading-snug">
                {art.title[language]}
              </h3>

              <p className="text-sm font-sans text-[#5A534B] line-clamp-3 leading-relaxed">
                {art.excerpt[language]}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-between text-xs font-mono text-[#721C24] font-bold uppercase tracking-wider relative z-10">
              <span>Baca Selengkapnya</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
