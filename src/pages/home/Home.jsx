import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Home() {
  return (
    <div className="grid min-height-dvh grid-rows-[1fr_auto]">
      <Header />

      <div className="h-full px-2 pt-10 md:px-4 md:pt-15">
        <div className="mx-auto h-full max-w-[1100px]">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
