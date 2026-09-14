"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, ZoomIn, ZoomOut, Droplets, Sparkles, Compass, Gauge } from "lucide-react";

interface Apple360ScrubberProps {
  angle: number;
  onAngleChange: (angle: number) => void;
  isPouring: boolean;
  onPourChange: (isPouring: boolean) => void;
}

export default function Apple360Scrubber({
  angle,
  onAngleChange,
  isPouring,
  onPourChange,
}: Apple360ScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Mouse tilt parallax for cinematic physical depth
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  }, [isDragging]);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Drag to scrub 360 degrees
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartAngle(angle);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
      setDragStartAngle(angle);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX;
      // 1px drag = ~0.6 degrees rotation
      const newAngle = ((dragStartAngle + Math.round(deltaX * 0.65)) % 360 + 360) % 360;
      onAngleChange(newAngle);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - dragStartX;
      const newAngle = ((dragStartAngle + Math.round(deltaX * 0.65)) % 360 + 360) % 360;
      onAngleChange(newAngle);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
      window.addEventListener("touchmove", handleGlobalTouchMove);
      window.addEventListener("touchend", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [isDragging, dragStartX, dragStartAngle, onAngleChange]);

  // Determine which studio angle to display based on scrubbed angle
  // 0° - 45°: Front
  // 45° - 135°: Three-Quarter
  // 135° - 225°: Side Profile / Angle
  // 225° - 315°: Three-Quarter mirrored
  // 315° - 360°: Front
  const isFront = (angle >= 315 || angle < 45) || (angle >= 135 && angle < 225);
  const isFlipped = angle >= 180;

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 1. Main Photorealistic Stage Frame */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative w-full aspect-square max-w-[540px] flex items-center justify-center cursor-ew-resize group"
        style={{ perspective: 1200 }}
      >
        {/* Ambient Warm Golden Halo Glow */}
        <div className="absolute inset-0 bg-radial from-[#C99454]/18 via-[#0E0D0C]/40 to-transparent pointer-events-none -z-10 rounded-full blur-3xl scale-95" />

        {/* 3D Kinetic Floating Container with Gyroscopic Tilt */}
        <motion.div
          animate={{
            rotateY: tilt.x,
            rotateX: tilt.y,
            scale: isZoomed ? 1.35 : isPouring ? 1.03 : 1.0,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
        >
          {/* Active Studio Photograph (100% Photorealistic, 0% ThreeJS Polygon) */}
          <AnimatePresence mode="wait">
            {isZoomed ? (
              <motion.div
                key="macro-zoom"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/assets/pourover/station-macro.jpg"
                  alt="Macro Blooming Extraction"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
                {/* Optical Macro Crosshair Overlay */}
                <div className="absolute inset-0 border border-[#D8A86E]/40 pointer-events-none">
                  <div className="absolute top-4 left-4 text-[9px] font-mono-data text-[#D8A86E] uppercase tracking-widest bg-black/70 px-2 py-0.5 border border-white/10">
                    2.5X OPTICAL MACRO · BLOOMING CORE
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={isFront ? "front-view" : "side-view"}
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="relative w-full h-full"
                style={{ transform: isFlipped ? "scaleX(-1)" : "none" }}
              >
                <Image
                  src={isFront ? "/assets/pourover/station-front.jpg" : "/assets/pourover/station-angle.jpg"}
                  alt="Cherry Slow-Bar Pour-Over Rig 360"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Steaming Hot Glow Aura when Pouring Water */}
          {isPouring && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/4 inset-x-1/4 h-1/2 bg-radial from-[#FDE68A]/25 via-transparent to-transparent pointer-events-none blur-xl animate-pulse"
            />
          )}
        </motion.div>

        {/* Drag Velocity Overlay Indicator */}
        <div className="absolute top-4 right-4 pointer-events-none flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#12110F]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono-data text-[#D8A86E]">
          <RotateCw className={`w-3 h-3 ${isDragging ? "animate-spin" : ""}`} />
          <span>{angle}°</span>
        </div>
      </div>

      {/* 2. Apple Pro Precision 360° Scrub Dial (Under the Stage) */}
      <div className="w-full max-w-[500px] mt-2 space-y-3 px-2">
        {/* Interactive Scrub Dial Ruler Bar */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="relative h-12 w-full bg-[#141311] border border-[#D8A86E]/25 rounded-xl flex items-center justify-center cursor-ew-resize overflow-hidden group shadow-lg"
        >
          {/* Millimeter hash marks ticks */}
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-40 group-hover:opacity-70 transition-opacity">
            {Array.from({ length: 37 }).map((_, i) => (
              <div
                key={i}
                className={`w-[1px] bg-[#D8A86E] ${i % 6 === 0 ? "h-5 opacity-90" : i % 2 === 0 ? "h-3 opacity-50" : "h-1.5 opacity-25"}`}
              />
            ))}
          </div>

          {/* Golden Center Scrub Cursor Thumb */}
          <motion.div
            style={{
              left: `${(angle / 360) * 88 + 6}%`,
            }}
            className="absolute top-1 bottom-1 w-10 -ml-5 rounded-lg bg-gradient-to-b from-[#E6C687] via-[#C99454] to-[#9E6E2E] shadow-[0_0_15px_rgba(201,148,84,0.5)] flex items-center justify-center pointer-events-none"
          >
            <div className="w-1 h-5 bg-[#0E0D0C]/80 rounded-full" />
          </motion.div>

          {/* Central Label */}
          <span className="relative z-10 text-[10px] font-mono-data uppercase tracking-[0.25em] text-[#A69E90] group-hover:text-[#F7F5F0] transition-colors pointer-events-none">
            {isDragging ? `Sudut ${angle}° · Putar 360°` : "360° Drag Scrub Dial"}
          </span>
        </div>

        {/* Action Pills: Hold to Pour & Camera Zoom */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono-data">
          <button
            onMouseDown={() => onPourChange(true)}
            onMouseUp={() => onPourChange(false)}
            onTouchStart={() => onPourChange(true)}
            onTouchEnd={() => onPourChange(false)}
            className={`flex-1 py-2.5 px-4 rounded-xl border flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-lg ${
              isPouring
                ? "bg-[#C99454] text-[#0E0D0C] border-[#C99454] font-bold shadow-[#C99454]/40 scale-[1.02]"
                : "bg-[#181614] hover:bg-[#201D1A] border-white/15 text-[#DCD5C8] hover:border-[#C99454]/50"
            }`}
          >
            <Droplets className={`w-3.5 h-3.5 ${isPouring ? "text-[#0E0D0C] animate-bounce" : "text-[#C99454]"}`} />
            <span>{isPouring ? "Menuang Air Panas 93°C..." : "Tahan untuk Tuang"}</span>
          </button>

          <button
            onClick={() => setIsZoomed((prev) => !prev)}
            className={`py-2.5 px-4 rounded-xl border flex items-center space-x-2 transition-all ${
              isZoomed
                ? "bg-[#C99454] text-[#0E0D0C] border-[#C99454] font-bold"
                : "bg-[#181614] hover:bg-[#201D1A] border-white/15 text-[#DCD5C8] hover:border-[#C99454]/50"
            }`}
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5 text-[#C99454]" />}
            <span>{isZoomed ? "Reset Zoom" : "Camera Zoom"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
