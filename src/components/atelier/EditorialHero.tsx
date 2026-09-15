"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, BookOpen, Eye, ShoppingBag } from "lucide-react";

export default function EditorialHero() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section className="relative pt-20 pb-16 px-3 sm:px-6 lg:px-10 max-w-[1400px] mx-auto overflow-hidden select-none">
      
      {/* 1. Grand Archival Plate Container (Exact Aesthetic from Preview) */}
      <div className="relative w-full rounded-xs border-2 border-[#D5CEC2] bg-[#FAF8F5] p-2 sm:p-4 shadow-[0_12px_45px_rgba(24,23,21,0.06)] overflow-hidden">
        
        {/* Inner Engraved Hairline Border Frame */}
        <div className="relative w-full border border-[#181715]/15 bg-[#F7F4EE] overflow-hidden">
          
          {/* Top Folio Header Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#181715]/10 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#7A7265] uppercase">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#721C24] inline-block" />
              <span className="font-bold text-[#181715]">L&apos;ATELIER BOTANIQUE CCR</span>
              <span className="opacity-50">/</span>
              <span className="hidden sm:inline">HERBIER &amp; APOTHICAIRE DU CAFÉ</span>
            </div>
            <div className="flex items-center space-x-3 text-[#5A534B]">
              <span>06°53′3″S 106°58′E</span>
              <span>·</span>
              <span className="font-bold text-[#8C6E2E]">1.250 MDPL GOALPARA</span>
            </div>
          </div>

          {/* MAIN ARTWORK VIEWPORT (Exact 1:1 match with Concept Apothecary Preview) */}
          <div className="relative w-full aspect-[1376/768] min-h-[360px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
            <Image
              src="/apothecary/hero-apothecary-2x.webp"
              alt="Cherry Coffee Roastery · L'Atelier Botanique Preview Masterpiece"
              fill
              className="object-cover object-top sm:object-contain"
              priority
            />

            {/* INTERACTIVE HOTSPOTS OVER THE PREVIEW ARTWORK */}
            
            {/* Hotspot 1: Botanical Coffee Plant (Left) */}
            <div
              className="absolute left-[3%] top-[16%] w-[30%] h-[72%] cursor-pointer group"
              onMouseEnter={() => setActiveHotspot("plant")}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={() => {
                const el = document.getElementById("beans-ledger");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              title="Coffea Arabica L. - Klik untuk eksplorasi spesimen"
            >
              {/* Subtle hover beacon */}
              <div className="absolute left-[45%] top-[40%] w-6 h-6 rounded-full bg-[#721C24]/15 border border-[#721C24] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
                <Eye className="w-3.5 h-3.5 text-[#721C24]" />
              </div>

              {activeHotspot === "plant" && (
                <div className="absolute left-6 bottom-10 z-30 p-3 bg-[#FAF8F5]/95 backdrop-blur-md border border-[#BFA15F] shadow-lg text-[11px] font-mono text-[#181715] max-w-xs animate-in fade-in duration-200">
                  <div className="text-[#721C24] font-bold uppercase tracking-wider">
                    Coffea Arabica L.
                  </div>
                  <div className="text-[10px] text-[#595349] mt-0.5">
                    Varietas Typica &amp; Sigarar Utang dari lereng Gunung Gede Pangrango. Pektin buah tebal (22.4° Brix).
                  </div>
                  <div className="text-[9px] text-[#8C6E2E] mt-1 font-bold">
                    [ Klik untuk melihat Buku Register Biji ]
                  </div>
                </div>
              )}
            </div>

            {/* Hotspot 2: Apothecary Wooden Drawer (Center-Bottom) */}
            <div
              className="absolute left-[35%] top-[55%] w-[30%] h-[32%] cursor-pointer group"
              onMouseEnter={() => setActiveHotspot("drawer")}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={() => {
                const el = document.getElementById("beans-ledger");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              title="Tiroir d'Apothicaire No. 04 - Sukabumi Beans"
            >
              <div className="absolute left-[48%] top-[55%] w-6 h-6 rounded-full bg-[#8C6E2E]/20 border border-[#8C6E2E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-3.5 h-3.5 text-[#8C6E2E]" />
              </div>

              {activeHotspot === "drawer" && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-16 z-30 p-3 bg-[#FAF8F5]/95 backdrop-blur-md border border-[#BFA15F] shadow-lg text-[11px] font-mono text-[#181715] whitespace-nowrap animate-in fade-in duration-200">
                  <div className="text-[#721C24] font-bold uppercase tracking-wider">
                    Tiroir d&apos;Apothicaire N° 04
                  </div>
                  <div className="text-[10px] text-[#595349]">
                    Sukabumi Beans · Kemasan Muslin &amp; Tasting Ledger Aktif
                  </div>
                </div>
              )}
            </div>

            {/* Hotspot 3: Tasting Journal Notebook & Quill (Right) */}
            <div
              className="absolute right-[3%] top-[16%] w-[33%] h-[72%] cursor-pointer group"
              onMouseEnter={() => setActiveHotspot("journal")}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <Link href="/journal" className="block w-full h-full" title="Buka Archival Journal">
                <div className="absolute right-[45%] top-[50%] w-6 h-6 rounded-full bg-[#721C24]/15 border border-[#721C24] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <BookOpen className="w-3.5 h-3.5 text-[#721C24]" />
                </div>

                {activeHotspot === "journal" && (
                  <div className="absolute right-6 bottom-10 z-30 p-3 bg-[#FAF8F5]/95 backdrop-blur-md border border-[#BFA15F] shadow-lg text-[11px] font-mono text-[#181715] max-w-xs animate-in fade-in duration-200">
                    <div className="text-[#721C24] font-bold uppercase tracking-wider">
                      Carnet de Dégustation
                    </div>
                    <div className="text-[10px] text-[#595349] mt-0.5">
                      Catatan rasa kurator: Stone fruit, Bergamot, Wild Honey, Cocoa. Profil kompleks dan seimbang.
                    </div>
                    <div className="text-[9px] text-[#8C6E2E] mt-1 font-bold">
                      [ Klik untuk membaca esai &amp; jurnal ]
                    </div>
                  </div>
                )}
              </Link>
            </div>

            {/* Interactive Overlay Button: [ SHOP ROASTS ] */}
            <Link
              href="/beans"
              className="absolute left-[5.4%] bottom-[5.2%] w-[7.5%] h-[6%] min-w-[100px] min-h-[30px] z-20 cursor-pointer rounded-full opacity-0 hover:opacity-100 bg-[#721C24]/20 border-2 border-[#BFA15F] transition-all flex items-center justify-center text-[10px] font-editorial uppercase tracking-widest text-[#181715] font-bold shadow-md"
              title="Shop Roasts"
            >
              Shop Roasts ↗
            </Link>

            {/* Interactive Overlay Button: [ EXPLORE JOURNALS ] */}
            <Link
              href="/journal"
              className="absolute left-[13.5%] bottom-[5.2%] w-[9%] h-[6%] min-w-[120px] min-h-[30px] z-20 cursor-pointer rounded-full opacity-0 hover:opacity-100 bg-[#721C24]/20 border-2 border-[#BFA15F] transition-all flex items-center justify-center text-[10px] font-editorial uppercase tracking-widest text-[#181715] font-bold shadow-md"
              title="Explore Journals"
            >
              Journals ↗
            </Link>
          </div>
        </div>
      </div>

      {/* 2. THREE TACTILE ARTIFACT CARDS (For high-resolution detail on all screens) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        
        {/* Card 1: Botanical Specimen */}
        <div className="p-5 bg-[#FAF8F5] border border-[#181715]/15 shadow-2xs space-y-4">
          <div className="relative w-full h-56 bg-[#EFECE4] border border-[#181715]/10 overflow-hidden">
            <Image
              src="/apothecary/botanical-plant.jpg"
              alt="Herbier Coffea Arabica L."
              fill
              className="object-contain p-2 hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono-data text-[#721C24] uppercase tracking-widest font-bold">
              <span>PLANCHE BOTANIQUE I</span>
              <span>1.250 MDPL</span>
            </div>
            <h3 className="text-xl font-editorial font-bold text-[#181715]">
              Coffea Arabica L.
            </h3>
            <p className="text-xs font-serif italic text-[#595349] leading-relaxed">
              Dipetik tangan pada kematangan puncak di perkebunan Goalpara, Sukabumi. Akar vulkanik dalam menghasilkan profil rasa bunga melati dan buah persik.
            </p>
          </div>
          <Link
            href="/beans"
            className="inline-flex items-center space-x-1.5 text-xs font-mono-data text-[#8C6E2E] hover:text-[#721C24] font-bold transition-colors pt-1"
          >
            <span>Eksplorasi Spesimen Panen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Apothecary Wooden Drawer */}
        <div className="p-5 bg-[#FAF8F5] border border-[#181715]/15 shadow-2xs space-y-4">
          <div className="relative w-full h-56 bg-[#EFECE4] border border-[#181715]/10 overflow-hidden">
            <Image
              src="/apothecary/apothecary-drawer.jpg"
              alt="Tiroir d'Apothicaire Sukabumi Beans No. 04"
              fill
              className="object-contain p-2 hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono-data text-[#721C24] uppercase tracking-widest font-bold">
              <span>TIROIR DU ROASTER</span>
              <span>LOT N° 04</span>
            </div>
            <h3 className="text-xl font-editorial font-bold text-[#181715]">
              Sukabumi Reserve No. 04
            </h3>
            <p className="text-xs font-serif italic text-[#595349] leading-relaxed">
              Disimpan rapi dalam laci kayu apotek dengan kantong linen alami dan lembar tasting ledger bertanggal sangrai presisi.
            </p>
          </div>
          <Link
            href="/beans"
            className="inline-flex items-center space-x-1.5 text-xs font-mono-data text-[#8C6E2E] hover:text-[#721C24] font-bold transition-colors pt-1"
          >
            <span>Buka Laci &amp; Pesan Lot Kopi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Tasting Journal */}
        <div className="p-5 bg-[#FAF8F5] border border-[#181715]/15 shadow-2xs space-y-4">
          <div className="relative w-full h-56 bg-[#EFECE4] border border-[#181715]/10 overflow-hidden">
            <Image
              src="/apothecary/tasting-journal.jpg"
              alt="Carnet de Dégustation"
              fill
              className="object-contain p-2 hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono-data text-[#721C24] uppercase tracking-widest font-bold">
              <span>CARNET DE DÉGUSTATION</span>
              <span>NOTES DE TERROIR</span>
            </div>
            <h3 className="text-xl font-editorial font-bold text-[#181715]">
              Cupping Notes Sukabumi
            </h3>
            <p className="text-xs font-serif italic text-[#595349] leading-relaxed">
              Naskah tangan kurator rasa: &ldquo;Stone fruit, Bergamot, Cocoa. Profile: Complex, Balanced.&rdquo; Ditulis langsung dengan pena tinta di stasiun Goalpara.
            </p>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center space-x-1.5 text-xs font-mono-data text-[#8C6E2E] hover:text-[#721C24] font-bold transition-colors pt-1"
          >
            <span>Baca Seluruh Feuilleton</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </section>
  );
}
