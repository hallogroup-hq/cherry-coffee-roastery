import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import CartDrawer from "@/components/commerce/CartDrawer";
import AmbientSoundscape from "@/components/sanctuary/AmbientSoundscape";

export const metadata: Metadata = {
  metadataBase: new URL("https://cherrycoffeeroastery.com"),
  title: "Cherry Coffee Roastery — Slow Bar & Roastery Laboratory | Goalpara Estate",
  description:
    "Cherry Coffee Roastery adalah slow bar & roasting laboratory di area Goalpara Estate Camp (Sukabumi, kaki Gunung Gede Pangrango, 1.250 mdpl). Menyeduh secara perlahan untuk mereka yang tidak tergesa-gesa.",
  keywords: [
    "Cherry Coffee Roastery",
    "Goalpara Estate Camp",
    "Slow Bar Sukabumi",
    "Specialty Coffee Indonesia",
    "Deep Loam Espresso",
    "Black Red Blend",
    "Artisan Coffee Roaster",
    "Cherry Bar ID",
  ],
  openGraph: {
    title: "Cherry Coffee Roastery — Slow Bar & Roastery Laboratory",
    description:
      "Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Kopi disajikan untuk mereka yang tidak tergesa-gesa.",
    url: "https://cherrycoffeeroastery.com",
    siteName: "Cherry Coffee Roastery",
    images: [
      {
        url: "/assets/packaging/Packaging Sticker - CherryCoffeeRoastery-06.png",
        width: 945,
        height: 405,
        alt: "Cherry Coffee Roastery",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-[#F7F4EE] text-[#181715] font-sans antialiased min-h-screen flex flex-col selection:bg-[#BFA15F] selection:text-[#FFFFFF]">
        <LanguageProvider>
          <CartProvider>
            {/* Architectural Floating Navigation */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 w-full pt-16">{children}</main>

            {/* Slide-over Cart Drawer */}
            <CartDrawer />

            {/* Natural Mountain Soundscape Player */}
            <AmbientSoundscape />

            {/* Global Editorial Footer */}
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
