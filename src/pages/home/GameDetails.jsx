import { format } from 'date-fns';
import { toast } from 'kitzo/react';
import { Download, Star, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContext';

function GameDetails() {
  const { id } = useParams();

  const { setDownloads } = useGlobalContext();

  const [game, setGame] = useState({});
  const [gameLoading, setGameLoading] = useState(true);

  const [installed, setInstalled] = useState(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const apiRes = await fetch(`https://kitzo-apis.onrender.com/games/${id}`);
        const gameData = await apiRes.json();
        setGame(gameData.data);

        const installedGames = JSON.parse(localStorage.getItem('installed-games')) || [];
        setInstalled(installedGames.find((g) => g.id == gameData.data.id) || null);

        document.querySelector('title').textContent = `${gameData.data.title} • Lotus Play`;
      } catch (err) {
        document.querySelector('title').textContent = 'Loading error • Lotus Play';
        console.error(err);
      } finally {
        setGameLoading(false);
      }
    })();
  }, [id]);

  function getFakeInstallPromise(size) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, size);
    });
  }

  function installGame() {
    setInstalling(true);
    toast.promise(
      getFakeInstallPromise(game.size),
      {
        loading: `Installing ${game.title}`,
        success: () => {
          const installedGames = JSON.parse(localStorage.getItem('installed-games')) || [];
          installedGames.push(game);
          localStorage.setItem('installed-games', JSON.stringify(installedGames));
          setInstalled(game);
          setDownloads((prev) => [...prev, game]);
          setInstalling(false);
          return `${game.title} installed`;
        },
        error: () => {
          setInstalling(false);
          return 'Installation failed';
        },
      },
      { duration: 2500 },
    );
  }

  function uninstallGame() {
    const installedGames = JSON.parse(localStorage.getItem('installed-games')) || [];
    const filtered = installedGames.filter((g) => g.id != game.id);
    localStorage.setItem('installed-games', JSON.stringify(filtered));
    setDownloads((prev) => prev.filter((g) => g.id != game.id));
    setInstalled(null);
    toast.success(`${game.title} uninstalled`, { duration: 2500 });
  }

  if (gameLoading) {
    document.querySelector('title').textContent = `Details • Lotus Play`;
    return (
      <div className="h-full">
        <div className="mx-auto grid h-full max-w-[1100px] place-items-center">
          <span className="loading-dots loading loading-xl opacity-60"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-(--details-banner-bg) px-2 text-white md:px-4">
        <div className="relative mx-auto max-w-[1100px]">
          <div className="absolute inset-0 z-1">
            <div className="relative ml-auto aspect-video max-md:max-w-[600px] md:max-w-[700px]">
              <img className="size-full object-cover" src={game.coverPhoto} alt="Cover photo" />
              <span className="left-mask absolute inset-0 bg-(--details-banner-bg)" />
              <span className="bottom-mask absolute inset-0 bg-(--details-banner-bg)" />
            </div>
          </div>

          <div className="relative z-3 pb-8">
            <div className="h-[250px] md:h-[250px]" />
            <div className="space-y-6">
              <h1 className="mb-2 text-4xl font-semibold max-sm:text-2xl">{game.title}</h1>

              <div className="grid leading-4">
                <span className="text-sm text-(--accent)">{game.developer}</span>
                <span className="text-xs font-light">
                  {game.inAppPurchase ? 'In-app purchases' : 'Free'}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="size-10 overflow-hidden rounded-md">
                  <img className="size-full object-cover" src={game.icon.lowRes} alt={game.title} />
                </div>

                <div className="flex items-center">
                  <div className="grid justify-items-center">
                    <span className="flex items-center gap-1">
                      <span className="text-sm">{game.ratings.toFixed(1)}</span>
                      <span>{<Star size="12" fill="currentColor" />}</span>
                    </span>

                    <span className="text-xs font-light tracking-wide opacity-70">
                      {(() => {
                        if (game.reviews > 1000000) return `${game.reviews / 1000000}M reviews`;
                        else if (game.reviews > 1000) return `${game.reviews / 1000}K reviews`;
                        else return `${game.reviews} reviews`;
                      })()}
                    </span>
                  </div>

                  <div className="mx-4 h-5 w-px bg-white/30" />

                  <div className="grid justify-items-center">
                    <span className="flex items-center gap-1">
                      <span className="text-sm">
                        {(() => {
                          if (game.downloads > 1000000) return `${game.downloads / 1000000}M+`;
                          else if (game.downloads > 1000) return `${game.downloads / 1000}K+`;
                          else return `${game.downloads}`;
                        })()}
                      </span>
                    </span>

                    <span className="text-xs font-light tracking-wide opacity-70">Downloads</span>
                  </div>

                  <div className="mx-4 h-5 w-px bg-white/30" />

                  <div className="grid justify-items-center">
                    <div className="size-5 p-1">
                      {(() => {
                        if (game.ageRating >= 17)
                          return (
                            <img className="size-full object-cover" src="/M.webp" alt="Mature" />
                          );
                        else if (game.ageRating >= 12 && game.ageRating < 17)
                          return (
                            <img className="size-full object-cover" src="/T.webp" alt="Teen" />
                          );
                        else if (game.ageRating < 12)
                          return (
                            <img className="size-full object-cover" src="/E.webp" alt="Everyone" />
                          );
                      })()}
                    </div>
                    <span className="text-xs font-light tracking-wide opacity-70">
                      {(() => {
                        if (game.ageRating >= 17) return 'Mature';
                        else if (game.ageRating >= 12 && game.ageRating < 17) return 'Teen';
                        else if (game.ageRating < 12) return 'Everyone';
                      })()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {installed ? (
                  <>
                    <button
                      onClick={uninstallGame}
                      className="flex h-[35px] items-center gap-2 rounded-md border border-zinc-700 bg-transparent px-5 font-medium tracking-wide text-(--accent)"
                    >
                      <span>Uninstall</span>
                      <span>
                        <Trash size="16" />
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={installGame}
                      className="relative flex h-[35px] w-30 items-center justify-center gap-2 overflow-hidden rounded-md border border-(--accent) bg-(--accent) font-medium tracking-wide text-(--details-banner-bg)"
                    >
                      {installing ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <>
                          <span>Install</span>
                          <span>
                            <Download size="16" />
                          </span>
                        </>
                      )}

                      <span
                        style={{
                          transition: `width ${game.size}ms linear`,
                        }}
                        className={`absolute bottom-0 left-0 block h-0.5 bg-white ${installing ? 'w-full' : 'w-0'}`}
                      ></span>
                    </button>
                    <span className="text-sm font-light tracking-wide">
                      <span>Size: </span>
                      <span className="font-normal">
                        {(() => {
                          if (game.size > 1024) return `${(game.size / 1024).toFixed(2)}GB`;
                          else return `${game.size}MB`;
                        })()}
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-2 md:px-4">
        <div className="mx-auto max-w-[1100px] py-8">
          <div className="relative">
            <span className="absolute bottom-0 left-0 ml-2 rounded-md bg-black/10 px-2 py-0.5 text-xs font-medium tracking-wide pointer-coarse:hidden">
              Shift + wheel
            </span>
            <div className="hide-scrollbar flex w-[clamp(16.75rem,-1.5493rem+97.5962vw,67.5rem)] overflow-x-auto pb-6">
              {game.morePhotos.map((url, i) => (
                <div key={i} className="relative shrink-0 rounded-md p-2 hover:bg-zinc-200">
                  <span className="absolute inset-0 z-2 select-none"></span>
                  <div className="rounded-xl bg-zinc-200">
                    <img
                      className="max-h-[200px] rounded-xl object-contain md:max-h-[300px]"
                      src={url}
                      alt={game.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <h2 className="mb-2 text-lg font-medium md:text-xl">Description</h2>
            <div>
              <div className="leading-5 whitespace-pre-line opacity-90">{game.description}</div>
            </div>

            <div className="mt-10 flex gap-8">
              <div className="grid leading-5">
                <span className="font-medium">Updated on</span>
                <span className="text-sm opacity-80">{format(game.updatedOn, 'MMM d, y')}</span>
              </div>

              <div className="grid leading-5">
                <span className="font-medium">Available on</span>
                <span className="text-sm opacity-80">
                  {(() => {
                    const [device, device1] = game.availableOn;
                    return (
                      <>
                        <span className="capitalize">{device}</span>,
                        <span className="ml-1 capitalize">{device1}</span>
                      </>
                    );
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GameDetails;
