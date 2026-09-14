export interface PackagingSticker {
  id: string;
  name: string;
  image: string;
}

export interface BeanProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "filter" | "espresso" | "blend";
  origin: string;
  elevation: string;
  process: string;
  varietal: string;
  roastProfile: string;
  tastingNotes: string[];
  description: {
    id: string;
    en: string;
  };
  cuppingScore?: number;
  sensoryScores: {
    sweetness: number;
    acidity: number;
    body: number;
    aroma: number;
    aftertaste: number;
  };
  prices: {
    "200g": number;
    "500g": number;
    "1kg": number;
  };
  stickers: PackagingSticker[];
  activeStickerIndex: number;
  featured: boolean;
  inStock: boolean;
}

export const beansData: BeanProduct[] = [
  {
    id: "deep-loam",
    slug: "deep-loam",
    name: "Deep Loam",
    subtitle: "Full Wash Selabintana · Espresso Roast",
    category: "espresso",
    origin: "Selabintana, Sukabumi, West Java",
    elevation: "1,150 – 1,300 MASL",
    process: "Full Wash Mountain Spring",
    varietal: "Java Typica & Sigarar Utang",
    roastProfile: "Medium Espresso",
    tastingNotes: ["Chocolate", "Orange Peel", "Hazelnut"],
    description: {
      id: "Deep Loam merefleksikan kesuburan tanah vulkanik Selabintana. Disangrai khusus untuk espresso dengan body yang kaya, kelembutan cokelat gelap, sentuhan segar orange peel, dan aftertaste kacang hazelnut yang bertahan lama.",
      en: "Deep Loam embodies the mineral fertility of Selabintana's volcanic soil. Roasted with meticulous balance for espresso, yielding a plush velvety body, bittersweet dark chocolate, a crisp lift of sweet orange peel, and an enduring hazelnut finish.",
    },
    cuppingScore: 86.5,
    sensoryScores: {
      sweetness: 8.5,
      acidity: 7.0,
      body: 9.0,
      aroma: 8.5,
      aftertaste: 8.5,
    },
    prices: {
      "200g": 125000,
      "500g": 285000,
      "1kg": 520000,
    },
    stickers: [
      {
        id: "01",
        name: "Espresso Umber",
        image: "/assets/packaging/Packaging Sticker - CherryCoffeeRoastery-01.png",
      },
      {
        id: "02",
        name: "Highland Lavender",
        image: "/assets/packaging/Packaging Sticker - CherryCoffeeRoastery-02.png",
      },
      {
        id: "03",
        name: "Terracotta Clay",
        image: "/assets/packaging/Packaging Sticker - CherryCoffeeRoastery-03.png",
      },
    ],
    activeStickerIndex: 0,
    featured: true,
    inStock: true,
  },
  {
    id: "black-red",
    slug: "black-red",
    name: "Black Red",
    subtitle: "Signature Roastery Blend · Goalpara & Selabintana",
    category: "blend",
    origin: "50% Goalpara Estate Camp | 50% Selabintana",
    elevation: "1,200 – 1,350 MASL",
    process: "Dual Terroir Full Wash",
    varietal: "Ateng Super, Typica, Andungsari",
    roastProfile: "Medium Dark Roastery Blend",
    tastingNotes: ["Vanila", "Chocolate", "Brown Sugar"],
    description: {
      id: "Harmoni dua terroir Sukabumi dalam satu cangkir. Gabungan karakter manis karamel dari Goalpara dan kekokohan Selabintana menghasilkan aroma vanilla yang harum, fondasi cokelat lezat, serta manis legit gula aren murni.",
      en: "A seamless synthesis of two Sukabumi terroirs. Uniting the caramel sweetness of Goalpara with the structured depth of Selabintana, producing an intoxicating vanilla fragrance, decadent chocolate foundation, and rich brown sugar sweetness.",
    },
    cuppingScore: 85.8,
    sensoryScores: {
      sweetness: 9.0,
      acidity: 6.5,
      body: 8.5,
      aroma: 8.8,
      aftertaste: 8.5,
    },
    prices: {
      "200g": 110000,
      "500g": 250000,
      "1kg": 460000,
    },
    stickers: [
      {
        id: "04",
        name: "Warm Earth Caramel",
        image: "/assets/packaging/Packaging Sticker - CherryCoffeeRoastery-04.png",
      },
      {
        id: "05",
        name: "Matcha Pine Mist",
        image: "/assets/packaging/Packaging Sticker - CherryCoffeeRoastery-05.png",
      },
      {
        id: "06",
        name: "Cherry Crimson Reserve",
        image: "/assets/packaging/Packaging Sticker - CherryCoffeeRoastery-06.png",
      },
    ],
    activeStickerIndex: 0,
    featured: true,
    inStock: true,
  },
  {
    id: "goalpara-misty-terroir",
    slug: "goalpara-misty-terroir",
    name: "Goalpara Misty Terroir",
    subtitle: "Anaerobic Natural Micro-Lot · Filter Roast",
    category: "filter",
    origin: "Goalpara Estate Camp, Gn. Gede Pangrango",
    elevation: "1,350 MASL",
    process: "72-Hour Highland Fog Anaerobic Natural",
    varietal: "Heritage Java Typica",
    roastProfile: "Artisan Light Filter",
    tastingNotes: ["Jasmine", "Bergamot", "Stone Fruit", "Honeycomb"],
    description: {
      id: "Dipetik langsung dari lereng Goalpara Estate di ketinggian 1.350 mdpl yang senantiasa diselimuti kabut. Fermentasi anaerobik lambat dalam suhu dingin pegunungan menghasilkan aroma melati yang semerbak, keasaman bergamot yang anggun, dan manisnya madu hutan.",
      en: "Harvested directly from mist-shrouded slopes of Goalpara Estate at 1,350 MASL. Slow anaerobic fermentation in the cool mountain climate reveals heady jasmine florals, refined bergamot citrus acidity, stone fruit complexity, and wild mountain honeycomb.",
    },
    cuppingScore: 88.2,
    sensoryScores: {
      sweetness: 9.0,
      acidity: 8.8,
      body: 7.2,
      aroma: 9.5,
      aftertaste: 9.0,
    },
    prices: {
      "200g": 155000,
      "500g": 355000,
      "1kg": 640000,
    },
    stickers: [
      {
        id: "05",
        name: "Matcha Pine Mist",
        image: "/assets/packaging/Packaging Sticker - CherryCoffeeRoastery-05.png",
      },
    ],
    activeStickerIndex: 0,
    featured: true,
    inStock: true,
  },
  {
    id: "gede-reserve-geisha",
    slug: "gede-reserve-geisha",
    name: "Mount Gede Reserve Geisha",
    subtitle: "Laboratory Special Allocation #09",
    category: "filter",
    origin: "Ridge of Mt. Gede Pangrango, Sukabumi",
    elevation: "1,450 MASL",
    process: "Carbonic Maceration 96h + Cold Bed Drying",
    varietal: "Panama Green Tip Geisha",
    roastProfile: "Omni Precision Light",
    tastingNotes: ["White Florals", "Peach Nectar", "Lemongrass", "Silky Cacao"],
    description: {
      id: "Koleksi paling prestisius dari laboratorium riset Cherry. Varietas Geisha yang ditanam di ketinggian tertinggi Gunung Gede dengan fermentasi maserasi karbonat. Cangkir yang luar biasa jernih dengan aroma bunga putih dan rasa manis nektar persik.",
      en: "The crown jewel of Cherry's roasting laboratory. High-elevation Geisha processed through carbonic maceration. Radiates ethereal white blossom perfumes, luminous peach nectar, vibrant lemongrass, and a silky white chocolate finish.",
    },
    cuppingScore: 90.5,
    sensoryScores: {
      sweetness: 9.5,
      acidity: 9.2,
      body: 7.0,
      aroma: 9.8,
      aftertaste: 9.5,
    },
    prices: {
      "200g": 245000,
      "500g": 560000,
      "1kg": 990000,
    },
    stickers: [
      {
        id: "02",
        name: "Highland Lavender",
        image: "/assets/packaging/Packaging Sticker - CherryCoffeeRoastery-02.png",
      },
    ],
    activeStickerIndex: 0,
    featured: true,
    inStock: true,
  },
];
