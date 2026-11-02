# PahamIklim

Website edukasi iklim berbahasa Indonesia, dibangun dengan React, Vite, Tailwind CSS, React Router, React Three Fiber, Lenis, GSAP, dan Motion for React.

## Menjalankan secara lokal

Gunakan Node.js 18 atau lebih baru.

```sh
npm install
npm run dev
```

Build produksi dan pratinjau:

```sh
npm run build
npm run preview
```

Jalankan pengujian:

```sh
npm test
```

## Isi aplikasi

- Beranda storytelling, globe Bumi 3D interaktif bertekstur, hotspot, dan bagian edukasi.
- Halaman belajar perubahan iklim dengan sumber IPCC, BMKG, dan NASA; diorama 3D edukatif pabrik, kota, energi terbarukan, dan alam.
- Kalkulator skenario jejak karbon untuk sepeda motor, listrik, dan AC.
- Kuis pilihan ganda dengan navigasi soal, pembahasan, dan penyimpanan skor terbaik lokal.
- Katalog artikel lokal, pencarian, filter kategori, detail, sumber, dan artikel terkait.
- Desain responsif, navigasi keyboard, serta pengurangan animasi saat `prefers-reduced-motion` aktif.

## Aset dan sumber

Globe menggunakan geometri sphere Three.js dengan peta siang Bumi dan peta awan lokal di `public/textures/`, color management sRGB/ACES, pencahayaan directional/hemisphere, serta lapisan atmosfer transparan. Tekstur bersumber dari [Solar System Scope](https://www.solarsystemscope.com/textures/) (tautan unduhan: [day map](https://play.solarsystemscope.com/textures/download/2k_earth_daymap.jpg) dan [cloud map](https://play.solarsystemscope.com/textures/download/2k_earth_clouds.jpg)); dokumentasi sumber menyebutkan penggunaan data NASA Blue Marble. Dokumentasi yang tersedia tidak menyatakan lisensi terpisah untuk file teksturnya, jadi pertahankan atribusi ini dan pastikan ketentuan penggunaan saat mendistribusikan ulang. Hotspot serta keterangannya didefinisikan di `src/data/content.js`. `src/three/EnvironmentScene.jsx` merangkai diorama geometri bergaya editorial untuk pabrik, kota, turbin/panel surya, dan ekosistem dengan pencahayaan bersama, bayangan directional/contact, dan animasi rotor yang delta-time.

Tidak ada model `.glb` eksternal. Adegan storytelling pada beranda juga menggunakan ilustrasi CSS.

Sumber bacaan dan referensi ilmiah tertaut pada halaman dan data konten, termasuk IPCC, BMKG, NASA, dan IPCC Guidelines for National Greenhouse Gas Inventories.

## Batasan yang diketahui

- Konten bersifat pengantar dan bukan pengganti laporan ilmiah lengkap.
- Globe memakai tekstur geografis referensi, tetapi tidak menyajikan data iklim terkini.
- Kalkulator menggunakan skenario ilustratif yang dijelaskan di antarmuka; faktor listrik bukan faktor resmi wilayah tertentu. Hasil tidak mewakili pengukuran emisi aktual. Jika input listrik harian telah mencakup AC, kontribusi AC dapat terhitung dua kali.
- Tanpa WebGL, globe digantikan ilustrasi CSS. Interaksi hotspot 3D tidak tersedia pada fallback.
- Diorama prosedural adalah ilustrasi konseptual, bukan model teknik atau representasi aset dunia nyata.
- Ukuran bundle dan performa perangkat perlu diukur pada lingkungan deployment sasaran; hasil build saja tidak menjamin batas transfer 2 MB atau waktu muat tertentu.
- Pengukuran build lokal terakhir: seluruh `dist/assets` berjumlah sekitar 1,39 MB mentah; chunk 3D terbesar sekitar 840 KB mentah (225 KB gzip). Ini menghitung semua halaman sekaligus, bukan transfer aktual per rute/CDN.
