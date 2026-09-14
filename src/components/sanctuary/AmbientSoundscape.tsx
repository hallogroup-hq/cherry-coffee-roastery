"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, Wind } from "lucide-react";

export default function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isInitialized = useRef(false);

  const initWebAudio = () => {
    if (isInitialized.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Mountain Wind (Pink Noise Generator with Bandpass Filter)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to simulate low mountain pine wind
      const windFilter = ctx.createBiquadFilter();
      windFilter.type = "lowpass";
      windFilter.frequency.setValueAtTime(320, ctx.currentTime);

      whiteNoise.connect(windFilter);
      windFilter.connect(masterGain);
      whiteNoise.start(0);

      // 2. Slow Bar Stream Resonator (gentle murmuring river tone)
      const streamOsc = ctx.createOscillator();
      streamOsc.type = "sine";
      streamOsc.frequency.setValueAtTime(140, ctx.currentTime);

      const streamGain = ctx.createGain();
      streamGain.gain.setValueAtTime(0.015, ctx.currentTime);

      streamOsc.connect(streamGain);
      streamGain.connect(masterGain);
      streamOsc.start(0);

      isInitialized.current = true;
    } catch (e) {
      console.warn("Web Audio Ambiance not initialized:", e);
    }
  };

  const toggleAmbiance = () => {
    if (!isPlaying) {
      initWebAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAmbiance}
      className={`fixed bottom-6 right-6 z-30 flex items-center space-x-2 px-3.5 py-2 rounded-full border text-xs font-mono-data backdrop-blur-md transition-all duration-300 shadow-xl ${
        isPlaying
          ? "bg-[#232B25]/90 border-emerald-500/40 text-emerald-300 shadow-emerald-950/30 scale-105"
          : "bg-[#141311]/85 border-white/10 text-[#DCD5C8]/80 hover:text-white hover:border-[#C99454]/40"
      }`}
      title={isPlaying ? "Matikan Ambiance Alam" : "Putar Suara Angin Pinus & Sungai Goalpara"}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center space-x-1 h-3 mr-1">
            <span className="w-0.5 h-3 bg-emerald-400 animate-pulse" />
            <span className="w-0.5 h-2 bg-emerald-400 animate-pulse delay-75" />
            <span className="w-0.5 h-3 bg-emerald-400 animate-pulse delay-150" />
          </div>
          <span>Goalpara Ambiance (Aktif)</span>
          <Volume2 className="w-3.5 h-3.5" />
        </>
      ) : (
        <>
          <Wind className="w-3.5 h-3.5 text-[#C99454]" />
          <span>Suara Alam Goalpara</span>
          <VolumeX className="w-3.5 h-3.5 text-[#8C8375]" />
        </>
      )}
    </button>
  );
}
