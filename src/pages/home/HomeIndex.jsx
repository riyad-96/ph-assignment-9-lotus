import { useEffect, useState } from 'react';
import HomeSlider from '../../components/sliders/HomeSlider';

// Swiper

function HomeIndex() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://kitzo-apis.onrender.com/games');
      const data = await res.json();
      setGames(data.data);
    })();
  }, []);

  return (
    <div className="">
      <title>Home • Lotus Play</title>
      <section className="py-8">
        <h2 className="mb-2 pl-4 text-lg font-medium md:text-xl">Trending Games</h2>
        {games.length > 0 && <HomeSlider gamesArray={games} />}
      </section>

      <section>
        <h2 className="mb-2 pl-4 text-lg font-medium md:text-xl">Popular Games</h2>
        <div >
          
        </div>
      </section>
    </div>
  );
}

export default HomeIndex;
