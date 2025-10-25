import { Swords } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EachSlide({ g }) {
  const { id, title, icon, coverPhoto, developer } = g;

  const [coverLoading, setCoverLoading] = useState(true);
  const [iconLoading, setIconLoading] = useState(true);

  return (
    <div className="pb-8">
      <div className="relative rounded-md p-2.5 pointer-fine:hover:bg-zinc-200">
        <Link to={`/details/${id}`} className="absolute inset-0 z-4" />

        <div className="relative rounded-lg bg-black text-white">
          <div className="home-slider-mask-image aspect-video overflow-hidden">
            <img
              onLoad={() => setCoverLoading(false)}
              className={`size-full object-cover transition-[opacity,filter] delay-[0,450ms] duration-[300ms,500ms] ${coverLoading ? 'opacity-0 blur-xs' : 'opacity-100 blur-none'}`}
              src={coverPhoto}
              alt={title}
            />
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="flex flex-1 items-center gap-3 p-3 md:p-5">
              <div>
                <div className="size-8 bg-zinc-800 overflow-hidden rounded-lg md:size-15">
                  <img
                    onLoad={() => setIconLoading(false)}
                    className={`size-full object-cover transition-[opacity,filter] delay-[0,450ms] duration-[300ms,500ms] ${iconLoading ? 'opacity-0 blur-xs' : 'opacity-100 blur-none'}`}
                    src={icon.lowRes}
                    alt={title}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="max-md:leading-5">
                <h3 className="line-clamp-1 font-medium tracking-wide max-sm:text-sm md:text-xl md:font-semibold">
                  {title}
                </h3>
                <span className="line-clamp-1 flex items-center gap-2 max-md:text-xs">
                  <span>{developer}</span>
                  <span className="text-xl leading-0">•</span>
                  <span className="grid">
                    <Swords className="size-3 md:size-4" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachSlide;
