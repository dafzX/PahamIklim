export const hotspots = [
  {
    id: 'jakarta',
    name: 'Jakarta, Indonesia',
    lat: -6.2,
    lon: 106.8,
    category: 'Pesisir dan perkotaan',
    title: 'Kota pesisir yang terus tumbuh',
    text: 'Kota pesisir menghadapi risiko gabungan dari kenaikan muka laut, panas perkotaan, dan cuaca ekstrem. Dampak dan risikonya berbeda di setiap wilayah.',
    source: 'IPCC AR6 WGII, Asia: https://www.ipcc.ch/report/ar6/wg2/',
    sourceUrl: 'https://www.ipcc.ch/report/ar6/wg2/',
  },
  {
    id: 'amazon',
    name: 'Amazonia, Amerika Selatan',
    lat: -3.4,
    lon: -60,
    category: 'Hutan tropis',
    title: 'Hutan yang menyimpan karbon',
    text: 'Perubahan penggunaan lahan dan pemanasan memberi tekanan pada ekosistem hutan tropis yang kaya keanekaragaman hayati.',
    source: 'IPCC AR6 WGII, Central and South America: https://www.ipcc.ch/report/ar6/wg2/',
    sourceUrl: 'https://www.ipcc.ch/report/ar6/wg2/',
  },
  {
    id: 'antarctica',
    name: 'Antarktika',
    lat: -75,
    lon: 0,
    category: 'Lembaran es',
    title: 'Es dan kenaikan muka laut',
    text: 'Lembaran es Antarktika kehilangan massa dan berkontribusi pada kenaikan muka laut global. Perubahan di sini berdampak jauh melampaui kutub.',
    source: 'NASA Climate Change: https://climate.nasa.gov/vital-signs/ice-sheets/',
    sourceUrl: 'https://climate.nasa.gov/vital-signs/ice-sheets/',
  },
  {
    id: 'arctic',
    name: 'Arktik',
    lat: 72,
    lon: 35,
    category: 'Es laut dan ekosistem',
    title: 'Kutub yang menghangat cepat',
    text: 'Arktik menghangat lebih cepat daripada rata-rata global, mengubah es laut, ekosistem, dan kehidupan masyarakat setempat.',
    source: 'IPCC AR6 WG1: https://www.ipcc.ch/report/ar6/wg1/',
    sourceUrl: 'https://www.ipcc.ch/report/ar6/wg1/',
  },
]

export const articles = [
  {
    id: 'memahami-perubahan-iklim',
    category: 'Dasar iklim',
    title: 'Cuaca berubah setiap hari. Lalu, apa itu perubahan iklim?',
    excerpt: 'Membedakan cuaca dan iklim membantu kita membaca perubahan jangka panjang dengan lebih jernih.',
    readTime: '5 menit',
    accent: 'sun',
    intro: 'Cuaca adalah kondisi atmosfer dalam waktu singkat. Iklim adalah pola cuaca rata-rata dalam jangka panjang, biasanya dihitung selama beberapa dekade.',
    sections: [
      ['Bukan sekadar hari yang panas', 'Satu hari yang panas atau satu badai tidak dengan sendirinya membuktikan perubahan iklim. Para ilmuwan melihat pola jangka panjang: suhu, hujan, es, laut, dan kejadian ekstrem.'],
      ['Apa yang berubah?', 'Aktivitas manusia, terutama pembakaran batu bara, minyak, dan gas, meningkatkan konsentrasi gas rumah kaca. Gas-gas ini menahan lebih banyak panas di sistem Bumi.'],
      ['Apa yang bisa kita lakukan?', 'Memahami bukti adalah langkah pertama. Pilihan energi, transportasi, pola konsumsi, dan dukungan terhadap kebijakan iklim berkontribusi pada perubahan yang lebih luas.'],
    ],
    sources: ['IPCC AR6 Synthesis Report: https://www.ipcc.ch/report/ar6/syr/'],
  },
  {
    id: 'kota-lebih-sejuk',
    category: 'Kehidupan sehari-hari',
    title: 'Mengapa kota terasa lebih panas?',
    excerpt: 'Aspal, bangunan, dan ruang hijau membentuk pengalaman panas yang tidak sama di setiap sudut kota.',
    readTime: '4 menit',
    accent: 'city',
    intro: 'Pulau panas perkotaan membuat beberapa bagian kota lebih hangat daripada area sekitarnya, terutama ketika vegetasi dan permukaan berpori berkurang.',
    sections: [
      ['Material menyimpan panas', 'Permukaan gelap dan padat seperti aspal menyerap serta menyimpan panas. Bangunan juga mengubah aliran udara dan pelepasan panas pada malam hari.'],
      ['Panas bukan dirasakan semua orang secara sama', 'Akses terhadap pepohonan, ruang teduh, pendingin, dan hunian yang layak memengaruhi risiko kesehatan saat gelombang panas.'],
      ['Ruang kota yang lebih tangguh', 'Kanopi pohon, jalur teduh, atap yang lebih reflektif, dan ruang publik hijau dapat membantu mengurangi paparan panas lokal.'],
    ],
    sources: ['NASA Earth Observatory: https://earthobservatory.nasa.gov/'],
  },
  {
    id: 'energi-bersih',
    category: 'Solusi',
    title: 'Energi bersih: lebih dari sekadar panel surya',
    excerpt: 'Peralihan energi memerlukan teknologi, jaringan listrik, kebijakan, dan akses yang adil.',
    readTime: '6 menit',
    accent: 'energy',
    intro: 'Energi terbarukan merupakan bagian penting dari transisi menuju sistem rendah emisi, bersama efisiensi, elektrifikasi, dan perubahan infrastruktur.',
    sections: [
      ['Sumber energi yang beragam', 'Surya dan angin dapat melengkapi sumber lain. Kebutuhan penyimpanan, jaringan, dan pengelolaan permintaan ikut menentukan keandalan sistem.'],
      ['Efisiensi adalah sumber daya', 'Mengurangi energi yang terbuang dapat menekan kebutuhan pembangkitan, sekaligus membantu rumah tangga dan bisnis mengelola biaya.'],
      ['Transisi yang inklusif', 'Perencanaan transisi perlu mempertimbangkan pekerja, komunitas, keterjangkauan energi, dan dampak lingkungan sepanjang rantai pasok.'],
    ],
    sources: ['IPCC AR6 WGIII: https://www.ipcc.ch/report/ar6/wg3/'],
  },
]

export const quizQuestions = [
  {
    question: 'Apa perbedaan utama antara cuaca dan iklim?',
    options: ['Cuaca berlangsung singkat; iklim adalah pola jangka panjang', 'Cuaca hanya terjadi di kota', 'Iklim berubah setiap jam', 'Keduanya berarti hal yang sama'],
    answer: 0,
    explanation: 'Cuaca menggambarkan kondisi atmosfer saat ini atau dalam waktu dekat. Iklim merangkum pola jangka panjang.',
  },
  {
    question: 'Gas rumah kaca tambahan dari aktivitas manusia terutama meningkatkan...',
    options: ['Jumlah sinar Matahari yang mencapai Bumi', 'Panas yang tertahan dalam sistem Bumi', 'Kecepatan rotasi Bumi', 'Kadar oksigen di laut'],
    answer: 1,
    explanation: 'Gas rumah kaca menyerap dan memancarkan kembali radiasi inframerah, sehingga lebih banyak energi tertahan di sistem iklim.',
  },
  {
    question: 'Mengapa satu badai tidak cukup untuk menyimpulkan perubahan iklim?',
    options: ['Badai tidak dipengaruhi atmosfer', 'Iklim hanya berhubungan dengan suhu', 'Perubahan iklim dinilai melalui pola jangka panjang dan peluang kejadian', 'Badai tidak dapat diukur'],
    answer: 2,
    explanation: 'Perubahan iklim mengubah pola dan kemungkinan kejadian. Atribusi peristiwa tertentu membutuhkan analisis ilmiah.',
  },
  {
    question: 'Apa contoh tindakan yang membantu mengurangi emisi dari energi?',
    options: ['Membiarkan perangkat menyala tanpa digunakan', 'Meningkatkan efisiensi dan beralih ke energi rendah emisi', 'Menggunakan bahan bakar lebih banyak', 'Menghilangkan semua ruang hijau'],
    answer: 1,
    explanation: 'Efisiensi energi dan sumber energi rendah emisi merupakan bagian dari berbagai jalur mitigasi.',
  },
  {
    question: 'Apa yang dapat membantu mengurangi panas di lingkungan perkotaan?',
    options: ['Menambah permukaan gelap tanpa naungan', 'Mengurangi pepohonan', 'Menambah ruang teduh dan vegetasi yang sesuai', 'Menutup semua ruang publik'],
    answer: 2,
    explanation: 'Vegetasi dan desain kota yang menyediakan naungan dapat membantu mengurangi paparan panas lokal.',
  },
]

export const emissionFactors = {
  motorcycleKgPerKm: 0.058,
  electricityKgPerKwh: 0.85,
  acKw: 0.9,
  methodology: 'Perkiraan skenario: sepeda motor 40 km/L × 2,31 kg CO₂/L; AC 0,9 kW sebagai asumsi daya; listrik 0,85 kg CO₂e/kWh sebagai faktor jaringan ilustratif. Hasil bukan pengukuran dan bukan faktor resmi khusus lokasi.',
  sources: [
    { label: 'US EPA — Greenhouse Gas Emissions from a Typical Passenger Vehicle', url: 'https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle' },
    { label: 'IPCC — 2006 Guidelines for National Greenhouse Gas Inventories', url: 'https://www.ipcc-nggip.iges.or.jp/public/2006gl/' },
  ],
}
