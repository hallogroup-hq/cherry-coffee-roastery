"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";

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
    { href: "/beans", label: "Specimen Ledger" },
    { href: "/laboratory", label: "Extraction Lab" },
    { href: "/sanctuary", label: "Sanctuary" },
    { href: "/journal", label: "Archival Journal" },
    { href: "/about", label: t.nav.about },
    { href: "https://edu.cherrycoffeeroastery.com", label: "CherryEdu", isExternal: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[rgba(74,67,59,0.16)] py-3 shadow-xs"
          : "bg-[#F7F4EE]/80 backdrop-blur-xs border-b border-[rgba(74,67,59,0.08)] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Wax Seal Emblem */}
        <Link href="/" className="relative flex items-center space-x-3 group">
          <div className="relative w-40 sm:w-48 h-9 transition-transform duration-300 group-hover:scale-[1.02]">
            <Image
              src="/assets/branding/Logo Variation CCR-01.png"
              alt="Cherry Coffee Roastery"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          {/* Subtle Wax Seal Monogram Badge */}
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-[#721C24]/10 border border-[#721C24]/20 text-[9px] font-mono uppercase tracking-widest text-[#721C24] font-medium">
            Est. MMXXIV
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono tracking-widest uppercase text-[#5A534B]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            if (link.isExternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative py-1 text-[#8C6E2E] hover:text-[#5E491E] transition-colors flex items-center space-x-1"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px]">↗</span>
                </a>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[#721C24] font-bold"
                    : "hover:text-[#181715]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#721C24] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Language Switcher & Cart */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-[#EFECE4] border border-[rgba(74,67,59,0.18)] rounded-full p-0.5 text-[11px] font-mono">
            <button
              onClick={() => setLanguage("id")}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                language === "id"
                  ? "bg-[#721C24] text-white shadow-xs font-bold"
                  : "text-[#5A534B] hover:text-[#181715]"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                language === "en"
                  ? "bg-[#721C24] text-white shadow-xs font-bold"
                  : "text-[#5A534B] hover:text-[#181715]"
              }`}
            >
              EN
            </button>
          </div>

          {/* Cart Icon Button with Wax Seal Red Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full border border-[rgba(74,67,59,0.18)] hover:border-[#721C24] bg-[#FAF8F5] text-[#181715] hover:text-[#721C24] transition-colors flex items-center justify-center shadow-xs"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#721C24] text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#181715] hover:text-[#721C24] transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F4EE] border-b border-[rgba(74,67,59,0.18)] px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-widest text-[#5A534B]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 border-b border-[rgba(74,67,59,0.08)] ${
                  pathname === link.href ? "text-[#721C24] font-bold" : "hover:text-[#181715]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
