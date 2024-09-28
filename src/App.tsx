import { Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from './layout.tsx'
import { ResultPage } from './pages/ResultPage/ResultPage.tsx'
import { CardEditor } from './pages/cardEditor/cardEditor.tsx'
import { CardManager } from './pages/cardManager/CardManager.tsx'
import { GamePage } from './pages/gamePage/GamePage.tsx'
import { LoginPage } from './pages/loginPage/loginPage.tsx'
import ProtectedRoute from './ProtectedRoute'

function App() {
  console.log('App component rendered')
  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes: Only accessible if logged in */}
        <Route index element={<ProtectedRoute component={GamePage} />}/>
        <Route path="/result" element={<ProtectedRoute component={ResultPage} />}/>
        <Route path="/edit/:id" element={<ProtectedRoute component={CardEditor} />}/>
        <Route path="/cards" element={<ProtectedRoute component={CardManager} role="admin" />}/>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  )
}

export default App
