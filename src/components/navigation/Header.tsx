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

  const leftNavLinks = [
    { href: "/about", label: "The Roastery" },
    { href: "/beans", label: "Our Beans" },
    { href: "/laboratory", label: "Extraction Lab" },
  ];

  const rightNavLinks = [
    { href: "/sanctuary", label: "Sanctuary" },
    { href: "/journal", label: "Journal" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#181715]/15 py-2.5 shadow-sm"
          : "bg-[#F7F4EE]/90 backdrop-blur-xs border-b border-[#181715]/10 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        
        {/* Mobile Left: Brand text or Menu */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-[#181715] hover:text-[#721C24] transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/" className="text-xs font-editorial font-bold tracking-wider uppercase text-[#181715]">
            CCR 1803
          </Link>
        </div>

        {/* Desktop Left Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-editorial uppercase tracking-[0.25em] text-[#4A433B]">
          {leftNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive ? "text-[#721C24] font-bold" : "hover:text-[#181715]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#721C24]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CENTERPIECE: The Burgundy Monogram Wax Seal from Preview */}
        <div className="relative flex items-center justify-center">
          <Link
            href="/"
            className="group relative flex items-center justify-center transition-transform duration-300 hover:scale-105"
            title="Cherry Coffee Roastery · Accueil"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-[0_4px_10px_rgba(114,28,36,0.3)]">
              <Image
                src="/apothecary/wax-seal.png"
                alt="Cherry Coffee Roastery Est. 2025 Wax Seal"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Right Navigation Links & Actions */}
        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex items-center space-x-8 text-[11px] font-editorial uppercase tracking-[0.25em] text-[#4A433B]">
            {rightNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive ? "text-[#721C24] font-bold" : "hover:text-[#181715]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#721C24]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Cart & Language Pill */}
          <div className="flex items-center space-x-3 pl-4 border-l border-[#181715]/15">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#EFECE4] border border-[#181715]/15 text-[10px] font-mono">
              <button
                onClick={() => setLanguage("id")}
                className={`px-2 py-0.5 transition-colors ${
                  language === "id"
                    ? "bg-[#721C24] text-white font-bold"
                    : "text-[#5A534B] hover:text-[#181715]"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 transition-colors ${
                  language === "en"
                    ? "bg-[#721C24] text-white font-bold"
                    : "text-[#5A534B] hover:text-[#181715]"
                }`}
              >
                EN
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 py-1 bg-[#FAF8F5] hover:bg-[#721C24] text-[#181715] hover:text-white border border-[#181715]/20 hover:border-[#721C24] transition-all flex items-center space-x-1.5 text-[11px] font-editorial uppercase tracking-wider"
              aria-label="Voir le Panier"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#721C24] text-white text-[9px] font-mono font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Right Cart Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#181715] hover:text-[#721C24] transition-colors"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#721C24] text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#181715]/15 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-editorial text-sm uppercase tracking-[0.2em] text-[#4A433B]">
            {[...leftNavLinks, ...rightNavLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 border-b border-[#181715]/10 ${
                  pathname === link.href ? "text-[#721C24] font-bold" : "hover:text-[#181715]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#7A7265]">
            <span>Langue / Bahasa :</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage("id")}
                className={`px-2 py-0.5 border ${language === "id" ? "bg-[#721C24] text-white border-[#721C24]" : "border-[#181715]/20"}`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 border ${language === "en" ? "bg-[#721C24] text-white border-[#721C24]" : "border-[#181715]/20"}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
