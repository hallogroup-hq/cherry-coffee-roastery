"use client";

import React from "react";
import Link from "next/link";
import { InstagramIcon } from "@/components/ui/Icons";

export default function EditorialManifesto() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto border-t border-[#D8A86E]/15">
      <div className="space-y-16">
        {/* Micro Field Origin Stamp */}
        <div className="flex items-center space-x-3 text-[11px] font-mono-data text-[#8C8375] uppercase tracking-widest border-b border-white/10 pb-4">
          <span className="text-[#C99454]">CATATAN LAPANGAN</span>
          <span>·</span>
          <span>FILOSOFI MENYEDUH PERLAHAN</span>
          <span>·</span>
          <span>@CHERRYCOFFEEROASTERY</span>
        </div>

        {/* Primary Literary Quote Spread */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-[#F7F5F0] leading-[1.25] tracking-tight">
            &ldquo;Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Kopi disajikan untuk mereka yang tidak tergesa-gesa.&rdquo;
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base font-sans text-[#A69E90] leading-relaxed pt-4">
            <p>
              Bagi kami, secangkir kopi bukan sekadar asupan kafein yang ditenggak terburu-buru sebelum kembali berkejaran dengan waktu. Kopi adalah alasan untuk berhenti sejenak. Mengamati uap panas yang menari di udara dingin, mendengarkan desau angin di sela daun pinus, dan merasakan setiap lapisan rasa yang tersimpan dalam bijinya.
            </p>
            <p>
              Dari kebun petani di lereng Sukabumi hingga ke dalam cawan seduh di Goalpara, kami merawat setiap variabel dengan penuh kesabaran. Menghargai proses adalah cara kami menghormati bumi, petani, dan diri Anda yang telah melangkah jauh hingga ke tempat ini.
            </p>
          </div>
        </div>

        {/* Seasonal Reflection Divider */}
        <div className="p-8 bg-[#141311] border-l-2 border-[#C99454] space-y-4">
          <span className="text-[10px] font-mono-data uppercase tracking-widest text-[#C99454]">
            Refleksi Pergantian Musim
          </span>
          <p className="text-lg sm:text-xl font-editorial italic text-[#E6D9C8] leading-relaxed">
            &ldquo;Terkadang, hal paling berani yang bisa kita lakukan bukanlah berlari lebih kencang, melainkan mengizinkan diri kita untuk bernafas lebih dalam.&rdquo;
          </p>
          <div className="pt-2 flex items-center justify-between text-xs font-mono-data text-[#8C8375]">
            <span>Goalpara Estate Camp, Sukabumi</span>
            <a
              href="https://www.instagram.com/cherrycoffeeroastery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C99454] hover:text-white flex items-center space-x-1.5 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@cherrycoffeeroastery</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
