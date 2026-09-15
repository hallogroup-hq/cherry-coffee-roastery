"use client";

import React, { useState, useEffect } from "react";
import { brewRecipes, BrewRecipe } from "@/data/laboratory";
import { useLanguage } from "@/context/LanguageContext";
import { Play, Pause, RotateCcw, Droplets, Thermometer, Sliders, CheckCircle2, Clock } from "lucide-react";

export default function BrewCalculator() {
  const { language } = useLanguage();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("kalita-slowbar");
  const [customDose, setCustomDose] = useState<number>(16);

  // Live Timer states
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const activeRecipe =
    brewRecipes.find((r) => r.id === selectedRecipeId) || brewRecipes[0];

  // Calculate yield dynamically based on ratio
  // e.g. ratio "1:15.5" -> ratioValue = 15.5
  const ratioNum = parseFloat(activeRecipe.ratio.split(":")[1]) || 15.5;
  const calculatedYield = Math.round(customDose * ratioNum);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-[#FAF8F5] border-2 border-[#D5CEC2] shadow-[0_12px_40px_rgba(74,67,59,0.08)] p-6 sm:p-8 space-y-6 relative overflow-hidden rounded-xs">
      {/* Fine Margin Etching Border */}
      <div className="absolute inset-1.5 border border-[#E5DFD3] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5DFD3] pb-5 relative z-10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#721C24] uppercase font-bold">
            <Sliders className="w-3.5 h-3.5" />
            <span>FIG. 08 — MATRICE D&apos;EXTRACTION SLOW BAR</span>
          </div>
          <h3 className="text-2xl font-editorial font-bold text-[#181715] mt-1">
            Kalkulator Rasio &amp; Sains Seduh
          </h3>
        </div>

        {/* Method Picker Tabs: Pressed Paper Folio Tags */}
        <div className="flex flex-wrap gap-1.5">
          {brewRecipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => {
                setSelectedRecipeId(recipe.id);
                setCustomDose(recipe.coffeeDoseG);
                resetTimer();
              }}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                selectedRecipeId === recipe.id
                  ? "bg-[#721C24] text-white border-[#56151B] font-bold shadow-xs"
                  : "bg-[#F2EFE8] text-[#5A534B] border-[#D5CEC2] hover:border-[#721C24]"
              }`}
            >
              {recipe.method}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Parameters & Chronometer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Col 1 & 2: Dynamic Parameters & Pour Steps */}
        <div className="lg:col-span-2 space-y-5">
          {/* Dose & Ratio Adjuster: Antique Brass Inset Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F2ECE0] p-4 border border-[#C5BCAB] shadow-xs">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#7A7268] block">
                Dosis Kopi (g)
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="number"
                  min={10}
                  max={60}
                  value={customDose}
                  onChange={(e) => setCustomDose(Math.max(1, Number(e.target.value)))}
                  className="w-16 bg-[#FAF8F5] border border-[#C5BCAB] px-2 py-1 text-sm font-mono text-[#181715] font-bold text-center focus:outline-none focus:border-[#721C24]"
                />
                <span className="text-xs font-mono text-[#7A7268]">gram</span>
              </div>
            </div>

            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#7A7268] block">
                Target Air (Yield)
              </span>
              <span className="text-base font-mono font-bold text-[#181715] block mt-1">
                {calculatedYield} ml
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#7A7268] block">
                Suhu Air Optimal
              </span>
              <span className="text-base font-mono font-bold text-[#8C6E2E] block mt-1 flex items-center">
                <Thermometer className="w-3.5 h-3.5 mr-1 text-[#8C6E2E]" />
                {activeRecipe.waterTempC}°C
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#7A7268] block">
                Target TDS
              </span>
              <span className="text-base font-mono font-bold text-[#721C24] block mt-1">
                {activeRecipe.targetTds}
              </span>
            </div>
          </div>

          {/* Stepped Pouring Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#7A7268] font-bold">
              JADWAL PENUANGAN (POUR INTERVALS)
            </h4>

            <div className="space-y-2">
              {activeRecipe.steps.map((step, idx) => {
                const scaleDose = customDose / activeRecipe.coffeeDoseG;
                const scaledPour = Math.round(step.waterPourG * scaleDose);
                const isPassed = timerSeconds >= step.timeSec;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 border transition-all flex items-start space-x-3 ${
                      isPassed
                        ? "bg-[#F2ECE0] border-[#8C6E2E] text-[#181715] shadow-xs"
                        : "bg-[#FAF8F5] border-[#E5DFD3] text-[#5A534B]"
                    }`}
                  >
                    <div className="pt-0.5">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#721C24]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#C5BCAB] flex items-center justify-center text-[9px] font-mono text-[#7A7268]">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs font-mono mb-0.5">
                        <span className="font-bold text-[#181715]">
                          Detik {step.timeSec}s — Target: {scaledPour}g air
                        </span>
                        <span className="text-[11px] text-[#7A7268]">
                          {Math.floor(step.timeSec / 60)}m {step.timeSec % 60}s
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#5A534B] leading-relaxed">
                        {step.instruction[language]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Col 3: Horological Chronometer Console */}
        <div className="bg-[#F2ECE0] border border-[#C5BCAB] p-6 flex flex-col justify-between space-y-6 shadow-xs">
          <div className="space-y-3 text-center">
            <span className="text-[10px] font-mono text-[#7A7268] uppercase tracking-widest block font-bold">
              CHRONOMÈTRE D&apos;EXTRACTION
            </span>
            <div className="text-5xl font-mono font-bold text-[#181715] tracking-widest py-2 bg-[#FAF8F5] border border-[#D5CEC2] shadow-inner">
              {formatTime(timerSeconds)}
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-xs ${
                  timerRunning
                    ? "bg-[#8C6E2E] text-white"
                    : "bg-[#721C24] hover:bg-[#8B2635] text-white"
                }`}
              >
                {timerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Mulai Seduh</span>
                  </>
                )}
              </button>
              <button
                onClick={resetTimer}
                className="p-2 bg-[#FAF8F5] hover:bg-[#E5DFD3] text-[#181715] border border-[#C5BCAB] transition-colors"
                title="Reset Chronometer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#D5CEC2] space-y-3">
            <h5 className="text-xs font-mono text-[#721C24] uppercase tracking-wider font-bold">
              Karakter Cangkir
            </h5>
            <p className="text-xs font-sans text-[#4A433B] leading-relaxed italic">
              &ldquo;{activeRecipe.tastingCharacter[language]}&rdquo;
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#7A7268] space-y-1">
              <p>Device: {activeRecipe.device}</p>
              <p>Grind: {activeRecipe.grindDescription} (~{activeRecipe.grindMicrons}µm)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
