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
  Award,
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
    whole_bean: { label: "Biji Utuh (Grain Entier)", microns: "Intact Seed", method: "Fresh Grind di Rumah" },
    espresso: { label: "Espresso Halus (Fin)", microns: "200 – 300 µm", method: "Machine Espresso / 9 Bar" },
    filter_v60: { label: "Filter / Pour Over", microns: "650 – 850 µm", method: "V60 / Kalita / Aeropress" },
    french_press: { label: "Kasar (Grossier)", microns: "1000 – 1200 µm", method: "Cold Brew / French Press" },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#181715]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl bg-[#FAF8F5] text-[#181715] border border-[#BFA15F]/40 shadow-[0_30px_90px_rgba(24,23,21,0.4)] overflow-hidden flex flex-col lg:flex-row max-h-[94vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-[#FAF8F5]/90 hover:bg-[#721C24] text-[#181715] hover:text-[#FAF8F5] transition-colors border border-[#181715]/15 shadow-sm"
          aria-label="Tutup Inspeksi 3D"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Naturalist Cabinet 3D WebGL Studio */}
        <div className="relative flex-1 min-h-[460px] lg:min-h-[640px] bg-gradient-to-b from-[#EDE8DE] via-[#E7E2D5] to-[#DFD9CA] flex flex-col items-center justify-between p-4 sm:p-6 select-none border-b lg:border-b-0 lg:border-r border-[#181715]/10 overflow-hidden">
          
          {/* Top Brass HUD Controls Overlay */}
          <div className="relative z-20 w-full flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-md border border-[#BFA15F]/50 text-[10px] font-mono-data uppercase tracking-widest text-[#181715] shadow-xs">
              <Compass className="w-3 h-3 text-[#721C24]" />
              <span>ATELIER D&apos;INSPECTION 3D · 360° WEBGL</span>
            </div>

            {/* X-Ray and Auto-Rotate Mode Toggles */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsXRay(!isXRay)}
                className={`px-3 py-1 text-[10px] font-mono-data uppercase tracking-wider border transition-all flex items-center space-x-1.5 ${
                  isXRay
                    ? "bg-[#721C24] text-white font-bold border-[#721C24] shadow-sm"
                    : "bg-[#FAF8F5]/90 text-[#181715] border-[#181715]/15 hover:border-[#721C24]"
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>{isXRay ? "Mode Standar" : "Radiographie X-Ray"}</span>
              </button>

              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`px-3 py-1 text-[10px] font-mono-data uppercase tracking-wider border transition-all flex items-center space-x-1.5 ${
                  isAutoRotate
                    ? "bg-[#181715] text-[#FAF8F5] font-bold border-[#181715]"
                    : "bg-[#FAF8F5]/90 text-[#181715] border-[#181715]/15 hover:border-[#181715]"
                }`}
              >
                {isAutoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-[#721C24]" />}
                <span>Rotation Auto</span>
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
              <div className="absolute top-12 left-4 z-20 p-3.5 bg-[#FAF8F5]/95 backdrop-blur-md border border-[#BFA15F] text-[10px] font-mono-data text-[#181715] space-y-1 shadow-lg animate-in fade-in duration-300">
                <div className="flex items-center space-x-1.5 text-[#721C24] font-bold uppercase tracking-wider">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>Radioscopie &amp; Densité Cellulaire</span>
                </div>
                <div className="text-[#595349]">Densité : 0.69 g/ml (High-Grown Arabica)</div>
                <div className="text-[#595349]">Humidité résiduelle : 10.8% Calibrée</div>
                <div className="text-[#595349]">Fissure centrale : Éclatée · Sans chaff</div>
              </div>
            )}
          </div>

          {/* Bottom HUD: Official Packaging Sticker Colorway Selector & Interaction Hint */}
          <div className="relative z-20 w-full space-y-3 pt-3 border-t border-[#181715]/10">
            {bean.stickers.length > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono-data text-[#7A7265] uppercase tracking-wider">
                  Nuance d&apos;Étiquette d&apos;Origine :
                </span>
                <div className="flex space-x-1.5">
                  {bean.stickers.map((stk, idx) => (
                    <button
                      key={stk.id}
                      onClick={() => setSelectedStickerIdx(idx)}
                      className={`text-[10px] px-3 py-1 font-mono-data border transition-all ${
                        selectedStickerIdx === idx
                          ? "bg-[#721C24] text-white font-bold border-[#721C24] shadow-xs"
                          : "bg-[#FAF8F5]/90 text-[#181715] border-[#181715]/15 hover:border-[#181715]/40"
                      }`}
                    >
                      {stk.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] font-mono-data text-[#7A7265]">
              <span>[ Geste tactile : Glisser pour pivoter à 360° ]</span>
              <span>[ Molette : Agrandissement optique ]</span>
            </div>
          </div>
        </div>

        {/* Right Column: Roastery Monograph, Specimen Dossier & Archival Checkout */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-[#FAF8F5]">
          <div className="space-y-6">
            {/* Header / Category */}
            <div className="space-y-2 border-b border-[#181715]/10 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-data text-[#721C24] uppercase tracking-widest font-bold">
                  DOSSIER SPÉCIMEN N° {bean.id.toUpperCase()} · {bean.category}
                </span>
                {bean.cuppingScore && (
                  <span className="text-[10px] font-mono-data text-[#8C6E2E] border-b border-[#BFA15F] font-bold">
                    CUPPING : {bean.cuppingScore} PTS
                  </span>
                )}
              </div>

              <h3 className="text-3xl sm:text-4xl font-editorial font-bold text-[#181715] tracking-tight">
                {bean.name}
              </h3>
              <p className="text-xs font-mono-data text-[#595349]">
                {bean.origin} · {bean.elevation} · {bean.process}
              </p>
            </div>

            {/* Sensory Descriptors */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-data text-[#7A7265] uppercase tracking-widest block">
                Descripteurs Sensoriels &amp; Notes de Dégustation
              </span>
              <div className="flex flex-wrap gap-2">
                {bean.tastingNotes.map((note, i) => (
                  <span
                    key={i}
                    className="text-xs font-serif italic text-[#181715] bg-[#EFECE4] border border-[#181715]/15 px-3 py-1"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Weight Size Selector (Controls 3D Pouch Scale) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono-data">
                <span className="text-[#7A7265] uppercase tracking-wider">Format du Sac d&apos;Origine</span>
                <span className="text-[#8C6E2E] font-bold">[ Échelle 3D Synchronisée ]</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["200g", "500g", "1kg"] as WeightOption[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`py-2.5 text-xs font-mono-data border transition-all text-center ${
                      selectedWeight === w
                        ? "bg-[#181715] text-[#FAF8F5] font-bold border-[#181715] shadow-xs"
                        : "bg-[#EFECE4] text-[#181715] border-[#181715]/15 hover:border-[#181715]/30"
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

            {/* Grind Profile Selector with Micron Telemetry */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-data text-[#7A7265] uppercase tracking-widest block">
                Calibrage de Mouture Atelier
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(["whole_bean", "filter_v60", "espresso", "french_press"] as GrindOption[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrind(g)}
                    className={`p-2.5 text-left text-xs font-mono-data border transition-all ${
                      selectedGrind === g
                        ? "border-[#721C24] bg-[#721C24]/5 text-[#181715] shadow-xs"
                        : "border-[#181715]/10 hover:border-[#181715]/25 bg-[#EFECE4]/60 text-[#595349]"
                    }`}
                  >
                    <div className="font-bold text-[#181715]">{grindSpecs[g].label}</div>
                    <div className="text-[10px] text-[#8C6E2E] mt-0.5">{grindSpecs[g].microns}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-[#181715]/10">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono-data text-[#7A7265] block uppercase tracking-wider">
                  Investissement Sensoriel
                </span>
                <span className="text-3xl font-editorial font-bold text-[#181715]">
                  Rp {(currentPrice / 1000).toLocaleString("id-ID")}.000
                </span>
              </div>

              <span className="text-xs font-mono-data text-[#8C6E2E] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#721C24] inline-block" />
                Torréfié Fraîchement à Goalpara
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isAddedSuccess}
                className={`py-3.5 px-4 font-mono-data text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md ${
                  isAddedSuccess
                    ? "bg-emerald-700 text-white"
                    : "bg-[#721C24] hover:bg-[#8A222B] text-white border border-[#BFA15F]/40"
                }`}
              >
                {isAddedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Enregistré au Panier</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>+ Ajouter au Panier</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDirectConcierge}
                className="py-3.5 px-4 bg-[#181715] hover:bg-[#2A2825] border border-[#BFA15F]/30 text-[#FAF8F5] font-mono-data text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#BFA15F]" />
                <span>Concierge WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
