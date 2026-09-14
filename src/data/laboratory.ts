export interface RoastCurvePoint {
  timeSec: number;
  timeLabel: string;
  beanTemp: number; // in Celsius
  exhaustTemp: number; // in Celsius
  rateOfRise: number; // °C/min
  phase: "charge" | "drying" | "maillard" | "first_crack" | "development" | "drop";
}

export interface FermentationBatch {
  id: string;
  batchCode: string;
  title: string;
  cultivar: string;
  harvestAltitude: string;
  inoculationMethod: string;
  fermentationHours: number;
  startingBrix: number;
  finalBrix: number;
  targetPh: number;
  sensoryOutcome: string[];
  status: "archived" | "in_roastery" | "active_slowbar";
  notes: {
    id: string;
    en: string;
  };
}

export interface BrewRecipe {
  id: string;
  method: string;
  device: string;
  filterPaper: string;
  ratio: string;
  coffeeDoseG: number;
  waterYieldG: number;
  grindMicrons: number;
  grindDescription: string;
  waterTempC: number;
  targetTds: string;
  extractionTimeSec: number;
  steps: {
    timeSec: number;
    waterPourG: number;
    instruction: {
      id: string;
      en: string;
    };
  }[];
  tastingCharacter: {
    id: string;
    en: string;
  };
}

export const roastProfileSample: RoastCurvePoint[] = [
  { timeSec: 0, timeLabel: "00:00", beanTemp: 200, exhaustTemp: 220, rateOfRise: 0, phase: "charge" },
  { timeSec: 60, timeLabel: "01:00", beanTemp: 98, exhaustTemp: 145, rateOfRise: 14.5, phase: "drying" },
  { timeSec: 120, timeLabel: "02:00", beanTemp: 122, exhaustTemp: 168, rateOfRise: 18.2, phase: "drying" },
  { timeSec: 180, timeLabel: "03:00", beanTemp: 142, exhaustTemp: 184, rateOfRise: 16.0, phase: "drying" },
  { timeSec: 240, timeLabel: "04:00", beanTemp: 158, exhaustTemp: 196, rateOfRise: 14.2, phase: "maillard" },
  { timeSec: 300, timeLabel: "05:00", beanTemp: 172, exhaustTemp: 205, rateOfRise: 12.5, phase: "maillard" },
  { timeSec: 360, timeLabel: "06:00", beanTemp: 184, exhaustTemp: 212, rateOfRise: 10.8, phase: "maillard" },
  { timeSec: 420, timeLabel: "07:00", beanTemp: 194, exhaustTemp: 218, rateOfRise: 9.0, phase: "maillard" },
  { timeSec: 480, timeLabel: "08:00", beanTemp: 202, exhaustTemp: 224, rateOfRise: 7.5, phase: "first_crack" },
  { timeSec: 540, timeLabel: "09:00", beanTemp: 208, exhaustTemp: 228, rateOfRise: 5.8, phase: "development" },
  { timeSec: 600, timeLabel: "10:00", beanTemp: 213, exhaustTemp: 231, rateOfRise: 4.2, phase: "development" },
  { timeSec: 630, timeLabel: "10:30", beanTemp: 215, exhaustTemp: 232, rateOfRise: 3.5, phase: "drop" },
];

export const fermentationLogs: FermentationBatch[] = [
  {
    id: "batch-04",
    batchCode: "EXP-2026-04",
    title: "Highland Fog Anaerobic Maceration",
    cultivar: "Java Typica Heritage",
    harvestAltitude: "1,350 MASL (Goalpara Camp Ridge)",
    inoculationMethod: "Indigenous Saccharomyces Highland Strains",
    fermentationHours: 72,
    startingBrix: 23.5,
    finalBrix: 14.8,
    targetPh: 4.15,
    sensoryOutcome: ["Wild Orchid", "Bergamot Marmalade", "Candied Peach"],
    status: "active_slowbar",
    notes: {
      id: "Suhu kabut malam Goalpara yang mencapai 14°C memperlambat laju fermentasi alami secara drastis, mengunci keasaman asam malat yang sangat jernih dan manis yang luar biasa pekat.",
      en: "Goalpara's nighttime mountain fog dipping to 14°C naturally decelerated fermentation kinetics, locking in crystalline malic acids and extraordinary concentrated sweetness.",
    },
  },
  {
    id: "batch-07",
    batchCode: "EXP-2026-07",
    title: "Thermal Shock Double Washed",
    cultivar: "Sigarar Utang & Ateng Super",
    harvestAltitude: "1,250 MASL (Selabintana Basin)",
    inoculationMethod: "45°C Thermal Shock Wash followed by Cold Mountain Well Inflow",
    fermentationHours: 48,
    startingBrix: 22.0,
    finalBrix: 12.0,
    targetPh: 4.3,
    sensoryOutcome: ["Orange Blossom", "Hazelnut Praline", "Crisp Red Currant"],
    status: "in_roastery",
    notes: {
      id: "Perlakuan kejut suhu pori cherry membuka dinding sel biji untuk menyerap kembali senyawa gula buah secara maksimal sebelum dicuci air mata air pegunungan dingin.",
      en: "Thermal shock expands cherry cellular porosity to re-imbibe essential fruit esters before rapid quenching in cold mountain aquifer water.",
    },
  },
  {
    id: "batch-09",
    batchCode: "EXP-2026-09",
    title: "Carbonic Maceration Geisha Reserve",
    cultivar: "Panama Green Tip Geisha (Gede Acclimated)",
    harvestAltitude: "1,450 MASL",
    inoculationMethod: "Pure CO2 Sealed Stainless Steel Bioreactor",
    fermentationHours: 96,
    startingBrix: 24.8,
    finalBrix: 15.2,
    targetPh: 3.95,
    sensoryOutcome: ["White Jasmine", "Meyer Lemon", "Champagne Texture"],
    status: "archived",
    notes: {
      id: "Eksperimen paling presisi dari laboratorium Cherry. 96 jam dalam bejana bertekanan karbon dioksida di kaki Gunung Gede. Tersedia sangat terbatas untuk sesi cupping tertutup.",
      en: "Cherry's most exacting experiment. 96 hours under pressurized CO2 at the base of Mount Gede. Strictly reserved for closed private cupping flights.",
    },
  },
];

export const brewRecipes: BrewRecipe[] = [
  {
    id: "kalita-slowbar",
    method: "Kalita Wave 185",
    device: "Hasami Porcelain Flat Bed Dripper",
    filterPaper: "Kalita Oxygen Bleached Wave Filter (Rinsed)",
    ratio: "1:15.5",
    coffeeDoseG: 16,
    waterYieldG: 248,
    grindMicrons: 780,
    grindDescription: "Medium-Coarse (Sugar-Grain Texture)",
    waterTempC: 92,
    targetTds: "1.34% – 1.38%",
    extractionTimeSec: 180,
    steps: [
      {
        timeSec: 0,
        waterPourG: 50,
        instruction: {
          id: "Bloom 50g air melingkar perlahan dari tengah ke luar. Diamkan 45 detik untuk degassing karbon alami.",
          en: "Gentle concentric 50g bloom pour. Allow 45 seconds for natural CO2 degassing.",
        },
      },
      {
        timeSec: 45,
        waterPourG: 120,
        instruction: {
          id: "Tuang spiral halus hingga 120g dengan flow rate stabil 3.5g/detik. Jaga tinggi tuangan 4cm di atas permukaan.",
          en: "Controlled spiral pour reaching 120g at a steady 3.5g/s flow rate. Maintain 4cm kettle spout elevation.",
        },
      },
      {
        timeSec: 90,
        waterPourG: 190,
        instruction: {
          id: "Tuang kedua hingga 190g dengan fokus ekstraksi di zona tengah untuk menjaga body yang bulat.",
          en: "Second gentle center-focused pulse to 190g, stabilizing temperature and sweet body.",
        },
      },
      {
        timeSec: 130,
        waterPourG: 248,
        instruction: {
          id: "Tuang akhir hingga 248g. Berikan satu kali swirl lembut pada server untuk drawdown yang rata sempurna.",
          en: "Final pour to 248g. Give a single delicate swirl to maintain a flat, uniform bed drawdown.",
        },
      },
    ],
    tastingCharacter: {
      id: "Menonjolkan kejernihan rasa manis, tekstur lembut di lidah, dan kebersihan aftertaste yang menenangkan.",
      en: "Maximizes refined sweetness clarity, silky mouthfeel, and a lingering serene finish.",
    },
  },
  {
    id: "v60-ceramic",
    method: "V60 02 Ceramic",
    device: "Arita-Yaki Ceramic Conical Dripper",
    filterPaper: "Cafec Abaca Cone Filter",
    ratio: "1:16",
    coffeeDoseG: 15,
    waterYieldG: 240,
    grindMicrons: 720,
    grindDescription: "Medium-Fine Precision",
    waterTempC: 93,
    targetTds: "1.30% – 1.35%",
    extractionTimeSec: 150,
    steps: [
      {
        timeSec: 0,
        waterPourG: 45,
        instruction: {
          id: "Bloom 45g air panas bersuhu 93°C. Biarkan asam floral membuka diri selama 40 detik.",
          en: "Bloom with 45g hot water at 93°C. Let the delicate floral acids blossom for 40 seconds.",
        },
      },
      {
        timeSec: 40,
        waterPourG: 140,
        instruction: {
          id: "Penuangan dinamis dengan spiral cepat untuk menghasilkan agitasi merata pada partikel bubuk.",
          en: "Dynamic circular pour to 140g, imparting intentional gentle turbulence across the bed.",
        },
      },
      {
        timeSec: 80,
        waterPourG: 240,
        instruction: {
          id: "Penuangan teratur hingga 240g. Nikmati aroma melati dan jeruk yang menguar bersama uap panas.",
          en: "Steady continuous pour to 240g. Savor the release of fragrant jasmine and citrus vapors.",
        },
      },
    ],
    tastingCharacter: {
      id: "Karakter asam sitrun yang cerah, aroma bunga semerbak, dan kejernihan cangkir layaknya teh artisan.",
      en: "Vibrant crystalline acidity, blooming floral aromatics, and tea-like transparency.",
    },
  },
  {
    id: "slow-cold-drip",
    method: "Dutch Slow Cold Drip",
    device: "Handblown Glass Tower",
    filterPaper: "Dual Ceramic Disk & Round Cotton Filter",
    ratio: "1:10",
    coffeeDoseG: 50,
    waterYieldG: 500,
    grindMicrons: 650,
    grindDescription: "Medium Consistency",
    waterTempC: 4,
    targetTds: "1.65% – 1.80%",
    extractionTimeSec: 21600, // 6 hours
    steps: [
      {
        timeSec: 0,
        waterPourG: 500,
        instruction: {
          id: "Ekstraksi gravitasi 1 tetes per 1.5 detik menggunakan air es mata air Goalpara selama 6 jam penuh.",
          en: "Gravity drip calibration at 1 drop per 1.5 seconds using chilled Goalpara spring water over 6 hours.",
        },
      },
    ],
    tastingCharacter: {
      id: "Body sangat kental seperti sirup anggur, tanpa keasaman pahit, dengan sensasi cokelat likur yang mewah.",
      en: "Liqueur-like density, completely devoid of astringency, delivering intense cacao wine notes.",
    },
  },
];
