import * as THREE from 'three'

export const DEFAULT_GLOBE_ROTATION = new THREE.Euler(0.12, -0.55, 0.04)

export function geoPosition(lat, lon, radius = 1.035) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

export function getHotspotFacingQuaternion(localPosition, currentQuaternion, cameraPosition) {
  const hotspotDirection = localPosition.clone().normalize().applyQuaternion(currentQuaternion)
  const cameraDirection = cameraPosition.clone().normalize()
  const alignment = new THREE.Quaternion().setFromUnitVectors(hotspotDirection, cameraDirection)

  return alignment.multiply(currentQuaternion.clone()).normalize()
}
