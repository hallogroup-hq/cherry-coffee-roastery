"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BeanProduct, PackagingSticker } from "@/data/beans";
import { useCart, GrindOption, WeightOption } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Check, ShoppingBag, Sparkles, MessageCircle, RotateCcw } from "lucide-react";

interface Packaging3DModalProps {
  bean: BeanProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Packaging3DModal({ bean, isOpen, onClose }: Packaging3DModalProps) {
  const { addItem, generateWhatsAppLink } = useCart();
  const { language } = useLanguage();

  const [selectedStickerIdx, setSelectedStickerIdx] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>("200g");
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>("whole_bean");
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Rotation angles for 3D card tilt effect
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  if (!isOpen || !bean) return null;

  const currentSticker = bean.stickers[selectedStickerIdx] || bean.stickers[0];
  const currentPrice = bean.prices[selectedWeight];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation({
      x: Math.max(-25, Math.min(25, rotation.x - deltaY * 0.3)),
      y: Math.max(-45, Math.min(45, rotation.y + deltaX * 0.3)),
    });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleAddToCart = () => {
    addItem(bean, selectedWeight, selectedGrind, selectedStickerIdx, 1);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 900);
  };

  const handleDirectConcierge = () => {
    const waUrl = generateWhatsAppLink();
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-5xl bg-[#141311] border border-[#D8A86E]/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[92vh] overflow-y-auto"
        onMouseUp={handleMouseUp}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Interactive 3D Bag & Official Packaging Inspection */}
        <div
          className="relative flex-1 min-h-[380px] lg:min-h-[560px] bg-gradient-to-b from-[#1E1C18] to-[#12110F] flex flex-col items-center justify-center p-8 select-none overflow-hidden cursor-grab active:cursor-grabbing border-b lg:border-b-0 lg:border-r border-[#D8A86E]/15"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          {/* Terroir Background Glow */}
          <div className="absolute w-80 h-80 bg-[#C99454]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Reset rotation pill */}
          <button
            onClick={resetRotation}
            className="absolute top-6 left-6 z-10 flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-data text-[#DCD5C8]/80 hover:text-white transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sudut 3D</span>
          </button>

          {/* 3D Perspective Coffee Bag Container */}
          <div
            className="relative transition-transform duration-75 ease-out"
            style={{
              perspective: "1000px",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* The Matte Black / Earth Kraft Standup Pouch */}
            <div className="relative w-64 sm:w-72 h-96 sm:h-[420px] bg-gradient-to-b from-[#24221E] via-[#1A1916] to-[#12110F] rounded-2xl shadow-2xl border border-white/10 p-4 flex flex-col justify-between overflow-hidden shadow-[#000000]/80">
              {/* Bag Heat-Seal Top Zip Ridge */}
              <div className="w-full flex flex-col items-center pt-2">
                <div className="w-full h-1 bg-white/10 rounded-full mb-1" />
                <div className="w-full h-0.5 bg-black/40 rounded-full" />
                <div className="w-6 h-1.5 rounded-full bg-black/60 border border-white/5 mt-2" />
                <span className="text-[8px] tracking-widest uppercase font-mono-data text-white/30 mt-1">
                  Degassing Valve
                </span>
              </div>

              {/* Official Sticker Placed with Realistic Shadow & High-Res Rendering */}
              <div className="relative my-auto w-full group rounded-xl overflow-hidden shadow-xl border border-white/10 transition-transform duration-300">
                <div className="relative w-full aspect-[945/405] overflow-hidden bg-black/20">
                  <Image
                    src={currentSticker.image}
                    alt={`${bean.name} Sticker`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Bottom Gusset Fold Texture */}
              <div className="w-full pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono-data text-[#C99454]">
                <span>200G / 500G / 1KG</span>
                <span className="text-[#DCD5C8]/60">ESTATE ROASTED</span>
              </div>
            </div>
          </div>

          {/* Sticker Colorway Picker */}
          {bean.stickers.length > 1 && (
            <div className="mt-8 z-10 flex items-center space-x-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="text-xs font-mono-data text-[#DCD5C8]/70">Pilihan Label:</span>
              <div className="flex space-x-2">
                {bean.stickers.map((stk, idx) => (
                  <button
                    key={stk.id}
                    onClick={() => setSelectedStickerIdx(idx)}
                    className={`text-xs px-2.5 py-1 rounded-full font-mono-data transition-all ${
                      selectedStickerIdx === idx
                        ? "bg-[#C99454] text-[#0E0D0C] font-bold scale-105"
                        : "text-[#DCD5C8] hover:bg-white/10"
                    }`}
                  >
                    {stk.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-[11px] font-mono-data text-[#A69E90] mt-3">
            Klik & drag mouse untuk memutar kemasan pouch 3D
          </p>
        </div>

        {/* Right Column: Specifications, Customization & Hybrid Checkout */}
        <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Origin */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono-data tracking-widest text-[#C99454] px-2.5 py-1 rounded-full bg-[#C99454]/10 border border-[#C99454]/20">
                {bean.category}
              </span>
              <span className="text-xs font-mono-data text-[#DCD5C8]/60">{bean.elevation}</span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-editorial font-semibold text-white tracking-wide">
                {bean.name}
              </h2>
              <p className="text-sm font-sans text-[#DCD5C8]/80 mt-1">{bean.subtitle}</p>
            </div>

            {/* Tasting Notes Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {bean.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="text-xs font-sans px-3 py-1 rounded-lg bg-[#23211E] border border-white/5 text-[#E6DFD5]"
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm font-sans text-[#B0A799] leading-relaxed pt-2">
              {bean.description[language]}
            </p>

            {/* Terroir Specifications Table */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs font-mono-data">
              <div>
                <span className="text-[#8C8375] block">Terroir / Region:</span>
                <span className="text-[#E6DFD5]">{bean.origin}</span>
              </div>
              <div>
                <span className="text-[#8C8375] block">Process:</span>
                <span className="text-[#E6DFD5]">{bean.process}</span>
              </div>
              <div>
                <span className="text-[#8C8375] block">Varietal:</span>
                <span className="text-[#E6DFD5]">{bean.varietal}</span>
              </div>
              <div>
                <span className="text-[#8C8375] block">Cupping Score:</span>
                <span className="text-[#C99454] font-bold">{bean.cuppingScore || "Specialty Grade"}</span>
              </div>
            </div>

            {/* Weight Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono-data text-[#DCD5C8] uppercase tracking-wider block">
                Pilih Ukuran Bag (Berat):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["200g", "500g", "1kg"] as WeightOption[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono-data transition-all ${
                      selectedWeight === w
                        ? "border-[#C99454] bg-[#C99454]/15 text-[#F5F2EB] font-bold"
                        : "border-white/10 bg-[#1A1916] text-[#A69E90] hover:border-white/20"
                    }`}
                  >
                    {w} — Rp {(bean.prices[w] / 1000).toLocaleString("id-ID")}k
                  </button>
                ))}
              </div>
            </div>

            {/* Grind Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono-data text-[#DCD5C8] uppercase tracking-wider block">
                Pilih Profil Gilingan:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "whole_bean", label: "Biji Utuh (Whole Bean)" },
                  { id: "espresso", label: "Espresso (Fine)" },
                  { id: "filter_v60", label: "Filter / V60 (Medium)" },
                  { id: "french_press", label: "French Press (Coarse)" },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrind(g.id as GrindOption)}
                    className={`py-2 px-3 rounded-xl border text-xs text-left transition-all ${
                      selectedGrind === g.id
                        ? "border-[#C99454] bg-[#C99454]/15 text-[#F5F2EB] font-medium"
                        : "border-white/10 bg-[#1A1916] text-[#A69E90] hover:border-white/20"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Hybrid Order Actions */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-mono-data text-[#8C8375]">Total Investasi:</span>
              <span className="text-2xl font-editorial font-bold text-[#F5F2EB]">
                Rp {currentPrice.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Modern Instant Cart Add */}
              <button
                onClick={handleAddToCart}
                disabled={isAddedSuccess}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-semibold text-xs tracking-wider uppercase font-mono-data flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#C99454]/25 active:scale-95"
              >
                {isAddedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-green-950" />
                    <span>Tersimpan di Keranjang!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Tambah ke Keranjang</span>
                  </>
                )}
              </button>

              {/* Direct VIP Concierge Order (WhatsApp) */}
              <button
                onClick={handleDirectConcierge}
                className="w-full py-3.5 px-4 rounded-xl bg-[#23211E] hover:bg-[#2C2925] border border-[#D8A86E]/30 text-[#E6DFD5] font-semibold text-xs tracking-wider uppercase font-mono-data flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Order via Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
