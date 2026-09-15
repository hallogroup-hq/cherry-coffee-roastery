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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 bg-[#F7F4EE] text-[#181715]">
      {/* 1. Header Banner */}
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
          <Mountain className="w-3.5 h-3.5" />
          <span>HISTOIRE DU TERROIR · FILOSOFI INDUK · 1.250 MDPL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-bold text-[#181715] tracking-tight">
          Tentang Cherry Coffee Roastery
        </h1>

        <p className="text-base sm:text-lg font-sans text-[#4A433B] leading-relaxed max-w-2xl mx-auto">
          Induk dari seluruh ekosistem Cherry. Berakar di lereng berkabut Goalpara Estate Camp, kami mendedikasikan diri untuk seni menyeduh perlahan dan sains sangrai presisi.
        </p>
      </div>

      {/* 2. Big Editorial Manifesto Block */}
      <div className="relative p-10 sm:p-16 bg-[#FAF8F5] border-2 border-[#D5CEC2] shadow-[0_12px_40px_rgba(74,67,59,0.08)] max-w-5xl mx-auto space-y-8 rounded-xs">
        {/* Inset Hairline */}
        <div className="absolute inset-1.5 border border-[#E5DFD3] pointer-events-none" />

        <div className="relative w-48 h-12">
          <Image
            src="/assets/branding/Logo Variation CCR-01.png"
            alt="Cherry Coffee Roastery"
            fill
            className="object-contain object-left"
          />
        </div>

        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-editorial text-[#181715] italic leading-relaxed">
          &ldquo;Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Karena terkadang, kopi disajikan untuk mereka yang tidak tergesa-gesa. Agar bisa menikmati setiap rasa, proses, dan waktu.&rdquo;
        </blockquote>

        <p className="text-xs font-mono text-[#721C24] uppercase tracking-wider font-bold">
          — MANIFESTO SLOW BAR &amp; ROASTERY LABORATORY MMXXIV
        </p>
      </div>

      {/* 3. The Dual Worlds: Roastery Lab & Slow Bar Sanctuary */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-[#721C24] uppercase tracking-widest font-bold">
            DUALITAS DI KAKI GUNUNG GEDE
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#181715]">
            Sains di Hari Kerja, Kedamaian di Akhir Pekan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Roastery Laboratory */}
          <div className="p-8 sm:p-10 bg-[#FAF8F5] border-2 border-[#D5CEC2] space-y-5 shadow-[0_8px_24px_rgba(74,67,59,0.06)] relative">
            <div className="w-12 h-12 bg-[#F2ECE0] border border-[#C5BCAB] flex items-center justify-center text-[#721C24]">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#721C24] uppercase tracking-wider font-bold block">
              Senin – Jumat
            </span>
            <h3 className="text-2xl font-editorial font-bold text-[#181715]">
              Laboratorium Riset &amp; Roastery
            </h3>
            <p className="text-sm font-sans text-[#5A534B] leading-relaxed">
              Di hari kerja, area ini berdenyut sebagai laboratorium sangrai. Kami menguji coba kurva Rate of Rise (RoR), mengevaluasi kerapatan sel green bean asal Selabintana dan Goalpara, serta merekayasa batch fermentasi anaerobik mikro. Ini adalah dapur riset tempat standar mutu Cherry diciptakan.
            </p>
            <div className="pt-2">
              <Link
                href="/laboratory"
                className="inline-flex items-center space-x-2 text-xs font-mono text-[#721C24] hover:text-[#8C6E2E] font-bold uppercase tracking-wider"
              >
                <span>Lihat Data Laboratorium</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Slow Bar Sanctuary */}
          <div className="p-8 sm:p-10 bg-[#FAF8F5] border-2 border-[#D5CEC2] space-y-5 shadow-[0_8px_24px_rgba(74,67,59,0.06)] relative">
            <div className="w-12 h-12 bg-[#F2ECE0] border border-[#C5BCAB] flex items-center justify-center text-[#8C6E2E]">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#8C6E2E] uppercase tracking-wider font-bold block">
              Sabtu &amp; Minggu (09.00 - 18.00 WIB)
            </span>
            <h3 className="text-2xl font-editorial font-bold text-[#181715]">
              Slow Bar di Alam Goalpara
            </h3>
            <p className="text-sm font-sans text-[#5A534B] leading-relaxed">
              Saat akhir pekan tiba, pintu slow bar kami dibuka untuk semua yang ingin jeda. Tanpa mesin espresso berisik komersial biasa, kami menyeduh manual brew satu per satu. Ditemani suara gemercik air sungai pegunungan, udara dingin 17°C, dan kudapan tradisional Jawa Barat.
            </p>
            <div className="pt-2">
              <Link
                href="/sanctuary"
                className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C6E2E] hover:text-[#721C24] font-bold uppercase tracking-wider"
              >
                <span>Panduan Kunjungan Sanctuary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="bg-[#FAF8F5] border-2 border-[#D5CEC2] p-8 sm:p-14 space-y-10 shadow-md relative">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono text-[#721C24] uppercase tracking-widest font-bold">
            PRINSIP &amp; NILAI DASAR
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#181715]">
            Nilai yang Kami Pegang Teguh
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-mono">
          <div className="space-y-2 p-5 bg-[#F2ECE0] border border-[#C5BCAB]">
            <span className="text-[#721C24] text-sm font-bold block">01. Kejujuran Terroir</span>
            <p className="font-sans text-[#5A534B] leading-relaxed">
              Kami tidak menutupi rasa asli kopi dengan sangrai gosong atau perisa buatan. Biji kopi Sukabumi memiliki manis alami dan asam buah yang kaya, dan itulah yang kami tonjolkan.
            </p>
          </div>

          <div className="space-y-2 p-5 bg-[#F2ECE0] border border-[#C5BCAB]">
            <span className="text-[#721C24] text-sm font-bold block">02. Seni Kesabaran</span>
            <p className="font-sans text-[#5A534B] leading-relaxed">
              Kopi terbaik tidak bisa diburu-buru. Dari 72 jam fermentasi dingin di kabut gunung hingga 3 menit ekstraksi manual drip, kesabaran adalah bahan rahasia kami.
            </p>
          </div>

          <div className="space-y-2 p-5 bg-[#F2ECE0] border border-[#C5BCAB]">
            <span className="text-[#721C24] text-sm font-bold block">03. Ruang untuk Diri Sendiri</span>
            <p className="font-sans text-[#5A534B] leading-relaxed">
              Kami percaya setiap orang butuh tempat untuk bernapas lega. Cherry hadir bukan hanya sebagai roastery, melainkan sebagai ruang aman untuk mengistirahatkan pikiran.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Direct Connect & Location */}
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h3 className="text-3xl font-editorial font-bold text-[#181715]">
          Mari Duduk dan Berbincang
        </h3>
        <p className="text-sm font-sans text-[#5A534B] leading-relaxed">
          Kunjungi kami di Goalpara Estate Camp, atau hubungi concierge kami jika kamu ingin berdiskusi mengenai beans, wholesale, maupun kolaborasi sangrai.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/sanctuary"
            className="px-6 py-3 bg-[#721C24] hover:bg-[#8B2635] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
          >
            Rute Menuju Slow Bar
          </Link>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Cherry%20Coffee%20Roastery%2C%20saya%20ingin%20berkenalan%20dan%20berdiskusi."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#FAF8F5] hover:bg-[#F2ECE0] border border-[#C5BCAB] text-[#181715] font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            Hubungi Roastery Concierge
          </a>
        </div>
      </div>
    </div>
  );
}
