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
    <div className="w-full bg-[#12110F] border border-[#D8A86E]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono-data text-[#C99454] uppercase tracking-widest">
            <Sliders className="w-3.5 h-3.5" />
            <span>Slow Bar Extraction Matrix & Flow Telemetry</span>
          </div>
          <h3 className="text-2xl font-editorial font-bold text-white mt-1">
            Kalkulator Ekstraksi Manual Brew
          </h3>
        </div>

        {/* Method Picker Tabs */}
        <div className="flex flex-wrap gap-2">
          {brewRecipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => {
                setSelectedRecipeId(recipe.id);
                setCustomDose(recipe.coffeeDoseG);
                resetTimer();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono-data transition-all ${
                selectedRecipeId === recipe.id
                  ? "bg-[#C99454] text-[#0E0D0C] font-bold shadow-md shadow-[#C99454]/25"
                  : "bg-[#1C1A17] text-[#DCD5C8]/80 hover:bg-white/10"
              }`}
            >
              {recipe.method}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Brew Parameters & Live Pour Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1 & 2: Dynamic Parameters & Pour Steps */}
        <div className="lg:col-span-2 space-y-5">
          {/* Dose & Ratio Adjuster */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#1A1816] p-4 rounded-2xl border border-white/5">
            <div>
              <span className="text-[10px] uppercase font-mono-data text-[#8C8375] block">
                Dosis Kopi (g)
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="number"
                  min={10}
                  max={60}
                  value={customDose}
                  onChange={(e) => setCustomDose(Math.max(1, Number(e.target.value)))}
                  className="w-16 bg-[#12110F] border border-white/10 rounded-lg px-2 py-1 text-sm font-mono-data text-[#C99454] font-bold text-center focus:outline-none"
                />
                <span className="text-xs font-mono-data text-[#DCD5C8]">gram</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono-data text-[#8C8375] block">
                Target Air (Yield)
              </span>
              <span className="text-base font-mono-data font-bold text-white block mt-1">
                {calculatedYield} ml
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono-data text-[#8C8375] block">
                Suhu Air Optimal
              </span>
              <span className="text-base font-mono-data font-bold text-amber-300 block mt-1 flex items-center">
                <Thermometer className="w-3.5 h-3.5 mr-1 text-amber-400" />
                {activeRecipe.waterTempC}°C
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono-data text-[#8C8375] block">
                Target TDS
              </span>
              <span className="text-base font-mono-data font-bold text-emerald-400 block mt-1">
                {activeRecipe.targetTds}
              </span>
            </div>
          </div>

          {/* Stepped Pouring Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono-data tracking-wider text-[#A69E90]">
              Jadwal Penuangan (Pour Intervals)
            </h4>

            <div className="space-y-2">
              {activeRecipe.steps.map((step, idx) => {
                const scaleDose = customDose / activeRecipe.coffeeDoseG;
                const scaledPour = Math.round(step.waterPourG * scaleDose);
                const isPassed = timerSeconds >= step.timeSec;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all flex items-start space-x-3 ${
                      isPassed
                        ? "bg-[#162017] border-emerald-500/30 text-emerald-200"
                        : "bg-[#181614] border-white/5 text-[#DCD5C8]"
                    }`}
                  >
                    <div className="pt-0.5">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#8C8375] flex items-center justify-center text-[9px] font-mono-data text-[#8C8375]">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs font-mono-data mb-0.5">
                        <span className="font-bold text-[#F5F2EB]">
                          Detik {step.timeSec}s — Target: {scaledPour}g air
                        </span>
                        <span className="text-[11px] text-[#A69E90]">
                          {Math.floor(step.timeSec / 60)}m {step.timeSec % 60}s
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#A69E90] leading-relaxed">
                        {step.instruction[language]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Col 3: Live Extraction Timer & Tasting Notes */}
        <div className="bg-[#1A1816] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3 text-center">
            <span className="text-[11px] font-mono-data text-[#8C8375] uppercase tracking-widest block">
              Stopwatch Ekstraksi
            </span>
            <div className="text-5xl font-mono-data font-bold text-white tracking-widest py-2">
              {formatTime(timerSeconds)}
            </div>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-data font-bold flex items-center space-x-2 transition-all ${
                  timerRunning
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                    : "bg-[#C99454] text-[#0E0D0C] shadow-lg shadow-[#C99454]/30"
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
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#DCD5C8] border border-white/10 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <h5 className="text-xs font-mono-data text-[#C99454] uppercase tracking-wider">
              Karakter Cangkir
            </h5>
            <p className="text-xs font-sans text-[#DCD5C8] leading-relaxed italic">
              &ldquo;{activeRecipe.tastingCharacter[language]}&rdquo;
            </p>
            <div className="pt-2 text-[11px] font-mono-data text-[#8C8375] space-y-1">
              <p>Device: {activeRecipe.device}</p>
              <p>Grind: {activeRecipe.grindDescription} (~{activeRecipe.grindMicrons}µm)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
