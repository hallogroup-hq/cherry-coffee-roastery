"use client";

import React from "react";
import { InstagramIcon } from "@/components/ui/Icons";

export default function EditorialManifesto() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto border-t border-[#E5DFD3]">
      <div className="space-y-16">
        {/* Micro Field Origin Stamp */}
        <div className="flex items-center space-x-3 text-[11px] font-mono text-[#7A7268] uppercase tracking-widest border-b border-[#E5DFD3] pb-4">
          <span className="text-[#721C24] font-bold">FEUILLETON PHILOSOPHIQUE</span>
          <span>·</span>
          <span>FILOSOFI MENYEDUH PERLAHAN</span>
          <span>·</span>
          <span>@CHERRYCOFFEEROASTERY</span>
        </div>

        {/* Primary Literary Quote Spread */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-[#181715] leading-[1.25] tracking-tight">
            &ldquo;Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Kopi disajikan untuk mereka yang tidak tergesa-gesa.&rdquo;
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base font-sans text-[#4A433B] leading-relaxed pt-2">
            <p>
              Bagi kami, secangkir kopi bukan sekadar asupan kafein yang ditenggak terburu-buru sebelum kembali berkejaran dengan waktu. Kopi adalah alasan untuk berhenti sejenak. Mengamati uap panas yang menari di udara dingin, mendengarkan desau angin di sela daun pinus Goalpara, dan merasakan setiap lapisan rasa yang tersimpan dalam bijinya.
            </p>
            <p>
              Dari kebun petani di lereng Sukabumi hingga ke dalam cawan seduh kristal di Goalpara, kami merawat setiap variabel dengan penuh kesabaran. Menghargai proses adalah cara kami menghormati bumi, petani, dan diri Anda yang telah melangkah jauh hingga ke tempat ini.
            </p>
          </div>
        </div>

        {/* Seasonal Reflection Divider */}
        <div className="p-8 bg-[#FAF8F5] border-l-3 border-[#721C24] border-t border-r border-b border-[#E5DFD3] space-y-4 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#721C24] font-bold">
            REFLEKSI PERGANTIAN MUSIM · LERENG GUNUNG GEDE
          </span>
          <p className="text-xl sm:text-2xl font-editorial italic text-[#181715] leading-relaxed">
            &ldquo;Terkadang, hal paling berani yang bisa kita lakukan bukanlah berlari lebih kencang, melainkan mengizinkan diri kita untuk bernafas lebih dalam.&rdquo;
          </p>
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#7A7268]">
            <span>Goalpara Estate Camp, Sukabumi (1.250 MDPL)</span>
            <a
              href="https://www.instagram.com/cherrycoffeeroastery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#721C24] hover:text-[#181715] flex items-center space-x-1.5 transition-colors"
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
