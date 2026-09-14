export type Language = "en" | "id";

export interface TranslationContent {
  nav: {
    home: string;
    beans: string;
    laboratory: string;
    sanctuary: string;
    journal: string;
    about: string;
    cart: string;
    orderConcierge: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    exploreOfferings: string;
    enterLaboratory: string;
    altitude: string;
    coordinates: string;
    scrollHint: string;
    stageCherry: string;
    stageParchment: string;
    stageGreen: string;
    stageRoast: string;
  };
  manifesto: {
    quote1: string;
    author1: string;
    quote2: string;
    quote3: string;
    yearEndTitle: string;
    yearEndText: string;
    visitCta: string;
  };
  beansSection: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    quickAdd: string;
    tastingNotes: string;
    process: string;
    elevation: string;
    roastProfile: string;
    filterLabel: string;
    espressoLabel: string;
    blendLabel: string;
  };
  laboratorySection: {
    badge: string;
    title: string;
    subtitle: string;
    exploreLab: string;
    curveTitle: string;
    curveSubtitle: string;
    brewMatrixTitle: string;
    brewMatrixSubtitle: string;
    vaultTitle: string;
    vaultSubtitle: string;
  };
  sanctuarySection: {
    badge: string;
    title: string;
    subtitle: string;
    elevationNotice: string;
    operatingHours: string;
    hoursDetail: string;
    atmosphereTitle: string;
    atmosphereText: string;
    getDirections: string;
    soundscapeLabel: string;
    soundscapeActive: string;
    soundscapeMuted: string;
  };
  journalSection: {
    badge: string;
    title: string;
    subtitle: string;
    readStory: string;
  };
  footer: {
    tagline: string;
    slowBarLocation: string;
    hours: string;
    rights: string;
    instagram: string;
    spotify: string;
    contactConcierge: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  id: {
    nav: {
      home: "Beranda",
      beans: "Biji Kopi",
      laboratory: "Laboratorium",
      sanctuary: "The Sanctuary",
      journal: "Jurnal",
      about: "Tentang Kami",
      cart: "Keranjang",
      orderConcierge: "Pesan via Concierge",
    },
    hero: {
      badge: "SLOW BAR & ROASTERY · GOALPARA ESTATE",
      titleLine1: "Menyeduh",
      titleLine2: "Secara Perlahan.",
      subtitle:
        "Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Kopi disajikan untuk mereka yang tidak tergesa-gesa — agar bisa menikmati setiap rasa, proses, dan waktu.",
      exploreOfferings: "Jelajahi Biji Kopi",
      enterLaboratory: "Masuk Laboratorium",
      altitude: "1.250–1.350 mdpl",
      coordinates: "Goalpara Estate Camp, Gn. Gede Pangrango",
      scrollHint: "Putar & scroll untuk melihat transformasi biji kopi",
      stageCherry: "01. Ranting & Coffee Cherry Segar",
      stageParchment: "02. Mucilage & Fermentasi Alami",
      stageGreen: "03. Seleksi Green Bean Lab",
      stageRoast: "04. Artisan Light-Medium Roast",
    },
    manifesto: {
      quote1:
        "Ditengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Karna terkadang, kopi disajikan untuk mereka yang tidak tergesa-gesa. Agar bisa menikmati setiap rasa, proses dan waktu.\n\nSinggah dan duduklah sebentar setiap akhir pekan, mari kita nikmati bersama.",
      author1: "— Cherry Coffee Roastery, Goalpara",
      quote2:
        "Mendinginkan pikiran, mendengarkan suara aliran sungai, sambil meminum kopi racikan kami. Bukankah itu ide yang bagus untuk menikmati akhir pekan?",
      quote3:
        "Menutup akhir pekan dengan menikmati kopi, makanan tradisional, dinginnya goalpara, dilengkapin lantunan musik yang membuat suasananya terasa sempurna.\n\nTerima kasih yang sudah berkunjung dan menikmati akhir pekan bersama di @cherrycoffeeroastery",
      yearEndTitle: "Perjalanan & Titik Ini",
      yearEndText:
        "Tahun datang dengan banyak hal yang tak terduga. Perjuangan yang tak selalu terlihat, pengorbanan yang sering kali tak sempat terucap.\n\nDan entah bagaimana, kita sampai di titik ini. Berdiri membawa semua bekal—lelah, belajar, dan bertumbuh.\n\nBeri sedikit apresiasi untuk dirimu. Duduk sejenak. Nikmati kopi dan kudapan nikmat yang kami hidangkan, di sini.",
      visitCta: "Kunjungi Slow Bar di Goalpara",
    },
    beansSection: {
      badge: "KURASI SANGRAI",
      title: "Biji Kopi Pilihan",
      subtitle:
        "Dari single origin lereng Selabintana hingga eksperimen mikro Goalpara. Disangrai dengan presisi untuk memunculkan kejernihan rasa dan karakter terroir alami.",
      viewAll: "Lihat Semua Koleksi",
      quickAdd: "Pilih Varian",
      tastingNotes: "Profil Rasa",
      process: "Proses Pasca-Panen",
      elevation: "Ketinggian",
      roastProfile: "Profil Sangrai",
      filterLabel: "Filter",
      espressoLabel: "Espresso",
      blendLabel: "Signature Blend",
    },
    laboratorySection: {
      badge: "R&D & SENSORY LAB",
      title: "Laboratorium Roastery",
      subtitle:
        "Tempat sains ekstraksi, fermentasi mikro, dan eksplorasi profil sangrai bertemu dengan seni slow bar.",
      exploreLab: "Eksplorasi Laboratorium Lengkap",
      curveTitle: "Kurva Sangrai Interaktif (Roast Profiles)",
      curveSubtitle:
        "Pantau Rate of Rise (RoR), exhaust telemetry, dan fase development sangrai secara real-time.",
      brewMatrixTitle: "Kalkulator Ekstraksi Slow Bar",
      brewMatrixSubtitle:
        "Simulasikan rasio seduh, micron gilingan, dan kurva suhu air standar barista Cherry.",
      vaultTitle: "Arsip Eksperimen & Private Cupping",
      vaultSubtitle:
        "Batch fermentasi terbatas yang hanya tersedia untuk sesi cupping khusus di Goalpara.",
    },
    sanctuarySection: {
      badge: "GOALPARA ESTATE CAMP",
      title: "The Sanctuary Slow Bar",
      subtitle:
        "Berada di tengah kabut pegunungan, dikelilingi rimbun kebun teh dan pinus di kaki Gunung Gede Pangrango. Tempat berhenti sejenak dari hiruk-pikuk kota.",
      elevationNotice: "1.250 MASL · Suhu Rata-rata 17°C · Udara Pegunungan Segar",
      operatingHours: "Jadwal Buka",
      hoursDetail: "Buka Setiap Akhir Pekan (Sabtu & Minggu) · 08.00 – 18.00 WIB",
      atmosphereTitle: "Ritual Ngopi di Dinginnya Goalpara",
      atmosphereText:
        "Duduk santai di pinggir aliran sungai, menikmati seduhan manual brew hangat, ditemani camilan tradisional dan lantunan musik akustik yang menenangkan.",
      getDirections: "Petunjuk Arah Lokasi",
      soundscapeLabel: "Ambiance Suara Alam Goalpara",
      soundscapeActive: "Memutar: Aliran Sungai & Kabut Pinus",
      soundscapeMuted: "Nyalakan Ambiance Suara",
    },
    journalSection: {
      badge: "FIELD NOTES & STORIES",
      title: "Jurnal & Catatan Rasa",
      subtitle:
        "Kumpulan esai tentang seni memperlambat hidup, eksplorasi kopi di pedesaan Jawa Barat, dan sains di balik setiap cangkir.",
      readStory: "Baca Selengkapnya",
    },
    footer: {
      tagline:
        "Slow Bar & Artisan Coffee Roastery berakar di Goalpara Estate Camp, Sukabumi. Dibuat untuk mereka yang menikmati setiap detik proses.",
      slowBarLocation: "Goalpara Estate Camp, Cisarua, Sukabumi, Jawa Barat 43151",
      hours: "Sabtu & Minggu: 08.00 - 18.00 WIB",
      rights: "Hak Cipta Dilindungi. Cherry Coffee Roastery.",
      instagram: "Ikuti @cherrycoffeeroastery",
      spotify: "Slow Bar Playlist",
      contactConcierge: "Hubungi Concierge (WhatsApp)",
    },
  },
  en: {
    nav: {
      home: "Home",
      beans: "Coffee Beans",
      laboratory: "Laboratory",
      sanctuary: "The Sanctuary",
      journal: "Journal",
      about: "About Us",
      cart: "Cart",
      orderConcierge: "VIP Concierge Order",
    },
    hero: {
      badge: "SLOW BAR & ROASTERY · GOALPARA ESTATE",
      titleLine1: "Brewing with",
      titleLine2: "Quiet Intention.",
      subtitle:
        "In a hurried world, we choose to brew slowly. Coffee crafted for those who refuse to rush — to savor every nuance of terroir, craftsmanship, and time.",
      exploreOfferings: "Explore Coffee Beans",
      enterLaboratory: "Enter Laboratory",
      altitude: "1,250–1,350 MASL",
      coordinates: "Goalpara Estate Camp, Mount Gede Pangrango",
      scrollHint: "Rotate & scroll to observe bean metamorphosis",
      stageCherry: "01. Fresh Mountain Cherry & Stem",
      stageParchment: "02. Mucilage & Natural Fermentation",
      stageGreen: "03. Lab-Graded Green Bean",
      stageRoast: "04. Artisan Light-Medium Roast",
    },
    manifesto: {
      quote1:
        "In the midst of everything fast, we choose to brew slowly. Because sometimes, coffee is served for those who are not in a hurry. To savor every note of flavor, process, and time.\n\nPause, sit for a moment every weekend, and let us savor together.",
      author1: "— Cherry Coffee Roastery, Goalpara",
      quote2:
        "Cooling the mind, listening to the gentle murmur of the mountain river while sipping our artisan pour-over. Isn't that the purest way to embrace the weekend?",
      quote3:
        "Concluding the weekend with honest coffee, traditional bites, the crisp chill of Goalpara, harmonized by soothing melodies that make the atmosphere serene.\n\nGratitude to all souls who journeyed to share this stillness with us at @cherrycoffeeroastery",
      yearEndTitle: "The Journey & This Still Point",
      yearEndText:
        "Seasons arrive with the unexpected. Quiet struggles rarely witnessed, devotion softly spoken.\n\nYet somehow, we arrive at this very milestone. Carrying every trial, every lesson, and our collective growth.\n\nOffer a measure of grace to yourself. Sit quietly. Partake in the coffee and comforting table we prepare for you here.",
      visitCta: "Journey to the Slow Bar in Goalpara",
    },
    beansSection: {
      badge: "CURATED ROASTS",
      title: "Specialty Offerings",
      subtitle:
        "From volcanic slopes of Selabintana to experimental micro-lots of Goalpara. Roasted with mathematical restraint to highlight intrinsic sweetness and pristine terroir.",
      viewAll: "View Entire Collection",
      quickAdd: "Select Variation",
      tastingNotes: "Sensory Notes",
      process: "Post-Harvest Process",
      elevation: "Elevation",
      roastProfile: "Roast Profile",
      filterLabel: "Filter",
      espressoLabel: "Espresso",
      blendLabel: "Signature Blend",
    },
    laboratorySection: {
      badge: "R&D & SENSORY LAB",
      title: "The Roastery Laboratory",
      subtitle:
        "Where extraction science, micro-fermentation trials, and thermal roast modeling converge with artisanal slow bar mastery.",
      exploreLab: "Enter Complete Laboratory",
      curveTitle: "Interactive Roast Modeling (Rate of Rise)",
      curveSubtitle:
        "Scrub real-time thermal curves, exhaust telemetry, and bean development ratios.",
      brewMatrixTitle: "Slow Bar Extraction Matrix",
      brewMatrixSubtitle:
        "Simulate brew ratios, grind micron distribution, and temperature curves calibrated to Cherry's slow bar standard.",
      vaultTitle: "Experimental Vault & Private Cuppings",
      vaultSubtitle:
        "Ultra-limited micro-batches and experimental lots reserved exclusively for private tasting flights at Goalpara.",
    },
    sanctuarySection: {
      badge: "GOALPARA ESTATE CAMP",
      title: "The Sanctuary Slow Bar",
      subtitle:
        "Nestled within highland mist, framed by tea terraces and ancient pines on Mount Gede Pangrango. A sanctuary to decelerate and reconnect.",
      elevationNotice: "1,250 MASL · 17°C Average Climate · Pristine Volcanic Terroir",
      operatingHours: "Slow Bar Schedule",
      hoursDetail: "Open Every Weekend (Saturday & Sunday) · 08:00 – 18:00 WIB",
      atmosphereTitle: "Rituals in the Mountain Chill",
      atmosphereText:
        "Unwind along the riverbank, embrace warm hand-dripped single origins, and share honest traditional snacks enveloped in calming music.",
      getDirections: "Location & Directions",
      soundscapeLabel: "Goalpara Natural Soundscape",
      soundscapeActive: "Playing: Mountain Stream & Pine Breeze",
      soundscapeMuted: "Activate Ambient Soundscape",
    },
    journalSection: {
      badge: "FIELD NOTES & STORIES",
      title: "Journal & Sensory Field Notes",
      subtitle:
        "Essays on the philosophy of slow living, agrarian journeys across West Java's highlands, and the physics of extraction.",
      readStory: "Read Article",
    },
    footer: {
      tagline:
        "Slow Bar & Artisan Coffee Roastery rooted at Goalpara Estate Camp, Sukabumi. Dedicated to those who cherish every heartbeat of the process.",
      slowBarLocation: "Goalpara Estate Camp, Cisarua, Sukabumi, West Java 43151",
      hours: "Saturday & Sunday: 08:00 - 18:00 WIB",
      rights: "All Rights Reserved. Cherry Coffee Roastery.",
      instagram: "Follow @cherrycoffeeroastery",
      spotify: "Slow Bar Playlist",
      contactConcierge: "Contact VIP Concierge (WhatsApp)",
    },
  },
};
