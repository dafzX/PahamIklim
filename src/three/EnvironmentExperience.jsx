import React, { lazy, Suspense } from 'react'

const EnvironmentScene = lazy(() => import('./EnvironmentScene.jsx'))

function EnvironmentFallback({ type }) {
  return <div className={`environment-static environment-static-${type}`} role="img" aria-label={`Ilustrasi ${type} procedural`}>
    <div className="static-object static-object-one" /><div className="static-object static-object-two" /><span>ILUSTRASI PROSEDURAL</span>
  </div>
}

class EnvironmentErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function EnvironmentExperience({ type }) {
  const supportsWebGL = typeof window !== 'undefined' && Boolean(window.WebGLRenderingContext)
  if (!supportsWebGL) return <EnvironmentFallback type={type} />
  return <EnvironmentErrorBoundary fallback={<EnvironmentFallback type={type} />}><Suspense fallback={<div className="environment-canvas environment-loading" role="status">Memuat adegan 3D...</div>}><EnvironmentScene type={type} /></Suspense></EnvironmentErrorBoundary>
}
