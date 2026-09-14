"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { beansData, BeanProduct } from "@/data/beans";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ShoppingBag, Eye, Sparkles } from "lucide-react";

interface BeansLedgerProps {
  onOpenModal?: (bean: BeanProduct) => void;
}

export default function BeansLedger({ onOpenModal }: BeansLedgerProps) {
  const { addItem } = useCart();
  const [hoveredBeanId, setHoveredBeanId] = useState<string>(beansData[0].id);

  const activeBean = beansData.find((b) => b.id === hoveredBeanId) || beansData[0];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#D8A86E]/15">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#D8A86E]/15 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[11px] font-mono-data text-[#C99454] uppercase tracking-widest">
            <span>[ ROASTER ARCHIVE ]</span>
            <span>·</span>
            <span>MICRO-BATCH SPECIALTY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#F7F5F0]">
            Katalog Biji Kopi Spesialti.
          </h2>
          <p className="text-sm font-sans text-[#A69E90] max-w-xl leading-relaxed">
            Setiap lot diseleksi ketat berdasarkan elevasi, kerapatan biji, dan kebersihan proses. Disangrai dengan drum besi tuang untuk menghasilkan rasa yang bersih dan berkarakter.
          </p>
        </div>

        <Link
          href="/beans"
          className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#C99454] hover:text-white uppercase tracking-wider transition-colors pb-1"
        >
          <span>Buka Semua Arsip Beans</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Ledger Split: Left Specimen Table, Right Live Inspection Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 items-start">
        {/* Specimen Rows (8 cols) */}
        <div className="lg:col-span-7 divide-y divide-[#D8A86E]/15">
          {beansData.map((bean, idx) => {
            const isHovered = bean.id === hoveredBeanId;
            return (
              <div
                key={bean.id}
                onMouseEnter={() => setHoveredBeanId(bean.id)}
                className={`py-6 transition-colors duration-200 cursor-pointer ${
                  isHovered ? "bg-[#181614]/60 -mx-4 px-4" : "bg-transparent"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-[11px] font-mono-data text-[#C99454]">
                      0{idx + 1}
                    </span>
                    <h3 className="text-2xl font-editorial font-semibold text-[#F7F5F0] hover:text-[#C99454] transition-colors">
                      {bean.name}
                    </h3>
                    <span className="text-[10px] font-mono-data uppercase tracking-wider px-2 py-0.5 border border-white/10 text-[#A69E90]">
                      {bean.category}
                    </span>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-sm font-mono-data font-bold text-[#F7F5F0]">
                      Rp {(bean.prices["200g"] / 1000).toLocaleString("id-ID")}k
                    </span>
                    <span className="text-[10px] font-mono-data text-[#8C8375] block">
                      per 200g
                    </span>
                  </div>
                </div>

                {/* Subtitle & Origin */}
                <p className="text-xs font-mono-data text-[#8C8375] mt-1">
                  {bean.origin} · {bean.elevation} · {bean.process}
                </p>

                {/* Sensory Descriptors */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-[11px] font-mono-data text-[#A69E90]">Karakter:</span>
                  {bean.tastingNotes.map((note, i) => (
                    <span
                      key={i}
                      className="text-xs font-sans text-[#E6D9C8] bg-white/5 px-2.5 py-0.5 border border-white/10"
                    >
                      {note}
                    </span>
                  ))}
                  {bean.cuppingScore && (
                    <span className="text-[10px] font-mono-data text-[#C99454] ml-auto border-b border-[#C99454]">
                      Score: {bean.cuppingScore} PTS
                    </span>
                  )}
                </div>

                {/* Direct Action Trigger */}
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenModal) onOpenModal(bean);
                    }}
                    className="text-xs font-mono-data text-[#C99454] hover:text-white uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Kemasan &amp; Pilih Gilingan</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(bean, "200g", "whole_bean", 0, 1);
                    }}
                    className="text-xs font-mono-data text-[#8C8375] hover:text-[#F7F5F0] uppercase tracking-wider flex items-center space-x-1 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>+ Quick Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Inspection Showcase Frame (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="p-8 bg-[#131210] border border-[#D8A86E]/20 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono-data text-[#8C8375] border-b border-white/10 pb-3">
              <span className="uppercase text-[#C99454]">Spesifikasi Kemasan Resmi</span>
              <span>BATCH 2026</span>
            </div>

            {/* Packaging Sticker Preview */}
            <div className="relative w-full aspect-[945/405] bg-black/40 overflow-hidden border border-white/10 shadow-lg">
              <Image
                src={activeBean.stickers[0].image}
                alt={`${activeBean.name} Packaging Label`}
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-editorial font-bold text-white">
                  {activeBean.name}
                </h4>
                <span className="text-xs font-mono-data text-[#C99454]">
                  {activeBean.roastProfile}
                </span>
              </div>
              <p className="text-xs font-sans text-[#B5ABA0] leading-relaxed">
                {activeBean.description.id}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono-data">
              <div>
                <span className="text-[#8C8375] block text-[10px]">Varietal</span>
                <span className="text-[#E6D9C8]">{activeBean.varietal}</span>
              </div>
              <div>
                <span className="text-[#8C8375] block text-[10px]">Metode Seduh Saran</span>
                <span className="text-[#E6D9C8]">
                  {activeBean.category === "espresso" ? "Espresso / Aeropress" : "V60 / Kalita Wave"}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (onOpenModal) onOpenModal(activeBean);
              }}
              className="w-full py-3.5 bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono-data text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Inspeksi Pouch &amp; Pesan Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
