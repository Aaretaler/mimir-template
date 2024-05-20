import styles from './App.module.css'
import { Route, Routes } from 'react-router-dom'
import { AppBar } from './pages/dockedViews/AppBar'
import { CardManager } from './pages/cardManager/CardManager.tsx'
import { CardEditor } from './pages/cardEditor/cardEditor.tsx'
import { Layout } from './layout.tsx'

function App() {
  console.log('App component rendered')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CardManager />}></Route>
        <Route path = "/game" element={<div> game </div>}></Route>
        <Route path = "/edit" element={<CardEditor/>}></Route>
      </Route>
    </Routes>
  )
}

export default App
