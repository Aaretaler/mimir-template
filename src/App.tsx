import { Route, Routes } from 'react-router-dom'
import { Layout } from './layout.tsx'
import { ResultPage } from './pages/ResultPage/ResultPage.tsx'
import { CardEditor } from './pages/cardEditor/cardEditor.tsx'
import { CardManager } from './pages/cardManager/CardManager.tsx'
import { GamePage } from './pages/gamePage/GamePage.tsx'
import { LoginPage } from './pages/loginPage/loginPage.tsx'

function App() {
  console.log('App component rendered')
  return (
    // TODO route all paths to login page when not logged in
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GamePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/result" element={<ResultPage />}></Route>
        <Route path="/cards" element={<CardManager />}></Route>
        <Route path="/edit/:id" element={<CardEditor />}></Route>
      </Route>
    </Routes>
  )
}

export default App
