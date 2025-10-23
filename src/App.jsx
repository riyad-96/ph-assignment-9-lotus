import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './contexts/GlobalContext';

function App() {
  const { appLoading } = useGlobalContext();

  return (
    <div className="bg-(--main-bg) font-[Outfit]">
      <Outlet />
    </div>
  );
}

export default App;
