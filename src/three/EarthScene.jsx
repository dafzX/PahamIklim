import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
import { useReducedMotion } from 'motion/react'
import * as THREE from 'three'
import { hotspots } from '../data/content.js'
import { useSceneVisibility } from './useSceneVisibility.js'

function makeEarthTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const context = canvas.getContext('2d')
  const gradient = context.createLinearGradient(0, 0, 1024, 512)
  gradient.addColorStop(0, '#195b67')
  gradient.addColorStop(0.5, '#16748a')
  gradient.addColorStop(1, '#0d3445')
  context.fillStyle = gradient
  context.fillRect(0, 0, 1024, 512)

  const continents = [
    [[100,85],[150,55],[203,74],[232,113],[220,151],[181,172],[169,207],[145,239],[126,205],[112,157],[83,132]],
    [[208,226],[250,219],[277,250],[267,300],[245,357],[219,397],[201,359],[194,311],[175,274]],
    [[410,86],[451,60],[501,76],[523,105],[564,106],[594,128],[563,150],[529,148],[508,169],[474,159],[458,185],[430,160],[405,133]],
    [[470,177],[509,176],[543,204],[551,250],[532,300],[506,351],[479,337],[461,294],[447,248],[451,209]],
    [[570,187],[617,164],[681,176],[724,205],[765,196],[814,222],[866,225],[902,260],[866,286],[818,273],[784,299],[748,284],[717,306],[686,276],[653,282],[625,252],[588,242]],
    [[702,322],[751,311],[794,329],[808,362],[777,385],[739,378],[717,354]],
    [[340,92],[355,84],[369,91],[363,104],[348,106]],
  ]
  context.fillStyle = '#86ae7a'
  context.strokeStyle = 'rgba(200,231,170,.34)'
  context.lineWidth = 2
  continents.forEach((points) => {
    context.beginPath()
    points.forEach(([x, y], index) => {
      if (index === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
    context.closePath()
    context.fill()
    context.stroke()
  })
  context.fillStyle = 'rgba(230,246,205,.1)'
  for (let index = 0; index < 180; index += 1) {
    const x = (index * 137) % canvas.width
    const y = (index * 67) % canvas.height
    context.fillRect(x, y, 1 + (index % 3), 1 + (index % 2))
  }
  return new THREE.CanvasTexture(canvas)
}

function geoPosition(lat, lon, radius = 1.035) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ]
}

function Globe({ onSelect, rotationTarget }) {
  const texture = useMemo(makeEarthTexture, [])
  const globeRef = useRef()
  const rotationSpeed = useRef(0)
  useFrame((_, delta) => {
    if (!globeRef.current) return
    const blend = 1 - Math.exp(-delta * 2.4)
    rotationSpeed.current += (rotationTarget.current - rotationSpeed.current) * blend
    globeRef.current.rotation.y += rotationSpeed.current * delta
  })
  return (
    <group ref={globeRef} rotation={[0.12, -0.55, 0.04]}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.88} metalness={0.04} />
      </mesh>
      <mesh scale={1.035}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#5de2d2" transparent opacity={0.11} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.018}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#b3efe4" transparent opacity={0.045} side={THREE.FrontSide} />
      </mesh>
      {hotspots.map((spot) => (
        <group key={spot.id} position={geoPosition(spot.lat, spot.lon)}>
          <mesh>
            <sphereGeometry args={[0.032, 16, 16]} />
            <meshBasicMaterial color="#d5ff75" />
          </mesh>
          <mesh scale={1.9}>
            <sphereGeometry args={[0.032, 16, 16]} />
            <meshBasicMaterial color="#c5f36a" transparent opacity={0.22} />
          </mesh>
          <Html center distanceFactor={5} zIndexRange={[20, 0]}>
            <button className="hotspot-trigger" onClick={() => onSelect(spot)} aria-label={`Buka informasi ${spot.name}`} title={spot.name}>
              <span />
            </button>
          </Html>
        </group>
      ))}
    </group>
  )
}

function Scene({ onSelect }) {
  const reducedMotion = useReducedMotion()
  const { camera, size } = useThree()
  const rotationTarget = useRef(reducedMotion ? 0 : 0.08)
  const aspect = size.width > 0 ? size.width / Math.max(size.height, 1) : 1
  const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov / 2)
  const limitingHalfFov = Math.atan(Math.tan(verticalHalfFov) * Math.min(aspect, 1))
  const minDistance = (1.08 / Math.sin(limitingHalfFov)) * 1.08

  useEffect(() => {
    rotationTarget.current = reducedMotion ? 0 : 0.08
  }, [reducedMotion])

  useEffect(() => {
    camera.position.setLength(minDistance)
  }, [camera, minDistance])

  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 2, 4]} intensity={2.4} color="#e6fff2" />
      <pointLight position={[-4, -1, -3]} intensity={1.3} color="#218b9a" />
      <Stars radius={45} depth={30} count={900} factor={2.2} saturation={0} fade speed={reducedMotion ? 0 : 0.3} />
      <Globe onSelect={onSelect} rotationTarget={rotationTarget} />
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minDistance={minDistance}
        maxDistance={5.2}
        rotateSpeed={0.48}
        zoomSpeed={0.65}
        autoRotate={false}
        onStart={() => { rotationTarget.current = 0 }}
        onEnd={() => { rotationTarget.current = reducedMotion ? 0 : 0.08 }}
      />
    </>
  )
}

class GlobeErrorBoundary extends React.Component {
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

function FallbackGlobe() {
  return (
    <div className="earth-fallback" role="img" aria-label="Ilustrasi Bumi dekoratif">
      <div className="fallback-orbit"><div className="fallback-earth"><span /></div></div>
      <span className="fallback-label">Bumi, rumah kita</span>
    </div>
  )
}

export default function EarthScene({ className = '', onSelect }) {
  const [selected, setSelected] = useState(null)
  const sceneRef = useRef(null)
  const visible = useSceneVisibility(sceneRef)
  const supportsWebGL = typeof window !== 'undefined' && Boolean(window.WebGLRenderingContext)
  const handleSelect = (spot) => {
    setSelected(spot)
    onSelect?.(spot)
  }

  return (
    <div ref={sceneRef} className={`earth-scene ${className}`}>
      {supportsWebGL ? (
        <GlobeErrorBoundary fallback={<FallbackGlobe />}>
          <Canvas frameloop={visible ? 'always' : 'never'} dpr={[1, 1.5]} camera={{ position: [0, 0, 3.4], fov: 42 }} gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}><Scene onSelect={handleSelect} /></Suspense>
          </Canvas>
        </GlobeErrorBoundary>
      ) : <FallbackGlobe />}
      <span className="earth-hint"><span className="pulse-dot" /> SERET UNTUK MENJELAJAH</span>
      {selected && (
        <div className="hotspot-panel">
          <button className="hotspot-close" aria-label="Tutup informasi lokasi" onClick={() => setSelected(null)}>×</button>
          <span className="eyebrow">{selected.name}</span>
          <strong>{selected.title}</strong>
          <p>{selected.text}</p>
          <a href={selected.source.split(': https://')[1] ? `https://${selected.source.split(': https://')[1]}` : '#'} target="_blank" rel="noreferrer">Lihat sumber ↗</a>
        </div>
      )}
    </div>
  )
}
