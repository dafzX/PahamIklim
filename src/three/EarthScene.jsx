import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { hotspots } from '../data/content.js'
import { configureSceneRenderer } from './configureSceneRenderer.js'
import { DEFAULT_GLOBE_ROTATION, geoPosition, getHotspotFacingQuaternion } from './earthOrientation.js'
import { useSceneVisibility } from './useSceneVisibility.js'

function HotspotMarker({ spot, active, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const domElement = useThree(({ gl }) => gl.domElement)
  const scale = active ? 1.5 : hovered ? 1.3 : 1

  const handlePointerOver = (event) => {
    event.stopPropagation()
    setHovered(true)
    domElement.style.cursor = 'pointer'
  }
  const handlePointerOut = (event) => {
    event.stopPropagation()
    setHovered(false)
    domElement.style.cursor = ''
  }
  const handleClick = (event) => {
    event.stopPropagation()
    onSelect(spot)
  }

  return (
    <group position={geoPosition(spot.lat, spot.lon).toArray()}>
      <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
        <sphereGeometry args={[0.085, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh scale={scale}>
        <sphereGeometry args={[0.032, 16, 16]} />
        <meshBasicMaterial color={active ? '#ffffff' : '#d5ff75'} />
      </mesh>
      <mesh scale={active ? 2.4 : hovered ? 2.2 : 1.9}>
        <sphereGeometry args={[0.032, 16, 16]} />
        <meshBasicMaterial color="#c5f36a" transparent opacity={active ? 0.38 : hovered ? 0.3 : 0.22} />
      </mesh>
    </group>
  )
}

function Globe({ globeRef, onSelect, rotationTarget, rotationSpeed, isFocusing, selectedId }) {
  const [dayTexture, cloudTexture] = useLoader(THREE.TextureLoader, [
    `${import.meta.env.BASE_URL}textures/2k_earth_daymap.jpg`,
    `${import.meta.env.BASE_URL}textures/2k_earth_clouds.jpg`,
  ])
  const { gl } = useThree()
  dayTexture.colorSpace = THREE.SRGBColorSpace
  dayTexture.anisotropy = gl.capabilities.getMaxAnisotropy()
  cloudTexture.anisotropy = gl.capabilities.getMaxAnisotropy()
  useFrame((_, delta) => {
    if (!globeRef.current || isFocusing.current) return
    const blend = 1 - Math.exp(-delta * 2.4)
    rotationSpeed.current += (rotationTarget.current - rotationSpeed.current) * blend
    globeRef.current.rotateY(rotationSpeed.current * delta)
  })
  return (
    <group ref={globeRef} rotation={DEFAULT_GLOBE_ROTATION.toArray()}>
      <mesh onClick={(event) => event.stopPropagation()}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={dayTexture}
          emissive="#ffffff"
          emissiveMap={dayTexture}
          emissiveIntensity={0.12}
          roughness={0.94}
          metalness={0}
        />
      </mesh>
      <mesh scale={1.008}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          alphaMap={cloudTexture}
          transparent
          opacity={0.2}
          depthWrite={false}
          roughness={1}
        />
      </mesh>
      <mesh scale={1.065}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#69baff" transparent opacity={0.075} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      {hotspots.map((spot) => <HotspotMarker key={spot.id} spot={spot} active={selectedId === spot.id} onSelect={onSelect} />)}
    </group>
  )
}

function Scene({ autoRotate, focusRequest, onAutoRotateChange, onSelect, selectedId }) {
  const reducedMotion = useReducedMotion()
  const { camera, size, gl } = useThree()
  const controlsRef = useRef()
  const globeRef = useRef()
  const rotationSpeed = useRef(0)
  const rotationTarget = useRef(0)
  const isFocusing = useRef(false)
  const focusTween = useRef(null)
  const onSelectRef = useRef(onSelect)
  const onAutoRotateChangeRef = useRef(onAutoRotateChange)
  const aspect = size.width > 0 ? size.width / Math.max(size.height, 1) : 1
  const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov / 2)
  const limitingHalfFov = Math.atan(Math.tan(verticalHalfFov) * Math.min(aspect, 1))
  const minDistance = (1.08 / Math.sin(limitingHalfFov)) * 1.08

  onSelectRef.current = onSelect
  onAutoRotateChangeRef.current = onAutoRotateChange

  useEffect(() => {
    rotationTarget.current = autoRotate && !reducedMotion ? 0.08 : 0
  }, [autoRotate, reducedMotion])

  useEffect(() => {
    camera.position.setLength(minDistance)
  }, [camera, minDistance])

  const animateTo = useCallback((targetQuaternion) => {
    if (!globeRef.current) return
    focusTween.current?.kill()
    if (controlsRef.current) controlsRef.current.enabled = true
    isFocusing.current = true
    rotationTarget.current = 0
    rotationSpeed.current = 0
    const startQuaternion = globeRef.current.quaternion.clone()
    const target = targetQuaternion.clone().normalize()
    const progress = { value: 0 }
    const angle = startQuaternion.angleTo(target)
    const duration = reducedMotion ? 0.01 : THREE.MathUtils.clamp(angle * 0.85, 0.8, 1.8)

    focusTween.current = gsap.to(progress, {
      value: 1,
      duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (!globeRef.current) return
        globeRef.current.quaternion.slerpQuaternions(startQuaternion, target, progress.value)
      },
      onComplete: () => {
        isFocusing.current = false
        focusTween.current = null
      },
    })
  }, [camera, minDistance, reducedMotion])

  const focusOnHotspot = useCallback((spot) => {
    if (!globeRef.current) return
    onAutoRotateChangeRef.current(false)
    rotationTarget.current = 0
    const cameraPosition = camera.getWorldPosition(new THREE.Vector3())
    const targetQuaternion = getHotspotFacingQuaternion(
      geoPosition(spot.lat, spot.lon),
      globeRef.current.quaternion,
      cameraPosition,
    )
    onSelectRef.current(spot)
    animateTo(targetQuaternion)
  }, [animateTo, camera])
  const focusOnHotspotRef = useRef(focusOnHotspot)
  focusOnHotspotRef.current = focusOnHotspot

  const handleControlStart = () => {
    focusTween.current?.kill()
    focusTween.current = null
    isFocusing.current = false
    rotationSpeed.current = 0
    rotationTarget.current = 0
    onAutoRotateChangeRef.current(false)
  }

  useEffect(() => {
    if (focusRequest) focusOnHotspotRef.current(focusRequest)
  }, [focusRequest])

  useEffect(() => () => {
    focusTween.current?.kill()
    gl.domElement.style.cursor = ''
  }, [gl])

  return (
    <>
      <hemisphereLight args={['#d7edff', '#29423a', 0.8]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 2, 4]} intensity={1.9} color="#f4fbff" />
      <pointLight position={[-4, -1, -3]} intensity={0.45} color="#78a9ad" />
      <Stars radius={45} depth={30} count={900} factor={2.2} saturation={0} fade speed={reducedMotion ? 0 : 0.3} />
      <Globe
        globeRef={globeRef}
        onSelect={focusOnHotspot}
        rotationTarget={rotationTarget}
        rotationSpeed={rotationSpeed}
        isFocusing={isFocusing}
        selectedId={selectedId}
      />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minDistance={minDistance}
        maxDistance={5.2}
        rotateSpeed={0.48}
        zoomSpeed={0.65}
        autoRotate={false}
        onStart={handleControlStart}
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
  componentDidCatch(error) {
    console.error('Earth scene failed to render.', error)
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

export default function EarthScene({ className = '', onSelect, showHotspotList = false }) {
  const [selected, setSelected] = useState(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [focusRequest, setFocusRequest] = useState(null)
  const sceneRef = useRef(null)
  const visible = useSceneVisibility(sceneRef)
  const supportsWebGL = typeof window !== 'undefined' && Boolean(window.WebGLRenderingContext)
  const handleSelect = useCallback((spot) => {
    setSelected(spot)
    onSelect?.(spot)
  }, [onSelect])
  return (
    <div ref={sceneRef} className={`earth-scene ${className}`}>
      {supportsWebGL ? (
        <GlobeErrorBoundary fallback={<FallbackGlobe />}>
          <Canvas frameloop={visible ? 'always' : 'never'} dpr={[1, 1.5]} camera={{ position: [0, 0, 3.4], fov: 42 }} gl={{ antialias: true, alpha: true }} onCreated={configureSceneRenderer}>
            <Suspense fallback={null}>
              <Scene
                autoRotate={autoRotate}
                focusRequest={focusRequest}
                onAutoRotateChange={setAutoRotate}
                onSelect={handleSelect}
                selectedId={selected?.id}
              />
            </Suspense>
          </Canvas>
        </GlobeErrorBoundary>
      ) : <FallbackGlobe />}
      <span className="earth-hint"><span className="pulse-dot" /> SERET UNTUK MENJELAJAH</span>
      {showHotspotList && !selected && (
        <nav className="hotspot-list" aria-label="Pilih lokasi pada globe">
          {hotspots.map((spot) => (
            <button type="button" key={spot.id} onClick={() => setFocusRequest({ ...spot })}>
              {spot.name}
            </button>
          ))}
        </nav>
      )}
      {selected && (
        <div className="hotspot-panel" role="region" aria-label={`Informasi ${selected.name}`} aria-live="polite">
          <button className="hotspot-close" aria-label="Tutup informasi lokasi" onClick={() => setSelected(null)}>×</button>
          <span className="eyebrow">{selected.name}</span>
          <span className="hotspot-category">{selected.category}</span>
          <strong>{selected.title}</strong>
          <p>{selected.text}</p>
          <a href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.source.split(': https://')[0]} ↗</a>
        </div>
      )}
    </div>
  )
}
