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
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#E5DFD3]">
      {/* Section Header: Botanical Specimen Registry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#E5DFD3] gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#721C24] uppercase tracking-widest font-bold">
            <span>[ REGISTRE DES SPECIMENS BOTANIQUES ]</span>
            <span>·</span>
            <span>MICRO-BATCH SPECIALTY LOTS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#181715]">
            Katalog Arsip Biji Sangrai.
          </h2>
          <p className="text-sm font-sans text-[#5A534B] max-w-xl leading-relaxed">
            Setiap lot diseleksi ketat berdasarkan elevasi tanah vulkanik, kerapatan biji hijau, dan kejernihan fermentasi. Disangrai perlahan untuk menghormati keaslian rasa terroir Goalpara.
          </p>
        </div>

        <Link
          href="/beans"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#721C24] hover:text-[#181715] uppercase tracking-wider transition-colors pb-1 border-b border-[#721C24]/30"
        >
          <span>Buka Semua Spesimen</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Ledger Split: Left Specimen Table, Right Live Inspection Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-start">
        {/* Specimen Rows (7 cols) */}
        <div className="lg:col-span-7 divide-y divide-[#E5DFD3]">
          {beansData.map((bean, idx) => {
            const isHovered = bean.id === hoveredBeanId;
            return (
              <div
                key={bean.id}
                onMouseEnter={() => setHoveredBeanId(bean.id)}
                className={`py-5 transition-all duration-200 cursor-pointer ${
                  isHovered ? "bg-[#FAF8F5] -mx-4 px-4 border-l-2 border-[#721C24]" : "bg-transparent"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-[#7A7268] uppercase">
                      <span className="text-[#721C24] font-bold">SPECIMEN {String(idx + 1).padStart(2, "0")}</span>
                      <span>·</span>
                      <span>{bean.elevation}</span>
                    </div>

                    <h3 className="text-xl font-editorial font-bold text-[#181715] flex items-center gap-2">
                      <span>{bean.name}</span>
                      {bean.featured && (
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-[#721C24]/10 text-[#721C24] uppercase border border-[#721C24]/20 rounded-full">
                          Lot Terpilih
                        </span>
                      )}
                    </h3>

                    <p className="text-xs font-sans text-[#5A534B]">
                      {bean.subtitle}
                    </p>

                    {/* Tasting Notes Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {bean.tastingNotes.map((note) => (
                        <span
                          key={note}
                          className="px-2 py-0.5 rounded-full bg-[#F2EFE8] border border-[#D5CEC2] text-[10px] font-mono text-[#4A433B]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="text-right space-y-2 shrink-0">
                    <div className="text-sm font-mono font-bold text-[#181715]">
                      Rp {bean.prices["200g"].toLocaleString("id-ID")}
                    </div>
                    <span className="text-[10px] font-mono text-[#8A8278] block">/ 200g</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(bean, "200g", "whole_bean", 0, 1);
                      }}
                      className="px-3 py-1.5 bg-[#721C24] hover:bg-[#8B2635] text-white text-[10px] font-mono uppercase tracking-wider rounded-xs transition-colors flex items-center space-x-1.5 shadow-xs"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Beli</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Inspection Showcase Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="p-6 bg-[#FAF8F5] border-2 border-[#D5CEC2] space-y-6 shadow-sm relative">
            <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
              <span className="text-[10px] font-mono text-[#721C24] uppercase tracking-widest font-bold">
                FICHE DESCRIPTIVE DU LOT
              </span>
              <span className="text-xs font-mono font-bold text-[#8C6E2E]">
                CUPPING: {activeBean.cuppingScore || 86.5} PTS
              </span>
            </div>

            {/* Packaging Preview Artwork */}
            <div className="relative w-full h-56 bg-[#F2EFE8] border border-[#E2DDD2] flex items-center justify-center overflow-hidden">
              {activeBean.stickers?.[0]?.image ? (
                <div className="relative w-full h-full p-3">
                  <Image
                    src={activeBean.stickers[0].image}
                    alt={activeBean.name}
                    fill
                    className="object-contain filter drop-shadow-md"
                  />
                </div>
              ) : (
                <div className="text-center font-mono text-xs text-[#7A7268]">
                  [ ARCHIVAL SPECIMEN ARTWORK ]
                </div>
              )}
            </div>

            {/* Specimen Attributes */}
            <div className="space-y-2 text-xs font-sans text-[#4A433B]">
              <h4 className="text-2xl font-editorial font-bold text-[#181715]">
                {activeBean.name}
              </h4>
              <p className="line-clamp-3 text-xs leading-relaxed text-[#5A534B]">
                {activeBean.description.id}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E5DFD3] font-mono text-[10px]">
                <div>
                  <span className="text-[#8A8278] block">VARIETAS</span>
                  <span className="font-bold text-[#181715]">{activeBean.varietal}</span>
                </div>
                <div>
                  <span className="text-[#8A8278] block">PROSES OLAH</span>
                  <span className="font-bold text-[#181715]">{activeBean.process}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex items-center space-x-2">
              <button
                onClick={() => onOpenModal?.(activeBean)}
                className="flex-1 py-2.5 bg-[#FAF8F5] hover:bg-[#F2EFE8] border border-[#C5BCAB] text-[#181715] text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-3.5 h-3.5 text-[#721C24]" />
                <span>Inspeksi Kemasan 3D</span>
              </button>

              <button
                onClick={() => addItem(activeBean, "200g", "whole_bean", 0, 1)}
                className="flex-1 py-2.5 bg-[#721C24] hover:bg-[#8B2635] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Tambah Tas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
