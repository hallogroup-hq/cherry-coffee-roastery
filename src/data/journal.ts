export interface JournalArticle {
  id: string;
  slug: string;
  title: {
    id: string;
    en: string;
  };
  excerpt: {
    id: string;
    en: string;
  };
  content: {
    id: string;
    en: string;
  };
  date: string;
  readTime: string;
  category: string;
  author: string;
  coverImage?: string;
}

export const journalArticles: JournalArticle[] = [
  {
    id: "art-01",
    slug: "menyeduh-secara-perlahan",
    title: {
      id: "Menyeduh Secara Perlahan di Antara Deru Waktu",
      en: "Brewing Slowly Within the Accelerating World",
    },
    excerpt: {
      id: "Di tengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Karena terkadang, kopi disajikan untuk mereka yang tidak tergesa-gesa.",
      en: "In the midst of everything fast, we choose to brew slowly. Because sometimes, coffee is served for those who refuse to rush.",
    },
    content: {
      id: `Ditengah segala yang serba cepat, kami memilih menyeduh secara perlahan. Karna terkadang, kopi disajikan untuk mereka yang tidak tergesa-gesa. Agar bisa menikmati setiap rasa, proses dan waktu.

Singgah dan duduklah sebentar setiap akhir pekan, mari kita nikmati bersama.

Di Goalpara Estate Camp, kami sering melihat pengunjung datang dengan langkah terburu-buru yang terbawa dari jalanan kota. Namun begitu hawa dingin menyentuh kulit dan aroma tetesan kopi pertama menguap ke udara, bahu mereka mulai rileks.

Menyeduh dengan metode slow bar bukan sekadar tentang teknik menuang air dari ceret tembaga bersuhu 92 derajat Celsius. Ini adalah latihan kesadaran. Sebuah ajakan untuk menyaksikan bagaimana serbuk kopi mengembang, melepaskan karbondioksida yang terkunci, lalu perlahan meneteskan esensi terbaiknya ke dalam cangkir keramik.

Setiap akhir pekan, kami tidak mengejar kecepatan putaran meja. Kami menyambut setiap obrolan, setiap jeda, dan keheningan di sela-sela tegukan. Kopi yang baik butuh waktu untuk tumbuh di lereng gunung, butuh waktu untuk diproses, dan layak diseduh tanpa ketergesaan.`,
      en: `In the midst of everything fast, we choose to brew slowly. Because sometimes, coffee is served for those who are not in a hurry. To savor every note of flavor, process, and time.

Pause, sit for a moment every weekend, and let us savor together.

At Goalpara Estate Camp, we frequently observe guests arriving with the hurried gait carried over from metropolitan asphalt. Yet the moment the mountain mist kisses their brow and the fragrance of the first drip ascends into the crisp highland air, tensions dissolve.

Brewing at the slow bar is far more than a calibrated pour from a copper gooseneck kettle at 92 degrees Celsius. It is an exercise in presence. An invitation to witness the blooming grinds, the gentle release of trapped atmospheric gases, and the quiet descent of pure origin clarity into artisan ceramics.

Every weekend, we do not measure success in table turnover. We honor each conversation, every thoughtful silence between sips. Exceptional coffee demanded years on volcanic slopes; it deserves to be enjoyed without urgency.`,
    },
    date: "14 September 2026",
    readTime: "4 min read",
    category: "Philosophy & Terroir",
    author: "Head Roaster, Cherry Coffee Roastery",
  },
  {
    id: "art-02",
    slug: "mendinginkan-pikiran-di-aliran-sungai",
    title: {
      id: "Mendinginkan Pikiran, Mendengarkan Suara Aliran Sungai",
      en: "Cooling the Mind, Listening to the Mountain Stream",
    },
    excerpt: {
      id: "Mendinginkan pikiran, mendengarkan suara aliran sungai, sambil meminum kopi racikan kami. Bukankah itu ide yang bagus untuk menikmati akhir pekan?",
      en: "Cooling the mind, listening to the gentle murmur of the mountain river while sipping our artisan pour-over. Isn't that the purest way to embrace the weekend?",
    },
    content: {
      id: `Mendinginkan pikiran, mendengarkan suara aliran sungai, sambil meminum kopi racikan kami. Bukankah itu ide yang bagus untuk menikmati akhir pekan?

Di balik meja slow bar kayu cedar kami, suara air yang mengalir di bebatuan Goalpara menjadi metronom alami. Ia mengiringi ritme tetesan ekstraksi manual brew. Di sini, tidak ada dering klakson, tidak ada notifikasi yang memaksa kita membalas dalam hitungan detik.

Menutup akhir pekan dengan menikmati kopi, makanan tradisional, dinginnya Goalpara, dilengkapi lantunan musik yang membuat suasananya terasa sempurna.

Kudapan tradisional seperti pisang goreng hangat bertabur gula aren dan singkong keju renyah melengkapi keasaman bersih dari single origin Selabintana. Rasa manis alami makanan berpadu dengan body kopi yang lembut, menciptakan kenyamanan yang sulit dijumpai di kedai kopi perkotaan modern.

Terima kasih yang sudah berkunjung dan menikmati akhir pekan bersama di @cherrycoffeeroastery. Tempat ini akan selalu ada untukmu ketika dunia terasa terlalu bising.`,
      en: `Cooling the mind, listening to the gentle murmur of the mountain river while sipping our artisan pour-over. Isn't that the purest way to embrace the weekend?

Behind our cedar slow bar, the mountain stream tumbling over mossy river stones serves as an organic metronome. It accompanies every deliberate drop of manual extraction. Here, notifications fall silent; sirens are replaced by wind rustling ancient pines.

Concluding the weekend with honest coffee, traditional bites, the crisp chill of Goalpara, harmonized by soothing melodies that make the atmosphere serene.

Traditional delicacies—warm fried plantains dusted with unrefined palm nectar and crispy mountain cassava—dialogue harmoniously with the pristine acidity of Selabintana Full Wash. The balance is quiet, unpretentious, yet profoundly restorative.

Gratitude to all souls who journeyed to share this stillness with us at @cherrycoffeeroastery. This sanctuary will always await whenever the world grows too loud.`,
    },
    date: "02 September 2026",
    readTime: "3 min read",
    category: "Slow Bar Life",
    author: "Barista Lead, Cherry Slow Bar",
  },
  {
    id: "art-03",
    slug: "perjalanan-dan-refleksi-pergantian-musim",
    title: {
      id: "Beri Sedikit Apresiasi untuk Dirimu: Catatan Pergantian Musim",
      en: "Offer Grace to Yourself: Notes on the Changing Season",
    },
    excerpt: {
      id: "Perjuangan yang tak selalu terlihat, pengorbanan yang sering kali tak sempat terucap. Dan entah bagaimana, kita sampai di titik ini.",
      en: "Quiet struggles rarely witnessed, devotion softly spoken. Yet somehow, we arrive at this very milestone.",
    },
    content: {
      id: `Waktu datang dengan banyak hal yang tak terduga. Perjuangan yang tak selalu terlihat, pengorbanan yang sering kali tak sempat terucap.

Dan entah bagaimana, kita sampai di titik ini. Berdiri membawa semua bekal—lelah, belajar, dan bertumbuh.

Di laboratorium roastery, kami belajar banyak dari proses sangrai biji kopi. Biji hijau yang keras harus melewati panas membara di dalam drum sangrai, mengalami retakan pertama (first crack), mengubah struktur kimianya hingga mengeluarkan aroma bunga dan manis yang memikat. Tanpa panas dan tekanan itu, karakter terindah dari biji kopi tidak akan pernah muncul.

Manusia pun demikian. Apa yang kita lalui sepanjang tahun—setiap ujian, keraguan, dan ketekunan—sedang menempa karakter terbaik dalam diri kita.

Sebelum melanjutkan langkah, beri sedikit apresiasi untuk dirimu. Duduk sejenak. Nikmati kopi dan kudapan nikmat yang kami hidangkan, di sini.`,
      en: `Seasons arrive with the unexpected. Quiet struggles rarely witnessed, devotion softly spoken.

Yet somehow, we arrive at this very milestone. Carrying every trial, every lesson, and our collective growth.

Inside our roasting laboratory, we draw deep wisdom from the drum. A dense green bean must endure intense convective heat, cross the threshold of the first crack, fundamentally restructuring its molecular composition before its sublime florality and sweetness are unleashed. Without thermal adversity, the bean's truest grace remains dormant.

We are no different. What we navigate through life's trials and quiet persistence is steadily roasting our character into maturity.

Before taking your next step, offer a measure of grace to yourself. Sit quietly. Partake in the coffee and comforting table we prepare for you here.`,
    },
    date: "18 Agustus 2026",
    readTime: "5 min read",
    category: "Essays & Reflection",
    author: "Cherry Coffee Roastery Founder",
  },
];
