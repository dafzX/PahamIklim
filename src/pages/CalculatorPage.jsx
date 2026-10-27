import { useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw, Wind } from 'lucide-react'
import { Link } from 'react-router-dom'
import { emissionFactors } from '../data/content.js'
import { calculateEmissions } from '../lib/calculator.js'

function EmissionBreakdown({ result }) {
  const colors = ['#C5F36A', '#4D9A67', '#6DB9AD']
  return (
    <div className="result-breakdown">
      <div className="breakdown-chart" aria-label="Diagram proporsi emisi">
        {result.breakdown.map((item, index) => <div key={item.label} className="breakdown-row"><div className="breakdown-label"><span style={{ backgroundColor: colors[index] }} />{item.label}<strong>{item.value.toFixed(2)} kg</strong></div><div className="breakdown-track"><div style={{ width: `${result.daily ? Math.max(item.value / result.daily * 100, item.value ? 2 : 0) : 0}%`, backgroundColor: colors[index] }} /></div></div>)}
      </div>
      <div className="recommendation"><span className="eyebrow">SATU LANGKAH YANG BISA DICOBA</span><p>Bandingkan hasil ini setelah mencoba mengurangi satu aktivitas. Misalnya, pilih perjalanan yang lebih efisien atau atur suhu AC dengan bijak.</p></div>
    </div>
  )
}

export default function CalculatorPage() {
  const [values, setValues] = useState({ distance: '', electricity: '', acHours: '' })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }))
  const calculate = (event) => {
    event.preventDefault()
    const next = calculateEmissions(values)
    if (next.error) {
      setError(next.error)
      setResult(null)
    } else {
      setError('')
      setResult(next)
    }
  }
  const reset = () => {
    setValues({ distance: '', electricity: '', acHours: '' })
    setError('')
    setResult(null)
  }

  return (
    <div className="inner-page">
      <section className="page-hero calculator-hero">
        <span className="eyebrow">ALAT EDUKASI · ESTIMASI SKENARIO</span>
        <h1>Kenali jejak.<br /><em>Temukan ruang untuk berubah.</em></h1>
        <p>Perkiraan sederhana dari beberapa aktivitas harian. Angka memberi perspektif, bukan penilaian.</p>
      </section>
      <section className="calculator-layout">
        <form className="calculator-form" onSubmit={calculate} noValidate>
          <div className="form-heading"><span className="eyebrow">CERITAKAN KEBIASAANMU</span><h2>Aktivitas dalam<br />satu hari.</h2></div>
          <label className="input-field"><span>Jarak sepeda motor <small>km / hari</small></span><input type="number" min="0" step="any" inputMode="decimal" value={values.distance} onChange={update('distance')} placeholder="mis. 12" aria-describedby="distance-help" /><small id="distance-help">Total jarak tempuh rata-rata harian.</small></label>
          <label className="input-field"><span>Penggunaan listrik <small>kWh / hari</small></span><input type="number" min="0" step="any" inputMode="decimal" value={values.electricity} onChange={update('electricity')} placeholder="mis. 4" /><small>Perkiraan penggunaan listrik rumah tangga sehari.</small></label>
          <label className="input-field"><span>Penggunaan AC <small>jam / hari</small></span><input type="number" min="0" step="any" inputMode="decimal" value={values.acHours} onChange={update('acHours')} placeholder="mis. 6" /><small>Durasi pemakaian AC dalam satu hari.</small></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="button button-dark submit-button">Hitung jejak karbon <ArrowRight size={16} /></button>
          <p className="form-privacy">Tidak ada data yang disimpan atau dikirim.</p>
        </form>
        <div className="calculator-result">
          {!result ? <div className="result-empty"><div className="result-icon"><Wind /></div><span className="eyebrow">RUANG UNTUK MEMAHAMI</span><h2>Hasilmu akan<br />muncul di sini.</h2><p>Isi tiga aktivitas di samping untuk melihat gambaran emisi harian dan tahunan.</p><div className="result-decor">CO₂e</div></div> : <div className="result-filled" aria-live="polite"><span className="eyebrow">HASIL ESTIMASI SKENARIO</span><h2>{result.daily.toFixed(2)} <small>kg CO₂e / hari</small></h2><div className="annual-total">≈ {result.annual.toFixed(0)} kg CO₂e / tahun <span>jika aktivitas serupa berlangsung 365 hari</span></div><EmissionBreakdown result={result} /><button className="button button-outline-dark" onClick={reset}><RotateCcw size={15} /> Hitung ulang</button></div>}
        </div>
      </section>
      <section className="methodology section-pad">
        <span className="eyebrow">CARA MEMBACA HASIL</span><h2>Angka ini punya<br /><em>asumsi di belakangnya.</em></h2>
        <div className="methodology-content"><p>Perhitungan menggunakan asumsi faktor emisi ilustratif. Konsumsi motor diasumsikan 40 km/liter dan faktor pembakaran bensin 2,31 kg CO₂/liter. Daya AC diasumsikan 0,9 kW. Faktor listrik 0,85 kg CO₂e/kWh adalah skenario ilustratif, bukan faktor resmi wilayah tertentu.</p><p>Emisi listrik rumah dan AC ditampilkan terpisah sesuai input, sehingga bila angka kWh harian sudah mencakup AC, hasil dapat menghitung konsumsi AC dua kali. Untuk presisi, gunakan data konsumsi dan faktor jaringan lokal yang terverifikasi.</p></div>
        <div className="methodology-sources"><span>SUMBER METODOLOGI</span>{emissionFactors.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} ↗</a>)}</div>
        <p className="methodology-footnote">Kalkulator ini untuk edukasi, bukan inventarisasi emisi, nasihat kebijakan, atau pengukuran emisi aktual.</p>
        <Link to="/belajar" className="text-link">Kembali belajar tentang iklim <ArrowLeft size={16} /></Link>
      </section>
    </div>
  )
}
