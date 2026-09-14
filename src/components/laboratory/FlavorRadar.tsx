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
    <div className="w-full bg-[#12110F] border border-[#D8A86E]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-xs font-mono-data text-[#C99454] uppercase tracking-widest block">
            Cupping Sensory Radar
          </span>
          <h3 className="text-2xl font-editorial font-bold text-white mt-1">
            Visualisasi Spektrum Rasa
          </h3>
        </div>

        {/* Bean Switcher */}
        <div className="flex flex-wrap gap-2">
          {beansData.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBeanId(b.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono-data transition-all ${
                selectedBeanId === b.id
                  ? "bg-[#C99454] text-[#0E0D0C] font-bold"
                  : "bg-[#1C1A17] text-[#DCD5C8]/80 hover:bg-white/10"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Radar SVG Diagram */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative w-72 sm:w-80 h-72 sm:h-80 select-none">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
            {/* Concentric grid webs */}
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
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1"
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
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Active Sensory Polygon with Gradient */}
            <polygon
              points={points}
              fill="url(#radarGradient)"
              stroke="#C99454"
              strokeWidth="2.5"
              className="transition-all duration-500 ease-out"
            />

            {/* Active Dots */}
            {attributes.map((attr, i) => {
              const val = currentBean.sensoryScores[attr.key as keyof typeof currentBean.sensoryScores] || 5;
              const { x, y } = getCoordinates(val, i);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#F5F2EB"
                  stroke="#C99454"
                  strokeWidth="2"
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
                  fill="#DCD5C8"
                  fontSize="10"
                  fontFamily="Space Mono"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {attr.label}
                </text>
              );
            })}

            <defs>
              <radialGradient id="radarGradient">
                <stop offset="0%" stopColor="#C99454" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#931a25" stopOpacity="0.2" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Sensory Scoreboard */}
        <div className="flex-1 w-full max-w-sm space-y-4">
          <div className="border-b border-white/10 pb-3">
            <span className="text-xs font-mono-data text-[#C99454] uppercase">
              {currentBean.category} · {currentBean.process}
            </span>
            <h4 className="text-xl font-editorial font-bold text-white">
              {currentBean.name}
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {currentBean.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-[#1C1A17] border border-white/5 text-[#E6DFD5]"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono-data">
            {attributes.map((attr) => {
              const val =
                currentBean.sensoryScores[attr.key as keyof typeof currentBean.sensoryScores] || 0;
              return (
                <div key={attr.key} className="flex items-center justify-between">
                  <span className="text-[#8C8375]">{attr.label}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-28 h-1.5 bg-[#1C1A17] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C99454] to-[#E6DFD5] rounded-full transition-all duration-500"
                        style={{ width: `${val * 10}%` }}
                      />
                    </div>
                    <span className="text-white font-bold w-6 text-right">
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
