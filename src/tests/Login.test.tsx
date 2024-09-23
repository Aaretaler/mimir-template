import '@testing-library/jest-dom/vitest'
import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vitest,
} from 'vitest'
import App from '../App.tsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../store/Context.tsx'

const loginPlayerFn = vitest.fn()

const handlers = [
  http.post('/api/login', async req => {
    const json = (await req.request.json()) as object
    loginPlayerFn(json)
    return HttpResponse.json({
      accessToken: 'qwerty',
      username: 'player',
      roles: ['player']
    })
  }),
]


const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => {
  cleanup()
})

afterAll(() => server.close())



describe('Login', () => {
  test('Login player', async () => {
    const user = userEvent.setup()
    render(<React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>)
    await user.click(screen.getByRole('button', { name: /Login/ }))

    const usernameTextbox = screen.getByPlaceholderText(/Username/)

    const passwordTextbox = screen.getByPlaceholderText(/Password/)

    await user.type(usernameTextbox, 'player')

    await user.type(passwordTextbox, 'player')

    const div = usernameTextbox.parentElement!

    await user.click(within(div).getByRole('button', { name: /Login/ }))

    await waitFor(() => {
      expect(loginPlayerFn).toHaveBeenCalledWith({
        username: "player",
        password: "player"
      })
    })
  })
})