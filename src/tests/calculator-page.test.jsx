import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import CalculatorPage from '../pages/CalculatorPage.jsx'

function renderPage() {
  render(<MemoryRouter><CalculatorPage /></MemoryRouter>)
}

describe('CalculatorPage', () => {
  it('shows an estimate and activity breakdown for valid inputs', () => {
    renderPage()
    fireEvent.change(screen.getByLabelText(/Jarak sepeda motor/), { target: { value: '10' } })
    fireEvent.change(screen.getByLabelText(/Penggunaan listrik/), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText(/Penggunaan AC/), { target: { value: '2' } })
    fireEvent.click(screen.getByRole('button', { name: /Hitung jejak karbon/ }))
    expect(screen.getByText(/6\.36/)).toBeInTheDocument()
    expect(screen.getByText(/Sepeda motor/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Hitung ulang/ })).toBeInTheDocument()
  })

  it('reports empty values instead of producing a result', () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /Hitung jejak karbon/ }))
    expect(screen.getByRole('alert')).toHaveTextContent(/nilai jarak yang valid/)
    expect(screen.getByText(/Hasilmu akan/)).toBeInTheDocument()
  })
})
