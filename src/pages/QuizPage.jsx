import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from 'lucide-react'
import { quizQuestions } from '../data/content.js'
import { useScrollAnimations } from '../lib/useScrollAnimations.js'

const PROGRESS_KEY = 'pahamiklim-quiz-best'

function readBestScore() {
  if (typeof window === 'undefined' || !window.localStorage) return 0
  const storedValue = Number.parseInt(window.localStorage.getItem(PROGRESS_KEY) || '0', 10)
  return Number.isFinite(storedValue) && storedValue >= 0 ? storedValue : 0
}

export default function QuizPage() {
  const rootRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [best, setBest] = useState(readBestScore)
  const completed = Object.keys(answers).length === quizQuestions.length
  const finished = started && completed
  const score = quizQuestions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0)
  useScrollAnimations(rootRef)

  useEffect(() => {
    if (!finished || score <= best) return
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(PROGRESS_KEY, String(score))
    }
    setBest(score)
  }, [finished, score, best])

  const startOver = () => {
    setAnswers({})
    setCurrent(0)
    setStarted(true)
  }

  return (
    <div ref={rootRef} className="inner-page">
      <section className="page-hero quiz-hero">
        <span className="eyebrow">KUIS · {quizQuestions.length} PERTANYAAN</span>
        <h1>Belajar lebih dalam,<br /><em>satu pertanyaan setiap kali.</em></h1>
        <p>Tak perlu takut salah. Setiap jawaban disertai penjelasan untuk membantumu memahami konteks.</p>
      </section>
      <section className="quiz-wrap">
        {!started ? <div className="quiz-welcome"><span className="quiz-count">0{quizQuestions.length}</span><span className="eyebrow">PERJALANAN BELAJAR</span><h2>Yang penting bukan<br />berapa banyak yang tahu.<br /><em>Tapi terus ingin tahu.</em></h2><p>Lima pertanyaan singkat tentang dasar iklim, penyebab, dampak, dan solusi. Jawabanmu tersimpan hanya di perangkat ini sebagai progres terbaik.</p>{best > 0 && <span className="best-score">SKOR TERBAIKMU: {best}/{quizQuestions.length}</span>}<button className="button button-lime" onClick={() => setStarted(true)}>Mulai kuis <ArrowRight size={16} /></button></div> : finished ? <div className="quiz-result"><span className="eyebrow">PERJALANAN SELESAI</span><div className="score-circle"><strong>{score}</strong><span>/{quizQuestions.length}</span></div><h2>{score === quizQuestions.length ? 'Pemahaman yang luar biasa.' : score >= 3 ? 'Kamu sudah berada di jalur yang baik.' : 'Setiap pertanyaan membuka hal baru.'}</h2><p>{score === quizQuestions.length ? 'Kamu berhasil menjawab semuanya dengan tepat.' : `Kamu menjawab ${score} dari ${quizQuestions.length} pertanyaan dengan tepat. Baca penjelasan di tiap soal dan coba lagi kapan saja.`}</p><button className="button button-dark" onClick={startOver}><RotateCcw size={15} /> Ulangi kuis</button></div> : <div className="quiz-question">
          <div className="quiz-progress-top"><span>PERTANYAAN {String(current + 1).padStart(2, '0')} / {String(quizQuestions.length).padStart(2, '0')}</span><span>{Object.keys(answers).length} dijawab</span></div>
          <div className="quiz-progress"><span style={{ width: `${Object.keys(answers).length / quizQuestions.length * 100}%` }} /></div>
          <div className="question-nav" aria-label="Navigasi nomor soal">{quizQuestions.map((_, index) => <button key={index} className={`${current === index ? 'current' : ''} ${answers[index] !== undefined ? 'answered' : ''}`} onClick={() => setCurrent(index)} aria-label={`Soal ${index + 1}${answers[index] !== undefined ? ', sudah dijawab' : ''}`}>{index + 1}</button>)}</div>
          <span className="eyebrow">PILIH SATU JAWABAN</span>
          <h2>{quizQuestions[current].question}</h2>
          <div className="answer-options">{quizQuestions[current].options.map((option, index) => {
            const answered = answers[current] !== undefined
            const correct = quizQuestions[current].answer === index
            const selected = answers[current] === index
            return <button key={option} disabled={answered} onClick={() => setAnswers((previous) => ({ ...previous, [current]: index }))} className={`answer-option ${answered && correct ? 'answer-correct' : ''} ${answered && selected && !correct ? 'answer-wrong' : ''}`}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{answered && correct && <Check size={18} />}{answered && selected && !correct && <X size={18} />}</button>
          })}</div>
          {answers[current] !== undefined && <div className={`answer-explanation ${answers[current] === quizQuestions[current].answer ? 'is-correct' : 'is-wrong'}`} role="status"><strong>{answers[current] === quizQuestions[current].answer ? 'Tepat!' : 'Belum tepat, dan tidak apa-apa.'}</strong><p>{quizQuestions[current].explanation}</p></div>}
          <div className="quiz-controls"><button className="text-link" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}><ArrowLeft size={16} /> Sebelumnya</button>{current < quizQuestions.length - 1 ? <button className="button button-dark" onClick={() => setCurrent(current + 1)}>Berikutnya <ArrowRight size={16} /></button> : <button className="button button-dark" disabled={!completed} onClick={() => setCurrent(quizQuestions.length - 1)}>Lihat hasil <ArrowRight size={16} /></button>}</div>
          {!completed && current === quizQuestions.length - 1 && <p className="quiz-validation">Jawab semua pertanyaan untuk melihat hasil akhir.</p>}
        </div>}
      </section>
    </div>
  )
}
