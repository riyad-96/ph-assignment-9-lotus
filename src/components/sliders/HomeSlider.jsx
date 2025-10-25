// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// React
import { useState } from 'react';
import EachSlide from './EachSlide';

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
      className="w-[clamp(17.125rem,-1.625rem+100vw,46.375rem)] [--swiper-pagination-color:#00bc7d] md:w-[clamp(16.75rem,-1.5493rem+97.5962vw,67.5rem)]"
    >
      {recommendedGames.map((g, i) => {
        return (
          <SwiperSlide key={i}>
            <EachSlide g={g} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default HomeSlider;
