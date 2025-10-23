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
      <div className="py-16">
        {games.length > 0 && <HomeSlider gamesArray={games} />}
      </div>
    </div>
  );
}

export default HomeIndex;
