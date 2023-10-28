import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;
