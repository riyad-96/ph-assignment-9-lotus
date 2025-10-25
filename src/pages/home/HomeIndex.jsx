import { useEffect } from 'react';
import HomeSlider from '../../components/sliders/HomeSlider';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AllGamesSection from '../../components/home/AllGamesSection';
import { useGlobalContext } from '../../contexts/GlobalContext';
import SkeletonPopularCard from '../../loading/SkeletonPopularCard';
import SkeletonAllAppSection from '../../loading/SkeletonAllAppSection';

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
                {top9Games.map((g, i) => {
                  const { id, title, icon, ratings, category } = g;
                  return (
                    <div key={`popular${id}`} className="group relative rounded-md px-4 py-3">
                      <Link className="absolute inset-0 z-3" to={`/details/${id}`} />
                      <span className="absolute inset-0 z-1 block scale-80 rounded-lg bg-zinc-200 opacity-0 transition-[opacity,scale] duration-250 pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100"></span>

                      <div className="relative z-2 flex items-center gap-3">
                        <div>
                          <span className="text-sm text-zinc-600">{i + 1}</span>
                        </div>
                        <div className="size-15 overflow-hidden rounded-lg shadow-md">
                          <img src={icon.lowRes} alt="" />
                        </div>
                        <div className="grid leading-5">
                          <h3 className="line-clamp-1 font-medium">{title}</h3>
                          <span className="text-sm text-zinc-600">{category}</span>
                          <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                            <span>{ratings}</span>
                            <span>
                              <Star size="12" fill="currentColor" />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
