"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { beansData, BeanProduct } from "@/data/beans";
import { journalArticles } from "@/data/journal";
import TactileLoupeHero from "@/components/atelier/TactileLoupeHero";
import Packaging3DModal from "@/components/3d/Packaging3DModal";
import RoastCurveGraph from "@/components/laboratory/RoastCurveGraph";
import GoalparaLiveWidget from "@/components/sanctuary/GoalparaLiveWidget";
import {
  ArrowRight,
  Sparkles,
  Compass,
  ShoppingBag,
  Flame,
  Wind,
  Coffee,
  Quote,
  Eye,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export default function HomePage() {
  const { t, language } = useLanguage();
  const { addItem } = useCart();

  const [selectedBeanForModal, setSelectedBeanForModal] = useState<BeanProduct | null>(null);
  const [isPackagingModalOpen, setIsPackagingModalOpen] = useState(false);

  const openInspection = (bean: BeanProduct) => {
    setSelectedBeanForModal(bean);
    setIsPackagingModalOpen(true);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. FLAGSHIP ATELIER HERO: TACTILE MACRO LOUPE & TERROIR STAGES */}
      <TactileLoupeHero />

      {/* 2. THE SOULFUL MANIFESTO: CONTEMPLATIVE SLOW LIVING (@CHERRYBAR.ID) */}
      <section className="relative bg-[#12110F] border-y border-[#D8A86E]/15 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Main Poetic Quote */}
          <div className="relative p-8 sm:p-14 rounded-3xl bg-[#181614] border border-[#D8A86E]/20 shadow-2xl">
            <Quote className="w-10 h-10 text-[#C99454]/40 mb-6" />
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal text-[#F5F2EB] leading-relaxed italic">
              &ldquo;{t.manifesto.quote1}&rdquo;
            </blockquote>
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-mono-data text-[#C99454] uppercase tracking-wider">
                {t.manifesto.author1}
              </span>
              <a
                href="https://instagram.com/cherrybar.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#A69E90] hover:text-[#C99454] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#C99454]" />
                <span>Dokumentasi Cerita di @cherrybar.id</span>
              </a>
            </div>
          </div>

          {/* Dual Vignettes: Stream & Mountain Atmosphere */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#181614]/70 border border-white/5 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#232B25] flex items-center justify-center text-emerald-400">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial text-white font-semibold">
                Aliran Sungai & Dinginnya Goalpara
              </h3>
              <p className="text-sm font-sans text-[#A69E90] leading-relaxed italic">
                &ldquo;{t.manifesto.quote2}&rdquo;
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#181614]/70 border border-white/5 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#2A231C] flex items-center justify-center text-amber-400">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial text-white font-semibold">
                Harmoni Musik & Makanan Tradisional
              </h3>
              <p className="text-sm font-sans text-[#A69E90] leading-relaxed italic">
                &ldquo;{t.manifesto.quote3}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BEANS SHOWCASE: CURATED SPECIALTY ROASTS & 3D PACKAGING INSPECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono-data tracking-widest text-[#C99454] block">
              {t.beansSection.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-white">
              {t.beansSection.title}
            </h2>
            <p className="text-sm font-sans text-[#A69E90] max-w-xl">
              {t.beansSection.subtitle}
            </p>
          </div>

          <Link
            href="/beans"
            className="inline-flex items-center space-x-2 text-xs font-mono-data uppercase tracking-wider text-[#C99454] hover:text-white transition-colors group"
          >
            <span>{t.beansSection.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bean Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beansData.map((bean) => {
            const primarySticker = bean.stickers[0];
            return (
              <div
                key={bean.id}
                className="group relative bg-[#141311] border border-white/10 hover:border-[#C99454]/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                {/* Top Image: Official Packaging Sticker */}
                <div className="space-y-4">
                  <div className="relative w-full aspect-[945/405] rounded-2xl overflow-hidden bg-[#1D1B18] border border-white/5 shadow-inner">
                    <Image
                      src={primarySticker.image}
                      alt={bean.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono-data">
                      <span className="uppercase text-[#C99454] font-bold">
                        {bean.category}
                      </span>
                      <span className="text-[#8C8375]">{bean.elevation}</span>
                    </div>

                    <h3 className="text-2xl font-editorial font-bold text-white group-hover:text-[#C99454] transition-colors">
                      {bean.name}
                    </h3>
                    <p className="text-xs font-sans text-[#A69E90] line-clamp-1">
                      {bean.subtitle}
                    </p>

                    {/* Tasting Notes Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {bean.tastingNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-sans px-2.5 py-0.5 rounded-md bg-[#1C1A17] border border-white/5 text-[#DCD5C8]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Inspect 3D Bag & Price */}
                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono-data text-[#8C8375] block">Mulai Dari</span>
                    <span className="text-base font-editorial font-bold text-white">
                      Rp {(bean.prices["200g"] / 1000).toLocaleString("id-ID")}k
                    </span>
                  </div>

                  <button
                    onClick={() => openInspection(bean)}
                    className="p-2.5 rounded-xl bg-[#23211E] hover:bg-[#C99454] text-[#DCD5C8] hover:text-[#0E0D0C] border border-white/10 transition-all active:scale-95 flex items-center space-x-1.5 text-xs font-mono-data"
                    title="Inspeksi Kemasan 3D"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Lihat 3D</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. THE ROASTERY LABORATORY TEASER & INTERACTIVE MODEL */}
      <section className="relative bg-[#0F0E0D] border-t border-[#D8A86E]/15 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono-data tracking-widest text-[#C99454] block">
                {t.laboratorySection.badge}
              </span>
              <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-white">
                {t.laboratorySection.title}
              </h2>
              <p className="text-sm font-sans text-[#A69E90] max-w-xl">
                {t.laboratorySection.subtitle}
              </p>
            </div>

            <Link
              href="/laboratory"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#1C1A17] hover:bg-[#C99454] hover:text-[#0E0D0C] border border-[#D8A86E]/30 text-xs font-mono-data uppercase tracking-wider text-[#DCD5C8] transition-all"
            >
              <span>{t.laboratorySection.exploreLab}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Roast Curve Simulator */}
          <RoastCurveGraph />
        </div>
      </section>

      {/* 5. THE SANCTUARY: GOALPARA SLOW BAR TELEMETRY */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono-data tracking-widest text-[#C99454] block">
            {t.sanctuarySection.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-white">
            {t.sanctuarySection.title}
          </h2>
          <p className="text-sm font-sans text-[#A69E90] leading-relaxed">
            {t.sanctuarySection.subtitle}
          </p>
        </div>

        <GoalparaLiveWidget />
      </section>

      {/* 6. PERGANTIAN MUSIM & APRESIASI DIRI REFLECTION */}
      <section className="relative bg-gradient-to-b from-[#141311] via-[#1A1815] to-[#0E0D0C] border-y border-[#D8A86E]/15 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-12 h-12 rounded-full bg-[#C99454]/15 border border-[#C99454]/30 mx-auto flex items-center justify-center text-[#C99454]">
            <Sparkles className="w-6 h-6" />
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-white leading-tight">
            {t.manifesto.yearEndTitle}
          </h3>

          <p className="text-base sm:text-lg font-editorial italic text-[#DCD5C8] leading-relaxed whitespace-pre-line max-w-2xl mx-auto">
            {t.manifesto.yearEndText}
          </p>

          <div className="pt-4">
            <Link
              href="/sanctuary"
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] text-xs font-mono-data uppercase font-bold tracking-wider transition-all shadow-xl shadow-[#C99454]/20"
            >
              <span>{t.manifesto.visitCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. JOURNAL & FIELD NOTES PREVIEW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono-data tracking-widest text-[#C99454] block">
              {t.journalSection.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-white">
              {t.journalSection.title}
            </h2>
            <p className="text-sm font-sans text-[#A69E90] max-w-xl">
              {t.journalSection.subtitle}
            </p>
          </div>

          <Link
            href="/journal"
            className="inline-flex items-center space-x-2 text-xs font-mono-data uppercase tracking-wider text-[#C99454] hover:text-white transition-colors group"
          >
            <span>Lihat Semua Jurnal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalArticles.map((art) => (
            <Link
              key={art.id}
              href={`/journal/${art.slug}`}
              className="group p-6 rounded-3xl bg-[#141311] border border-white/10 hover:border-[#C99454]/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono-data text-[#8C8375]">
                  <span>{art.category}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-xl font-editorial font-bold text-white group-hover:text-[#C99454] transition-colors leading-snug">
                  {art.title[language]}
                </h3>
                <p className="text-xs font-sans text-[#A69E90] line-clamp-3 leading-relaxed">
                  {art.excerpt[language]}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono-data text-[#C99454]">
                <span>{t.journalSection.readStory}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3D Packaging Inspection Modal */}
      <Packaging3DModal
        bean={selectedBeanForModal}
        isOpen={isPackagingModalOpen}
        onClose={() => setIsPackagingModalOpen(false)}
      />
    </div>
  );
}
