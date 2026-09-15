"use client";

import React, { useState } from "react";
import { beansData, BeanProduct } from "@/data/beans";

export default function FlavorRadar() {
  const [selectedBeanId, setSelectedBeanId] = useState<string>("deep-loam");

  const currentBean =
    beansData.find((b) => b.id === selectedBeanId) || beansData[0];

  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;

  const attributes = [
    { key: "sweetness", label: "Sweetness" },
    { key: "acidity", label: "Acidity" },
    { key: "body", label: "Body / Viscosity" },
    { key: "aroma", label: "Aroma / Florals" },
    { key: "aftertaste", label: "Aftertaste" },
  ];

  const angleStep = (Math.PI * 2) / attributes.length;

  // Convert (value: 0-10, angleIndex) to (x, y)
  const getCoordinates = (value: number, idx: number) => {
    const angle = idx * angleStep - Math.PI / 2;
    const r = (value / 10) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Build polygon points string
  const points = attributes
    .map((attr, i) => {
      const val = currentBean.sensoryScores[attr.key as keyof typeof currentBean.sensoryScores] || 5;
      const { x, y } = getCoordinates(val, i);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full bg-[#FAF8F5] border-2 border-[#D5CEC2] shadow-[0_12px_40px_rgba(74,67,59,0.08)] p-6 sm:p-8 space-y-6 relative overflow-hidden rounded-xs">
      {/* Fine Margin Etching Border */}
      <div className="absolute inset-1.5 border border-[#E5DFD3] pointer-events-none" />

      {/* Header & Bean Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD3] pb-5 relative z-10">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#721C24] uppercase font-bold block">
            FIG. 07 — ASTROLABE SENSORIEL DU TERROIR
          </span>
          <h3 className="text-2xl font-editorial font-bold text-[#181715] mt-1">
            Visualisasi Spektrum Rasa &amp; Cupping
          </h3>
        </div>

        {/* Bean Switcher: Pressed Paper Folio Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {beansData.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBeanId(b.id)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                selectedBeanId === b.id
                  ? "bg-[#721C24] text-white border-[#56151B] font-bold shadow-xs"
                  : "bg-[#F2EFE8] text-[#5A534B] border-[#D5CEC2] hover:border-[#721C24]"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Radar SVG Diagram & Scoreboard */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
        {/* Astrolabe SVG */}
        <div className="relative w-72 sm:w-80 h-72 sm:h-80 select-none bg-[#F7F4EE] border border-[#E2DDD2] p-2 flex items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
            {/* Concentric grid webs: Astrolabe rings */}
            {[2, 4, 6, 8, 10].map((level) => {
              const gridPoints = attributes
                .map((_, i) => {
                  const { x, y } = getCoordinates(level, i);
                  return `${x},${y}`;
                })
                .join(" ");
              return (
                <polygon
                  key={level}
                  points={gridPoints}
                  fill="none"
                  stroke="#D5CEC2"
                  strokeWidth="0.75"
                  strokeDasharray={level === 10 ? "none" : "2 2"}
                />
              );
            })}

            {/* Radial axes from center */}
            {attributes.map((_, i) => {
              const { x, y } = getCoordinates(10, i);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#C5BCAB"
                  strokeWidth="0.75"
                />
              );
            })}

            {/* Active Sensory Polygon with Burgundy Fill */}
            <polygon
              points={points}
              fill="rgba(114, 28, 36, 0.16)"
              stroke="#721C24"
              strokeWidth="2"
              className="transition-all duration-500 ease-out"
            />

            {/* Active Attribute Points */}
            {attributes.map((attr, i) => {
              const val = currentBean.sensoryScores[attr.key as keyof typeof currentBean.sensoryScores] || 5;
              const { x, y } = getCoordinates(val, i);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#721C24"
                  stroke="#FAF8F5"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Attribute Labels */}
            {attributes.map((attr, i) => {
              const { x, y } = getCoordinates(11.8, i);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  fill="#181715"
                  fontSize="9.5"
                  fontFamily="Space Mono, monospace"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontWeight="bold"
                >
                  {attr.label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Sensory Scoreboard: Antique Brass Inset Folio */}
        <div className="flex-1 w-full max-w-sm space-y-4 bg-[#F2ECE0] border border-[#C5BCAB] p-5 shadow-xs">
          <div className="border-b border-[#D5CEC2] pb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#721C24] font-bold">
              {currentBean.category.toUpperCase()} · {currentBean.process.toUpperCase()}
            </span>
            <h4 className="text-xl font-editorial font-bold text-[#181715] mt-0.5">
              {currentBean.name}
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {currentBean.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-0.5 bg-[#FAF8F5] border border-[#D5CEC2] text-[#4A433B] font-sans"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            {attributes.map((attr) => {
              const val =
                currentBean.sensoryScores[attr.key as keyof typeof currentBean.sensoryScores] || 0;
              return (
                <div key={attr.key} className="flex items-center justify-between">
                  <span className="text-[#5A534B]">{attr.label}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-28 h-1.5 bg-[#E2DDD2] overflow-hidden">
                      <div
                        className="h-full bg-[#721C24] transition-all duration-500"
                        style={{ width: `${val * 10}%` }}
                      />
                    </div>
                    <span className="text-[#181715] font-bold w-6 text-right font-mono">
                      {val.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
