"use client";

import React, { useState } from "react";
import { BeanProduct } from "@/data/beans";
import { useCart, GrindOption, WeightOption } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Pouch3DCanvas from "@/components/3d/Pouch3DCanvas";
import {
  X,
  Check,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  RotateCcw,
  Eye,
  Layers,
  ZoomIn,
  Play,
  Pause,
  Compass,
  Activity,
} from "lucide-react";

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
  const [isXRay, setIsXRay] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  if (!isOpen || !bean) return null;

  const currentSticker = bean.stickers[selectedStickerIdx] || bean.stickers[0];
  const currentPrice = bean.prices[selectedWeight];

  const grindSpecs: Record<GrindOption, { label: string; microns: string; method: string }> = {
    whole_bean: { label: "Biji Utuh (Whole Bean)", microns: "Intact Seed", method: "Fresh Grind di Rumah" },
    espresso: { label: "Espresso Halus", microns: "200 – 300 µm", method: "Espresso Machine / Flair / Rok" },
    filter_v60: { label: "Filter / Manual Brew", microns: "650 – 850 µm", method: "V60 / Kalita / Aeropress" },
    french_press: { label: "Kasar (French Press / Cold Brew)", microns: "1000 – 1200 µm", method: "Cold Brew / French Press" },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl bg-[#11100E] border border-[#D8A86E]/30 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col lg:flex-row max-h-[94vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-black/60 hover:bg-black/90 text-white/70 hover:text-white transition-colors border border-white/10"
          aria-label="Tutup Inspeksi 3D"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Fullscreen Real WebGL Three.js Studio Canvas */}
        <div className="relative flex-1 min-h-[460px] lg:min-h-[640px] bg-gradient-to-b from-[#181614] via-[#0F0E0C] to-[#0A0908] flex flex-col items-center justify-between p-4 sm:p-6 select-none border-b lg:border-b-0 lg:border-r border-[#D8A86E]/15 overflow-hidden">
          {/* Top HUD Controls Overlay */}
          <div className="relative z-20 w-full flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono-data uppercase tracking-widest text-[#C99454]">
              <Compass className="w-3 h-3 text-[#C99454]" />
              <span>3D ATELIER INSPECTOR · 360° WEBGL</span>
            </div>

            {/* X-Ray and Auto-Rotate Mode Toggles */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsXRay(!isXRay)}
                className={`px-3 py-1 text-[10px] font-mono-data uppercase tracking-wider border transition-all flex items-center space-x-1.5 ${
                  isXRay
                    ? "bg-[#C99454] text-[#0E0D0C] font-bold border-[#C99454] shadow-lg shadow-[#C99454]/30"
                    : "bg-black/60 text-[#DCD5C8] border-white/10 hover:border-white/30"
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>{isXRay ? "Mode Standar" : "X-Ray Biji Kopi"}</span>
              </button>

              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`px-3 py-1 text-[10px] font-mono-data uppercase tracking-wider border transition-all flex items-center space-x-1.5 ${
                  isAutoRotate
                    ? "bg-[#C99454] text-[#0E0D0C] font-bold border-[#C99454]"
                    : "bg-black/60 text-[#DCD5C8] border-white/10 hover:border-white/30"
                }`}
              >
                {isAutoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>Auto-Spin</span>
              </button>
            </div>
          </div>

          {/* Three.js Real WebGL Interactive Canvas */}
          <div className="relative w-full flex-1 flex items-center justify-center my-2">
            <Pouch3DCanvas
              stickerUrl={currentSticker.image}
              weight={selectedWeight}
              isXRay={isXRay}
              isAutoRotate={isAutoRotate}
            />

            {/* Live X-Ray Roasting Telemetry Overlay */}
            {isXRay && (
              <div className="absolute top-12 left-4 z-20 p-3 bg-black/80 backdrop-blur-md border border-[#C99454]/40 text-[10px] font-mono-data text-[#DCD5C8] space-y-1 animate-in fade-in duration-300">
                <div className="flex items-center space-x-1.5 text-[#C99454] font-bold uppercase">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>X-Ray Bean Telemetry</span>
                </div>
                <div>Density: 0.69 g/ml (Specialty High-Grown)</div>
                <div>Internal Moisture: 10.8% Calibrated</div>
                <div>Chaff Separation: Clean Center-Cut</div>
              </div>
            )}
          </div>

          {/* Bottom HUD: Official Packaging Sticker Colorway Selector & Interaction Hint */}
          <div className="relative z-20 w-full space-y-3 pt-2 border-t border-white/10">
            {bean.stickers.length > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono-data text-[#8C8375] uppercase">
                  Warna Label Kemasan:
                </span>
                <div className="flex space-x-1.5">
                  {bean.stickers.map((stk, idx) => (
                    <button
                      key={stk.id}
                      onClick={() => setSelectedStickerIdx(idx)}
                      className={`text-[10px] px-2.5 py-1 font-mono-data border transition-all ${
                        selectedStickerIdx === idx
                          ? "bg-[#C99454] text-[#0E0D0C] font-bold border-[#C99454]"
                          : "bg-black/50 text-[#DCD5C8] border-white/10 hover:border-white/30"
                      }`}
                    >
                      {stk.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] font-mono-data text-[#8C8375]">
              <span>Tahan &amp; geser mouse untuk memutar 360°</span>
              <span>Scroll mouse untuk Zoom</span>
            </div>
          </div>
        </div>

        {/* Right Column: Roastery Monograph, Grind Profiling & Dual Checkout */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-[#11100E]">
          <div className="space-y-6">
            {/* Header / Category */}
            <div className="space-y-2 border-b border-[#D8A86E]/15 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-data text-[#C99454] uppercase tracking-widest">
                  [ SPECIMEN: {bean.category} ]
                </span>
                {bean.cuppingScore && (
                  <span className="text-[11px] font-mono-data text-[#C99454] border-b border-[#C99454]">
                    CUPPING: {bean.cuppingScore} PTS
                  </span>
                )}
              </div>

              <h3 className="text-3xl sm:text-4xl font-editorial font-bold text-[#F7F5F0]">
                {bean.name}
              </h3>
              <p className="text-xs font-mono-data text-[#8C8375]">
                {bean.origin} · {bean.elevation} · {bean.process}
              </p>
            </div>

            {/* Sensory Descriptors */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-data text-[#8C8375] uppercase tracking-widest block">
                Profil &amp; Karakter Rasa
              </span>
              <div className="flex flex-wrap gap-2">
                {bean.tastingNotes.map((note, i) => (
                  <span
                    key={i}
                    className="text-xs font-sans text-[#E6D9C8] bg-[#1C1A17] border border-white/10 px-3 py-1"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Weight Size Selector (Controls 3D Pouch Scale) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono-data">
                <span className="text-[#8C8375] uppercase">Ukuran Berat Kemasan</span>
                <span className="text-[#C99454] font-bold">Model 3D Otomatis Menyesuaikan</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["200g", "500g", "1kg"] as WeightOption[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`py-2.5 text-xs font-mono-data border transition-all text-center ${
                      selectedWeight === w
                        ? "bg-[#C99454] text-[#0E0D0C] font-bold border-[#C99454] shadow-md"
                        : "bg-[#161513] text-[#DCD5C8] border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="font-bold">{w}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">
                      Rp {(bean.prices[w] / 1000).toLocaleString("id-ID")}k
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Grind Profile Selector with Micron HUD */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-data text-[#8C8375] uppercase tracking-widest block">
                Pilihan Profil Gilingan
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(["whole_bean", "filter_v60", "espresso", "french_press"] as GrindOption[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrind(g)}
                    className={`p-2.5 text-left text-xs font-mono-data border transition-all ${
                      selectedGrind === g
                        ? "border-[#C99454] bg-[#1C1A17] text-white"
                        : "border-white/10 hover:border-white/30 bg-[#141311] text-[#8C8375]"
                    }`}
                  >
                    <div className="font-bold text-[#E6D9C8]">{grindSpecs[g].label}</div>
                    <div className="text-[10px] text-[#C99454] mt-0.5">{grindSpecs[g].microns}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-[#D8A86E]/15">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono-data text-[#8C8375] block uppercase">
                  Total Investasi Rasa
                </span>
                <span className="text-3xl font-editorial font-bold text-[#F7F5F0]">
                  Rp {(currentPrice / 1000).toLocaleString("id-ID")}.000
                </span>
              </div>

              <span className="text-xs font-mono-data text-[#C99454]">
                Freshly Roasted at Goalpara
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isAddedSuccess}
                className={`py-3.5 px-4 font-mono-data text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg ${
                  isAddedSuccess
                    ? "bg-emerald-600 text-white"
                    : "bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C]"
                }`}
              >
                {isAddedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Masuk ke Keranjang</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>+ Tambah ke Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDirectConcierge}
                className="py-3.5 px-4 bg-[#181614] hover:bg-[#221F1B] border border-[#D8A86E]/30 text-[#DCD5C8] hover:text-white font-mono-data text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#C99454]" />
                <span>Pesan VIP WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
