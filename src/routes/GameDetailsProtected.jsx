import { useGlobalContext } from '../contexts/GlobalContext';
import { Navigate, useLocation } from 'react-router-dom';

function GameDetailsProtected({ children }) {
  const location = useLocation();

  const { user } = useGlobalContext();
  if (!user) {
    return <Navigate to="/auth/log-in" state={location.pathname} />;
  }
  return children;
}

export default GameDetailsProtected;
