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
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <CardEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cards"
          element={
            <ProtectedRoute role="admin">
              <CardManager />
            </ProtectedRoute>
          }
        />
        <Route
          index
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  )
}

export default App
