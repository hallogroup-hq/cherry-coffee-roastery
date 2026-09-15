"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Droplets, Sparkles, Thermometer, Compass } from "lucide-react";

interface BotanicalExtractionApparatusProps {
  onTimeChange?: (secs: number) => void;
  onTempChange?: (temp: number) => void;
  onGrindChange?: (grind: number) => void;
}

export default function BotanicalExtractionApparatus({
  onTimeChange,
  onTempChange,
  onGrindChange,
}: BotanicalExtractionApparatusProps) {
  // Extraction parameters
  const [grindMicrons, setGrindMicrons] = useState(650); // 400 - 850 um
  const [waterTemp, setWaterTemp] = useState(92.4); // 88.0 - 96.0 C
  const [seconds, setSeconds] = useState(48);
  const [isExtracting, setIsExtracting] = useState(true);
  const [activeDripPhase, setActiveDripPhase] = useState<"bloom" | "development" | "finish">("bloom");

  // Rotary drag refs
  const grindDialRef = useRef<HTMLDivElement>(null);
  const tempDialRef = useRef<HTMLDivElement>(null);
  const [isDraggingGrind, setIsDraggingGrind] = useState(false);
  const [isDraggingTemp, setIsDraggingTemp] = useState(false);

  // Chronometer ticker
  useEffect(() => {
    if (!isExtracting) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev >= 180 ? 0 : prev + 1;
        onTimeChange?.(next);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExtracting, onTimeChange]);

  // Update phase according to seconds
  useEffect(() => {
    if (seconds < 45) {
      setActiveDripPhase("bloom");
    } else if (seconds < 120) {
      setActiveDripPhase("development");
    } else {
      setActiveDripPhase("finish");
    }
  }, [seconds]);

  // Drag interaction for Grind Dial
  const handleGrindMouseDown = () => setIsDraggingGrind(true);
  const handleTempMouseDown = () => setIsDraggingTemp(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingGrind && grindDialRef.current) {
        const rect = grindDialRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
        // Normalize angle to 400 - 850 range
        const normalized = Math.round(400 + (((angle + 180) % 360) / 360) * 450);
        setGrindMicrons(normalized);
        onGrindChange?.(normalized);
      }
      if (isDraggingTemp && tempDialRef.current) {
        const rect = tempDialRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
        const normalized = parseFloat((88 + (((angle + 180) % 360) / 360) * 8).toFixed(1));
        setWaterTemp(normalized);
        onTempChange?.(normalized);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingGrind(false);
      setIsDraggingTemp(false);
    };

    if (isDraggingGrind || isDraggingTemp) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingGrind, isDraggingTemp, onGrindChange, onTempChange]);

  // Format time
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 bg-[#FAF8F5] border-2 border-[#D5CEC2] shadow-[0_12px_40px_rgba(74,67,59,0.08)] relative p-6 sm:p-8 overflow-hidden rounded-xs">
      {/* Antique Paper Fine Margin Border */}
      <div className="absolute inset-1.5 border border-[#E5DFD3] pointer-events-none" />

      {/* Top Header Plate: Botanical Laboratory Classification */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#E5DFD3] pb-4 mb-6 text-xs font-mono tracking-widest text-[#7A7268] uppercase gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#721C24]" />
          <span className="font-bold text-[#181715]">FIG. 04 — APPAREIL D&apos;EXTRACTION SLOW-BAR</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-[#A39B90]">
          <span>PATENT NO. 1803-ID</span>
          <span>·</span>
          <span>GOALPARA ARCHIVES</span>
        </div>
      </div>

      {/* Main Grid: Antique Brass Controls & Blueprint Drawing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Blueprint Schematic Drawing of Pour-Over */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-[#F2EFE8]/70 border border-[#E2DDD2] relative">
          <div className="absolute top-2 left-2 text-[9px] font-mono text-[#7A7268] tracking-widest uppercase">
            REV. 1.2 — ORIGAMI &amp; FLASK SCHEMATIC
          </div>

          {/* Precision SVG Technical Line Drawing */}
          <div className="w-full max-w-[280px] h-[260px] relative flex items-center justify-center py-4">
            <svg viewBox="0 0 300 280" className="w-full h-full text-[#4A433B] overflow-visible">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#7A7268" />
                </marker>
              </defs>

              {/* Dimension Lines */}
              <line x1="20" y1="40" x2="20" y2="240" stroke="#B8B0A2" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="16" y1="40" x2="24" y2="40" stroke="#B8B0A2" strokeWidth="0.75" />
              <line x1="16" y1="240" x2="24" y2="240" stroke="#B8B0A2" strokeWidth="0.75" />
              <text x="10" y="145" fontSize="8" fontFamily="Space Mono, monospace" fill="#7A7268" transform="rotate(-90, 10, 145)" textAnchor="middle">
                245 MM
              </text>

              {/* Origami Faceted Dripper */}
              <path
                d="M 80,45 L 220,45 L 185,130 L 115,130 Z"
                fill="none"
                stroke="#181715"
                strokeWidth="1.75"
              />
              {/* Faceted Internal Ribs */}
              {[-35, -20, -7, 7, 20, 35].map((offset, i) => (
                <line
                  key={i}
                  x1={150 + offset * 1.8}
                  y1={45}
                  x2={150 + offset * 0.8}
                  y2={130}
                  stroke="#8C6E2E"
                  strokeWidth="0.75"
                  strokeDasharray={i % 2 === 0 ? "none" : "2 2"}
                />
              ))}

              {/* Pleated Filter Outline */}
              <path
                d="M 90,48 L 210,48 L 180,125 L 120,125 Z"
                fill="rgba(191, 161, 95, 0.08)"
                stroke="#BFA15F"
                strokeWidth="1"
              />

              {/* Coffee Grounds Blooming Bed */}
              <ellipse cx="150" cy="115" rx="28" ry="6" fill="#4A433B" />
              <text x="150" y="117" fontSize="7" fontFamily="Space Mono, monospace" fill="#FAF8F5" textAnchor="middle">
                BED 15G
              </text>

              {/* Borosilicate Glass Server / Carafe */}
              <path
                d="M 125,132 L 175,132 L 205,230 C 205,242 195,245 180,245 L 120,245 C 105,245 95,242 95,230 Z"
                fill="none"
                stroke="#181715"
                strokeWidth="1.5"
              />
              {/* Server Handle */}
              <path
                d="M 195,150 C 228,155 228,215 185,225"
                fill="none"
                stroke="#181715"
                strokeWidth="1.5"
              />

              {/* Liquid Coffee Level */}
              <path
                d="M 102,215 Q 150,218 198,215 L 200,230 C 200,240 190,242 178,242 L 122,242 C 110,242 100,240 100,230 Z"
                fill="rgba(114, 28, 36, 0.18)"
                stroke="#721C24"
                strokeWidth="1"
              />

              {/* Active Falling Drip Particles */}
              {isExtracting && (
                <g className="animate-pulse">
                  <circle cx="150" cy="148" r="2" fill="#721C24" />
                  <circle cx="150" cy="170" r="2.5" fill="#721C24" />
                  <circle cx="150" cy="192" r="2" fill="#721C24" />
                  <line x1="150" y1="135" x2="150" y2="210" stroke="#721C24" strokeWidth="0.5" strokeDasharray="3 6" />
                </g>
              )}

              {/* Scale Tick Marks on Carafe */}
              <line x1="110" y1="175" x2="118" y2="175" stroke="#7A7268" strokeWidth="0.75" />
              <line x1="110" y1="190" x2="118" y2="190" stroke="#7A7268" strokeWidth="0.75" />
              <line x1="110" y1="205" x2="124" y2="205" stroke="#7A7268" strokeWidth="1" />
              <text x="128" y="207" fontSize="7" fontFamily="Space Mono, monospace" fill="#7A7268">
                225 ML
              </text>
            </svg>
          </div>

          {/* Drip Velocity Readout */}
          <div className="w-full flex items-center justify-between pt-2 border-t border-[#E2DDD2] text-[10px] font-mono text-[#5A534B]">
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-[#721C24]" />
              <span>FLOW: {isExtracting ? "2.4 G/S" : "0.0 G/S (PAUSED)"}</span>
            </span>
            <span className="text-[#8C6E2E] font-bold uppercase">
              {activeDripPhase === "bloom" ? "PHASE I · BLOOM" : activeDripPhase === "development" ? "PHASE II · CARAMEL" : "PHASE III · FINISH"}
            </span>
          </div>
        </div>

        {/* Right Column: Antique Brass Horological Controls (Option 2 into Option 3) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* 1. Brushed Brass Knurled Dials Panel */}
          <div className="p-5 bg-gradient-to-b from-[#F2ECE0] to-[#E9E1D2] border border-[#C5BCAB] shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),0_4px_12px_rgba(74,67,59,0.06)] rounded-xs">
            <div className="flex items-center justify-between border-b border-[#D5CEC2] pb-2 mb-4">
              <span className="text-[10px] font-mono tracking-widest text-[#4A433B] uppercase font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#8C6E2E]" />
                CALIBRATION INSTRUMENTS
              </span>
              <span className="text-[9px] font-mono text-[#7A7268]">BRASS HARDWARE</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Dial 1: Grind Particle Microns */}
              <div className="flex flex-col items-center text-center">
                <span className="text-[10px] font-mono text-[#5A534B] uppercase tracking-wider mb-2">
                  GRIND BURR (µm)
                </span>
                <div
                  ref={grindDialRef}
                  onMouseDown={handleGrindMouseDown}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#8C6E2E] via-[#D4B773] to-[#FAF1D6] border-2 border-[#5E491E] shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing relative select-none"
                  style={{
                    transform: `rotate(${((grindMicrons - 400) / 450) * 280 - 140}deg)`,
                  }}
                >
                  {/* Brass Engraved Notch Pointer */}
                  <div className="absolute top-1.5 w-1.5 h-3.5 bg-[#4A3816] rounded-xs shadow-xs" />
                  {/* Inner Dial Center */}
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#8C6E2E] flex items-center justify-center shadow-inner">
                    <span className="text-[10px] font-mono font-bold text-[#181715] transform -rotate-[calc(((grindMicrons-400)/450)*280deg-140deg)]">
                      {grindMicrons}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-[#7A7268] mt-2">
                  {grindMicrons < 550 ? "FINE" : grindMicrons < 700 ? "MEDIUM-FINE" : "COARSE"}
                </span>
              </div>

              {/* Dial 2: Water Temperature Thermometer */}
              <div className="flex flex-col items-center text-center">
                <span className="text-[10px] font-mono text-[#5A534B] uppercase tracking-wider mb-2">
                  WATER TEMP (°C)
                </span>
                <div
                  ref={tempDialRef}
                  onMouseDown={handleTempMouseDown}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#8C6E2E] via-[#D4B773] to-[#FAF1D6] border-2 border-[#5E491E] shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing relative select-none"
                  style={{
                    transform: `rotate(${((waterTemp - 88) / 8) * 280 - 140}deg)`,
                  }}
                >
                  <div className="absolute top-1.5 w-1.5 h-3.5 bg-[#721C24] rounded-xs shadow-xs" />
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#8C6E2E] flex items-center justify-center shadow-inner">
                    <span className="text-[10px] font-mono font-bold text-[#721C24] transform -rotate-[calc(((waterTemp-88)/8)*280deg-140deg)]">
                      {waterTemp}°
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-[#7A7268] mt-2">
                  TUNGSTEN HEAT
                </span>
              </div>
            </div>
          </div>

          {/* 2. Chronometer & Mechanical Extraction Toggle */}
          <div className="p-4 bg-[#FAF8F5] border border-[#D5CEC2] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono text-[#7A7268] uppercase block tracking-widest">
                HOROLOGICAL CHRONOMETER
              </span>
              <div className="text-3xl font-editorial italic font-bold text-[#181715] tracking-tight">
                {formatTime(seconds)} <span className="text-sm font-sans font-normal text-[#A39B90]">/ 03:00</span>
              </div>
            </div>

            {/* Antique Mechanical Start/Stop Switch */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExtracting(!isExtracting)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 border flex items-center space-x-1.5 shadow-xs ${
                  isExtracting
                    ? "bg-[#721C24] hover:bg-[#8B2635] text-white border-[#56151B]"
                    : "bg-[#BFA15F] hover:bg-[#D4B773] text-[#181715] border-[#8C6E2E]"
                }`}
              >
                {isExtracting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isExtracting ? "DISENGAGE" : "ENGAGE FLOW"}</span>
              </button>

              <button
                onClick={() => setSeconds(0)}
                className="p-2 border border-[#D5CEC2] hover:border-[#7A7268] text-[#5A534B] hover:text-[#181715] bg-[#F2EFE8] transition-colors"
                title="Reset Chronometer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. Parchment Technical Readout Matrix (Option 2 stats styled in Option 3) */}
          <div className="grid grid-cols-4 gap-2 pt-1 border-t border-[#E5DFD3] text-center font-mono">
            <div className="p-2 bg-[#F2EFE8]/60 border border-[#E2DDD2]">
              <span className="text-[8px] text-[#7A7268] uppercase block">TDS METRIC</span>
              <span className="text-xs font-bold text-[#181715]">1.35%</span>
            </div>
            <div className="p-2 bg-[#F2EFE8]/60 border border-[#E2DDD2]">
              <span className="text-[8px] text-[#7A7268] uppercase block">YIELD</span>
              <span className="text-xs font-bold text-[#721C24]">20.4%</span>
            </div>
            <div className="p-2 bg-[#F2EFE8]/60 border border-[#E2DDD2]">
              <span className="text-[8px] text-[#7A7268] uppercase block">RATIO</span>
              <span className="text-xs font-bold text-[#181715]">1:15.0</span>
            </div>
            <div className="p-2 bg-[#F2EFE8]/60 border border-[#E2DDD2]">
              <span className="text-[8px] text-[#7A7268] uppercase block">ELEVATION</span>
              <span className="text-xs font-bold text-[#8C6E2E]">1.250M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
