import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './contexts/GlobalContext';

function App() {
  const { appLoading } = useGlobalContext();

  useEffect(() => {
    console.log(appLoading);
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
