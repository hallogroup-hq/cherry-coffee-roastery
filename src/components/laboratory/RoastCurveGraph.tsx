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
    charge: { label: "Charge In", desc: "Green beans enter pre-heated cast-iron drum", color: "#8C6E2E" },
    drying: { label: "Drying Phase", desc: "Moisture evaporation & green-to-pale straw shift", color: "#BFA15F" },
    maillard: { label: "Maillard Reaction", desc: "Caramelization, melanoidins & aroma development", color: "#A85D26" },
    first_crack: { label: "First Crack", desc: "Cell walls fracture; origin acidity & florality unlocked", color: "#721C24" },
    development: { label: "Roast Development", desc: "Calibrated sweetness & tactile viscosity", color: "#5E491E" },
    drop: { label: "Drop & Quench", desc: "Rapid cooling on perforated brass tray", color: "#3B5242" },
  };

  return (
    <div className="w-full bg-[#FAF8F5] border-2 border-[#D5CEC2] shadow-[0_12px_40px_rgba(74,67,59,0.08)] p-6 sm:p-8 space-y-6 relative overflow-hidden rounded-xs">
      {/* Fine margin etching border */}
      <div className="absolute inset-1.5 border border-[#E5DFD3] pointer-events-none" />

      {/* Header & Telemetry Brass Plaques */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5DFD3] pb-5 relative z-10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#721C24] uppercase font-bold">
            <Activity className="w-3.5 h-3.5" />
            <span>FIG. 06 — PROFILAGE THERMIQUE DU TAMBOUR</span>
          </div>
          <h3 className="text-2xl font-editorial font-bold text-[#181715] mt-1">
            Modèle de Courbe Thermique CCR
          </h3>
        </div>

        {/* Telemetry Display Chips: Antique Brass Inset Plaques */}
        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-1.5 bg-[#F2ECE0] border border-[#C5BCAB] shadow-xs">
            <span className="text-[9px] uppercase font-mono tracking-wider text-[#7A7268] block">
              Bean Temp (BT)
            </span>
            <span className="text-base font-mono font-bold text-[#181715]">
              {currentPoint.beanTemp}°C
            </span>
          </div>
          <div className="px-3.5 py-1.5 bg-[#F2ECE0] border border-[#C5BCAB] shadow-xs">
            <span className="text-[9px] uppercase font-mono tracking-wider text-[#7A7268] block">
              Rate of Rise (RoR)
            </span>
            <span className="text-base font-mono font-bold text-[#721C24]">
              {currentPoint.rateOfRise}°C/m
            </span>
          </div>
          <div className="px-3.5 py-1.5 bg-[#F2ECE0] border border-[#C5BCAB] shadow-xs">
            <span className="text-[9px] uppercase font-mono tracking-wider text-[#7A7268] block">
              Exhaust (ET)
            </span>
            <span className="text-base font-mono font-bold text-[#8C6E2E]">
              {currentPoint.exhaustTemp}°C
            </span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Roast Curve Chart */}
      <div className="relative w-full overflow-x-auto select-none bg-[#F7F4EE] border border-[#E2DDD2] p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[620px]">
          {/* Grid lines */}
          {[100, 140, 180, 220].map((t) => (
            <g key={t}>
              <line
                x1={padding.left}
                y1={getYTemp(t)}
                x2={width - padding.right}
                y2={getYTemp(t)}
                stroke="#D5CEC2"
                strokeWidth="0.75"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 10}
                y={getYTemp(t) + 4}
                fill="#7A7268"
                fontSize="10"
                fontFamily="Space Mono, monospace"
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
                stroke="#D5CEC2"
                strokeWidth="0.75"
                strokeDasharray="3 3"
              />
              <text
                x={getX(sec)}
                y={height - padding.bottom + 18}
                fill="#7A7268"
                fontSize="10"
                fontFamily="Space Mono, monospace"
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
            fill="rgba(114, 28, 36, 0.08)"
            stroke="rgba(114, 28, 36, 0.2)"
            strokeWidth="0.75"
            strokeDasharray="2 2"
          />
          <text
            x={getX(490)}
            y={padding.top + 16}
            fill="#721C24"
            fontSize="9"
            fontFamily="Space Mono, monospace"
            textAnchor="middle"
            fontWeight="bold"
            letterSpacing="1"
          >
            FIRST CRACK (198°C)
          </text>

          {/* Exhaust Temperature Curve */}
          <path d={etPath} fill="none" stroke="#8C6E2E" strokeWidth="1.75" opacity="0.85" />

          {/* Rate of Rise Curve (RoR) */}
          <path
            d={rorPath}
            fill="none"
            stroke="#721C24"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.9"
          />

          {/* Bean Temperature Curve (BT) with Gradient Fill */}
          <path
            d={`${btPath} L ${getX(roastProfileSample[roastProfileSample.length - 1].timeSec)} ${
              height - padding.bottom
            } L ${getX(0)} ${height - padding.bottom} Z`}
            fill="url(#curveGradient)"
            opacity="0.12"
          />
          <path d={btPath} fill="none" stroke="#181715" strokeWidth="2.5" />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BFA15F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0.0" />
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
                  r={isSelected ? 6.5 : 3.5}
                  fill={isSelected ? "#721C24" : "#FAF8F5"}
                  stroke={isSelected ? "#181715" : "#8C6E2E"}
                  strokeWidth="1.5"
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
            stroke="#721C24"
            strokeWidth="1.25"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* Scrub Slider & Phase Explanation: Antique Brass Console */}
      <div className="bg-[#F2ECE0] border border-[#C5BCAB] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-xs"
              style={{ backgroundColor: phaseNames[currentPoint.phase].color }}
            />
            <span className="text-xs font-mono uppercase font-bold text-[#181715]">
              {phaseNames[currentPoint.phase].label} ({currentPoint.timeLabel})
            </span>
          </div>
          <p className="text-xs font-sans text-[#5A534B]">
            {phaseNames[currentPoint.phase].desc}
          </p>
        </div>

        {/* Timeline Scrub Controls */}
        <div className="w-full sm:w-64 space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-[#7A7268] uppercase">
            <span>CHRONO TIMELINE</span>
            <span className="text-[#721C24] font-bold">{currentPoint.timeLabel}</span>
          </div>
          <input
            type="range"
            min={0}
            max={roastProfileSample.length - 1}
            value={selectedPointIdx}
            onChange={(e) => setSelectedPointIdx(Number(e.target.value))}
            className="w-full accent-[#721C24] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
