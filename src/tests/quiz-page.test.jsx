import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import QuizPage from '../pages/QuizPage.jsx'

describe('QuizPage', () => {
  beforeEach(() => localStorage.clear())

  it('requires every answer before showing the final score', () => {
    render(<MemoryRouter><QuizPage /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Mulai kuis' }))

    for (let index = 0; index < 5; index += 1) {
      fireEvent.click(screen.getAllByRole('button', { name: /^[A-D]/ })[0])
      if (index < 4) fireEvent.click(screen.getByRole('button', { name: /Berikutnya/ }))
      if (index < 4) expect(screen.queryByText('PERJALANAN SELESAI')).not.toBeInTheDocument()
    }

    expect(screen.getByText('PERJALANAN SELESAI')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ulangi kuis/ })).toBeInTheDocument()
  })
})
