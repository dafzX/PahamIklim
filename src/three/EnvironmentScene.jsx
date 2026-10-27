import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useReducedMotion } from 'motion/react'
import * as THREE from 'three'
import { useSceneVisibility } from './useSceneVisibility.js'

const groundY = -1.05

function Ground({ color = '#172c23' }) {
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, groundY, 0]} receiveShadow><planeGeometry args={[10, 10]} /><meshStandardMaterial color={color} roughness={1} /></mesh>
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
      <Ground color="#26352b" />
      <mesh position={[0, -0.99, -0.02]}><boxGeometry args={[4.35, 0.12, 1.95]} /><meshStandardMaterial color="#58634f" roughness={0.95} /></mesh>
      <mesh position={[-0.1, -0.24, -0.05]}><boxGeometry args={[2.8, 1.38, 1.4]} /><meshStandardMaterial color="#7f8a75" roughness={0.82} /></mesh>
      <mesh position={[-0.82, -0.48, 0.78]}><boxGeometry args={[1.2, 0.9, 0.62]} /><meshStandardMaterial color="#68796a" roughness={0.88} /></mesh>
      <mesh position={[-0.1, 0.53, -0.05]}><boxGeometry args={[2.9, 0.16, 1.52]} /><meshStandardMaterial color="#a2a28a" roughness={0.86} /></mesh>
      <mesh position={[-0.82, 0.01, 1.1]}><boxGeometry args={[0.88, 0.48, 0.025]} /><meshStandardMaterial color="#243b35" emissive="#517c65" emissiveIntensity={0.18} /></mesh>
      {[-0.8, 0.8].map((x, index) => {
        const height = index === 0 ? 1.05 : 0.8
        const base = 0.61
        return (
          <group key={x} position={[x, base, -0.43]}>
            <mesh position={[0, height / 2, 0]}><cylinderGeometry args={[0.13, 0.17, height, 10]} /><meshStandardMaterial color={index === 0 ? '#9a7659' : '#75816f'} roughness={0.7} /></mesh>
            <mesh position={[0, height, 0]}><cylinderGeometry args={[0.17, 0.17, 0.09, 10]} /><meshStandardMaterial color="#c09a72" roughness={0.65} /></mesh>
          </group>
        )
      })}
      {Array.from({ length: 3 }, (_, index) => <mesh key={index} position={[-0.8 + index * 0.58, -0.27, 0.661]}><boxGeometry args={[0.22, 0.18, 0.025]} /><meshStandardMaterial color="#c5d1b6" emissive="#95ba84" emissiveIntensity={0.16} /></mesh>)}
      <mesh position={[0.1, -0.3, 0.661]}><boxGeometry args={[0.25, 0.55, 0.03]} /><meshStandardMaterial color="#4c5b4e" /></mesh>
      <mesh position={[1.72, -0.28, -0.35]}><cylinderGeometry args={[0.38, 0.4, 1.34, 12]} /><meshStandardMaterial color="#9a9a81" roughness={0.65} metalness={0.12} /></mesh>
      <mesh position={[1.72, 0.39, -0.35]}><sphereGeometry args={[0.38, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#b6ae90" roughness={0.65} metalness={0.12} /></mesh>
      <mesh position={[1.43, -0.03, -0.35]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.055, 0.055, 0.56, 8]} /><meshStandardMaterial color="#bd9b6f" metalness={0.25} roughness={0.55} /></mesh>
      {Array.from({ length: 4 }, (_, index) => <mesh key={index} ref={(node) => { smoke.current[index] = node }} position={[-0.8, 1.72, -0.42]}><sphereGeometry args={[0.15, 10, 8]} /><meshStandardMaterial color="#c7cbbd" transparent opacity={0.2} depthWrite={false} /></mesh>)}
    </group>
  )
}

function Tree({ position, scale = 1, color = '#72936b' }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.21, 0]}><cylinderGeometry args={[0.045, 0.075, 0.42, 7]} /><meshStandardMaterial color="#755c42" /></mesh>
      <mesh position={[0, 0.61, 0]}><coneGeometry args={[0.36, 0.78, 7]} /><meshStandardMaterial color={color} roughness={1} /></mesh>
      <mesh position={[0, 0.91, 0]}><coneGeometry args={[0.25, 0.72, 7]} /><meshStandardMaterial color={color} roughness={1} /></mesh>
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
      <mesh position={[x, groundY + height / 2, z]}><boxGeometry args={[width, height, depth]} /><meshStandardMaterial color={color} roughness={0.88} /></mesh>
      <mesh position={[x, groundY + height + 0.035, z]}><boxGeometry args={[width + 0.08, 0.07, depth + 0.08]} /><meshStandardMaterial color="#a5ad97" roughness={0.82} /></mesh>
      {Array.from({ length: floors * 2 }, (_, index) => {
        const column = index % 2
        const row = Math.floor(index / 2)
        return <mesh key={index} position={[x + (column ? 0.19 : -0.19), groundY + 0.31 + row * ((height - 0.43) / Math.max(floors - 1, 1)), z + depth / 2 + 0.014]}><boxGeometry args={[0.12, 0.15, 0.025]} /><meshStandardMaterial color="#d7ddc0" emissive="#97b79b" emissiveIntensity={0.13} /></mesh>
      })}
      <mesh position={[x, groundY + 0.16, z + depth / 2 + 0.017]}><boxGeometry args={[0.2, 0.3, 0.03]} /><meshStandardMaterial color="#33483d" /></mesh>
    </group>
  )
}

function CityScene() {
  const treePlanterPositions = useMemo(() => [
    { x: -2.05, z: 1.18 },
    { x: 2.05, z: 1.18 },
  ], [])

  return (
    <group>
      <Ground color="#557052" />
      {cityBuildings.map((building) => <CityBuilding key={building.x} building={building} />)}
      <mesh position={[0, groundY + 0.02, -0.02]}><boxGeometry args={[5.3, 0.04, 0.22]} /><meshStandardMaterial color="#b3aa8c" /></mesh>
      <mesh position={[0, groundY + 0.015, 0.72]}><boxGeometry args={[5.3, 0.03, 1.12]} /><meshStandardMaterial color="#303b38" roughness={0.95} /></mesh>
      {[-0.7, 0, 0.7].map((x) => <mesh key={x} position={[x, groundY + 0.034, 0.72]}><boxGeometry args={[0.38, 0.008, 0.045]} /><meshBasicMaterial color="#d8d2ad" /></mesh>)}
      <mesh position={[0, groundY + 0.02, 1.35]}><boxGeometry args={[5.3, 0.04, 0.18]} /><meshStandardMaterial color="#b3aa8c" /></mesh>
      {treePlanterPositions.map(({ x, z }) => (
        <mesh key={`planter-${x}`} position={[x, groundY + 0.015, z]}><boxGeometry args={[0.78, 0.03, 0.8]} /><meshStandardMaterial color="#789269" /></mesh>
      ))}
      <group position={[0.15, groundY, 0.72]}>
        <mesh position={[0, 0.27, 0]}><boxGeometry args={[0.78, 0.24, 0.38]} /><meshStandardMaterial color="#c5f36a" roughness={0.55} /></mesh>
        <mesh position={[0, 0.43, -0.015]}><boxGeometry args={[0.42, 0.19, 0.33]} /><meshStandardMaterial color="#dce7d5" roughness={0.4} /></mesh>
        {[-0.24, 0.24].map((x) => <mesh key={x} position={[x, 0.135, 0.2]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.105, 0.105, 0.07, 10]} /><meshStandardMaterial color="#202b29" roughness={0.8} /></mesh>)}
      </group>
      <Tree position={[-2.05, groundY, 1.18]} scale={0.72} />
      <Tree position={[2.05, groundY, 1.18]} scale={0.72} color="#82a176" />
    </group>
  )
}

function WindTurbine({ position, scale = 1, animate }) {
  const rotorRef = useRef()
  useFrame((_, delta) => {
    if (!animate || !rotorRef.current) return
    rotorRef.current.rotation.z += delta * 1.65
  })
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.95, 0]}><cylinderGeometry args={[0.045, 0.085, 1.9, 10]} /><meshStandardMaterial color="#d8e2d5" roughness={0.65} metalness={0.08} /></mesh>
      <mesh position={[0, 0.035, 0]}><cylinderGeometry args={[0.14, 0.18, 0.07, 8]} /><meshStandardMaterial color="#748475" roughness={0.82} /></mesh>
      <mesh position={[0, 2, 0.1]}><boxGeometry args={[0.42, 0.19, 0.24]} /><meshStandardMaterial color="#e0e6d9" roughness={0.55} /></mesh>
      <group ref={rotorRef} position={[0, 2, 0.25]}>
        <mesh><sphereGeometry args={[0.12, 12, 10]} /><meshStandardMaterial color="#f1f2e9" metalness={0.14} roughness={0.42} /></mesh>
        {[0, 1, 2].map((blade) => (
          <group key={blade} rotation={[0, 0, blade * Math.PI * 2 / 3]}>
            <mesh position={[0, 0.48, 0]}><boxGeometry args={[0.12, 0.92, 0.055]} /><meshStandardMaterial color="#dfe8d8" roughness={0.62} /></mesh>
            <mesh position={[0, 0.83, 0.008]} rotation={[0, 0, -0.06]}><boxGeometry args={[0.075, 0.22, 0.045]} /><meshStandardMaterial color="#e9eee4" roughness={0.62} /></mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

function SolarPanel({ position }) {
  return (
    <group position={position} rotation={[-0.24, 0, 0]}>
      <mesh position={[0, 0.31, 0]}><boxGeometry args={[0.68, 0.035, 0.48]} /><meshStandardMaterial color="#4f8490" metalness={0.3} roughness={0.42} /></mesh>
      <mesh position={[0, 0.334, 0]}><boxGeometry args={[0.63, 0.012, 0.43]} /><meshStandardMaterial color="#376a7a" metalness={0.26} roughness={0.4} /></mesh>
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
      <Ground color="#34513a" />
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
      <Ground color="#476746" />
      <mesh position={[0, groundY + 0.018, 0]} geometry={makeRiverGeometry()}><meshStandardMaterial color="#4a8992" roughness={0.32} metalness={0.12} side={THREE.DoubleSide} /></mesh>
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
      ].map((position, index) => <mesh key={index} position={position}><sphereGeometry args={[0.18, 8, 6]} /><meshStandardMaterial color="#b1c0a1" roughness={0.95} /></mesh>)}
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
  const visible = useSceneVisibility(sceneRef)
  const reducedMotion = useReducedMotion()
  const SelectedScene = scenes[type] || FactoryScene
  return (
    <div ref={sceneRef} className="environment-canvas">
      <Canvas frameloop={visible ? 'always' : 'never'} dpr={[1, 1.2]} camera={{ position: [4.1, 2.8, 5.3], fov: 37 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 3]} intensity={2.1} color="#efffe9" />
        <pointLight position={[-3, 1, -2]} intensity={0.8} color="#8bd5ad" />
        <Stars radius={28} depth={12} count={180} factor={1.2} fade speed={reducedMotion ? 0 : 0.12} />
        <SelectedScene animate={!reducedMotion} />
        <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={4.3} maxDistance={8} rotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
