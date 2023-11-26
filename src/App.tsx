import './App.css'
import { AppBar } from './pages/dockedViews/AppBar'
import { CardManager } from './pages/cardManager/CardManager.tsx'

function App() {
  return (
    <div className="app__container">
      <AppBar />
      <CardManager />
    </div>
  )
}

export default App
