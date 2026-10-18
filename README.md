# Vayyy.dev — Personal Portfolio

Website portofolio personal milik **Vayyy (Yova)** yang berfokus pada **Software Development** dan **Computer Network Engineering (TKJ)**. Dikembangkan dengan arsitektur modern, performa tinggi, desain glassmorphism/dark mode, serta implementasi type-safe menggunakan **TypeScript**.

---

## 🛠️ Teknologi & Stack

- **Framework & UI Library:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (`.tsx` components)
- **Bundler & Build Tool:** [Vite 6](https://vitejs.dev/) with `@vitejs/plugin-react`
- **Styling:** Vanilla CSS3 (Design Tokens / `:root` CSS variables, glassmorphism, responsive, custom slim 7px scrollbar)
- **Ikonografi:** [Lucide Icons](https://lucide.dev/) (`lucide-react`)
- **Efek Visual:** Canvas Matrix Rain Loader, Interactive Particles Background Canvas, Cursor Glow Spotlight, Typewriter Engine
- **Tooling:** Node.js, TypeScript Compiler (`tsc`), Vite

---

## 📋 Prasyarat Instalasi

Sebelum memulai, pastikan komputer Anda telah terinstal:
- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan, v18.x atau lebih baru)
- [Git](https://git-scm.com/) (untuk version control)

---

## 🚀 Panduan Memulai Cepat (Lokal)

### 1. Instalasi Dependency
Buka terminal pada direktori proyek, lalu jalankan:
```bash
npm install
```

### 2. Membuat Production Build
Untuk mengompilasi TypeScript dan mem-bundling aplikasi menggunakan Vite ke folder `dist/`:
```bash
npm run build
```

### 3. Menjalankan Preview / Development Server
Untuk menjalankan local preview server dari hasil build:
```bash
npm run preview
```
Server akan aktif di `http://localhost:4173` (atau port default Vite).

> [!NOTE]
> **Catatan Penamaan Folder di Windows:** Jika path folder proyek Anda di Windows mengandung karakter `#` (misalnya `Portofolio #1`), Vite dev server mendeteksi `#` sebagai URL hash fragment. Solusi terbaik adalah menjalankan `npm run build && npm run preview` atau menamai direktori tanpa karakter khusus (misalnya `Portfolio-1`).

### 4. Pemeriksaan Tipe Data (Type-Check)
Untuk memverifikasi konsistensi tipe data TypeScript tanpa menghasilkan file build:
```bash
npm run type-check
```

---

## 📁 Struktur Direktori

Struktur proyek dirancang efisien, modular, dan bersih (hanya 5 file terfokus di dalam `src/`):

```
├── assets/                 # Aset gambar asli (avatar.png, 4 cloud blueprint PNGs)
├── src/                    # Source code React + TypeScript (.tsx / .ts)
│   ├── data.ts             # Model data, profile, skills, projects, & i18n EN/ID
│   ├── Modals.tsx          # 6 komponen modal dialog terpadu (Avatar, Clock, dll.)
│   ├── Effects.tsx         # LoadingScreen, ParticlesBackground, & TypewriterText
│   ├── App.tsx             # Komponen utama: layout, navbar, grid, & state
│   └── main.tsx            # React 19 entry point & root renderer
├── dist/                   # Output build siap produksi (di-generate otomatis)
├── index.html              # Template HTML utama
├── style.css               # Desain, tema gelap cyber-gold, & scrollbar tipis
├── vite.config.ts          # Konfigurasi bundler Vite & plugin auto-copy aset
├── tsconfig.json           # Konfigurasi TypeScript compiler (strict)
├── package.json            # Manifest proyek & skrip npm
├── .gitignore              # Konfigurasi pengabaian file Git
├── .env.example            # Template environment variables
└── README.md               # Dokumentasi proyek
```

---

## 🔐 Environment Variables

Website ini adalah **client-side static web application**. Tidak ada secret key, database credential, atau API key server yang wajib diisi.

Jika di masa mendatang Anda ingin menambahkan analitik eksternal atau formulir kontak, Anda dapat membuat file `.env` mengacu pada [.env.example](file:///.env.example). **Peringatan:** Jangan pernah menyimpan API secret di kode frontend.

---

## 🌐 Panduan Deployment ke GitHub

Ikuti langkah-langkah berikut untuk menghubungkan dan mengunggah proyek ini ke GitHub:

### Langkah 1: Buat Repository Baru di GitHub
1. Masuk ke akun [GitHub](https://github.com/).
2. Klik tombol **New** untuk membuat repository baru.
3. Beri nama repository (misalnya `portfolio-vayyy`).
4. Pilih visibilitas **Public** atau **Private** sesuai preferensi Anda.
5. **Jangan centang** "Add a README file" atau ".gitignore" karena proyek sudah menyediakannya.
6. Klik **Create repository**.

### Langkah 2: Hubungkan Repositori Lokal ke GitHub
Buka terminal di direktori proyek dan jalankan perintah berikut (ganti `<username>` dan `<repo-name>` sesuai repository Anda):
```bash
# Rename branch utama menjadi main
git branch -M main

# Tambahkan remote repository GitHub Anda
git remote add origin https://github.com/<username>/<repo-name>.git

# Push seluruh commit ke GitHub
git push -u origin main
```

---

## ⚡ Panduan Deployment ke Vercel

Proyek ini telah dioptimalkan secara penuh untuk di-deploy ke [Vercel](https://vercel.com/):

### Langkah 1: Hubungkan Akun Vercel ke GitHub
1. Buka [Vercel Dashboard](https://vercel.com/dashboard).
2. Login menggunakan akun GitHub Anda.
3. Klik tombol **Add New...** > **Project**.
4. Pilih repository `portfolio-vayyy` yang baru saja Anda push, lalu klik **Import**.

### Langkah 2: Konfigurasi Proyek di Vercel
Pada halaman konfigurasi proyek Vercel:
- **Framework Preset:** Pilih `Vite` (Vercel akan otomatis mendeteksi konfigurasi Vite).
- **Root Directory:** `./`
- **Build & Output Settings:**
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`
  - **Install Command:** `npm install`
- **Environment Variables:** Kosongkan (tidak diperlukan).

### Langkah 3: Klik Deploy
1. Klik tombol **Deploy**.
2. Vercel akan secara otomatis menjalankan `npm install`, mengeksekusi `npm run build`, dan mendistribusikan folder `dist/` ke Global Edge Network.
3. Dalam hitungan detik, Anda akan mendapatkan URL produksi (misalnya `portfolio-vayyy.vercel.app`) dengan sertifikat SSL otomatis.

---

## 📌 Catatan Teknis & Manajemen Aset

1. **Integritas Aset Gambar:**
   - Semua gambar disimpan secara lokal di folder `assets/` (`avatar.png`, `CloudInfrastructureManagement.png`, dsb.) dan ikut ter-commit ke GitHub.
   - Penamaan file telah disesuaikan secara case-sensitive agar 100% kompatibel dengan server Linux Vercel.
2. **Fitur Upload & Penyimpanan Data:**
   - Saat ini website tidak menyediakan fitur upload file ke filesystem lokal server.
   - Jika di masa mendatang Anda ingin menambahkan fitur upload pengunjung/admin, gunakan layanan penyimpanan awan persisten seperti **Vercel Blob**, **Cloudinary**, atau **AWS S3**, karena environment serverless Vercel bersifat ephemeral (tidak menyimpan file statis yang di-upload saat runtime).

---

## 📄 Lisensi

Hak cipta dilindungi oleh **Vayyy**. 2026 &copy; All Rights Reserved.
