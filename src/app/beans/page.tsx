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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-[#F7F4EE] text-[#181715]">
      {/* Header Banner */}
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
          <Compass className="w-3.5 h-3.5" />
          <span>REGISTRE OFFICIEL · RÉCOLTES SÉLECTIONNÉES · 1.250 MDPL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-[#181715] tracking-tight">
          Registre des Spécimens
        </h1>

        <p className="text-sm sm:text-base font-sans text-[#4A433B] leading-relaxed max-w-2xl mx-auto">
          Setiap biji disangrai di roastery Goalpara dengan memperhatikan densitas, kurva suhu drum besi tuang, dan potensi biologis buah ceri kopi untuk menghasilkan kejernihan rasa berkelas dunia.
        </p>

        {/* Filter Categories: Pressed Paper Folio Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: "all", label: "Tous les Spécimens" },
            { id: "espresso", label: "Espresso Roast" },
            { id: "filter", label: "Filter / Slow Bar" },
            { id: "blend", label: "Signature Blend" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
                selectedCategory === cat.id
                  ? "bg-[#721C24] text-white border-[#56151B] font-bold shadow-xs scale-105"
                  : "bg-[#F2EFE8] text-[#5A534B] border-[#D5CEC2] hover:border-[#721C24]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Beans Grid: Archival Botanical Specimen Plates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBeans.map((bean) => {
          const primarySticker = bean.stickers[0];
          return (
            <div
              key={bean.id}
              className="group bg-[#FAF8F5] border-2 border-[#D5CEC2] hover:border-[#721C24] p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_24px_rgba(74,67,59,0.06)] relative"
            >
              {/* Inset Hairline */}
              <div className="absolute inset-1.5 border border-[#E5DFD3] pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Official Packaging Sticker Display */}
                <div className="relative w-full aspect-[945/405] overflow-hidden bg-[#F2ECE0] border border-[#D5CEC2] p-2 flex items-center justify-center">
                  <Image
                    src={primarySticker.image}
                    alt={bean.name}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="uppercase text-[#721C24] font-bold">
                      {bean.category}
                    </span>
                    <span className="text-[#7A7268]">{bean.elevation}</span>
                  </div>

                  <h2 className="text-3xl font-editorial font-bold text-[#181715] group-hover:text-[#721C24] transition-colors">
                    {bean.name}
                  </h2>
                  <p className="text-xs font-sans text-[#7A7268]">
                    {bean.subtitle}
                  </p>

                  {/* Tasting Notes */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {bean.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-sans px-2.5 py-1 bg-[#F2ECE0] border border-[#D5CEC2] text-[#4A433B]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-sans text-[#5A534B] line-clamp-2 pt-2 leading-relaxed italic">
                    &ldquo;{bean.description[language]}&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom Actions: Inspect 3D Bag & Price */}
              <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-between relative z-10">
                <div>
                  <span className="text-[10px] font-mono text-[#7A7268] uppercase block">Prix Régulier</span>
                  <span className="text-2xl font-editorial font-bold text-[#181715]">
                    Rp {bean.prices["200g"].toLocaleString("id-ID")}
                  </span>
                </div>

                <button
                  onClick={() => handleInspect(bean)}
                  className="px-4 py-2.5 bg-[#721C24] hover:bg-[#8B2635] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 shadow-xs"
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
