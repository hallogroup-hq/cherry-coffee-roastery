"use client";

import React from "react";
import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, ArrowRight, Clock, User } from "lucide-react";

export default function JournalPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C1A17] border border-[#D8A86E]/20 text-[#C99454] text-xs font-mono-data uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Field Notes, Reflections & Coffee Science</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-white tracking-tight">
          Jurnal & Catatan Rasa
        </h1>

        <p className="text-base sm:text-lg font-sans text-[#B0A799] leading-relaxed max-w-2xl mx-auto">
          Esai tentang seni memperlambat hidup, eksplorasi kopi di pedesaan Jawa Barat, dan sains di balik setiap cangkir yang diseduh di Goalpara Estate.
        </p>
      </div>

      {/* Featured Lead Article */}
      {journalArticles[0] && (
        <div className="relative p-8 sm:p-14 rounded-3xl bg-[#141311] border border-[#D8A86E]/25 shadow-2xl overflow-hidden group">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center space-x-3 text-xs font-mono-data text-[#C99454]">
              <span className="uppercase font-bold tracking-wider">
                {journalArticles[0].category}
              </span>
              <span>·</span>
              <span className="text-[#8C8375]">{journalArticles[0].readTime}</span>
              <span>·</span>
              <span className="text-[#8C8375]">{journalArticles[0].date}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-white group-hover:text-[#C99454] transition-colors leading-tight">
              {journalArticles[0].title[language]}
            </h2>

            <p className="text-sm sm:text-base font-sans text-[#B0A799] leading-relaxed">
              {journalArticles[0].excerpt[language]}
            </p>

            <div className="pt-4">
              <Link
                href={`/journal/${journalArticles[0].slug}`}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono-data text-xs uppercase font-bold tracking-wider transition-all"
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
            className="group p-8 rounded-3xl bg-[#141311] border border-white/10 hover:border-[#C99454]/40 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-data text-[#8C8375]">
                <span className="text-[#C99454]">{art.category}</span>
                <span>{art.readTime}</span>
              </div>

              <h3 className="text-2xl font-editorial font-bold text-white group-hover:text-[#C99454] transition-colors leading-snug">
                {art.title[language]}
              </h3>

              <p className="text-sm font-sans text-[#A69E90] line-clamp-3 leading-relaxed">
                {art.excerpt[language]}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono-data text-[#C99454]">
              <span>Baca Selengkapnya</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
