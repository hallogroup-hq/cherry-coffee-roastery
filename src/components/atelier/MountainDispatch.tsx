"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Volume2, VolumeX, Navigation, Clock, Compass, Mountain, Wind } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export default function MountainDispatch() {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const noiseNodeRef = React.useRef<AudioNode | null>(null);

  const toggleSound = () => {
    if (isPlayingSound) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlayingSound(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Procedural gentle mountain wind synthesizer
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 380;
        filter.Q.value = 2.5;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        noiseNodeRef.current = whiteNoise;
        setIsPlayingSound(true);
      } catch (e) {
        console.error("Audio error", e);
      }
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#D8A86E]/15">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Full Tactile Photograph with Natural Window Steam (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#11100E] border border-[#D8A86E]/20 shadow-2xl">
            <Image
              src="/assets/terroir/slow-bar-ritual.jpg"
              alt="Ritual Seduh Slow Bar di Goalpara"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />

            {/* Micro Caption Stamp */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-mono-data text-[#DCD5C8] border border-white/10 uppercase tracking-widest">
              GOALPARA SANCTUARY · 1.250 MDPL
            </div>

            {/* Analog Ambient Audio Player Pill */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0E0D0C]/85 backdrop-blur-md border border-white/10 p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Wind className={`w-3.5 h-3.5 ${isPlayingSound ? "text-[#C99454] animate-pulse" : "text-[#8C8375]"}`} />
                <span className="text-xs font-mono-data text-[#DCD5C8]">
                  {isPlayingSound ? "Suara Angin & Kabut Goalpara (Aktif)" : "Dengarkan Atmosfer Hutan Pinus"}
                </span>
              </div>

              <button
                onClick={toggleSound}
                className="px-3 py-1 text-xs font-mono-data border border-[#C99454] text-[#C99454] hover:bg-[#C99454] hover:text-[#0E0D0C] transition-all flex items-center space-x-1.5"
              >
                {isPlayingSound ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                <span>{isPlayingSound ? "Senyapkan" : "Putar Audio"}</span>
              </button>
            </div>
          </div>

          <p className="text-[11px] font-mono-data text-[#8C8375] italic">
            Dokumentasi ritual seduh manual di jendela kayu slow bar Cherry Coffee Roastery.
          </p>
        </div>

        {/* Right Column: Editorial Field Report (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3">
            <div className="text-[11px] font-mono-data text-[#C99454] uppercase tracking-widest">
              [ THE SANCTUARY ] · CATATAN TEMPAT
            </div>
            <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#F7F5F0] leading-[1.1]">
              Di Kaki Gunung Gede, <br />
              <span className="italic font-light text-[#D8A86E]">Waktu Bergerak Lebih Lambat.</span>
            </h2>
          </div>

          <div className="space-y-4 text-base font-sans text-[#B5ABA0] leading-relaxed">
            <p>
              Cherry Coffee Roastery beroperasi di dalam kawasan Goalpara Estate Camp. Dikelilingi rimbun kebun teh dan pinus tua, tempat ini kami bangun sebagai ruang jeda dari keriuhan kota.
            </p>
            <p>
              Tidak ada mesin espresso industri yang menderu terburu-buru. Hanya air panas bersuhu stabil yang dituangkan perlahan di atas bubuk kopi segar, ditemani gemercik aliran sungai dan udara dingin khas ketinggian.
            </p>
          </div>

          {/* Key Sanctuary Parameters */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#D8A86E]/15 text-xs font-mono-data">
            <div>
              <span className="text-[#8C8375] uppercase block text-[10px]">Jadwal Seduh</span>
              <span className="text-[#F7F5F0] font-medium block mt-0.5">Sabtu &amp; Minggu</span>
              <span className="text-[#A69E90] text-[10px]">Buka Mulai 09.00 WIB</span>
            </div>

            <div>
              <span className="text-[#8C8375] uppercase block text-[10px]">Akses Kunjungan</span>
              <span className="text-[#C99454] font-medium block mt-0.5">Tanpa Reservasi Kaku</span>
              <span className="text-[#A69E90] text-[10px]">Terbuka untuk Walk-ins</span>
            </div>

            <div>
              <span className="text-[#8C8375] uppercase block text-[10px]">Elevasi &amp; Iklim</span>
              <span className="text-[#F7F5F0] font-medium block mt-0.5">1.250 MDPL</span>
              <span className="text-[#A69E90] text-[10px]">16°C – 20°C (Sering Kabut)</span>
            </div>

            <div>
              <span className="text-[#8C8375] uppercase block text-[10px]">Lokasi</span>
              <span className="text-[#F7F5F0] font-medium block mt-0.5">Goalpara Estate Camp</span>
              <span className="text-[#A69E90] text-[10px]">Sukabumi, Jawa Barat</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://maps.google.com/?q=Goalpara+Estate+Camp+Sukabumi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-mono-data text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 shadow-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Petunjuk Jalan (Google Maps)</span>
            </a>

            <a
              href="https://www.instagram.com/cherrycoffeeroastery"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-white/15 hover:border-white/40 text-[#DCD5C8] font-mono-data text-xs uppercase tracking-wider transition-all flex items-center space-x-2"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#C99454]" />
              <span>Ikuti di @cherrycoffeeroastery</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
