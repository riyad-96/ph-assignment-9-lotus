// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// React
import { useState } from 'react';
import { Gamepad2, Sword, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomeSlider({ gamesArray }) {
  const [recommendedGames, setRecommendedGames] = useState(() => {
    return gamesArray
      .map((g) => ({ random: Math.random(), obj: g }))
      .sort((a, b) => a.random - b.random)
      .map((gObj) => gObj.obj)
      .slice(0, 5);
  });

  return (
    <Swiper
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination, Autoplay]}
      slidesPerView={1.4}
      centeredSlides={false}
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
      }}
      speed={600}
      loop
      className="mySwiper w-[clamp(17.125rem,-1.625rem+100vw,46.375rem)] [--swiper-pagination-color:#00bc7d] md:w-[clamp(16.75rem,-1.5493rem+97.5962vw,67.5rem)]"
    >
      {recommendedGames.map((g, i) => {
        const {
          id,
          title,
          description,
          icon,
          coverPhoto,
          morePhotos,
          ratings,
          downloadLink,
          developer,
          category,
        } = g;
        console.log(g);
        return (
          <SwiperSlide key={i}>
            <div className="pb-8">
              <div className="relative rounded-lg p-2.5 pointer-fine:hover:bg-zinc-200">
                <Link to={`/details/${id}`} className="absolute inset-0 z-4" />

                <div className="relative rounded-xl bg-black text-white">
                  <div className="home-slider-mask-image aspect-video overflow-hidden">
                    <img className="size-full object-cover" src={coverPhoto} alt={title} />
                  </div>

                  <div className="absolute inset-0 flex items-end">
                    <div className="flex flex-1 items-center gap-3 p-3 md:p-5">
                      <div>
                        <div className="size-10 overflow-hidden rounded-lg md:size-15">
                          <img className="size-full object-cover" src={icon.lowRes} alt="" />
                        </div>
                      </div>

                      <div className="max-md:leading-5">
                        <h3 className="line-clamp-1 font-medium tracking-wide md:text-xl md:font-semibold">
                          {title}
                        </h3>
                        <span className="line-clamp-1 flex items-center gap-2 max-md:text-sm">
                          <span>{developer}</span>
                          <span className="text-xl leading-0">•</span>
                          <span className="grid">
                            <Swords size="16" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default HomeSlider;
