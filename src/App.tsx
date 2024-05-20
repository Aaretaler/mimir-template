import styles from  './App.module.css'
import { AppBar } from './pages/dockedViews/AppBar'
import { CardManager } from './pages/cardManager/CardManager.tsx'

function App() {
  return (
    <div className={styles.app__container}>
      <AppBar />
      <CardManager />
    </div>
  )
}

export default App
