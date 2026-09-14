"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Compass,
  Mountain,
  Heart,
  ShieldCheck,
  Flame,
  Coffee,
  Sparkles,
  ArrowRight,
  MapPin,
} from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C1A17] border border-[#D8A86E]/20 text-[#C99454] text-xs font-mono-data uppercase tracking-widest">
          <Mountain className="w-3.5 h-3.5" />
          <span>Asal-Usul & Filosofi Brand</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-bold text-white tracking-tight">
          Tentang Cherry Coffee Roastery
        </h1>

        <p className="text-base sm:text-lg font-sans text-[#B0A799] leading-relaxed max-w-2xl mx-auto">
          Induk dari seluruh ekosistem Cherry. Berakar di lereng berkabut Goalpara Estate Camp, kami mendedikasikan diri untuk seni menyeduh perlahan dan sains sangrai presisi.
        </p>
      </div>

      {/* 2. Big Editorial Manifesto Block */}
      <div className="relative p-10 sm:p-16 rounded-3xl bg-[#141311] border border-[#D8A86E]/20 shadow-2xl max-w-5xl mx-auto space-y-8">
        <div className="relative w-48 h-12">
          <Image
            src="/assets/branding/Logo Variation CCR-02.png"
            alt="Cherry Coffee Roastery"
            fill
            className="object-contain object-left filter brightness-110"
          />
        </div>

        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-editorial text-[#F5F2EB] italic leading-relaxed">
          &ldquo;Ditengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Karna terkadang, kopi disajikan untuk mereka yang tidak tergesa-gesa. Agar bisa menikmati setiap rasa, proses dan waktu.&rdquo;
        </blockquote>

        <p className="text-sm font-mono-data text-[#C99454] uppercase tracking-wider">
          — Slow Bar & Roastery Laboratory Manifesto
        </p>
      </div>

      {/* 3. The Dual Worlds: Roastery Lab & Slow Bar Sanctuary */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono-data text-[#C99454] uppercase tracking-widest">
            Dua Wajah di Kaki Gunung Gede
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white">
            Sains di Hari Kerja, Kedamaian di Akhir Pekan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Roastery Laboratory */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#161513] border border-white/10 space-y-5 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-[#2A231C] flex items-center justify-center text-[#C99454]">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono-data text-[#C99454] uppercase tracking-wider block">
              Senin – Jumat
            </span>
            <h3 className="text-2xl font-editorial font-bold text-white">
              Laboratorium Riset & Roastery
            </h3>
            <p className="text-sm font-sans text-[#A69E90] leading-relaxed">
              Di hari kerja, area ini berdenyut sebagai laboratorium sangrai. Kami menguji coba kurva Rate of Rise (RoR), mengevaluasi kerapatan sel green bean asal Selabintana dan Goalpara, serta merekayasa batch fermentasi anaerobik mikro. Ini adalah dapur riset tempat standar mutu Cherry diciptakan.
            </p>
            <div className="pt-2">
              <Link
                href="/laboratory"
                className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#C99454] hover:underline"
              >
                <span>Lihat Data Laboratorium</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Slow Bar Sanctuary */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#161513] border border-white/10 space-y-5 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-[#232B25] flex items-center justify-center text-emerald-400">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono-data text-emerald-400 uppercase tracking-wider block">
              Sabtu & Minggu (08.00 - 18.00 WIB)
            </span>
            <h3 className="text-2xl font-editorial font-bold text-white">
              Slow Bar di Alam Goalpara
            </h3>
            <p className="text-sm font-sans text-[#A69E90] leading-relaxed">
              Saat akhir pekan tiba, pintu slow bar kami dibuka untuk semua yang ingin jeda. Tanpa mesin espresso berisik komersial biasa, kami menyeduh manual brew satu per satu. Ditemani suara gemercik air sungai pegunungan, udara dingin 17°C, dan kudapan tradisional Jawa Barat.
            </p>
            <div className="pt-2">
              <Link
                href="/sanctuary"
                className="inline-flex items-center space-x-2 text-xs font-mono-data text-emerald-400 hover:underline"
              >
                <span>Panduan Kunjungan Sanctuary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="bg-[#12110F] border border-[#D8A86E]/15 rounded-3xl p-8 sm:p-14 space-y-10 shadow-2xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono-data text-[#C99454] uppercase tracking-widest">
            Prinsip Berkarya
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white">
            Nilai yang Kami Pegang Teguh
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-mono-data">
          <div className="space-y-2 p-5 rounded-2xl bg-[#181614] border border-white/5">
            <span className="text-[#C99454] text-sm font-bold block">01. Kejujuran Terroir</span>
            <p className="font-sans text-[#A69E90] leading-relaxed">
              Kami tidak menutupi rasa asli kopi dengan sangrai gosong atau perisa buatan. Biji kopi Sukabumi memiliki manis alami dan asam buah yang kaya, dan itulah yang kami tonjolkan.
            </p>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-[#181614] border border-white/5">
            <span className="text-[#C99454] text-sm font-bold block">02. Seni Kesabaran</span>
            <p className="font-sans text-[#A69E90] leading-relaxed">
              Kopi terbaik tidak bisa diburu-buru. Dari 72 jam fermentasi dingin di kabut gunung hingga 3 menit ekstraksi manual drip, kesabaran adalah bahan rahasia kami.
            </p>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-[#181614] border border-white/5">
            <span className="text-[#C99454] text-sm font-bold block">03. Ruang untuk Diri Sendiri</span>
            <p className="font-sans text-[#A69E90] leading-relaxed">
              Kami percaya setiap orang butuh tempat untuk bernapas lega. Cherry hadir bukan hanya sebagai roastery, melainkan sebagai ruang aman untuk mengistirahatkan pikiran.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Direct Connect & Location */}
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h3 className="text-3xl font-editorial font-bold text-white">
          Mari Duduk dan Berbincang
        </h3>
        <p className="text-sm font-sans text-[#A69E90] leading-relaxed">
          Kunjungi kami di Goalpara Estate Camp, atau hubungi concierge kami jika kamu ingin berdiskusi mengenai beans, wholesale, maupun kolaborasi sangrai.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/sanctuary"
            className="px-6 py-3 rounded-full bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono-data text-xs font-bold uppercase tracking-wider transition-all"
          >
            Rute Menuju Slow Bar
          </Link>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Cherry%20Coffee%20Roastery%2C%20saya%20ingin%20berkenalan%20dan%20berdiskusi."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#1C1A17] hover:bg-white/10 border border-white/10 text-white font-mono-data text-xs uppercase tracking-wider transition-all"
          >
            Hubungi Roastery Concierge
          </a>
        </div>
      </div>
    </div>
  );
}
