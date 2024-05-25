import { Route, Routes } from 'react-router-dom'
import { CardManager } from './pages/cardManager/CardManager.tsx'
import { CardEditor } from './pages/cardEditor/cardEditor.tsx'
import { Layout } from './layout.tsx'
import { GamePage } from './pages/gamePage/GamePage.tsx'

function App() {
  console.log('App component rendered')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GamePage/>}></Route>
        <Route path ="/cards" element={<CardManager />}></Route>
        <Route path = "/edit/:id" element={<CardEditor/>}></Route>
      </Route>
    </Routes>
  )
}

export default App
