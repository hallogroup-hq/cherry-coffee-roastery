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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 bg-[#F7F4EE] text-[#181715]">
      {/* 1. Hero Sanctuary Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        {/* Wax Seal Monogram Badge */}
        <div className="inline-flex items-center justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-[#721C24] border-2 border-[#56151B] shadow-[0_4px_16px_rgba(114,28,36,0.3)] flex items-center justify-center text-center text-white">
            <span className="text-[8px] font-editorial italic tracking-widest uppercase block leading-none font-bold">
              CCR<br />
              <span className="text-[6px] font-mono tracking-normal opacity-90">1.250M</span>
            </span>
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#F2ECE0] border border-[#C5BCAB] text-[#721C24] text-xs font-mono uppercase tracking-widest font-bold">
          <Mountain className="w-3.5 h-3.5" />
          <span>GOALPARA ESTATE CAMP · SUKABUMI · 1.250 MDPL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-bold text-[#181715] tracking-tight">
          The Sanctuary
        </h1>

        <p className="text-base sm:text-lg font-sans text-[#4A433B] leading-relaxed max-w-2xl mx-auto">
          Slow bar di tengah rimbun kebun teh dan pinus di lereng Gunung Gede Pangrango. Tempat beristirahat sejenak dari keriuhan, menghirup udara dingin, dan menikmati kopi yang diseduh tanpa ketergesaan.
        </p>
      </div>

      {/* 2. Live Telemetry & Weather Widget */}
      <GoalparaLiveWidget />

      {/* 3. The Atmosphere & Slow Bar Rituals: Archival Folio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-[#FAF8F5] border-2 border-[#D5CEC2] space-y-4 shadow-[0_8px_24px_rgba(74,67,59,0.06)] relative">
          <div className="w-12 h-12 bg-[#F2ECE0] border border-[#C5BCAB] flex items-center justify-center text-[#721C24]">
            <Wind className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-editorial font-bold text-[#181715]">
            Aliran Sungai &amp; Hawa Dingin
          </h3>
          <p className="text-sm font-sans text-[#5A534B] leading-relaxed">
            Mendinginkan pikiran, mendengarkan suara aliran sungai alami, sambil meminum kopi racikan kami. Sebuah ritual hening untuk mengawali akhir pekan.
          </p>
        </div>

        <div className="p-8 bg-[#FAF8F5] border-2 border-[#D5CEC2] space-y-4 shadow-[0_8px_24px_rgba(74,67,59,0.06)] relative">
          <div className="w-12 h-12 bg-[#F2ECE0] border border-[#C5BCAB] flex items-center justify-center text-[#8C6E2E]">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-editorial font-bold text-[#181715]">
            Seduhan Lambat &amp; Kudapan Hangat
          </h3>
          <p className="text-sm font-sans text-[#5A534B] leading-relaxed">
            Menutup sore hari dengan menikmati kopi manual brew, kudapan tradisional, dan dinginnya kabut Goalpara yang merayap di sela-sela pinus.
          </p>
        </div>

        <div className="p-8 bg-[#FAF8F5] border-2 border-[#D5CEC2] space-y-4 shadow-[0_8px_24px_rgba(74,67,59,0.06)] relative">
          <div className="w-12 h-12 bg-[#F2ECE0] border border-[#C5BCAB] flex items-center justify-center text-[#721C24]">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-editorial font-bold text-[#181715]">
            Tanpa Perlu Reservasi Ketat
          </h3>
          <p className="text-sm font-sans text-[#5A534B] leading-relaxed">
            Silakan langsung singgah setiap Sabtu dan Minggu. Duduklah di pinggir jendela kayu, nikmati hawa berkabut, dan biarkan waktu mengalir lambat.
          </p>
        </div>
      </div>

      {/* 4. Large Narrative Quote Placard */}
      <div className="relative p-10 sm:p-16 bg-[#F2ECE0] border-2 border-[#C5BCAB] text-center max-w-4xl mx-auto space-y-6 shadow-md">
        <Sparkles className="w-7 h-7 text-[#721C24] mx-auto opacity-75" />
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-editorial text-[#181715] leading-relaxed italic">
          &ldquo;Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Karena terkadang, kopi disajikan untuk mereka yang tidak tergesa-gesa.&rdquo;
        </blockquote>
        <p className="text-xs font-mono text-[#721C24] uppercase tracking-widest font-bold">
          — CHERRY COFFEE ROASTERY, GOALPARA ESTATE MMXXIV
        </p>
      </div>

      {/* 5. Visiting Guide & Itinerary */}
      <section className="bg-[#FAF8F5] border-2 border-[#D5CEC2] p-8 sm:p-12 space-y-8 shadow-md">
        <div className="border-b border-[#E5DFD3] pb-6">
          <span className="text-xs font-mono text-[#721C24] uppercase tracking-widest block font-bold">
            ITINÉRAIRE &amp; GUIDE DE VISITE
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#181715] mt-1">
            Cara Menuju Slow Bar Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-sans text-[#5A534B] leading-relaxed">
          <div className="space-y-3">
            <h4 className="text-base font-bold text-[#181715] font-mono uppercase">
              1. Rute Perjalanan
            </h4>
            <p>
              Dari pusat Kota Sukabumi, arahkan kendaraan ke arah Cisarua menuju Goalpara Tea Plantation (sekitar 35 menit perjalanan). Ikuti jalan beraspal menanjak yang dikelilingi hamparan kebun teh hijau.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-bold text-[#181715] font-mono uppercase">
              2. Suhu &amp; Perlengkapan
            </h4>
            <p>
              Suhu udara di Goalpara berkisar antara 16°C hingga 21°C. Disarankan membawa jaket atau pakaian hangat, terutama jika kamu berencana menikmati senja di slow bar hingga kabut malam turun.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5DFD3]">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#7A7268]">
            <MapPin className="w-4 h-4 text-[#721C24]" />
            <span>Goalpara Estate Camp, Sukabumi, Jawa Barat</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/cherrycoffeeroastery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-mono text-[#721C24] hover:text-[#8C6E2E] transition-colors font-bold uppercase"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@cherrycoffeeroastery</span>
            </a>

            <a
              href="https://maps.google.com/?q=Goalpara+Estate+Camp+Sukabumi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#721C24] hover:bg-[#8B2635] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-xs"
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
