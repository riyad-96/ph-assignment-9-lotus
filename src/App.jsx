import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './contexts/GlobalContext';
import { ToastContainer } from 'kitzo/react';
import { AnimatePresence } from 'motion/react';

function App() {
  const { interactionDisabled } = useGlobalContext();

  return (
    <div className="bg-(--main-bg) font-[Outfit]">
      <AnimatePresence>
        {interactionDisabled && (
          <div className="fixed inset-0 z-50 cursor-not-allowed bg-white/20"></div>
        )}
      </AnimatePresence>
      <Outlet />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
