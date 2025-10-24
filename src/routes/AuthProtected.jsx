import { useGlobalContext } from '../contexts/GlobalContext';
import { Navigate, useLocation } from 'react-router-dom';

function AuthProtected({ children }) {
  const { user } = useGlobalContext();
  const location = useLocation();

  if (user) {
    if (location.state) return <Navigate to={location.state} replace />;
    else return <Navigate to="/" replace />;
  } else {
    return children;
  }
}

export default AuthProtected;
