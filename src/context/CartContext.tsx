"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BeanProduct } from "@/data/beans";

export type GrindOption = "whole_bean" | "espresso" | "filter_v60" | "french_press";
export type WeightOption = "200g" | "500g" | "1kg";

export interface CartItem {
  id: string; // unique item id based on beanId + weight + grind + sticker
  bean: BeanProduct;
  weight: WeightOption;
  grind: GrindOption;
  stickerIndex: number;
  quantity: number;
  unitPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (bean: BeanProduct, weight: WeightOption, grind: GrindOption, stickerIndex?: number, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppLink: (customerName?: string, notes?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ccr_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ccr_cart", JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const addItem = (
    bean: BeanProduct,
    weight: WeightOption,
    grind: GrindOption,
    stickerIndex = 0,
    quantity = 1
  ) => {
    const unitPrice = bean.prices[weight];
    const uniqueId = `${bean.id}-${weight}-${grind}-${stickerIndex}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === uniqueId);
      if (existing) {
        return prev.map((item) =>
          item.id === uniqueId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: uniqueId,
          bean,
          weight,
          grind,
          stickerIndex,
          quantity,
          unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const grindLabel = (g: GrindOption) => {
    switch (g) {
      case "whole_bean":
        return "Biji Utuh (Whole Bean)";
      case "espresso":
        return "Giling Halus (Espresso)";
      case "filter_v60":
        return "Giling Sedang (Filter/V60)";
      case "french_press":
        return "Giling Kasar (French Press)";
    }
  };

  const generateWhatsAppLink = (customerName = "", notes = "") => {
    const phoneNumber = "6281234567890"; // Cherry Coffee Roastery Concierge
    const header = `Halo Cherry Coffee Roastery! Saya ingin memesan kopi sangrai via VIP Concierge:\n\n`;
    
    let orderLines = "";
    items.forEach((item, index) => {
      orderLines += `${index + 1}. *${item.bean.name}* (${item.weight})\n`;
      orderLines += `   - Grind: ${grindLabel(item.grind)}\n`;
      orderLines += `   - Variant Label: ${item.bean.stickers[item.stickerIndex]?.name || "Standard"}\n`;
      orderLines += `   - Jumlah: ${item.quantity} bag x Rp ${item.unitPrice.toLocaleString("id-ID")}\n`;
      orderLines += `   - Sub: Rp ${(item.unitPrice * item.quantity).toLocaleString("id-ID")}\n\n`;
    });

    const totalLine = `*Total Pesanan: Rp ${subtotal.toLocaleString("id-ID")}*\n\n`;
    const customerInfo = customerName ? `Nama Pemesan: ${customerName}\n` : "";
    const notesInfo = notes ? `Catatan Tambahan: ${notes}\n\n` : "";
    const footer = `Mohon konfirmasi ketersediaan batch fresh roast dan instruksi pembayarannya. Terima kasih!`;

    const fullMessage = encodeURIComponent(header + orderLines + totalLine + customerInfo + notesInfo + footer);
    return `https://wa.me/${phoneNumber}?text=${fullMessage}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
