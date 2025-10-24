import { useGlobalContext } from '../contexts/GlobalContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function ProfileProtected({ children }) {
  const { user } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/auth/log-in" />;
  if (user && location.state) navigate(location.state);
  return children;
}

export default ProfileProtected;
