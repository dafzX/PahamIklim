import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, CloudSun, Droplets, Leaf, Wind, Zap } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EarthScene from '../three/EarthExperience.jsx'
import { articles } from '../data/content.js'

const causes = [
  { icon: <Zap />, number: '01', title: 'Energi yang kita gunakan', text: 'Listrik dan panas yang dihasilkan dari bahan bakar fosil menjadi sumber utama emisi gas rumah kaca.' },
  { icon: <Wind />, number: '02', title: 'Cara kita bergerak', text: 'Kendaraan berbahan bakar fosil melepaskan karbon dioksida setiap kali energi dibakar.' },
  { icon: <Leaf />, number: '03', title: 'Perubahan penggunaan lahan', text: 'Hilangnya hutan dan perubahan ekosistem melepaskan karbon dan mengurangi penyerapannya.' },
]
const impacts = [
  { icon: <CloudSun />, title: 'Panas ekstrem', text: 'Hari panas menjadi lebih sering dan intens di banyak wilayah.' },
  { icon: <Droplets />, title: 'Air dan pesisir', text: 'Perubahan pola hujan dan kenaikan muka laut meningkatkan risiko.' },
]

function PageIntro({ number, kicker, title, children }) {
  return <div className="section-intro reveal"><span className="section-number">{number}</span><div><span className="eyebrow">{kicker}</span><h2>{title}</h2>{children && <p>{children}</p>}</div></div>
}

export default function HomePage() {
  const rootRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [activeImpact, setActiveImpact] = useState(0)

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 28, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
      gsap.utils.toArray('.reveal-stagger').forEach((element) => {
        const children = [...element.children].filter((child) => !child.matches('.cta-orb, .cta-index'))
        if (!children.length) return
        gsap.fromTo(children, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div ref={rootRef}>
      <section className="hero">
        <div className="hero-grain" />
        <div className="hero-copy">
          <motion.span className="hero-kicker" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>SEBUAH PERJALANAN MEMAHAMI BUMI</motion.span>
          <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.8 }}>
            Masa depan Bumi<br />dimulai dari apa yang<br /><em>kita pahami hari ini.</em>
          </motion.h1>
          <motion.p className="hero-lede" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.7 }}>
            Kenali perubahan iklim, pahami dampaknya, dan temukan langkah nyata yang bisa kamu mulai dari kehidupan sehari-hari.
          </motion.p>
          <motion.div className="hero-actions" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            <Link to="/belajar" className="button button-lime">Jelajahi Bumi <ArrowRight size={16} /></Link>
            <Link to="/kalkulator" className="button button-outline">Hitung jejak karbon</Link>
          </motion.div>
          <motion.div className="hero-footnote" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72, duration: 0.6 }}><span className="pulse-dot" /> MENGENAL IKLIM, MEMULAI PERUBAHAN</motion.div>
        </div>
        <motion.div className="hero-globe-wrap" initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 1, ease: 'easeOut' }}>
          <div className="orbit-label orbit-top">OUR ONLY HOME <span>01 / 04</span></div>
          <EarthScene />
          <div className="globe-caption"><span>°</span><span>Jelajahi lokasi di Bumi<br />untuk melihat ceritanya</span><ArrowDown size={16} /></div>
        </motion.div>
        <div className="hero-side-note">PANDANGAN KITA TENTANG BUMI</div>
        <a href="#cerita" className="scroll-cue"><span>GULIR UNTUK MENJELAJAH</span><ArrowDown size={15} /></a>
      </section>

      <section className="stat-band" aria-label="Fakta iklim">
        <div className="stat-lead reveal"><span className="eyebrow">SINYAL DARI BUMI</span><p>Angka bukan keseluruhan cerita.<br />Tapi ia memberi kita arah.</p></div>
        <div className="stat-cell reveal"><strong>≈1,1<span>°C</span></strong><span>Pemanasan global pada 2011–2020<br />dibanding 1850–1900</span><a href="https://www.ipcc.ch/report/ar6/syr/" target="_blank" rel="noreferrer">IPCC AR6 ↗</a></div>
        <div className="stat-cell reveal"><strong>2023</strong><span>Tahun terpanas dalam catatan<br />observasi global saat laporan terbit</span><a href="https://wmo.int/publication-series/state-of-global-climate-2023" target="_blank" rel="noreferrer">WMO ↗</a></div>
        <div className="stat-aside reveal">DATA ILMIAH<br />KONTEKS NYATA</div>
      </section>

      <section id="cerita" className="intro-section section-pad">
        <div className="intro-art reveal"><div className="sun-disc" /><span className="art-caption">01 — SISTEM YANG SALING TERHUBUNG</span><div className="art-line" /><div className="art-coordinate">6°12′S<br />106°49′E</div></div>
        <div className="intro-copy reveal"><span className="eyebrow">LEBIH DARI SEKADAR CUACA</span><h2>Bumi sedang<br /><em>bercerita.</em></h2><p>Perubahan iklim adalah perubahan jangka panjang pada pola suhu dan cuaca. Bumi selalu memiliki variasi alami, tetapi pemanasan yang kita amati sekarang terutama didorong oleh aktivitas manusia.</p><p className="small-note">Memahami perbedaan antara cuaca hari ini dan iklim jangka panjang adalah awal dari percakapan yang lebih baik.</p><Link className="text-link" to="/belajar">Mulai dari dasar <ArrowRight size={16} /></Link></div>
      </section>

      <section className="causes-section section-pad">
        <PageIntro number="01" kicker="JEJAK AKTIVITAS MANUSIA" title={<>Dari kebiasaan sehari-hari<br />hingga perubahan global.</>}><span>Emisi berasal dari berbagai sistem yang membentuk kehidupan modern. Memahaminya membantu kita melihat titik perubahan.</span></PageIntro>
        <div className="cause-list reveal-stagger">
          {causes.map((cause) => <article className="cause-row" key={cause.number}><span className="cause-index">{cause.number}</span><span className="cause-icon">{cause.icon}</span><div><h3>{cause.title}</h3><p>{cause.text}</p></div><ArrowUpRight className="cause-arrow" size={18} /></article>)}
        </div>
        <div className="cause-bottom reveal"><span>SUMBER UTAMA: IPCC AR6 WGIII</span><a href="https://www.ipcc.ch/report/ar6/wg3/" target="_blank" rel="noreferrer">Baca ringkasan ilmiah ↗</a></div>
      </section>

      <section className="impact-section">
        <div className="impact-copy reveal">
          <span className="eyebrow">02 — DAMPAK YANG KITA RASAKAN</span>
          <h2>Perubahan yang<br />tidak berhenti di<br /><em>termometer.</em></h2>
          <p>Dampak iklim saling terhubung dengan alam, kesehatan, pangan, air, dan kehidupan manusia. Pengalaman tiap wilayah tidak sama.</p>
          <div className="impact-tabs">
            {impacts.map((impact, i) => <button key={impact.title} className={activeImpact === i ? 'impact-tab selected' : 'impact-tab'} onClick={() => setActiveImpact(i)}>{String(i + 1).padStart(2, '0')} <span>{impact.title}</span><ChevronDown size={14} /></button>)}
          </div>
          <p className="impact-detail">{impacts[activeImpact].text}</p>
          <a href="https://www.ipcc.ch/report/ar6/wg2/" target="_blank" rel="noreferrer" className="text-link text-light">Jelajahi dampak iklim <ArrowRight size={16} /></a>
        </div>
        <div className={`impact-visual impact-visual-${activeImpact} reveal`}><div className="heat-ring ring-one" /><div className="heat-ring ring-two" /><div className="impact-sun" /><div className="impact-land" /><div className="impact-figure">IKLIM BERUBAH<br /><span>RISIKO BERBEDA DI SETIAP TEMPAT</span></div></div>
      </section>

      <section className="explore-section section-pad">
        <div className="explore-heading reveal"><span className="eyebrow">03 — LIHAT LEBIH DEKAT</span><h2>Satu planet.<br /><em>Banyak cerita.</em></h2><p>Pilih titik pada globe untuk membuka cerita dari lokasi yang berbeda. Setiap titik mengajak kita melihat bagaimana risiko iklim terhubung dengan tempat dan kehidupan.</p><Link to="/belajar" className="text-link">Jelajahi semua materi <ArrowRight size={16} /></Link></div>
        <div className="explore-globe"><EarthScene /></div>
      </section>

      <section className="solutions-section section-pad">
        <div className="solution-heading reveal"><span className="eyebrow">04 — MASA DEPAN BISA DIARAHKAN</span><h2>Harapan bukan<br />sekadar perasaan.<br /><em>Ia adalah tindakan.</em></h2></div>
        <div className="solution-body reveal"><p>Solusi iklim sudah ada: energi bersih, efisiensi, perlindungan alam, transportasi yang lebih baik, dan kebijakan yang berpihak pada masa depan.</p><div className="solution-grid"><div><span>01</span><strong>Kurangi emisi</strong><p>Gunakan energi dan sumber daya dengan lebih bijak.</p></div><div><span>02</span><strong>Pulihkan alam</strong><p>Jaga ekosistem yang menopang kehidupan.</p></div><div><span>03</span><strong>Bergerak bersama</strong><p>Dukung solusi yang adil dan berdampak luas.</p></div></div><a href="https://www.ipcc.ch/report/ar6/wg3/" target="_blank" rel="noreferrer" className="text-link">Kenali opsi mitigasi <ArrowRight size={16} /></a></div>
        <div className="solution-art reveal"><div className="windmill"><i /><i /><i /><b /></div><div className="green-hill hill-a" /><div className="green-hill hill-b" /><span>MEMBANGUN MASA DEPAN YANG LEBIH TANGGUH</span></div>
      </section>

      <section className="tools-section section-pad">
        <div className="tools-intro reveal"><span className="eyebrow">MULAI DARI DIRIMU</span><h2>Pengetahuan jadi<br /><em>lebih kuat saat dipakai.</em></h2></div>
        <div className="tool-cards reveal-stagger">
          <Link to="/kalkulator" className="tool-card tool-carbon"><span className="tool-number">ALAT 01</span><span className="tool-icon"><Wind /></span><h3>Jejak karbonmu,<br />dalam perspektif.</h3><p>Perkirakan emisi dari perjalanan, listrik, dan penggunaan AC. Hasilnya adalah skenario edukatif, bukan pengukuran presisi.</p><span className="tool-link">Coba kalkulator <ArrowRight size={16} /></span></Link>
          <Link to="/kuis" className="tool-card tool-quiz"><span className="tool-number">ALAT 02</span><span className="tool-icon"><Leaf /></span><h3>Seberapa jauh<br />kamu mengenal iklim?</h3><p>Uji pemahaman, temukan hal baru, dan lihat progres belajarmu dalam kuis singkat.</p><span className="tool-link">Mulai kuis <ArrowRight size={16} /></span><span className="quiz-decoration">?</span></Link>
        </div>
      </section>

      <section className="articles-section section-pad">
        <div className="articles-heading reveal"><div><span className="eyebrow">CATATAN DARI BUMI</span><h2>Terus ingin tahu.</h2></div><Link to="/artikel" className="text-link">Semua artikel <ArrowRight size={16} /></Link></div>
        <div className="article-preview-grid reveal-stagger">{articles.slice(0, 3).map((article, i) => <Link className="article-preview" to={`/artikel/${article.id}`} key={article.id}><div className={`article-art article-art-${article.accent}`}><span>0{i + 1} / FIELD NOTES</span><div className="article-art-shape" /></div><span className="article-category">{article.category} · {article.readTime}</span><h3>{article.title}</h3><span className="article-read">Baca artikel <ArrowRight size={15} /></span></Link>)}</div>
      </section>

      <section className="final-cta reveal-stagger"><div className="cta-orb" /><span className="eyebrow">BUMI TIDAK MENUNGGU KITA SEMPURNA</span><h2>Tapi ia membutuhkan<br /><em>kita untuk mulai.</em></h2><p>Satu pertanyaan. Satu pemahaman. Satu langkah kecil yang dilakukan bersama.</p><Link to="/belajar" className="button button-lime">Mulai menjelajah <ArrowRight size={16} /></Link><span className="cta-index">PAHAMIKLIM / 2026</span></section>
    </div>
  )
}
