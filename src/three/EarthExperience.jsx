import { lazy, Suspense } from 'react'

const EarthScene = lazy(() => import('./EarthScene.jsx'))

function EarthFallback() {
  return <div className="earth-fallback" role="img" aria-label="Ilustrasi Bumi sedang dimuat"><div className="fallback-earth"><span /></div></div>
}

export default function EarthExperience(props) {
  return <Suspense fallback={<EarthFallback />}><EarthScene {...props} /></Suspense>
}
