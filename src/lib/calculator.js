import { emissionFactors } from '../data/content.js'

function normalizeNumberInput(value) {
  if (value === null || value === undefined || typeof value === 'boolean') return null
  const normalized = typeof value === 'string' ? value.trim() : value
  if (normalized === '' || !Number.isFinite(Number(normalized))) return null
  return Number(normalized)
}

export function calculateEmissions({ distance, electricity, acHours }) {
  const values = { distance, electricity, acHours }
  const parsedValues = {}

  for (const [key, value] of Object.entries(values)) {
    const numberValue = normalizeNumberInput(value)
    if (numberValue === null || numberValue < 0) {
      return { error: `Masukkan nilai ${key === 'distance' ? 'jarak' : key === 'electricity' ? 'listrik' : 'durasi AC'} yang valid (0 atau lebih).` }
    }
    parsedValues[key] = numberValue
  }

  const motorcycle = parsedValues.distance * emissionFactors.motorcycleKgPerKm
  const household = parsedValues.electricity * emissionFactors.electricityKgPerKwh
  const airConditioning = parsedValues.acHours * emissionFactors.acKw * emissionFactors.electricityKgPerKwh
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
