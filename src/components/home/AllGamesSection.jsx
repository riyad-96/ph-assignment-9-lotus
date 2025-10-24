import { Star } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import EachGameCard from './EachGameCard';

function AllGamesSection({ games, categories }) {
  const [allGames, setAllGames] = useState(games.map((g) => g));
  const timeout = useRef(null);
  const [searching, setSearching] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  function searchGamesWithTitle(title) {
    setSearching(true);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(async () => {
      if (!title.trim()) {
        setAllGames(games.map((g) => g));
        setSearching(false);
        return;
      }
      try {
        const apiRes = await fetch(`https://kitzo-apis.onrender.com/games?title=${title.trim()}`);
        const matchedGames = await apiRes.json();
        setAllGames(matchedGames.data);
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(false);
      }
    }, 500);
  }

  const categoriesContainer = useRef(null);

  useLayoutEffect(() => {
    let scroll = 0;

    function horizontalScroll(e) {
      e.preventDefault();

      scroll = scroll + e.deltaY;

      const scrollWidth = categoriesContainer.current.scrollWidth;
      const clientWidth = categoriesContainer.current.clientWidth;
      const maxWidth = scrollWidth - clientWidth;

      if (scroll < 0) scroll = 0;
      if (scroll > maxWidth) scroll = maxWidth;

      categoriesContainer.current.scrollTo({
        left: scroll,
        behavior: 'smooth',
      });
    }

    categoriesContainer.current.addEventListener('wheel', horizontalScroll);
    return () => {
      categoriesContainer.current.removeEventListener('wheel', horizontalScroll);
    };
  }, []);

  useEffect(() => {
    if (currentCategory.toLowerCase() === 'all') {
      setAllGames(games.map((g) => g));
      return;
    }
    (async () => {
      setSearching(true);
      try {
        const queryRes = await fetch(
          `https://kitzo-apis.onrender.com/games?category=${currentCategory.toLowerCase()}`,
        );
        const queryData = await queryRes.json();
        setAllGames(queryData?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(false);
      }
    })();
  }, [currentCategory]);

  return (
    <>
      <div>
        <input
          onChange={(e) => searchGamesWithTitle(e.target.value)}
          className="w-full min-w-0 rounded-md bg-white px-5 py-3 tracking-wide shadow-xs transition-shadow outline-none placeholder:text-zinc-500 focus:shadow md:px-6"
          type="text"
          placeholder="Search for games"
        />
      </div>

      <div
        ref={categoriesContainer}
        className="hide-scrollbar scroll flex w-[clamp(16.75rem,-1.5493rem+97.5962vw,67.5rem)] overflow-x-auto p-1 py-3"
      >
        <div className="flex gap-2">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              className={`rounded-full bg-white px-4 py-1 text-sm font-light text-nowrap shadow-xs ${currentCategory.toLowerCase() === c.toLowerCase() ? 'outline-2 outline-(--accent)' : 'outline-black/0'}`}
              onClick={() => setCurrentCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {searching ? (
        <div className="grid min-h-[350px] place-items-center md:min-h-[600px]">
          <span className="loading loading-spin loading-xl opacity-70"></span>
        </div>
      ) : (
        <>
          {allGames.length < 1 ? (
            <div className="grid min-h-[350px] place-items-center text-center max-sm:text-sm md:min-h-[600px]">
              <span>No games found! try other games</span>
            </div>
          ) : (
            <div className="grid min-h-[350px] grid-cols-2 sm:grid-cols-3 md:min-h-[600px] md:grid-cols-4 lg:grid-cols-5">
              {allGames.map((g,i) => (
                <EachGameCard key={`eachGameCard${i}`} g={g} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AllGamesSection;
