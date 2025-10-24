import { useGlobalContext } from '../contexts/GlobalContext';
import AppLoading from '../loading/AppLoading';

function AppLoadingProtected({ children }) {
  const { appLoading } = useGlobalContext();
  if (appLoading) {
    return <AppLoading />;
  }
  return children;
}

export default AppLoadingProtected;
