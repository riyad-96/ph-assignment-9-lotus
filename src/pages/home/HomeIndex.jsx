import { useEffect } from 'react';
import HomeSlider from '../../components/sliders/HomeSlider';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AllGamesSection from '../../components/home/AllGamesSection';
import { useGlobalContext } from '../../contexts/GlobalContext';
import SkeletonPopularCard from '../../loading/SkeletonPopularCard';
import SkeletonAllAppSection from '../../loading/SkeletonAllAppSection';
import EachPopularGameCard from '../../components/home/EachPopularGameCard';

function HomeIndex() {
  const { dataLoading, allGames, top9Games, categories } = useGlobalContext();

  useEffect(() => {
    document.querySelector('title').textContent = 'Home • Lotus Play';
  }, []);

  return (
    <div className="home scroll-mt-50 px-2 md:px-4">
      <div className="mx-auto max-w-[1100px]">
        <title>Home • Lotus Play</title>

        <section className="py-8">
          <h2 className="mb-2 pl-4 text-lg font-medium md:text-xl">Trending Games</h2>
          {dataLoading ? (
            <div className="flex h-[clamp(9.6875rem,3.0208rem+35.5556vw,29.6875rem)] gap-4 overflow-x-hidden">
              <div className="h-full min-w-[75%] flex-1 animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-full min-w-[75%] flex-1 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          ) : (
            <>{allGames.length > 0 && <HomeSlider gamesArray={allGames} />}</>
          )}
        </section>

        <section>
          <h2 className="mb-2 pl-4 text-lg font-medium md:text-xl">Popular Games</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {dataLoading ? (
              <>
                {Array.from({ length: 9 }).map((_, i) => (
                  <SkeletonPopularCard key={i} />
                ))}
              </>
            ) : (
              <>
                {top9Games.map((g, i) => (
                  <EachPopularGameCard key={`popular${i}`} g={g} i={i} />
                ))}
              </>
            )}
          </div>
        </section>

        <section className="space-y-4 pt-8 md:pt-16">
          <h2 className="pl-4 text-lg font-medium md:text-xl">All Games</h2>

          {dataLoading ? (
            <SkeletonAllAppSection />
          ) : (
            <>
              <AllGamesSection games={allGames} categories={categories} />
            </>
          )}
        </section>

        <section className="pt-8 md:pt-16">
          <div className="rounded-md bg-(--news-letter-bg) px-4 py-8">
            <h2 className="text-center text-2xl font-medium md:text-3xl">Join our newsletter</h2>
            <p className="text-center text-(--pale-dark-blue) max-md:leading-5 md:text-lg">
              Get the latest news, opportunities, and updates straight to your inbox
            </p>

            <form className="pt-8">
              <div className="pb-4">
                <input
                  className="w-full min-w-0 rounded-full bg-white px-6 py-3 tracking-wide outline-none placeholder:text-zinc-500 md:text-lg"
                  required
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>
              <button
                className="block w-fit rounded-full bg-white px-8 py-3 text-sm font-medium tracking-wide text-(--pale-dark-blue) max-md:ml-auto md:mx-auto"
                type="reset"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomeIndex;
