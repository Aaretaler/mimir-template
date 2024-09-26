import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from './store/Context'

interface ProtectedRouteProps {
  children: JSX.Element
  role?: string
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useContext(AppContext)

  if (!user || !user.accessToken) {
    return <Navigate to="/login" replace />
  }

  if (role && !user.roles.includes(role)) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
