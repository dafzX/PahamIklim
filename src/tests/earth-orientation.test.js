import * as THREE from 'three'
import { describe, expect, it } from 'vitest'
import { geoPosition, getHotspotFacingQuaternion } from '../three/earthOrientation.js'
import { hotspots } from '../data/content.js'

describe('earth hotspot orientation', () => {
  it.each(['jakarta', 'amazon', 'antarctica'])('faces %s toward the camera from the current globe orientation', (id) => {
    const spot = hotspots.find((item) => item.id === id)
    const current = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.37, -1.14, 0.2))
    const cameraPosition = new THREE.Vector3(1.2, 0.4, 3.1)
    const target = getHotspotFacingQuaternion(geoPosition(spot.lat, spot.lon), current, cameraPosition)
    const facing = geoPosition(spot.lat, spot.lon).normalize().applyQuaternion(target)

    expect(facing.distanceTo(cameraPosition.normalize())).toBeLessThan(1e-10)
    expect(target.length()).toBeCloseTo(1)
    expect(current.angleTo(target)).toBeLessThanOrEqual(Math.PI)
  })

  it('uses the same orientation as the globe markers for geographic coordinates', () => {
    const position = geoPosition(-6.2, 106.8)

    expect(position.length()).toBeCloseTo(1.035)
    expect(position.toArray().every(Number.isFinite)).toBe(true)
  })
})
