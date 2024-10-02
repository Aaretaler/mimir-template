import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import App from '../App.tsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../store/Context.tsx'

const handlers = [
  http.get('/api/state', () => {
    return HttpResponse.json({
      cards: [],
      game: { gameCards: [], cardIndex: 0, answers: [] }
    })
  }),
  http.post('/api/login', () => {
    return HttpResponse.json({
      accessToken: 'fake-token',
      username: 'player',
      roles: ['player']
    })
  }),
  http.post('/api/game/:username', () => {
    return HttpResponse.json({
      gameCards: [
        { id: 'a7826691-3b8f-4654-88e8-e1a5b080a72c', front: 'Minute', back:'' },
        { id: '12bd3841-ba80-4997-82f7-fd44bacf7f02', front: 'Gegenwart', back:'' },
        { id: '8211b34c-75d5-4945-87c9-6d55c490ab8a', front: 'Hour', back:'' },
        { id: 'eb5ae3de-10f6-4b34-9292-58d2f882cff9', front: 'Affe', back:'' }
      ],
      cardIndex: 0,
      answers: []
    })
  }),
  http.delete('/api/game/:username', () => {
    return HttpResponse.json({ message: 'Game deleted successfully' })
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => cleanup())
afterAll(() => server.close())

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function loginUser(user: userEvent.UserEvent) {
  await user.click(screen.getByRole('button', { name: /Logout/ }))
  await user.type(screen.getByPlaceholderText(/Username/), 'player')
  await user.type(screen.getByPlaceholderText(/Password/), 'player')
  await user.click(screen.getByRole('button', { name: /Login/ }))
  await waitFor(() => expect(screen.queryByText(/Invalid Credentials/)).not.toBeInTheDocument())
}

describe('Manage Game', () => {
  test('Create new game', async () => {
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

    await loginUser(user)
    await user.click(screen.getByRole('button', { name: /Start New Game/ }))

    const card = await screen.findByText(/Minute/)
    expect(card).toBeInTheDocument()
  })

  test('Delete running game', async () => {
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

    await loginUser(user)
    await user.click(screen.getByRole('button', { name: /Start New Game/ }))
    await waitFor(() => expect(screen.getByText(/Minute/)).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /Delete Game/ }))

    const message = await screen.findByText(/No game running./)
    expect(message).toBeInTheDocument()
  })
})