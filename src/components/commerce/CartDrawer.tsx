"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    subtotal,
    totalItems,
    generateWhatsAppLink,
    clearCart,
  } = useCart();
  const { language } = useLanguage();

  const [customerName, setCustomerName] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const link = generateWhatsAppLink(customerName, customerNotes);
    window.open(link, "_blank");
  };

  const handleInstantGatewayCheckout = () => {
    setIsCheckingOut(true);
    // Simulate gateway handoff
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        setIsCartOpen(false);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#12110F] border-l border-[#D8A86E]/20 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#C99454]" />
            <h3 className="text-base font-mono-data uppercase tracking-wider text-white font-bold">
              Keranjang Seduhan ({totalItems})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DCD5C8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Successful State */}
        {orderComplete ? (
          <div className="p-8 my-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#C99454]/20 border border-[#C99454] mx-auto flex items-center justify-center text-[#C99454]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-editorial font-bold text-white">
              Pesanan Diterima!
            </h4>
            <p className="text-xs font-sans text-[#A69E90] leading-relaxed">
              Batch sangrai pilihanmu sedang disiapkan di roastery Goalpara. Terima kasih telah menyeduh secara perlahan bersama Cherry Coffee Roastery.
            </p>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart */
          <div className="p-8 my-auto text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-[#A69E90]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <p className="text-sm font-sans text-[#DCD5C8]">
              Keranjang seduhanmu masih kosong.
            </p>
            <p className="text-xs font-mono-data text-[#8C8375]">
              Pilih biji kopi sangrai pilihanmu dari Goalpara atau Selabintana.
            </p>
          </div>
        ) : (
          /* Item List */
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.map((item) => {
              const currentSticker = item.bean.stickers[item.stickerIndex] || item.bean.stickers[0];
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#1A1816] border border-white/5 space-y-3"
                >
                  <div className="flex space-x-3">
                    {/* Sticker Thumbnail */}
                    <div className="relative w-20 h-11 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black">
                      <Image
                        src={currentSticker.image}
                        alt={item.bean.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white font-sans truncate">
                        {item.bean.name}
                      </h4>
                      <p className="text-xs font-mono-data text-[#C99454]">
                        {item.weight} · {item.grind.replace("_", " ")}
                      </p>
                      <p className="text-xs font-mono-data text-[#A69E90] mt-0.5">
                        Rp {item.unitPrice.toLocaleString("id-ID")} / bag
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#8C8375] hover:text-red-400 transition-colors p-1"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity and Subtotal */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono-data">
                    <div className="flex items-center space-x-2 bg-[#12110F] px-2 py-1 rounded-lg border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:text-[#C99454]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:text-[#C99454]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-medium text-white">
                      Rp {(item.unitPrice * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Customizer Notes */}
            <div className="pt-2 space-y-2">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nama Pemesan (Opsional)"
                className="w-full px-3 py-2 rounded-xl bg-[#1A1816] border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-[#C99454]"
              />
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Catatan roastery / sangrai (misal: roast date paling segar)"
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-[#1A1816] border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-[#C99454] resize-none"
              />
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {items.length > 0 && !orderComplete && (
          <div className="p-6 bg-[#181614] border-t border-white/10 space-y-4">
            <div className="space-y-1.5 text-xs font-mono-data">
              <div className="flex justify-between text-[#A69E90]">
                <span>Alokasi Kemasan</span>
                <span className="text-emerald-400">Gratis (Eco Standup Pouch)</span>
              </div>
              <div className="flex justify-between text-base font-editorial font-bold text-white pt-1">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* WhatsApp VIP Concierge Checkout */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#222B24] hover:bg-[#2A362D] border border-emerald-500/30 text-emerald-300 font-semibold text-xs tracking-wider uppercase font-mono-data flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Order via Concierge (WhatsApp)</span>
              </button>

              {/* Instant Online Payment Gateway (Ready to connect) */}
              <button
                onClick={handleInstantGatewayCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C99454] hover:bg-[#D8A86E] text-[#0E0D0C] font-semibold text-xs tracking-wider uppercase font-mono-data flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-lg shadow-[#C99454]/20"
              >
                {isCheckingOut ? (
                  <span>Menghubungkan Gateway...</span>
                ) : (
                  <>
                    <span>Proses Pembayaran Instan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-center font-mono-data text-[#8C8375]">
              Setiap batch disangrai segar di roastery Goalpara Estate Camp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
