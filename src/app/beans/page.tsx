"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { beansData, BeanProduct } from "@/data/beans";
import { useLanguage } from "@/context/LanguageContext";
import Packaging3DModal from "@/components/3d/Packaging3DModal";
import { Compass, Eye, Filter, ArrowRight, Sparkles } from "lucide-react";

export default function BeansPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [modalBean, setModalBean] = useState<BeanProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBeans =
    selectedCategory === "all"
      ? beansData
      : beansData.filter((b) => b.category === selectedCategory);

  const handleInspect = (b: BeanProduct) => {
    setModalBean(b);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C1A17] border border-[#D8A86E]/20 text-[#C99454] text-xs font-mono-data uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>Alokasi Biji Kopi Sangrai Segar</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-white tracking-tight">
          Koleksi Biji Kopi Pilihan
        </h1>

        <p className="text-sm sm:text-base font-sans text-[#B0A799] leading-relaxed max-w-2xl mx-auto">
          Setiap biji disangrai di roastery Goalpara dengan memperhatikan densitas, kurva suhu drum, dan potensi intrinsik buah cherry kopi untuk menghasilkan kejernihan rasa berkelas dunia.
        </p>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: "all", label: "Semua Koleksi" },
            { id: "espresso", label: "Espresso Roast" },
            { id: "filter", label: "Filter / Manual Brew" },
            { id: "blend", label: "Signature Blend" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono-data uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#C99454] text-[#0E0D0C] font-bold shadow-lg shadow-[#C99454]/25 scale-105"
                  : "bg-[#161513] text-[#A69E90] border border-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Beans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBeans.map((bean) => {
          const primarySticker = bean.stickers[0];
          return (
            <div
              key={bean.id}
              className="group bg-[#141311] border border-white/10 hover:border-[#C99454]/40 rounded-3xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-2xl"
            >
              <div className="space-y-4">
                {/* Official Packaging Sticker Display */}
                <div className="relative w-full aspect-[945/405] rounded-2xl overflow-hidden bg-[#1D1B18] border border-white/5 shadow-inner">
                  <Image
                    src={primarySticker.image}
                    alt={bean.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-data">
                    <span className="uppercase text-[#C99454] font-bold">
                      {bean.category}
                    </span>
                    <span className="text-[#8C8375]">{bean.elevation}</span>
                  </div>

                  <h2 className="text-3xl font-editorial font-bold text-white group-hover:text-[#C99454] transition-colors">
                    {bean.name}
                  </h2>
                  <p className="text-xs font-sans text-[#A69E90]">
                    {bean.subtitle}
                  </p>

                  {/* Tasting Notes */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {bean.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-sans px-2.5 py-1 rounded-lg bg-[#1C1A17] border border-white/5 text-[#E6DFD5]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-sans text-[#8C8375] line-clamp-2 pt-2 leading-relaxed">
                    {bean.description[language]}
                  </p>
                </div>
              </div>

              {/* Bottom Actions: Inspect 3D Bag & Price */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-data text-[#8C8375] block">Mulai</span>
                  <span className="text-xl font-editorial font-bold text-white">
                    Rp {bean.prices["200g"].toLocaleString("id-ID")}
                  </span>
                </div>

                <button
                  onClick={() => handleInspect(bean)}
                  className="px-4 py-2.5 rounded-xl bg-[#23211E] hover:bg-[#C99454] text-[#DCD5C8] hover:text-[#0E0D0C] border border-white/10 transition-all font-mono-data text-xs font-bold flex items-center space-x-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspeksi 3D</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D Packaging Modal */}
      <Packaging3DModal
        bean={modalBean}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
