import { emissionFactors } from '../data/content.js'

export function calculateEmissions({ distance, electricity, acHours }) {
  const values = { distance, electricity, acHours }
  for (const [key, value] of Object.entries(values)) {
    if (value === '' || value === null || value === undefined || !Number.isFinite(Number(value)) || Number(value) < 0) {
      return { error: `Masukkan nilai ${key === 'distance' ? 'jarak' : key === 'electricity' ? 'listrik' : 'durasi AC'} yang valid (0 atau lebih).` }
    }
  }

  const motorcycle = Number(distance) * emissionFactors.motorcycleKgPerKm
  const household = Number(electricity) * emissionFactors.electricityKgPerKwh
  const airConditioning = Number(acHours) * emissionFactors.acKw * emissionFactors.electricityKgPerKwh
  const daily = motorcycle + household + airConditioning

  return {
    daily,
    annual: daily * 365,
    breakdown: [
      { label: 'Sepeda motor', value: motorcycle },
      { label: 'Listrik rumah', value: household },
      { label: 'Penggunaan AC', value: airConditioning },
    ],
  }
}
