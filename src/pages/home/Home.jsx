import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    function scrollObserver() {
      requestAnimationFrame(() => {
        document.querySelector('.header').classList.toggle('scroll-trigger', window.scrollY > 10);
      });
    }

    window.addEventListener('scroll', scrollObserver);
    return () => window.removeEventListener('scroll', scrollObserver);
  }, []);

  return (
    <div className="min-height-dvh grid grid-rows-[1fr_auto]">
      <Header />

      <div className="min-h-dvh pt-[50px] md:pt-15">
        <div className="h-full">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
