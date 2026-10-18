/**
 * Portfolio Data, Types & Translations
 * Consolidated single source of truth for personal data, projects, skills, and bilingual strings.
 */

export type Language = 'en' | 'id';

export interface PersonalProfile {
  name: string;
  fullName: string;
  birthDate: Date;
  timezone: string;
  storeUrl: string;
  location: string;
}

export interface SkillItem {
  id: string;
  title: string;
  categoryClass: 'software' | 'networking' | 'cyber';
  proficiency: number;
  gradient?: string;
  badge?: string;
  items: string[];
}

export interface AchievementItem {
  num: number;
  titleId: string;
  titleEn: string;
  eventId: string;
  eventEn: string;
  dateId: string;
  dateEn: string;
  prizeId: string;
  prizeEn: string;
  descId: string;
  descEn: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  timeline: string;
  url: string;
  descriptionId: string;
  descriptionEn: string;
}

export interface SocialLinkItem {
  name: string;
  url: string;
  icon: string;
}

export interface CloudBlueprintItem {
  id: number;
  caption: string;
  image: string;
}

export const PERSONAL_PROFILE: PersonalProfile = {
  name: 'Vayyy',
  fullName: 'Yova',
  birthDate: new Date(2011, 0, 25), // January 25, 2011
  timezone: 'Asia/Jakarta',
  storeUrl: 'https://vayyy-store.vercel.app/',
  location: 'Kab. Lumajang, Jawa Timur, Indonesia'
};

export const I18N_CONTENT = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills & Achievement',
      project: 'Project',
      store: 'Store'
    },
    greetingDefault: 'Loading...',
    tagline: '"I miss the old us."',
    bio: 'I am a student who is deeply interested in the IT world. My main focus is on <strong>Software Development</strong>, but currently, I am also actively learning and diving into <strong>Computer Networking</strong>. I am an alumnus of <strong>SMP AL Ikhlash Lumajang</strong>, and continued to <strong>SMK Telkom Malang</strong> after being accepted into the <strong>Computer and Network Engineering (TKJ)</strong> major.',
    profile: {
      heading: 'Profile',
      nameLabel: 'Name',
      ageLabel: 'Age',
      birthdayLabel: 'Birthday',
      birthdayValue: 'January 25, 2011',
      dreamLabel: 'Dream',
      dreamValue: 'DevOps Engineer',
      addressLabel: 'Home Address',
      addressValue: '<strong>Born:</strong> Lumajang Regency, Indonesia<br><strong>Settled:</strong> Malang City, Indonesia',
      yearsOld: 'Years old'
    },
    skillsHeading: 'Skills & Interests',
    achievementHeading: 'Achievement',
    projectsHeading: 'Projects',
    comingSoon: 'Coming Soon',
    certificatePlaceholder: 'Certificate not available yet',
    cloudBlueprintTitle: 'Cloud Engineer Blueprint',
    cloudBlueprintIntro: 'Bridging the gap between software developers and IT operations...',
    quoteModalTitle: 'I miss the old us @Strangers',
    quoteModalSub: 'If only time could be turned back...',
    clockModalTitle: 'Real-time System Clock',
    countdownModalTitle: 'Birthday Countdown 🎉',
    journeyTo: (age: number) => `Journey to ${age} years old`,
    birthdayWish: (age: number, name: string) => `Happy ${age}th Birthday ${name}! ✨🎈`,
    units: {
      hour: 'Hour',
      min: 'Min',
      sec: 'Sec',
      days: 'Days',
      hours: 'Hours',
      mins: 'Mins',
      secs: 'Secs'
    }
  },
  id: {
    nav: {
      about: 'About',
      skills: 'Skills & Achievement',
      project: 'Project',
      store: 'Store'
    },
    greetingDefault: 'Memuat...',
    tagline: '"Aku rindu kita yang dulu."',
    bio: 'Saya adalah seorang pelajar yang sangat tertarik dengan dunia IT. Fokus utama saya berada di bidang <strong>Software Development</strong>, namun saat ini saya juga sedang aktif mempelajari serta terjun ke bidang <strong>Jaringan Komputer</strong>. Saya merupakan alumni dari <strong>SMP AL Ikhlash Lumajang</strong>, dan melanjutkan ke <strong>SMK Telkom Malang</strong> setelah berhasil diterima di jurusan <strong>Teknik Komputer dan Jaringan (TKJ)</strong>.',
    profile: {
      heading: 'Profile',
      nameLabel: 'Nama',
      ageLabel: 'Usia',
      birthdayLabel: 'Tanggal Lahir',
      birthdayValue: '25 Januari 2011',
      dreamLabel: 'Cita-cita',
      dreamValue: 'DevOps Engineer',
      addressLabel: 'Alamat Rumah',
      addressValue: '<strong>Asal:</strong> Kab. Lumajang, Indonesia<br><strong>Tinggal:</strong> Kota Malang, Indonesia',
      yearsOld: 'Tahun'
    },
    skillsHeading: 'Skills & Interests',
    achievementHeading: 'Achievement',
    projectsHeading: 'Projects',
    comingSoon: 'Segera Hadir',
    certificatePlaceholder: 'Sertifikat belum tersedia',
    cloudBlueprintTitle: 'Cloud Engineer Blueprint',
    cloudBlueprintIntro: 'Menjembatani tim Developer dengan Operations...',
    quoteModalTitle: 'Aku rindu kita yang dulu @Orang_Asing',
    quoteModalSub: 'Seandainya waktu bisa diputar kembali...',
    clockModalTitle: 'Waktu Real-time',
    countdownModalTitle: 'Menuju Hari Ulang Tahun 🎉',
    journeyTo: (age: number) => `Menuju usia yang ke-${age}`,
    birthdayWish: (age: number, name: string) => `Selamat Ulang Tahun Ke-${age} ${name}! ✨🎈`,
    units: {
      hour: 'Jam',
      min: 'Menit',
      sec: 'Detik',
      days: 'Hari',
      hours: 'Jam',
      mins: 'Menit',
      secs: 'Detik'
    }
  }
};

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'software',
    title: 'Software Focus',
    categoryClass: 'software',
    proficiency: 75,
    items: [
      'HTML5',
      'CSS3 (Flexbox & Layouts)',
      'Minecraft Server Architecture',
      'Java Programming'
    ]
  },
  {
    id: 'networking',
    title: 'Networking',
    categoryClass: 'networking',
    proficiency: 25,
    badge: 'Learning',
    gradient: 'linear-gradient(90deg, #2ecc71, #27ae60)',
    items: [
      'Computer Network Fundamentals',
      'IP Addressing (IPv4)',
      'Basic TKJ Curriculum',
      'Routing & Switching'
    ]
  },
  {
    id: 'cyber',
    title: 'Cyber Security',
    categoryClass: 'cyber',
    proficiency: 15,
    badge: 'Learning',
    gradient: 'linear-gradient(90deg, #e74c3c, #c0392b)',
    items: [
      'Security Fundamentals',
      'Basic Ethical Hacking',
      'Linux Administration',
      'Network Security'
    ]
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    num: 1,
    titleId: 'Segera Hadir',
    titleEn: 'Coming Soon',
    eventId: 'Nama Lomba — Belum Diisi',
    eventEn: 'Competition Name — Not Filled Yet',
    dateId: 'Tanggal: Belum diisi',
    dateEn: 'Date: Not filled yet',
    prizeId: 'Penghargaan: Belum diisi',
    prizeEn: 'Award: Not filled yet',
    descId: 'Deskripsi singkat mengenai lomba, kategori, serta pencapaian akan ditambahkan di sini setelah sertifikat tersedia.',
    descEn: 'A short description about the competition, category, and achievement will be added here once the certificate is available.'
  },
  {
    num: 2,
    titleId: 'Segera Hadir',
    titleEn: 'Coming Soon',
    eventId: 'Nama Lomba — Belum Diisi',
    eventEn: 'Competition Name — Not Filled Yet',
    dateId: 'Tanggal: Belum diisi',
    dateEn: 'Date: Not filled yet',
    prizeId: 'Penghargaan: Belum diisi',
    prizeEn: 'Award: Not filled yet',
    descId: 'Deskripsi singkat mengenai lomba, kategori, serta pencapaian akan ditambahkan di sini setelah sertifikat tersedia.',
    descEn: 'A short description about the competition, category, and achievement will be added here once the certificate is available.'
  },
  {
    num: 3,
    titleId: 'Segera Hadir',
    titleEn: 'Coming Soon',
    eventId: 'Nama Lomba — Belum Diisi',
    eventEn: 'Competition Name — Not Filled Yet',
    dateId: 'Tanggal: Belum diisi',
    dateEn: 'Date: Not filled yet',
    prizeId: 'Penghargaan: Belum diisi',
    prizeEn: 'Award: Not filled yet',
    descId: 'Deskripsi singkat mengenai lomba, kategori, serta pencapaian akan ditambahkan di sini setelah sertifikat tersedia.',
    descEn: 'A short description about the competition, category, and achievement will be added here once the certificate is available.'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'glitchmc',
    title: 'GlitchMC',
    timeline: '2025 - now',
    url: 'https://glitchmc.web.id',
    descriptionId: '<strong>GlitchMC</strong> adalah sebuah proyek server Minecraft kustom yang berfokus utama pada mode gameplay <strong>Vanilla</strong>. Server ini dikembangkan menggunakan berbagai optimasi backend, pengelolaan database performa tinggi, sistem multi-world via plugin manajemen canggih, kustomisasi ekonomi dinamis, serta integrasi bot Discord interaktif untuk menjembatani komunikasi komunitas secara real-time. Fokus utama proyek ini adalah menghadirkan lingkungan bermain yang kompetitif, stabil, dan minim latensi bagi para pemain.',
    descriptionEn: '<strong>GlitchMC</strong> is a custom Minecraft server network primarily focusing on a core <strong>Vanilla</strong> environment. This project utilizes extensive backend optimizations, high-performance database handling, complex multi-world environments via advanced plugin management, dynamic custom economies, and live interaction using custom Discord bot integrations to bridge our community. The ultimate goal is to provide a competitive, highly stable, lag-free environment for players.'
  },
  {
    id: 'vayyy-store',
    title: 'Vayyy Store',
    timeline: '2026 - now',
    url: 'https://vayyy-store.vercel.app/',
    descriptionId: '<strong>Vayyy Store</strong> adalah sebuah store digital yang berfokus utama pada penjualan <strong>App Premium</strong>. Store ini juga menyediakan berbagai layanan seperti Web Developer, Discord Developer, Minecraft Developer, Setup Server, Create Bot, Domain, Design Grafis, serta Make Skins Minecraft. Fokus utama proyek ini adalah menghadirkan pusat layanan digital yang praktis, terpercaya, dan sesuai kebutuhan komunitas.',
    descriptionEn: '<strong>Vayyy Store</strong> is a digital store that mainly focuses on selling <strong>Premium Apps</strong>. The store also provides various services such as Web Developer, Discord Developer, Minecraft Developer, Server Setup, Create Bot, Domain, Graphic Design, and Minecraft Skins Creation. The main focus of this project is to deliver digital services that are practical, reliable, and suited to the needs of the community.'
  }
];

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/vayyyofficial',
    icon: 'https://api.iconify.design/fa6-brands:github.svg?color=%23aaaaaa'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/KVMd9jA8SY',
    icon: 'https://api.iconify.design/fa6-brands:discord.svg?color=%23aaaaaa'
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/6285816300442',
    icon: 'https://api.iconify.design/fa6-brands:whatsapp.svg?color=%23aaaaaa'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@yova_2501',
    icon: 'https://api.iconify.design/fa6-brands:tiktok.svg?color=%23aaaaaa'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/vayyy_25/',
    icon: 'https://api.iconify.design/fa6-brands:instagram.svg?color=%23aaaaaa'
  },
  {
    name: 'Email',
    url: 'mailto:vayyyofficial@gmail.com',
    icon: 'https://api.iconify.design/fa6-solid:envelope.svg?color=%23aaaaaa'
  }
];

export const CLOUD_BLUEPRINTS: CloudBlueprintItem[] = [
  {
    id: 1,
    caption: '#1 Infrastructure Management',
    image: 'assets/CloudInfrastructureManagement.png'
  },
  {
    id: 2,
    caption: '#2 Cloud Security & Compliance',
    image: 'assets/CloudSecurity.png'
  },
  {
    id: 3,
    caption: '#3 Cloud Optimization',
    image: 'assets/CloudOptimization.png'
  },
  {
    id: 4,
    caption: '#4 Cloud Deployment',
    image: 'assets/CloudDeployment.png'
  }
];
