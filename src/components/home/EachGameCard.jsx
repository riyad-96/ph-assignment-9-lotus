import { Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function EachGameCard({ g }) {
  const { id, title, category, icon, ratings } = g;
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div key={`all${id}`} className="group relative h-fit p-3">
      <span className="absolute inset-0 z-1 block origin-center scale-80 rounded-lg bg-zinc-200/80 opacity-0 transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100"></span>
      <Link className="absolute inset-0 z-3" to={`/details/${id}`} />
      <div className="relative z-2 space-y-3">
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
          <span
            className={`absolute inset-0 z-1 block animate-pulse bg-gray-200 transition-opacity duration-150 ${imgLoading ? 'opacity-100' : 'opacity-0'}`}
          ></span>
          <img
            onLoad={() => setImgLoading(false)}
            className={`relative z-2 size-full object-cover transition-[opacity,filter] delay-[0,450ms] duration-[300ms,250ms] ${imgLoading ? 'opacity-0 blur-md' : 'opacity-100 blur-none'}`}
            src={icon.highRes}
            alt={title}
            loading="lazy"
          />
        </div>
        <div className="grid md:leading-5">
          <h4 className="line-clamp-1 font-medium sm:text-lg">{title}</h4>
          <span className="text-zinc-600">{category}</span>
          <span className="flex items-center gap-1.5 text-zinc-600">
            <span>{ratings}</span>
            <span>
              <Star size="18" fill="currentColor" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default EachGameCard;
