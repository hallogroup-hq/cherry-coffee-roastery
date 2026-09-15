"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ShieldCheck, ArrowRight, BookOpen, Compass } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex justify-end bg-[#181715]/65 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#FAF8F5] text-[#181715] border-l border-[#BFA15F]/40 h-full flex flex-col justify-between shadow-[0_0_60px_rgba(24,23,21,0.3)] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-[#181715]/10 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#721C24]/10 border border-[#721C24]/30 flex items-center justify-center text-[#721C24]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-editorial font-bold tracking-tight text-[#181715]">
                Carnet de Commande
              </h3>
              <p className="text-[10px] font-mono-data text-[#7A7265] uppercase tracking-wider">
                [ {totalItems} Sélections Enregistrées ]
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 border border-[#181715]/15 hover:bg-[#721C24] hover:text-white text-[#181715] transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Successful State */}
        {orderComplete ? (
          <div className="p-8 my-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#721C24] border-2 border-[#BFA15F] mx-auto flex items-center justify-center text-[#FAF8F5] shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-editorial font-bold text-[#181715]">
              Commande Scellée &amp; Enregistrée
            </h4>
            <p className="text-xs font-serif italic text-[#595349] leading-relaxed max-w-xs mx-auto">
              Votre lot de torréfaction est désormais consigné dans les registres du domaine Goalpara. Nous vous remercions pour cette dégustation contemplative.
            </p>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart */
          <div className="p-8 my-auto text-center space-y-4">
            <div className="w-14 h-14 bg-[#EFECE4] border border-[#181715]/15 mx-auto flex items-center justify-center text-[#7A7265]">
              <ShoppingBag className="w-6 h-6 stroke-[1.2]" />
            </div>
            <p className="text-sm font-editorial font-bold text-[#181715]">
              Votre carnet de commande est vierge.
            </p>
            <p className="text-xs font-serif italic text-[#7A7265] max-w-xs mx-auto">
              Découvrez nos spécimens botaniques récoltés sur les flancs du mont Gede Pangrango.
            </p>
          </div>
        ) : (
          /* Item List */
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF8F5]">
            {items.map((item) => {
              const currentSticker = item.bean.stickers[item.stickerIndex] || item.bean.stickers[0];
              return (
                <div
                  key={item.id}
                  className="p-4 bg-[#EFECE4] border border-[#181715]/15 space-y-3 shadow-2xs"
                >
                  <div className="flex space-x-3">
                    {/* Sticker Thumbnail */}
                    <div className="relative w-20 h-12 border border-[#BFA15F]/60 shrink-0 bg-[#181715] overflow-hidden shadow-2xs">
                      <Image
                        src={currentSticker.image}
                        alt={item.bean.name}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-editorial font-bold text-[#181715] truncate">
                        {item.bean.name}
                      </h4>
                      <p className="text-[10px] font-mono-data text-[#721C24] uppercase tracking-wider">
                        {item.weight} · {item.grind.replace("_", " ")}
                      </p>
                      <p className="text-xs font-mono-data text-[#595349] mt-0.5">
                        Rp {item.unitPrice.toLocaleString("id-ID")} / sachet
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#7A7265] hover:text-[#721C24] transition-colors p-1"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity and Subtotal */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#181715]/10 text-xs font-mono-data">
                    <div className="flex items-center space-x-2 bg-[#FAF8F5] px-2 py-0.5 border border-[#181715]/20">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:text-[#721C24] text-[#181715] transition-colors"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center font-bold text-[#181715]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:text-[#721C24] text-[#181715] transition-colors"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-editorial font-bold text-[#181715]">
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
                placeholder="Nom du souscripteur / Nama Pemesan"
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#181715]/20 text-xs font-mono-data text-[#181715] placeholder-[#7A7265] focus:outline-none focus:border-[#721C24]"
              />
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Instructions particulières de torréfaction ou de mouture..."
                rows={2}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#181715]/20 text-xs font-mono-data text-[#181715] placeholder-[#7A7265] focus:outline-none focus:border-[#721C24] resize-none"
              />
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {items.length > 0 && !orderComplete && (
          <div className="p-6 bg-[#EFECE4] border-t border-[#181715]/10 space-y-4">
            <div className="space-y-1.5 text-xs font-mono-data">
              <div className="flex justify-between text-[#595349]">
                <span>Conditionnement d&apos;Atelier</span>
                <span className="text-[#8C6E2E] font-bold">Pouch Kraft Éco Inclus</span>
              </div>
              <div className="flex justify-between text-lg font-editorial font-bold text-[#181715] pt-1 border-t border-[#181715]/10">
                <span>Total Consigné</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* WhatsApp VIP Concierge Checkout */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 bg-[#181715] hover:bg-[#2A2825] border border-[#BFA15F]/40 text-[#FAF8F5] font-semibold text-xs tracking-wider uppercase font-mono-data flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#BFA15F]" />
                <span>Concierge Privé (WhatsApp)</span>
              </button>

              {/* Instant Online Payment Gateway (Ready to connect) */}
              <button
                onClick={handleInstantGatewayCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 bg-[#721C24] hover:bg-[#8A222B] text-white font-semibold text-xs tracking-wider uppercase font-mono-data flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                {isCheckingOut ? (
                  <span>Liaison Passerelle Sécurisée...</span>
                ) : (
                  <>
                    <span>Règlement Direct &amp; Expédition</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-center font-mono-data text-[#7A7265]">
              Chaque lot est numéroté et scellé à la main au domaine Goalpara.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
