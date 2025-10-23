import { useEffect, useState } from 'react';
import HomeSlider from '../../components/sliders/HomeSlider';

// Swiper

function HomeIndex() {
  const [games, setGames] = useState([]);
  const [top9Games, setTop9Games] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://kitzo-apis.onrender.com/games');
      const data = await res.json();
      setGames(data.data);
      setTop9Games(data.data.sort((a, b) => b.ratings - a.ratings).slice(0, 9));
    })();

    function scrollObserver() {
      requestAnimationFrame(() => {
        document.querySelector('.header').classList.toggle('scroll-trigger', window.scrollY > 10);
      });
    }

    window.addEventListener('scroll', scrollObserver);
    return () => window.removeEventListener('scroll', scrollObserver);
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
        <div>
          {top9Games.map((g) => {
            const { id, title, coverPhoto, icon, ratings, category } = g;
            console.log(g);
            return (
              <div key={id}>
                <div></div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HomeIndex;
