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
    <footer className="relative bg-[#EFECE4] border-t-2 border-[#D5CEC2] text-[#4A433B] pt-16 pb-12 overflow-hidden">
      {/* Antique Paper Inset Etching */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-[#FFFFFF]/60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#D5CEC2]">
          {/* Col 1 & 2: Brand Heritage & Quote */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-4">
              <div className="relative w-48 h-12">
                <Image
                  src="/assets/branding/Logo Variation CCR-01.png"
                  alt="Cherry Coffee Roastery"
                  fill
                  className="object-contain object-left"
                />
              </div>
              {/* Monogram Seal */}
              <div className="w-8 h-8 rounded-full bg-[#721C24] border border-[#56151B] flex items-center justify-center text-[7px] font-editorial text-white font-bold tracking-wider">
                CCR
              </div>
            </div>

            <p className="text-sm font-sans text-[#5A534B] max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="pt-2 text-xs font-mono text-[#721C24] flex items-center space-x-2 font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Goalpara Estate Camp · 1.250 MDPL · Kaki Gn. Gede Pangrango</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#181715] font-bold">
              Registre &amp; Menu
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/beans" className="text-[#5A534B] hover:text-[#721C24] transition-colors">
                  Specimen Ledger (Biji Kopi)
                </Link>
              </li>
              <li>
                <Link href="/laboratory" className="text-[#5A534B] hover:text-[#721C24] transition-colors">
                  Laboratoire d&apos;Extraction
                </Link>
              </li>
              <li>
                <Link href="/sanctuary" className="text-[#5A534B] hover:text-[#721C24] transition-colors">
                  The Sanctuary (Goalpara)
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-[#5A534B] hover:text-[#721C24] transition-colors">
                  Archival Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#5A534B] hover:text-[#721C24] transition-colors">
                  Tentang Roastery
                </Link>
              </li>
              <li>
                <a
                  href="https://edu.cherrycoffeeroastery.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#721C24] hover:text-[#8C6E2E] transition-colors flex items-center space-x-1 font-bold"
                >
                  <span>CherryEdu (Akademi)</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Slow Bar Schedule */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#181715] font-bold">
              Horaires Slow Bar
            </h4>
            <div className="space-y-2 text-xs font-mono text-[#5A534B]">
              <p className="text-[#181715] font-bold">Buka Setiap Akhir Pekan</p>
              <p>Sabtu &amp; Minggu</p>
              <p className="text-[#721C24] font-bold">09.00 – 18.00 WIB</p>
              <p className="text-[11px] pt-1 text-[#7A7268] italic">
                Senin – Jumat beroperasi sebagai roasting lab &amp; sensory R&amp;D.
              </p>
            </div>
          </div>

          {/* Col 5: Connect & Concierge */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#181715] font-bold">
              Correspondance
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              <li>
                <a
                  href="https://www.instagram.com/cherrycoffeeroastery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#5A534B] hover:text-[#721C24] transition-colors group"
                >
                  <InstagramIcon className="w-4 h-4 text-[#721C24]" />
                  <span>@cherrycoffeeroastery</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#5A534B] hover:text-[#721C24] transition-colors group"
                >
                  <Music className="w-4 h-4 text-[#8C6E2E]" />
                  <span>Slow Bar Playlist</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Cherry%20Coffee%20Roastery%2C%20saya%20ingin%20berkonsultasi%20mengenai%20biji%20kopi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#5A534B] hover:text-[#721C24] transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#721C24]" />
                  <span>VIP Roastery Concierge</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Philosophical quote & Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#7A7268] space-y-4 sm:space-y-0">
          <p className="italic font-editorial text-base text-[#181715]">
            &ldquo;Menyeduh tanpa ketergesaan.&rdquo;
          </p>
          <p>
            &copy; {new Date().getFullYear()} Cherry Coffee Roastery · Terdaftar Goalpara Archives.
          </p>
        </div>
      </div>
    </footer>
  );
}
