
import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AppContext } from './store/Context';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  role?: string
  [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, role, ...rest }) => {
  const { user, isLoading } = useContext(AppContext)
  
  console.warn("isLoading: " + isLoading)
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  console.warn("user: " + JSON.stringify(user))
  console.warn("accessToken: " + JSON.stringify(user ? user.accessToken : "null"))

  if (!user || !user.accessToken) {
    return <Navigate to="/login" />
  }

  if (role && !user.roles.includes(role)) {
    return <Navigate to="/login" />
  }
  return <Component {...rest} />

};

export default ProtectedRoute;
