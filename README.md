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

- Beranda storytelling, globe Bumi 3D procedural interaktif, hotspot, dan bagian edukasi.
- Halaman belajar perubahan iklim dengan sumber IPCC, BMKG, dan NASA; pilihan adegan procedural 3D pabrik, kota, energi terbarukan, dan alam.
- Kalkulator skenario jejak karbon untuk sepeda motor, listrik, dan AC.
- Kuis pilihan ganda dengan navigasi soal, pembahasan, dan penyimpanan skor terbaik lokal.
- Katalog artikel lokal, pencarian, filter kategori, detail, sumber, dan artikel terkait.
- Desain responsif, navigasi keyboard, serta pengurangan animasi saat `prefers-reduced-motion` aktif.

## Aset dan sumber

Globe dibuat secara procedural di `src/three/EarthScene.jsx` menggunakan sphere Three.js dan tekstur kanvas yang digambar saat runtime. Bentuk benua merupakan ilustrasi skematis, bukan peta presisi. Atmosfer dibuat dari lapisan sphere dan pencahayaan procedural. Hotspot serta keterangannya didefinisikan di `src/data/content.js`. `src/three/EnvironmentScene.jsx` merangkai geometri sederhana untuk pabrik, kota, turbin/panel surya, dan ekosistem; asap serta baling-baling menggunakan animasi prosedural.

Tidak ada model `.glb` atau tekstur eksternal yang diunduh/disertakan. Adegan storytelling pada beranda juga menggunakan ilustrasi CSS. Tidak ada atribusi lisensi eksternal untuk aset visual.

Sumber bacaan dan referensi ilmiah tertaut pada halaman dan data konten, termasuk IPCC, BMKG, NASA, dan IPCC Guidelines for National Greenhouse Gas Inventories.

## Batasan yang diketahui

- Konten bersifat pengantar dan bukan pengganti laporan ilmiah lengkap.
- Globe skematis dan tidak menyajikan data geografis atau iklim terkini.
- Kalkulator menggunakan skenario ilustratif yang dijelaskan di antarmuka; faktor listrik bukan faktor resmi wilayah tertentu. Hasil tidak mewakili pengukuran emisi aktual. Jika input listrik harian telah mencakup AC, kontribusi AC dapat terhitung dua kali.
- Tanpa WebGL, globe digantikan ilustrasi CSS. Interaksi hotspot 3D tidak tersedia pada fallback.
- Adegan prosedural adalah ilustrasi konseptual, bukan model teknik atau representasi aset dunia nyata.
- Ukuran bundle dan performa perangkat perlu diukur pada lingkungan deployment sasaran; hasil build saja tidak menjamin batas transfer 2 MB atau waktu muat tertentu.
- Pengukuran build lokal terakhir: seluruh `dist/assets` berjumlah sekitar 1,39 MB mentah; chunk 3D terbesar sekitar 840 KB mentah (225 KB gzip). Ini menghitung semua halaman sekaligus, bukan transfer aktual per rute/CDN.
