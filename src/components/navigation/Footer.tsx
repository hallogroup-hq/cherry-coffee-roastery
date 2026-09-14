"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Music, MessageCircle, MapPin, ArrowUpRight, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-[#0A0908] border-t border-[#D8A86E]/15 text-[#DCD5C8] pt-16 pb-12 overflow-hidden">
      {/* Background Mist & Subtle Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C99454]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#232B25]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Col 1 & 2: Brand Heritage & Quote */}
          <div className="lg:col-span-2 space-y-5">
            <div className="relative w-48 h-14">
              <Image
                src="/assets/branding/Logo Variation CCR-02.png"
                alt="Cherry Coffee Roastery"
                fill
                className="object-contain object-left filter brightness-110"
              />
            </div>
            <p className="text-sm font-sans text-[#A69E90] max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="pt-2 text-xs font-mono-data text-[#C99454] flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Goalpara Estate Camp · 1,250 MASL · Mt. Gede Pangrango</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono-data tracking-widest text-[#F5F2EB] font-bold">
              Eksplorasi
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-data">
              <li>
                <Link href="/beans" className="hover:text-[#C99454] transition-colors">
                  Biji Kopi (Offerings)
                </Link>
              </li>
              <li>
                <Link href="/laboratory" className="hover:text-[#C99454] transition-colors">
                  Laboratorium & Roast Curve
                </Link>
              </li>
              <li>
                <Link href="/sanctuary" className="hover:text-[#C99454] transition-colors">
                  The Sanctuary (Goalpara)
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#C99454] transition-colors">
                  Jurnal & Esai Rasa
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C99454] transition-colors">
                  Tentang Roastery
                </Link>
              </li>
              <li>
                <a
                  href="https://edu.cherryroastery.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C99454] hover:text-[#D8A86E] transition-colors flex items-center space-x-1"
                >
                  <span>CherryEdu (Akademi Kopi)</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Slow Bar Schedule */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono-data tracking-widest text-[#F5F2EB] font-bold">
              Jadwal Slow Bar
            </h4>
            <div className="space-y-2 text-xs font-mono-data text-[#A69E90]">
              <p className="text-white font-medium">Buka Setiap Akhir Pekan</p>
              <p>Sabtu & Minggu</p>
              <p className="text-[#C99454]">08.00 – 18.00 WIB</p>
              <p className="text-[11px] pt-1 text-[#8C8375]">
                Hari kerja beroperasi sebagai roasting laboratory & sensory R&D.
              </p>
            </div>
          </div>

          {/* Col 5: Connect & Concierge */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono-data tracking-widest text-[#F5F2EB] font-bold">
              Terhubung
            </h4>
            <ul className="space-y-3 text-xs font-mono-data">
              <li>
                <a
                  href="https://www.instagram.com/cherrycoffeeroastery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#DCD5C8] hover:text-[#C99454] transition-colors group"
                >
                  <InstagramIcon className="w-4 h-4 text-[#C99454]" />
                  <span>@cherrycoffeeroastery</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#DCD5C8] hover:text-[#C99454] transition-colors group"
                >
                  <Music className="w-4 h-4 text-emerald-400" />
                  <span>Slow Bar Playlist</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Cherry%20Coffee%20Roastery%2C%20saya%20ingin%20berkonsultasi%20mengenai%20biji%20kopi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#DCD5C8] hover:text-[#C99454] transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>VIP Roastery Concierge</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Philosophical quote & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-data text-[#8C8375] space-y-4 sm:space-y-0">
          <p className="italic font-editorial text-sm text-[#DCD5C8]/80">
            &ldquo;Kopi disajikan untuk mereka yang tidak tergesa-gesa.&rdquo;
          </p>
          <p>
            &copy; {new Date().getFullYear()} Cherry Coffee Roastery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
