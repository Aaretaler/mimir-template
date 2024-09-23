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


const postCardFn = vitest.fn()
const deleteCardFn = vitest.fn()

const handlers = [
  http.get('/api/state', async () => {
    return HttpResponse.json({"cards":[{id:'99643a04-0496-44a2-9c4c-8951bd25cbc7',front:'Vergangenheit',back:'Past'},
        {id:'08a21edf-6c5f-41e2-8555-2d45b5274d83',front:'Gegenwart',back:'Present'},
        {id:'0e260762-3184-4906-8eee-f68e8890bf98',front:'Zukunft',back:'Future'},
        {id:'b3488022-0301-42df-afae-62de7d9a791d',front:'Time',back:'Zeit'},
        {id:'a71bc776-1612-44e9-af62-8d4f77927659',front:'Hour',back:'Stunde'},
        {id:'bae89037-a939-416e-9b90-1cc66d02fe3b',front:'Minute',back:'Minute'},
        {id:'986f9a5f-c10e-4de1-8f67-a1121d04e049',front:'Affe',back:'Ape'}],
      "game":{gameCards:[],cardIndex:0,answers:[]}})
  }),
  http.post('/api/card', async req => {
    const json = (await req.request.json()) as object
    postCardFn(json)
    return HttpResponse.json({
      ...json,
      id: crypto.randomUUID(),
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
  postCardFn.mockReset()
  deleteCardFn.mockReset()
  cleanup()
})

afterAll(() => server.close())


describe('Manage card', () => {
  test('Loading state with default cards', async () => {
    const user = userEvent.setup()
    render(<React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>)
    await user.click(screen.getByTestId('manage-cards'))

    const card = await screen.findByText(/Vergangenheit/)

    expect(card).toBeInTheDocument()

  })
  test('Adding card to cards', async () => {
    const user = userEvent.setup()
    render(<React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>)
    await user.click(screen.getByTestId('manage-cards'))

    const frontTextbox = screen.getByPlaceholderText(/Front/)

    const backTextbox = screen.getByPlaceholderText(/Back/)

    await user.type(frontTextbox, 'Mutter')

    await user.type(backTextbox, 'Mother')

    await user.click(screen.getByRole('button', { name: /Save/ }))


    await waitFor(() =>
      expect(postCardFn).toHaveBeenCalledWith({
        id: '',
        front: 'Mutter',
        back: 'Mother'
      }),
    )
  })
  test('Delete card from cards', async () => {
    const user = userEvent.setup()
    render(<React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>)
    await user.click(screen.getByTestId('manage-cards'))

    const card = screen.getByText(/Vergangenheit/)

    const div = card.parentElement!

    const div2 = div.parentElement!


    await user.click(within(div2).getByRole('button', { name: /Delete/ }))

    await waitFor(() => {
      expect(deleteCardFn).toHaveBeenCalledWith({
        id: "99643a04-0496-44a2-9c4c-8951bd25cbc7",
        front: "Vergangenheit",
        back: "Past"
      })
    })

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
    await user.click(screen.getByTestId('manage-cards'))

    const card = screen.getByText(/Vergangenheit/)

    const div = card.parentElement!

    const div2 = div.parentElement!


    await user.click(within(div2).getByRole('button', { name: /Delete/ }))

    expect(card).not.toBeInTheDocument()

  })
})
