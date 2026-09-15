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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 bg-[#F7F4EE] text-[#181715]">
      {/* Back Button */}
      <Link
        href="/journal"
        className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#7A7268] hover:text-[#721C24] transition-colors font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au Registre du Journal</span>
      </Link>

      {/* Article Header */}
      <header className="space-y-6 border-b border-[#D5CEC2] pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#721C24]">
          <span className="uppercase tracking-widest font-bold">{article.category}</span>
          <span>·</span>
          <span className="text-[#7A7268] flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {article.readTime}
          </span>
          <span>·</span>
          <span className="text-[#7A7268] flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            {article.date}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-bold text-[#181715] leading-tight">
          {article.title[language]}
        </h1>

        <div className="flex items-center justify-between text-xs font-mono text-[#7A7268] pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#721C24] flex items-center justify-center text-white text-[10px] font-bold">
              CCR
            </div>
            <span className="font-bold text-[#181715]">{article.author}</span>
          </div>

          <span className="text-[11px] text-[#7A7268]">
            Goalpara Estate Camp, 1.250 MDPL
          </span>
        </div>
      </header>

      {/* Article Content / Reading Flow */}
      <article className="max-w-none space-y-6 text-base sm:text-lg font-sans text-[#4A433B] leading-relaxed">
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
                className="my-8 p-6 sm:p-8 bg-[#F2ECE0] border-l-4 border-[#721C24] font-editorial text-2xl text-[#181715] italic leading-relaxed shadow-xs"
              >
                &ldquo;{p}&rdquo;
              </blockquote>
            );
          }

          return (
            <p key={idx} className="leading-relaxed whitespace-pre-line text-[#3B352E]">
              {p}
            </p>
          );
        })}
      </article>

      {/* Article Footer */}
      <div className="pt-10 border-t border-[#D5CEC2] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/beans"
          className="px-6 py-3 bg-[#721C24] hover:bg-[#8B2635] text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-xs"
        >
          <span>Eksplorasi Spécimens Biji Kopi</span>
        </Link>

        <a
          href="https://www.instagram.com/cherrycoffeeroastery"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-[#721C24] hover:text-[#8C6E2E] font-bold uppercase tracking-wider"
        >
          Ikuti Cerita Lainnya @cherrycoffeeroastery
        </a>
      </div>
    </div>
  );
}
