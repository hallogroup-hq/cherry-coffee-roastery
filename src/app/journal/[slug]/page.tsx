"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalArticles } from "@/data/journal";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Clock, User, Calendar, Share2, Quote } from "lucide-react";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { language } = useLanguage();

  const article = journalArticles.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const paragraphs = article.content[language].split("\n\n");

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Back Button */}
      <Link
        href="/journal"
        className="inline-flex items-center space-x-2 text-xs font-mono-data uppercase tracking-wider text-[#A69E90] hover:text-[#C99454] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Jurnal</span>
      </Link>

      {/* Article Header */}
      <header className="space-y-6 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono-data text-[#C99454]">
          <span className="uppercase tracking-widest">{article.category}</span>
          <span>·</span>
          <span className="text-[#8C8375] flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {article.readTime}
          </span>
          <span>·</span>
          <span className="text-[#8C8375] flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            {article.date}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-bold text-white leading-tight">
          {article.title[language]}
        </h1>

        <div className="flex items-center justify-between text-xs font-mono-data text-[#A69E90] pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#C99454]/20 border border-[#C99454]/40 flex items-center justify-center text-[#C99454]">
              <User className="w-3.5 h-3.5" />
            </div>
            <span>{article.author}</span>
          </div>

          <span className="text-[11px] text-[#8C8375]">
            Goalpara Estate Camp, Sukabumi
          </span>
        </div>
      </header>

      {/* Article Content / Reading Flow */}
      <article className="prose prose-invert max-w-none space-y-6 text-base sm:text-lg font-sans text-[#DCD5C8] leading-relaxed">
        {paragraphs.map((p, idx) => {
          // Check if paragraph is an authentic quote from @cherrycoffeeroastery
          if (
            p.includes("Ditengah segala yang serba cepat") ||
            p.includes("Mendinginkan pikiran") ||
            p.includes("Menutup akhir pekan") ||
            p.includes("Beri sedikit apresiasi untuk dirimu")
          ) {
            return (
              <blockquote
                key={idx}
                className="my-8 p-6 sm:p-8 rounded-2xl bg-[#1A1815] border-l-4 border-[#C99454] font-editorial text-2xl text-[#F5F2EB] italic leading-relaxed shadow-lg"
              >
                &ldquo;{p}&rdquo;
              </blockquote>
            );
          }

          return (
            <p key={idx} className="leading-relaxed whitespace-pre-line text-[#C8C2B6]">
              {p}
            </p>
          );
        })}
      </article>

      {/* Article Footer */}
      <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/beans"
          className="px-6 py-3 rounded-full bg-[#1C1A17] hover:bg-[#C99454] hover:text-[#0E0D0C] border border-white/10 text-xs font-mono-data uppercase font-bold tracking-wider text-[#DCD5C8] transition-all"
        >
          <span>Eksplorasi Biji Kopi Sangrai Kami</span>
        </Link>

        <a
          href="https://www.instagram.com/cherrycoffeeroastery"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono-data text-[#C99454] hover:underline"
        >
          Ikuti Cerita Lainnya di Instagram @cherrycoffeeroastery
        </a>
      </div>
    </div>
  );
}
