import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import App from '../App.tsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../store/Context.tsx'

const loginPlayerFn = vi.fn()

const handlers = [
  http.post('/api/login', async ({ request }) => {
    const json = await request.json()
    loginPlayerFn(json)
    return HttpResponse.json({
      accessToken: 'qwerty',
      username: 'player',
      roles: ['player']
    })
  }),
  http.get('/api/state', () => {
    return HttpResponse.json({
      cards: [],
      game: { gameCards: [], cardIndex: 0, answers: [] }
    })
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  loginPlayerFn.mockClear()
  cleanup()
})
afterAll(() => server.close())

describe('Login', () => {
  test('Login player', async () => {
    const user = userEvent.setup()
    render(
      <React.StrictMode>
        <BrowserRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </BrowserRouter>
      </React.StrictMode>
    )
    await user.click(screen.getByRole('button', { name: /Logout/ }))
    // Ensure we're on the login page
    expect(screen.getByPlaceholderText(/Username/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText(/Username/), 'player')
    await user.type(screen.getByPlaceholderText(/Password/), 'player')

    await user.click(screen.getByRole('button', { name: /Login/ }))

    await waitFor(() => {
      expect(loginPlayerFn).toHaveBeenCalledWith({
        username: "player",
        password: "player"
      })
    })

    // Check that we've navigated away from the login page
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/Username/)).not.toBeInTheDocument()
      expect(screen.queryByPlaceholderText(/Password/)).not.toBeInTheDocument()
    })

    // Check that we're on the main page
    expect(screen.getByText(/Start New Game/)).toBeInTheDocument()
  })

  test('Failed login', async () => {
    // Override the handler for this test to simulate a failed login
    server.use(
      http.post('/api/login', () => {
        return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      })
    )

    const user = userEvent.setup()
    render(
      <React.StrictMode>
        <BrowserRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </BrowserRouter>
      </React.StrictMode>
    )
    await user.click(screen.getByRole('button', { name: /Logout/ }))
    await user.type(screen.getByPlaceholderText(/Username/), 'wronguser')
    await user.type(screen.getByPlaceholderText(/Password/), 'wrongpass')

    await user.click(screen.getByRole('button', { name: /Login/ }))

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/Invalid Credentials/)).toBeInTheDocument()
    })

    // Ensure we're still on the login page
    expect(screen.getByPlaceholderText(/Username/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument()
  })
})