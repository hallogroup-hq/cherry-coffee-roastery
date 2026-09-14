"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, Compass, Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/beans", label: t.nav.beans },
    { href: "/laboratory", label: t.nav.laboratory },
    { href: "/sanctuary", label: t.nav.sanctuary },
    { href: "/journal", label: t.nav.journal },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0E0D0C]/85 backdrop-blur-md border-b border-[#D8A86E]/15 py-3.5 shadow-2xl"
          : "bg-gradient-to-b from-[#0E0D0C]/80 via-[#0E0D0C]/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="relative flex items-center space-x-3 group">
          <div className="relative w-44 sm:w-52 h-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/assets/branding/Logo Variation CCR-02.png"
              alt="Cherry Coffee Roastery"
              fill
              className="object-contain object-left filter brightness-110"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono-data uppercase tracking-widest">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive ? "text-[#C99454] font-bold" : "text-[#DCD5C8]/80 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C99454] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Language Switcher & Cart */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-[#1C1A17] border border-white/10 rounded-full p-0.5 text-[11px] font-mono-data">
            <button
              onClick={() => setLanguage("id")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                language === "id"
                  ? "bg-[#C99454] text-[#0E0D0C] font-bold"
                  : "text-[#A69E90] hover:text-white"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                language === "en"
                  ? "bg-[#C99454] text-[#0E0D0C] font-bold"
                  : "text-[#A69E90] hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-[#1C1A17] border border-white/10 hover:border-[#C99454]/40 text-[#E6DFD5] transition-all hover:scale-105 active:scale-95"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#DCD5C8]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C99454] text-[#0E0D0C] font-mono-data text-[10px] font-bold flex items-center justify-center shadow-lg">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-[#1C1A17] border border-white/10 text-[#DCD5C8]"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#141311] border-b border-[#D8A86E]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3 text-sm font-mono-data uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg ${
                  pathname === link.href
                    ? "bg-[#C99454]/15 text-[#C99454] font-bold"
                    : "text-[#DCD5C8] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A69E90] font-mono-data">
            <span>Goalpara Estate Camp, 1,250 MASL</span>
            <span className="text-[#C99454]">@cherrybar.id</span>
          </div>
        </div>
      )}
    </header>
  );
}
