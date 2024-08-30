import { Route, Routes } from 'react-router-dom'
import { Layout } from './layout.tsx'
import { ResultPage } from './pages/ResultPage/ResultPage.tsx'
import { CardEditor } from './pages/cardEditor/cardEditor.tsx'
import { CardManager } from './pages/cardManager/CardManager.tsx'
import { GamePage } from './pages/gamePage/GamePage.tsx'
//import { AppProvider } from './context/AppContext'
import { AppProvider } from './store/Context.tsx'
import { useEffect, useState } from 'react'
import { AppState } from './models/AppState'

function App() {
  const [initialData, setInitialData] = useState<AppState | null>(null)
  const url = 'api/state'

  useEffect(() => {
    const abortController = new AbortController()
    fetch(url, { signal: abortController.signal })
      .then(response => {
        if (!response.ok) {
          throw Error('failed to fetch data for that resource')
        }
        return response.json()
      })
      .then(data => {
        setInitialData(data)
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          console.error('Fetch error:', err)
        }
      })

    return () => abortController.abort()
  }, [url])

  if (!initialData) {
    return <div>Loading...</div> 
  }

  return (
    <AppProvider initialData={initialData}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GamePage />}></Route>
          <Route path="/result" element={<ResultPage />}></Route>
          <Route path="/cards" element={<CardManager />}></Route>
          <Route path="/edit/:id" element={<CardEditor />}></Route>
        </Route>
      </Routes>
    </AppProvider>
  )
}

export default App

/* import { Route, Routes } from 'react-router-dom'
import { Layout } from './layout.tsx'
import { ResultPage } from './pages/ResultPage/ResultPage.tsx'
import { CardEditor } from './pages/cardEditor/cardEditor.tsx'
import { CardManager } from './pages/cardManager/CardManager.tsx'
import { GamePage } from './pages/gamePage/GamePage.tsx'


function App() {
  console.log('App component rendered')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GamePage />}></Route>
        <Route path="/result" element={<ResultPage />}></Route>
        <Route path="/cards" element={<CardManager />}></Route>
        <Route path="/edit/:id" element={<CardEditor />}></Route>
      </Route>
    </Routes>
  )
}

export default App */
