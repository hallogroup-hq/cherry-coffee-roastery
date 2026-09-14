"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import GoalparaLiveWidget from "@/components/sanctuary/GoalparaLiveWidget";
import {
  Compass,
  Mountain,
  Wind,
  Coffee,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export default function SanctuaryPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* 1. Hero Sanctuary Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C1A17] border border-[#D8A86E]/20 text-[#C99454] text-xs font-mono-data uppercase tracking-widest">
          <Mountain className="w-3.5 h-3.5" />
          <span>Goalpara Estate Camp · Sukabumi · 1.250 mdpl</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-bold text-white tracking-tight">
          The Sanctuary
        </h1>

        <p className="text-base sm:text-lg font-sans text-[#B0A799] leading-relaxed max-w-2xl mx-auto">
          Slow bar di tengah rimbun kebun teh dan pinus di lereng Gunung Gede Pangrango. Tempat beristirahat sejenak dari keriuhan, menghirup udara dingin, dan menikmati kopi yang diseduh tanpa ketergesaan.
        </p>
      </div>

      {/* 2. Live Telemetry & Weather Widget */}
      <GoalparaLiveWidget />

      {/* 3. The Atmosphere & Slow Bar Rituals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-[#141311] border border-white/10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#232B25] flex items-center justify-center text-emerald-400">
            <Wind className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-editorial font-bold text-white">
            Aliran Sungai & Hawa Dingin
          </h3>
          <p className="text-sm font-sans text-[#A69E90] leading-relaxed">
            Mendinginkan pikiran, mendengarkan suara aliran sungai, sambil meminum kopi racikan kami. Bukankah itu ide yang bagus untuk menikmati akhir pekan?
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#141311] border border-white/10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#2A231C] flex items-center justify-center text-[#C99454]">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-editorial font-bold text-white">
            Seduhan Lambat & Kudapan Hangat
          </h3>
          <p className="text-sm font-sans text-[#A69E90] leading-relaxed">
            Menutup akhir pekan dengan menikmati kopi, makanan tradisional, dinginnya Goalpara, dilengkapi lantunan musik yang membuat suasananya terasa sempurna.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#141311] border border-white/10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#1F1E2A] flex items-center justify-center text-indigo-300">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-editorial font-bold text-white">
            Tanpa Perlu Reservasi Ketat
          </h3>
          <p className="text-sm font-sans text-[#A69E90] leading-relaxed">
            Silakan langsung singgah setiap Sabtu dan Minggu. Duduklah di pinggir aliran air, nikmati hawa berkabut, dan biarkan waktu mengalir lambat.
          </p>
        </div>
      </div>

      {/* 4. Large Narrative Quote */}
      <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-[#1A1815] via-[#141311] to-[#0E0D0C] border border-[#D8A86E]/20 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
        <Sparkles className="w-8 h-8 text-[#C99454] mx-auto opacity-75" />
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-editorial text-white leading-relaxed italic">
          &ldquo;Ditengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Karna terkadang, kopi disajikan untuk mereka yang tidak tergesa-gesa.&rdquo;
        </blockquote>
        <p className="text-xs font-mono-data text-[#C99454] uppercase tracking-widest">
          — Cherry Coffee Roastery, Goalpara Estate
        </p>
      </div>

      {/* 5. Visiting Guide & Itinerary */}
      <section className="bg-[#141311] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
        <div className="border-b border-white/10 pb-6">
          <span className="text-xs font-mono-data text-[#C99454] uppercase tracking-widest block">
            Panduan Kunjungan Akhir Pekan
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white mt-1">
            Cara Menuju Slow Bar Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-sans text-[#B0A799] leading-relaxed">
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white font-mono-data uppercase">
              1. Rute Perjalanan
            </h4>
            <p>
              Dari pusat Kota Sukabumi, arahkan kendaraan ke arah Cisarua menuju Goalpara Tea Plantation (sekitar 30-40 menit perjalanan). Ikuti jalan beraspal menanjak yang dikelilingi hamparan kebun teh hijau.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-bold text-white font-mono-data uppercase">
              2. Suhu & Perlengkapan
            </h4>
            <p>
              Suhu udara di Goalpara berkisar antara 16°C hingga 21°C. Disarankan membawa jaket atau pakaian hangat, terutama jika kamu berencana menikmati senja di slow bar hingga menjelang kabut malam turun.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center space-x-2 text-xs font-mono-data text-[#A69E90]">
            <MapPin className="w-4 h-4 text-[#C99454]" />
            <span>Goalpara Estate Camp, Sukabumi, Jawa Barat</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/cherrycoffeeroastery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#C99454] hover:text-white transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@cherrycoffeeroastery</span>
            </a>

            <a
              href="https://maps.google.com/?q=Goalpara+Estate+Camp+Sukabumi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono-data text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Buka Google Maps</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
