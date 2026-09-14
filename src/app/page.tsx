"use client";

import React, { useState } from "react";
import EditorialHero from "@/components/atelier/EditorialHero";
import EditorialManifesto from "@/components/atelier/EditorialManifesto";
import BeansLedger from "@/components/atelier/BeansLedger";
import MountainDispatch from "@/components/atelier/MountainDispatch";
import RoasterLogbook from "@/components/atelier/RoasterLogbook";
import Packaging3DModal from "@/components/3d/Packaging3DModal";
import { BeanProduct } from "@/data/beans";

export default function HomePage() {
  const [selectedBeanForModal, setSelectedBeanForModal] = useState<BeanProduct | null>(null);
  const [isPackagingModalOpen, setIsPackagingModalOpen] = useState(false);

  const handleOpenInspection = (bean: BeanProduct) => {
    setSelectedBeanForModal(bean);
    setIsPackagingModalOpen(true);
  };

  const handleCloseInspection = () => {
    setIsPackagingModalOpen(false);
    setSelectedBeanForModal(null);
  };

  return (
    <main className="relative w-full bg-[#0E0D0C] text-[#F7F5F0] overflow-hidden">
      {/* 1. EDITORIAL ATELIER HERO (Tactile Macro Photography & Optical Loupe) */}
      <EditorialHero />

      {/* 2. THE LITERARY MANIFESTO (@cherrycoffeeroastery Slow Living Philosophy) */}
      <EditorialManifesto />

      {/* 3. THE ROASTER'S ARCHIVAL LEDGER (Curated Specialty Coffee Offerings) */}
      <BeansLedger onOpenModal={handleOpenInspection} />

      {/* 4. THE MOUNTAIN SANCTUARY DISPATCH (Goalpara Slow Bar & Ambient Sound Unit) */}
      <MountainDispatch />

      {/* 5. THE ROASTERY FIELD LOGBOOK (Thermal Control & Drum Roasting Science) */}
      <RoasterLogbook />

      {/* Interactive 3D Pouch Packaging Inspector Modal */}
      <Packaging3DModal
        bean={selectedBeanForModal}
        isOpen={isPackagingModalOpen}
        onClose={handleCloseInspection}
      />
    </main>
  );
}
