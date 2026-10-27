import { describe, expect, it } from 'vitest'
import { calculateEmissions } from '../lib/calculator.js'

describe('calculateEmissions', () => {
  it('calculates daily and annual estimates from all activities', () => {
    const result = calculateEmissions({ distance: '10', electricity: '5', acHours: '2' })
    expect(result.daily).toBeCloseTo(6.36)
    expect(result.annual).toBeCloseTo(2321.4)
    expect(result.breakdown).toHaveLength(3)
  })

  it.each([
    { distance: '', electricity: 2, acHours: 1 },
    { distance: -1, electricity: 2, acHours: 1 },
    { distance: 'abc', electricity: 2, acHours: 1 },
  ])('rejects invalid input %#', (input) => {
    expect(calculateEmissions(input)).toHaveProperty('error')
  })
})
