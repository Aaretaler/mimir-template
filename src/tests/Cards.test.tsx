import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import App from '../App.tsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../store/Context.tsx'

const deleteCardFn = vi.fn()
const postCardFn = vi.fn()

const handlers = [
  http.get('/api/state', () => {
    return HttpResponse.json({
      cards:[
        {id:'99643a04-0496-44a2-9c4c-8951bd25cbc7',front:'Vergangenheit',back:'Past'},
        {id:'08a21edf-6c5f-41e2-8555-2d45b5274d83',front:'Gegenwart',back:'Present'},
      ],
      game:{gameCards:[],cardIndex:0,answers:[]}
    })
  }),
  http.post('/api/login', () => {
    return HttpResponse.json({
      accessToken: 'fake-token',
      username: 'admin',
      roles: ['admin']
    })
  }),
  http.post('/api/card', async ({ request }) => {
    const json = await request.json()
    postCardFn(json)
    return HttpResponse.json({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ...json,
      id: 'new-card-id',
    })
  }),
  http.delete('/api/card', async req => {
    const json = (await req.request.json()) as object
    deleteCardFn(json)
    return HttpResponse.json({
      ...json,
    })
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  deleteCardFn.mockClear()
  postCardFn.mockClear()
  cleanup()
})
afterAll(() => server.close())

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function loginUser(user: userEvent.UserEvent) {
  await user.click(screen.getByRole('button', { name: 'Anmelden' }))
  await user.type(screen.getByPlaceholderText(/Username/), 'admin')
  await user.type(screen.getByPlaceholderText(/Password/), 'admin')
  await user.click(screen.getByRole('button', { name: 'Login' }))
  await waitFor(() => expect(screen.queryByText(/Invalid Credentials/)).not.toBeInTheDocument())
}

describe('Manage card', () => {
  test('Loading state with default cards', async () => {
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
    await user.click(screen.getByTestId('manage-cards'))

    const card = await screen.findByText(/Vergangenheit/)
    expect(card).toBeInTheDocument()
  })

  test('Adding card to cards', async () => {
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
    await user.click(screen.getByTestId('manage-cards'))

    await user.type(screen.getByPlaceholderText(/Front/), 'Mutter')
    await user.type(screen.getByPlaceholderText(/Back/), 'Mother')
    await user.click(screen.getByRole('button', { name: /Save/ }))

    await waitFor(() =>
      expect(postCardFn).toHaveBeenCalledWith({
        id: '',
        front: 'Mutter',
        back: 'Mother'
      })
    )
  })

  test('Delete card from UI', async () => {
    const user = userEvent.setup()
    render(<React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>)
    await loginUser(user)
    await user.click(screen.getByTestId('manage-cards'))

    const card = screen.getByText(/Vergangenheit/)

    const div = card.parentElement!

    const div2 = div.parentElement!


    await user.click(within(div2).getByRole('button', { name: /Delete/ }))

    expect(card).not.toBeInTheDocument()

  })
})