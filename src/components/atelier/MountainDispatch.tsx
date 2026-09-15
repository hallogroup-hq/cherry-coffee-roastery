"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Navigation, Compass, Wind } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export default function MountainDispatch() {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const toggleSound = () => {
    if (isPlayingSound) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlayingSound(false);
    } else {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
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
        gainNode.gain.setValueAtTime(0.035, ctx.currentTime);

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
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#E5DFD3] relative">
      {/* Editorial Top Legend Line */}
      <div className="flex flex-wrap items-center justify-between pb-6 mb-10 border-b border-[#E5DFD3] text-xs font-mono tracking-widest text-[#7A7268] uppercase gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#721C24]" />
          <span className="font-bold text-[#181715]">SECTION IV · RELEVÉ TOPOGRAPHIQUE &amp; SANCTUAIRE</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-[#8A8278]">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#8C6E2E]" />
            06°53′3″S 106°58′E
          </span>
          <span>·</span>
          <span className="text-[#721C24] font-medium">1.250 MDPL GOALPARA</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Archival Plate Photograph with Brass Audio Bar */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#FAF8F5] border-2 border-[#D5CEC2] shadow-[0_12px_40px_rgba(74,67,59,0.08)] p-3">
            {/* Fine Inset Etching Line */}
            <div className="relative w-full h-full overflow-hidden border border-[#E5DFD3]">
              <Image
                src="/assets/terroir/slow-bar-ritual.jpg"
                alt="Ritual Seduh Slow Bar di Goalpara"
                fill
                className="object-cover sepia-[0.10] contrast-[1.03] transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
              />

              {/* Antique Paper Corner Label */}
              <div className="absolute top-3 left-3 bg-[#FAF8F5]/95 backdrop-blur-xs px-3 py-1 text-[9px] font-mono tracking-widest text-[#181715] border border-[#D5CEC2] uppercase shadow-xs">
                PL. V · FENÊTRE DU SANCTUAIRE
              </div>

              {/* Antique Brass Atmospheric Sound Module */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#FAF8F5]/95 backdrop-blur-md border border-[#D5CEC2] p-3 shadow-md flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Wind
                    className={`w-4 h-4 ${
                      isPlayingSound ? "text-[#721C24] animate-spin" : "text-[#7A7268]"
                    }`}
                  />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#181715] block uppercase">
                      {isPlayingSound
                        ? "Atmosphère Active · Vent & Brume"
                        : "Ambiance Sonore du Terroir"}
                    </span>
                    <span className="text-[9px] font-mono text-[#7A7268] block">
                      1.250 MDPL · Hutan Pinus Goalpara
                    </span>
                  </div>
                </div>

                <button
                  onClick={toggleSound}
                  className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-all flex items-center space-x-1.5 ${
                    isPlayingSound
                      ? "bg-[#721C24] text-white border-[#56151B] shadow-xs"
                      : "bg-[#F2EFE8] text-[#181715] border-[#C5BCAB] hover:border-[#721C24]"
                  }`}
                >
                  {isPlayingSound ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[#8C6E2E]" />
                  )}
                  <span>{isPlayingSound ? "Senyapkan" : "Dengarkan"}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#7A7268] pt-1">
            <span>FIGURE 05 — RITUAL SEDUH JENDELA KAYU</span>
            <span>ARCHIVE CCR-EST</span>
          </div>
        </div>

        {/* Right Column: Naturalist Editorial Field Report */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#721C24] uppercase tracking-widest font-bold">
              [ LE SANCTUAIRE NATUREL ] · CATATAN TEMPAT
            </div>
            <h2 className="text-4xl sm:text-5xl font-editorial font-bold text-[#181715] leading-[1.08]">
              Di Kaki Gunung Gede, <br />
              <span className="italic font-light text-[#721C24]">Waktu Bergerak Lebih Lambat.</span>
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base font-sans text-[#4A433B] leading-relaxed">
            <p>
              Cherry Coffee Roastery beroperasi di dalam naungan sejuk kawasan Goalpara Estate Camp. 
              Dikelilingi rimbun kabut perkebunan teh dan tegakan pinus tua, tempat ini kami dirikan 
              sebagai ruang jeda bagi siapa pun yang lelah oleh kebisingan kota.
            </p>
            <p>
              Tidak ada mesin espresso industri bertekanan tinggi yang menderu tergesa-gesa. 
              Hanya air panas bersuhu terkalibrasi yang dituangkan perlahan di atas bubuk kopi segar, 
              ditemani aroma tanah basah sehabis hujan dan udara dingin pegunungan.
            </p>
          </div>

          {/* Key Sanctuary Parameters: Archival Ledger Grid */}
          <div className="grid grid-cols-2 gap-4 py-5 border-y border-[#E5DFD3] text-xs font-mono">
            <div className="p-3 bg-[#FAF8F5] border border-[#E5DFD3]">
              <span className="text-[#7A7268] uppercase block text-[10px] tracking-wider">
                Jadwal Seduh
              </span>
              <span className="text-[#181715] font-bold block mt-1">Sabtu &amp; Minggu</span>
              <span className="text-[#8A8278] text-[10px]">Buka Mulai 09.00 – 18.00 WIB</span>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E5DFD3]">
              <span className="text-[#7A7268] uppercase block text-[10px] tracking-wider">
                Akses Kunjungan
              </span>
              <span className="text-[#721C24] font-bold block mt-1">Tanpa Reservasi Kaku</span>
              <span className="text-[#8A8278] text-[10px]">Terbuka untuk Walk-ins</span>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E5DFD3]">
              <span className="text-[#7A7268] uppercase block text-[10px] tracking-wider">
                Elevasi &amp; Iklim
              </span>
              <span className="text-[#181715] font-bold block mt-1">1.250 MDPL</span>
              <span className="text-[#8A8278] text-[10px]">16°C – 20°C (Sering Kabut)</span>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E5DFD3]">
              <span className="text-[#7A7268] uppercase block text-[10px] tracking-wider">
                Lokasi Administratif
              </span>
              <span className="text-[#181715] font-bold block mt-1">Goalpara Estate Camp</span>
              <span className="text-[#8A8278] text-[10px]">Sukabumi, Jawa Barat</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://maps.google.com/?q=Goalpara+Estate+Camp+Sukabumi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#721C24] hover:bg-[#8B2635] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Petunjuk Jalan (Google Maps)</span>
            </a>

            <a
              href="https://www.instagram.com/cherrycoffeeroastery"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-[#C5BCAB] hover:border-[#721C24] text-[#181715] font-mono text-xs uppercase tracking-wider bg-[#F2EFE8] transition-all flex items-center space-x-2"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#721C24]" />
              <span>Ikuti di @cherrycoffeeroastery</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
