"use client";

import React, { useState } from "react";
import { roastProfileSample, RoastCurvePoint } from "@/data/laboratory";
import { Flame, Activity, Clock, Thermometer, ShieldAlert, Sparkles } from "lucide-react";

export default function RoastCurveGraph() {
  const [selectedPointIdx, setSelectedPointIdx] = useState(8); // Default to first crack (08:00)
  const currentPoint = roastProfileSample[selectedPointIdx] || roastProfileSample[0];

  // SVG Canvas dimensions
  const width = 800;
  const height = 360;
  const padding = { top: 30, right: 40, bottom: 40, left: 50 };

  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Domain scaling: Time 0 to 660 sec, Temp 80 to 240 °C
  const maxTime = 660;
  const minTemp = 80;
  const maxTemp = 245;

  const getX = (timeSec: number) =>
    padding.left + (timeSec / maxTime) * graphWidth;

  const getYTemp = (temp: number) =>
    padding.top + graphHeight - ((temp - minTemp) / (maxTemp - minTemp)) * graphHeight;

  const getYRoR = (ror: number) =>
    padding.top + graphHeight - (ror / 25) * graphHeight;

  // Build SVG path strings
  const btPath = roastProfileSample
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${getX(pt.timeSec)} ${getYTemp(pt.beanTemp)}`)
    .join(" ");

  const etPath = roastProfileSample
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${getX(pt.timeSec)} ${getYTemp(pt.exhaustTemp)}`)
    .join(" ");

  const rorPath = roastProfileSample
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${getX(pt.timeSec)} ${getYRoR(pt.rateOfRise)}`)
    .join(" ");

  const phaseNames: Record<string, { label: string; desc: string; color: string }> = {
    charge: { label: "Charge In", desc: "Green beans enter pre-heated drum", color: "#C99454" },
    drying: { label: "Drying Phase", desc: "Moisture evaporation & green-to-pale yellow shift", color: "#84cc16" },
    maillard: { label: "Maillard Reaction", desc: "Caramelization, melanoidins & aroma development", color: "#f59e0b" },
    first_crack: { label: "First Crack", desc: "Cell walls pop; origin acidity & florality unlocked", color: "#ef4444" },
    development: { label: "Roast Development", desc: "Calibrated sweetness & tactile viscosity", color: "#b45309" },
    drop: { label: "Drop & Quench", desc: "Rapid cooling on perforated tray", color: "#06b6d4" },
  };

  return (
    <div className="w-full bg-[#12110F] border border-[#D8A86E]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Header & Live Telemetry Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono-data text-[#C99454] uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5" />
            <span>Telemetry Profiling · Giesen W6A Laboratory Drum</span>
          </div>
          <h3 className="text-2xl font-editorial font-bold text-white mt-1">
            Model Kurva Sangrai Presisi
          </h3>
        </div>

        {/* Telemetry Display Chips */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-[#1C1A17] border border-white/10">
            <span className="text-[10px] uppercase font-mono-data text-[#8C8375] block">Bean Temp (BT)</span>
            <span className="text-lg font-mono-data font-bold text-[#E6DFD5]">
              {currentPoint.beanTemp}°C
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#1C1A17] border border-white/10">
            <span className="text-[10px] uppercase font-mono-data text-[#8C8375] block">Rate of Rise (RoR)</span>
            <span className="text-lg font-mono-data font-bold text-[#C99454]">
              {currentPoint.rateOfRise}°C/m
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#1C1A17] border border-white/10">
            <span className="text-[10px] uppercase font-mono-data text-[#8C8375] block">Exhaust (ET)</span>
            <span className="text-lg font-mono-data font-bold text-amber-200">
              {currentPoint.exhaustTemp}°C
            </span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Roast Curve Chart */}
      <div className="relative w-full overflow-x-auto select-none">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[620px]">
          {/* Grid lines */}
          {[100, 140, 180, 220].map((t) => (
            <g key={t}>
              <line
                x1={padding.left}
                y1={getYTemp(t)}
                x2={width - padding.right}
                y2={getYTemp(t)}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 10}
                y={getYTemp(t) + 4}
                fill="#8C8375"
                fontSize="10"
                fontFamily="Space Mono"
                textAnchor="end"
              >
                {t}°C
              </text>
            </g>
          ))}

          {/* Time axis marks */}
          {[0, 120, 240, 360, 480, 600].map((sec) => (
            <g key={sec}>
              <line
                x1={getX(sec)}
                y1={padding.top}
                x2={getX(sec)}
                y2={height - padding.bottom}
                stroke="rgba(255,255,255,0.04)"
              />
              <text
                x={getX(sec)}
                y={height - padding.bottom + 18}
                fill="#8C8375"
                fontSize="10"
                fontFamily="Space Mono"
                textAnchor="middle"
              >
                {Math.floor(sec / 60)}:00
              </text>
            </g>
          ))}

          {/* First Crack Shaded Vertical Band */}
          <rect
            x={getX(460)}
            y={padding.top}
            width={getX(520) - getX(460)}
            height={graphHeight}
            fill="rgba(239, 68, 68, 0.08)"
          />
          <text
            x={getX(490)}
            y={padding.top + 16}
            fill="#ef4444"
            fontSize="10"
            fontFamily="Space Mono"
            textAnchor="middle"
            fontWeight="bold"
          >
            FIRST CRACK (198°C)
          </text>

          {/* Exhaust Temperature Curve */}
          <path d={etPath} fill="none" stroke="#FDE68A" strokeWidth="2" opacity="0.6" />

          {/* Rate of Rise Curve (RoR) */}
          <path
            d={rorPath}
            fill="none"
            stroke="#C99454"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.8"
          />

          {/* Bean Temperature Curve (BT) with Gradient Fill */}
          <path
            d={`${btPath} L ${getX(roastProfileSample[roastProfileSample.length - 1].timeSec)} ${
              height - padding.bottom
            } L ${getX(0)} ${height - padding.bottom} Z`}
            fill="url(#curveGradient)"
            opacity="0.15"
          />
          <path d={btPath} fill="none" stroke="#F5F2EB" strokeWidth="3" />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C99454" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C99454" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Interactive Scrubbing Points */}
          {roastProfileSample.map((pt, idx) => {
            const isSelected = selectedPointIdx === idx;
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onClick={() => setSelectedPointIdx(idx)}
              >
                <circle
                  cx={getX(pt.timeSec)}
                  y={getYTemp(pt.beanTemp)}
                  r={isSelected ? 7 : 4}
                  fill={isSelected ? "#C99454" : "#12110F"}
                  stroke={isSelected ? "#FFFFFF" : "#C99454"}
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* Active Cursor Vertical Guide */}
          <line
            x1={getX(currentPoint.timeSec)}
            y1={padding.top}
            x2={getX(currentPoint.timeSec)}
            y2={height - padding.bottom}
            stroke="#C99454"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
      </div>

      {/* Scrub Slider & Phase Explanation */}
      <div className="bg-[#1A1816] border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: phaseNames[currentPoint.phase].color }}
            />
            <span className="text-xs font-mono-data uppercase font-bold text-white">
              {phaseNames[currentPoint.phase].label} ({currentPoint.timeLabel})
            </span>
          </div>
          <p className="text-xs font-sans text-[#A69E90]">
            {phaseNames[currentPoint.phase].desc}
          </p>
        </div>

        {/* Timeline Scrub Controls */}
        <div className="w-full sm:w-64 space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono-data text-[#8C8375]">
            <span>Timeline Sangrai</span>
            <span className="text-[#C99454]">{currentPoint.timeLabel}</span>
          </div>
          <input
            type="range"
            min={0}
            max={roastProfileSample.length - 1}
            value={selectedPointIdx}
            onChange={(e) => setSelectedPointIdx(Number(e.target.value))}
            className="w-full accent-[#C99454] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
