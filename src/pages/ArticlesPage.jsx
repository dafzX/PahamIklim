import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { articles } from '../data/content.js'

const categories = ['Semua', ...new Set(articles.map((article) => article.category))]

function ArticleArtwork({ article, index = 0, large = false }) {
  return <div className={`article-art article-art-${article.accent} ${large ? 'article-art-large' : ''}`}><span>{String(index + 1).padStart(2, '0')} / FIELD NOTES</span><div className="article-art-shape" /><div className="art-bottom-label">{article.category.toUpperCase()} · IKLIM</div></div>
}

export default function ArticlesPage() {
  const [category, setCategory] = useState('Semua')
  const [search, setSearch] = useState('')
  const visible = useMemo(() => articles.filter((article) => (category === 'Semua' || article.category === category) && `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(search.toLowerCase())), [category, search])

  return (
    <div className="inner-page">
      <section className="page-hero articles-hero">
        <span className="eyebrow">CATATAN DARI BUMI · {articles.length} CERITA PILIHAN</span>
        <h1>Rasa ingin tahu<br /><em>adalah awal perjalanan.</em></h1>
        <p>Gagasan tentang iklim, kehidupan sehari-hari, dan pilihan untuk masa depan yang lebih tangguh.</p>
      </section>
      <section className="article-catalog section-pad">
        <div className="article-filters">
          <div className="category-filters" role="group" aria-label="Filter kategori artikel">{categories.map((item) => <button key={item} className={category === item ? 'filter-chip selected' : 'filter-chip'} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <label className="article-search"><Search size={16} /><span className="sr-only">Cari artikel</span><input type="search" placeholder="Cari cerita..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        </div>
        {visible.length ? <div className="article-catalog-grid">{visible.map((article, index) => <Link className="article-preview" to={`/artikel/${article.id}`} key={article.id}><ArticleArtwork article={article} index={index} /><span className="article-category">{article.category} · {article.readTime}</span><h3>{article.title}</h3><p>{article.excerpt}</p><span className="article-read">Baca artikel <ArrowRight size={15} /></span></Link>)}</div> : <div className="empty-search"><span className="eyebrow">BELUM ADA HASIL</span><h2>Coba kata kunci lain.</h2><p>Kami belum menemukan artikel yang cocok dengan pencarianmu.</p><button onClick={() => { setSearch(''); setCategory('Semua') }} className="text-link">Hapus filter <ArrowRight size={16} /></button></div>}
      </section>
      <div className="article-catalog-source">Artikel dirangkum untuk edukasi umum. Sumber ilmiah lengkap tersedia pada tiap halaman artikel.</div>
    </div>
  )
}

export function ArticleDetailPage() {
  const { id } = useParams()
  const article = articles.find((item) => item.id === id)
  if (!article) return <div className="not-found"><span className="eyebrow">CERITA TIDAK DITEMUKAN</span><h1>Halaman ini belum tersedia.</h1><Link to="/artikel" className="text-link"><ArrowLeft size={16} /> Kembali ke artikel</Link></div>
  const related = articles.filter((item) => item.id !== article.id).slice(0, 2)

  return (
    <article className="article-detail inner-page">
      <div className="article-detail-nav"><Link to="/artikel" className="text-link"><ArrowLeft size={16} /> Semua artikel</Link><span>{article.category} · {article.readTime}</span></div>
      <header className="article-detail-header"><span className="eyebrow">CATATAN DARI BUMI</span><h1>{article.title}</h1><p>{article.excerpt}</p></header>
      <ArticleArtwork article={article} large />
      <div className="article-body">
        <p className="article-lead">{article.intro}</p>
        {article.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
        <section className="article-action"><span className="eyebrow">LANGKAH KECIL</span><h2>Bagikan rasa ingin tahu.</h2><p>Bicarakan satu gagasan dari bacaan ini dengan orang terdekat. Pemahaman tumbuh ketika kita belajar bersama.</p><Link to="/kuis" className="text-link">Uji pemahamanmu <ArrowRight size={16} /></Link></section>
        <section className="article-sources"><span className="eyebrow">SUMBER & REFERENSI</span>{article.sources.map((source) => <a href={source.split(': https://')[1] ? `https://${source.split(': https://')[1]}` : '#'} target="_blank" rel="noreferrer" key={source}>{source} ↗</a>)}</section>
      </div>
      <section className="related-articles"><div className="articles-heading"><div><span className="eyebrow">LANJUTKAN EKSPLORASI</span><h2>Cerita berikutnya.</h2></div></div><div className="article-preview-grid">{related.map((item, index) => <Link className="article-preview" to={`/artikel/${item.id}`} key={item.id}><ArticleArtwork article={item} index={index} /><span className="article-category">{item.category} · {item.readTime}</span><h3>{item.title}</h3><span className="article-read">Baca artikel <ArrowRight size={15} /></span></Link>)}</div></section>
    </article>
  )
}
