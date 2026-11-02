import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls, RoundedBox } from '@react-three/drei'
import { useReducedMotion } from 'motion/react'
import * as THREE from 'three'
import { configureSceneRenderer } from './configureSceneRenderer.js'
import { useSceneVisibility } from './useSceneVisibility.js'

const groundY = -1.05

function Ground() {
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, groundY, 0]} receiveShadow><planeGeometry args={[10, 10]} /><meshStandardMaterial color="#68745e" roughness={0.98} /></mesh>
}

function FactoryScene({ animate }) {
  const smoke = useRef([])
  useFrame(({ clock }) => {
    if (!animate) return
    smoke.current.forEach((particle, index) => {
      if (!particle) return
      const progress = (clock.elapsedTime * 0.14 + index * 0.31) % 1
      particle.position.set(-0.8 + Math.sin(index * 2) * 0.06 + progress * 0.12, 1.72 + progress * 0.7, -0.42)
      particle.scale.setScalar(0.07 + progress * 0.1)
      particle.material.opacity = 0.22 * (1 - progress)
    })
  })
  return (
    <group>
      <Ground />
      <RoundedBox position={[0, -0.99, -0.02]} args={[4.35, 0.12, 1.95]} radius={0.06} smoothness={2}><meshStandardMaterial color="#777a68" roughness={0.94} /></RoundedBox>
      <RoundedBox position={[-0.1, -0.24, -0.05]} args={[2.8, 1.38, 1.4]} radius={0.045} smoothness={2}><meshStandardMaterial color="#879087" roughness={0.9} /></RoundedBox>
      <RoundedBox position={[-0.82, -0.48, 0.78]} args={[1.2, 0.9, 0.62]} radius={0.035} smoothness={2}><meshStandardMaterial color="#748276" roughness={0.92} /></RoundedBox>
      <mesh position={[-0.1, 0.53, -0.05]}><boxGeometry args={[2.9, 0.16, 1.52]} /><meshStandardMaterial color="#a6a18c" roughness={0.91} /></mesh>
      <mesh position={[-0.1, -0.76, 0.67]}><boxGeometry args={[2.62, 0.07, 0.045]} /><meshStandardMaterial color="#6f7b70" roughness={0.9} /></mesh>
      {[-1.16, -0.65, -0.14, 0.37, 0.88].map((x) => <mesh key={x} position={[x, -0.2, 0.68]}><boxGeometry args={[0.045, 1.02, 0.04]} /><meshStandardMaterial color="#9b9d8a" roughness={0.92} /></mesh>)}
      <RoundedBox position={[-0.82, 0.01, 1.1]} args={[0.88, 0.48, 0.025]} radius={0.025} smoothness={2}><meshStandardMaterial color="#435b55" emissive="#517c65" emissiveIntensity={0.07} roughness={0.8} /></RoundedBox>
      {[-0.8, 0.8].map((x, index) => {
        const height = index === 0 ? 1.05 : 0.8
        const base = 0.61
        return (
          <group key={x} position={[x, base, -0.43]}>
            <mesh position={[0, height / 2, 0]}><cylinderGeometry args={[0.13, 0.17, height, 12]} /><meshStandardMaterial color={index === 0 ? '#947c67' : '#788178'} roughness={0.88} /></mesh>
            <mesh position={[0, height, 0]}><cylinderGeometry args={[0.17, 0.17, 0.09, 12]} /><meshStandardMaterial color="#b4a78f" roughness={0.86} /></mesh>
          </group>
        )
      })}
      {Array.from({ length: 3 }, (_, index) => <mesh key={index} position={[-0.8 + index * 0.58, -0.27, 0.661]}><boxGeometry args={[0.22, 0.18, 0.025]} /><meshStandardMaterial color="#c5d1b6" roughness={0.88} /></mesh>)}
      <mesh position={[0.1, -0.3, 0.661]}><boxGeometry args={[0.25, 0.55, 0.03]} /><meshStandardMaterial color="#4c5b4e" /></mesh>
      <mesh position={[1.72, -0.91, -0.35]}><cylinderGeometry args={[0.43, 0.43, 0.08, 16]} /><meshStandardMaterial color="#8f907d" roughness={0.9} /></mesh>
      <mesh position={[1.72, -0.28, -0.35]}><cylinderGeometry args={[0.38, 0.4, 1.34, 16]} /><meshStandardMaterial color="#9a9a84" roughness={0.86} /></mesh>
      <mesh position={[1.72, 0.39, -0.35]}><sphereGeometry args={[0.38, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#b6ae90" roughness={0.88} /></mesh>
      {[-0.48, 0.02].map((y) => <mesh key={y} position={[1.72, y, -0.35]}><cylinderGeometry args={[0.405, 0.405, 0.035, 16]} /><meshStandardMaterial color="#858b78" roughness={0.87} /></mesh>)}
      <mesh position={[1.43, -0.03, -0.35]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.055, 0.055, 0.56, 10]} /><meshStandardMaterial color="#aa987d" roughness={0.85} /></mesh>
      {Array.from({ length: 4 }, (_, index) => <mesh key={index} ref={(node) => { smoke.current[index] = node }} position={[-0.8, 1.72, -0.42]}><sphereGeometry args={[0.15, 10, 8]} /><meshStandardMaterial color="#c7cbbd" transparent opacity={0.2} depthWrite={false} /></mesh>)}
    </group>
  )
}

function Tree({ position, scale = 1, color = '#748b69' }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.22, 0]}><cylinderGeometry args={[0.045, 0.075, 0.44, 8]} /><meshStandardMaterial color="#76654e" roughness={0.96} /></mesh>
      <mesh position={[0, 0.57, 0]} scale={[1, 0.95, 0.95]}><icosahedronGeometry args={[0.31, 1]} /><meshStandardMaterial color={color} roughness={0.97} /></mesh>
      <mesh position={[-0.13, 0.75, 0.025]} scale={0.66}><icosahedronGeometry args={[0.27, 1]} /><meshStandardMaterial color={color} roughness={0.97} /></mesh>
      <mesh position={[0.14, 0.77, -0.02]} scale={0.62}><icosahedronGeometry args={[0.26, 1]} /><meshStandardMaterial color={color} roughness={0.97} /></mesh>
    </group>
  )
}

const cityBuildings = [
  { x: -1.62, z: -0.82, width: 0.76, depth: 0.72, height: 1.5, color: '#879789' },
  { x: -0.57, z: -0.82, width: 0.82, depth: 0.72, height: 2.05, color: '#708779' },
  { x: 0.55, z: -0.82, width: 0.78, depth: 0.72, height: 1.7, color: '#9a9d89' },
  { x: 1.62, z: -0.82, width: 0.8, depth: 0.72, height: 1.3, color: '#748b7d' },
]

function CityBuilding({ building }) {
  const { x, z, width, depth, height, color } = building
  const floors = Math.max(2, Math.floor((height - 0.25) / 0.38))
  return (
    <group>
      <RoundedBox position={[x, groundY + height / 2, z]} args={[width, height, depth]} radius={0.025} smoothness={2}><meshStandardMaterial color={color} roughness={0.92} /></RoundedBox>
      <mesh position={[x, groundY + height + 0.035, z]}><boxGeometry args={[width + 0.08, 0.07, depth + 0.08]} /><meshStandardMaterial color="#a5ad97" roughness={0.82} /></mesh>
      {Array.from({ length: floors * 2 }, (_, index) => {
        const column = index % 2
        const row = Math.floor(index / 2)
        return <mesh key={index} position={[x + (column ? 0.19 : -0.19), groundY + 0.31 + row * ((height - 0.43) / Math.max(floors - 1, 1)), z + depth / 2 + 0.014]}><boxGeometry args={[0.12, 0.15, 0.025]} /><meshStandardMaterial color="#d7ddc0" roughness={0.86} /></mesh>
      })}
      <mesh position={[x, groundY + 0.16, z + depth / 2 + 0.017]}><boxGeometry args={[0.2, 0.3, 0.03]} /><meshStandardMaterial color="#33483d" /></mesh>
      <RoundedBox position={[x + width * 0.19, groundY + height + 0.12, z]} args={[0.2, 0.1, 0.18]} radius={0.018} smoothness={2}><meshStandardMaterial color="#747e72" roughness={0.92} /></RoundedBox>
    </group>
  )
}

function CityScene() {
  const treePlanterPositions = useMemo(() => [
    { x: -2.05, z: 1.88 },
    { x: 2.05, z: 1.88 },
  ], [])

  return (
    <group>
      <Ground />
      {cityBuildings.map((building) => <CityBuilding key={building.x} building={building} />)}
      <mesh position={[0, groundY + 0.02, 0.06]}><boxGeometry args={[5.3, 0.04, 0.16]} /><meshStandardMaterial color="#b5ac95" roughness={0.94} /></mesh>
      <mesh position={[0, groundY + 0.015, 0.72]}><boxGeometry args={[5.3, 0.03, 1.12]} /><meshStandardMaterial color="#303b38" roughness={0.95} /></mesh>
      {[-1.1, -0.35, 0.4, 1.15].map((x) => <mesh key={x} position={[x, groundY + 0.034, 0.72]}><boxGeometry args={[0.34, 0.008, 0.045]} /><meshBasicMaterial color="#c6bea5" /></mesh>)}
      <mesh position={[0, groundY + 0.02, 1.38]}><boxGeometry args={[5.3, 0.04, 0.2]} /><meshStandardMaterial color="#b5ac95" roughness={0.94} /></mesh>
      {treePlanterPositions.map(({ x, z }) => (
      <RoundedBox key={`planter-${x}`} position={[x, groundY + 0.015, z]} args={[0.78, 0.03, 0.8]} radius={0.02} smoothness={2}><meshStandardMaterial color="#73816a" roughness={0.98} /></RoundedBox>
      ))}
      <group position={[0.15, groundY, 0.72]}>
      <RoundedBox position={[0, 0.27, 0]} args={[0.78, 0.24, 0.38]} radius={0.06} smoothness={2}><meshStandardMaterial color="#9da78f" roughness={0.84} /></RoundedBox>
      <RoundedBox position={[0, 0.43, -0.015]} args={[0.42, 0.19, 0.33]} radius={0.055} smoothness={2}><meshStandardMaterial color="#c4cbbd" roughness={0.76} /></RoundedBox>
      <mesh position={[0, 0.43, 0.16]}><boxGeometry args={[0.34, 0.11, 0.015]} /><meshStandardMaterial color="#71827e" roughness={0.7} /></mesh>
      {[-0.24, 0.24].map((x) => <mesh key={x} position={[x, 0.135, 0.2]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.105, 0.105, 0.07, 10]} /><meshStandardMaterial color="#202b29" roughness={0.8} /></mesh>)}
      </group>
      <Tree position={[-2.05, groundY, 1.88]} scale={0.72} />
      <Tree position={[2.05, groundY, 1.88]} scale={0.72} color="#82a176" />
    </group>
  )
}

function WindTurbine({ position, scale = 1, animate }) {
  const rotorRef = useRef()
  useFrame((_, delta) => {
    if (!animate || !rotorRef.current) return
    rotorRef.current.rotation.z += delta * 0.55
  })
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.95, 0]}><cylinderGeometry args={[0.045, 0.085, 1.9, 10]} /><meshStandardMaterial color="#d8e2d5" roughness={0.65} metalness={0.08} /></mesh>
      <mesh position={[0, 0.035, 0]}><cylinderGeometry args={[0.14, 0.18, 0.07, 8]} /><meshStandardMaterial color="#748475" roughness={0.82} /></mesh>
      <RoundedBox position={[0, 2, 0.1]} args={[0.42, 0.19, 0.24]} radius={0.045} smoothness={2}><meshStandardMaterial color="#d7ded2" roughness={0.83} /></RoundedBox>
      <group ref={rotorRef} position={[0, 2, 0.25]}>
        <mesh><sphereGeometry args={[0.12, 16, 12]} /><meshStandardMaterial color="#c5cabb" roughness={0.72} /></mesh>
        {[0, 1, 2].map((blade) => (
          <group key={blade} rotation={[0, 0, blade * Math.PI * 2 / 3]}>
            <RoundedBox position={[0, 0.48, 0]} args={[0.1, 0.92, 0.05]} radius={0.035} smoothness={2} rotation={[0, 0, -0.06]}><meshStandardMaterial color="#d7dfd2" roughness={0.84} /></RoundedBox>
          </group>
        ))}
      </group>
    </group>
  )
}

function SolarPanel({ position }) {
  return (
    <group position={position} rotation={[-0.24, 0, 0]}>
      <mesh position={[0, 0.31, 0]}><boxGeometry args={[0.68, 0.035, 0.48]} /><meshStandardMaterial color="#698b8c" metalness={0.08} roughness={0.68} /></mesh>
      <mesh position={[0, 0.334, 0]}><boxGeometry args={[0.63, 0.012, 0.43]} /><meshStandardMaterial color="#4f7479" metalness={0.06} roughness={0.72} /></mesh>
      {[-0.21, 0, 0.21].map((x) => <mesh key={`column-${x}`} position={[x, 0.342, 0]}><boxGeometry args={[0.012, 0.008, 0.43]} /><meshBasicMaterial color="#aac8c3" /></mesh>)}
      {[-0.105, 0.105].map((z) => <mesh key={`row-${z}`} position={[0, 0.342, z]}><boxGeometry args={[0.63, 0.008, 0.012]} /><meshBasicMaterial color="#aac8c3" /></mesh>)}
      {[-0.18, 0.18].map((z) => <mesh key={`leg-${z}`} position={[0, 0.15, z]}><boxGeometry args={[0.055, 0.3, 0.055]} /><meshStandardMaterial color="#9ba99d" metalness={0.15} roughness={0.65} /></mesh>)}
      <mesh position={[0, 0.04, 0]}><boxGeometry args={[0.82, 0.08, 0.66]} /><meshStandardMaterial color="#354b3b" roughness={0.9} /></mesh>
    </group>
  )
}

function EnergyScene({ animate }) {
  return (
    <group>
      <Ground />
      <mesh position={[-0.85, groundY + 0.025, -0.62]}><boxGeometry args={[2.8, 0.05, 1.2]} /><meshStandardMaterial color="#61744c" roughness={0.92} /></mesh>
      {[-1.58, -0.72, 0.14].map((x) => <SolarPanel key={x} position={[x, groundY + 0.05, -0.62]} />)}
      <WindTurbine position={[1.1, groundY, -0.65]} animate={animate} />
      <WindTurbine position={[2.05, groundY, -1.15]} scale={0.72} animate={animate} />
      <Tree position={[-2.2, groundY, 0.9]} scale={0.78} />
      <Tree position={[2.35, groundY, 0.95]} scale={0.72} color="#809a67" />
    </group>
  )
}

function makeRiverGeometry() {
  const river = new THREE.Shape()
  river.moveTo(-2.6, 0.6)
  river.lineTo(-1.9, 0.58)
  river.lineTo(-1.25, 0.38)
  river.lineTo(-0.65, 0.15)
  river.lineTo(0.05, 0.13)
  river.lineTo(0.72, -0.08)
  river.lineTo(1.42, -0.38)
  river.lineTo(2.6, -0.42)
  river.lineTo(2.6, 0.05)
  river.lineTo(1.5, 0.08)
  river.lineTo(0.85, 0.28)
  river.lineTo(0.1, 0.54)
  river.lineTo(-0.6, 0.56)
  river.lineTo(-1.35, 0.8)
  river.lineTo(-2, 0.95)
  river.lineTo(-2.6, 1.02)
  river.closePath()
  const geometry = new THREE.ShapeGeometry(river, 1)
  geometry.rotateX(-Math.PI / 2)
  return geometry
}

function NatureScene() {
  return (
    <group>
      <Ground />
      <mesh position={[0, groundY + 0.018, 0]} geometry={makeRiverGeometry()}><meshStandardMaterial color="#638f91" roughness={0.72} metalness={0.02} side={THREE.DoubleSide} /></mesh>
      {[
        [-2.15, groundY, -1.15, 0.76], [-1.35, groundY, -1.42, 0.94], [-0.45, groundY, -1.25, 0.72],
        [0.55, groundY, -1.42, 0.88], [1.55, groundY, -1.22, 0.76], [2.18, groundY, 1.55, 0.82],
        [1.3, groundY, 1.75, 0.72], [0.2, groundY, 1.55, 0.9], [-1.05, groundY, 1.72, 0.78], [-2.05, groundY, 1.5, 0.86],
      ].map(([x, y, z, scale], index) => <Tree key={index} position={[x, y, z]} scale={scale} color={index % 2 ? '#668e62' : '#83a576'} />)}
      {[
        [-1.85, groundY + 0.06, -0.15], [-0.85, groundY + 0.06, 0.75], [0.75, groundY + 0.06, -0.72], [1.75, groundY + 0.06, 0.72],
      ].map((position, index) => <mesh key={index} position={position} scale={[0.28, 0.14, 0.22]}><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color={index % 2 ? '#8b9d64' : '#718958'} roughness={1} /></mesh>)}
      {[
        [-1.4, groundY + 0.035, -0.96], [-0.3, groundY + 0.035, 0.0], [1.15, groundY + 0.035, 0.3],
      ].map((position, index) => <mesh key={index} position={position}><dodecahedronGeometry args={[0.17, 1]} /><meshStandardMaterial color="#a9b29a" roughness={0.98} /></mesh>)}
    </group>
  )
}

const scenes = {
  factory: FactoryScene,
  city: CityScene,
  energy: EnergyScene,
  nature: NatureScene,
}

export default function EnvironmentScene({ type = 'factory' }) {
  const sceneRef = useRef(null)
  const sceneRoot = useRef(null)
  const visible = useSceneVisibility(sceneRef)
  const reducedMotion = useReducedMotion()
  const SelectedScene = scenes[type] || FactoryScene

  useEffect(() => {
    sceneRoot.current?.traverse((object) => {
      if (!object.isMesh) return
      object.castShadow = true
      object.receiveShadow = true
    })
  }, [type])

  return (
    <div ref={sceneRef} className="environment-canvas">
      <Canvas frameloop={visible ? 'always' : 'never'} shadows dpr={[1, 1.2]} camera={{ position: [4.1, 2.8, 5.3], fov: 37 }} gl={{ antialias: true, alpha: true }} onCreated={configureSceneRenderer}>
        <hemisphereLight args={['#e3e1cf', '#465344', 0.85]} />
        <ambientLight intensity={0.42} />
        <directionalLight
          castShadow
          position={[4, 7, 5]}
          intensity={1.75}
          color="#f2ead8"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-camera-near={0.1}
          shadow-camera-far={20}
          shadow-bias={-0.00015}
          shadow-normalBias={0.035}
          shadow-radius={4}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.62} color="#9ab8ad" />
        <group ref={sceneRoot}>
          <SelectedScene animate={!reducedMotion} />
        </group>
        <ContactShadows position={[0, groundY + 0.01, 0]} scale={8} opacity={0.2} blur={2.2} far={4} resolution={256} frames={1} />
        <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={4.3} maxDistance={8} rotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
