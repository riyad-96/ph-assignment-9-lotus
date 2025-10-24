import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './contexts/GlobalContext';
import { ToastContainer } from 'kitzo/react';

function App() {
  const { appLoading } = useGlobalContext();

  return (
    <div className="bg-(--main-bg) font-[Outfit]">
      <Outlet />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
