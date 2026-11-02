import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Globe2, Leaf, Wind } from 'lucide-react'
import EarthScene from '../three/EarthExperience.jsx'
import EnvironmentExperience from '../three/EnvironmentExperience.jsx'
import { useScrollAnimations } from '../lib/useScrollAnimations.js'

const topics = [
  { id: '01', title: 'Apa itu perubahan iklim?', text: 'Perubahan jangka panjang pada suhu dan pola cuaca. Variasi alami selalu ada, tetapi pemanasan sejak abad ke-20 terutama disebabkan aktivitas manusia.', icon: <Globe2 /> },
  { id: '02', title: 'Mengapa Bumi menghangat?', text: 'Pembakaran batu bara, minyak, dan gas meningkatkan gas rumah kaca. Gas ini memerangkap sebagian panas yang dipancarkan Bumi.', icon: <Flame /> },
  { id: '03', title: 'Dampak saling terhubung', text: 'Perubahan suhu memengaruhi siklus air, ekosistem, kesehatan, pangan, dan infrastruktur. Dampaknya berbeda menurut lokasi dan kerentanan.', icon: <Wind /> },
  { id: '04', title: 'Ada ruang untuk bertindak', text: 'Pengurangan emisi, adaptasi, perlindungan ekosistem, dan keputusan kolektif dapat mengubah risiko masa depan.', icon: <Leaf /> },
]
const environments = [
  { id: 'factory', label: 'Industri', title: 'Energi yang menggerakkan industri', text: 'Pabrik, bahan bakar, dan proses produksi menggambarkan beberapa sumber emisi yang terkait dengan sistem energi.' },
  { id: 'city', label: 'Kota', title: 'Pilihan transportasi membentuk kota', text: 'Bangunan, ruang hijau, dan transportasi saling membentuk pengalaman sehari-hari serta kebutuhan energi.' },
  { id: 'energy', label: 'Energi bersih', title: 'Infrastruktur untuk masa depan', text: 'Turbin dan panel surya di sini merupakan model geometris sederhana, bukan simulasi sistem energi.' },
  { id: 'nature', label: 'Alam', title: 'Ekosistem yang saling terhubung', text: 'Hutan dan aliran air divisualisasikan secara simbolis; kondisi nyata berbeda di setiap wilayah.' },
]

export default function EducationPage() {
  const rootRef = useRef(null)
  const [activeScene, setActiveScene] = useState('factory')
  const scene = environments.find((item) => item.id === activeScene)
  useScrollAnimations(rootRef)
  return (
    <div ref={rootRef} className="inner-page">
      <section className="page-hero education-hero">
        <span className="eyebrow">PANDUAN SINGKAT · 4 BAB</span>
        <h1>Memahami iklim<br /><em>adalah memahami rumah kita.</em></h1>
        <p>Mulai dari dasar, ikuti hubungan sebab-akibat, lalu lihat pilihan yang tersedia untuk masa depan.</p>
      </section>
      <section className="education-globe-band">
        <div><span className="eyebrow">BUMI SEBAGAI SISTEM</span><h2>Tak ada perubahan<br />yang berdiri sendiri.</h2><p>Pilih marker atau nama lokasi untuk mengarahkan globe ke wilayah tersebut dan membaca ringkasan beserta sumber ilmiahnya.</p></div>
        <EarthScene showHotspotList />
      </section>
      <section className="environment-section section-pad">
        <div className="environment-copy">
          <span className="eyebrow">VISUAL LAB · DIORAMA EDUKATIF 3D</span>
          <h2>Kenali sistem<br /><em>di balik perubahan.</em></h2>
          <p>Pilih diorama 3D yang merangkum sistem industri, kota, energi bersih, dan alam. Seret untuk memutar kamera; setiap visual adalah ilustrasi edukasi, bukan representasi data langsung.</p>
          <div className="environment-tabs" role="group" aria-label="Pilih adegan 3D">
            {environments.map((item) => <button type="button" aria-pressed={activeScene === item.id} className={activeScene === item.id ? 'selected' : ''} key={item.id} onClick={() => setActiveScene(item.id)}>{item.label}</button>)}
          </div>
          <span className="environment-index">{String(environments.findIndex((item) => item.id === activeScene) + 1).padStart(2, '0')} / 04</span>
        </div>
        <div className="environment-visual">
          <EnvironmentExperience type={activeScene} />
          <div className="environment-caption"><span className="eyebrow">{scene.label.toUpperCase()}</span><h3>{scene.title}</h3><p>{scene.text}</p></div>
          <span className="environment-controls">SERET UNTUK MEMUTAR · GULIR UNTUK ZOOM</span>
        </div>
      </section>
      <section className="education-topics section-pad">
        <div className="section-intro"><span className="section-number">A—D</span><div><span className="eyebrow">EMPAT GAGASAN UTAMA</span><h2>Tarik benang merahnya.</h2></div></div>
        <div className="education-topic-list">{topics.map((topic) => <article className="education-topic" id={`topic-${topic.id}`} key={topic.id}><span>{topic.id}</span><div className="topic-icon">{topic.icon}</div><div><h3>{topic.title}</h3><p>{topic.text}</p></div></article>)}</div>
      </section>
      <section className="learning-note"><span className="eyebrow">SUMBER UTAMA</span><h2>Belajar dari bukti,<br /><em>bukan dari ketakutan.</em></h2><p>Materi halaman ini diringkas dari laporan ilmiah dan lembaga iklim. Untuk pemahaman lebih dalam, mulailah dari ringkasan IPCC dan informasi BMKG.</p><div className="source-links"><a href="https://www.ipcc.ch/report/ar6/syr/" target="_blank" rel="noreferrer">IPCC AR6 Synthesis Report ↗</a><a href="https://www.bmkg.go.id/iklim/" target="_blank" rel="noreferrer">BMKG — Informasi Iklim ↗</a><a href="https://climate.nasa.gov/" target="_blank" rel="noreferrer">NASA Climate Change ↗</a></div><Link to="/artikel" className="button button-dark">Lanjut membaca <ArrowRight size={16} /></Link></section>
    </div>
  )
}
