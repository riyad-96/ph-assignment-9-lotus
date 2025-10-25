import { Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function EachPopularGameCard({ g, i }) {
  const { id, title, icon, ratings, category } = g;
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div className="group relative rounded-md px-4 py-3">
      <Link className="absolute inset-0 z-3" to={`/details/${id}`} />
      <span className="absolute inset-0 z-1 block scale-80 rounded-lg bg-zinc-200 opacity-0 transition-[opacity,scale] duration-250 pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100"></span>

      <div className="relative z-2 flex items-center gap-3">
        <div>
          <span className="text-sm text-zinc-600">{i + 1}</span>
        </div>
        <div className="size-15 bg-zinc-200 overflow-hidden rounded-lg shadow-md">
          <img
            onLoad={() => setImgLoading(false)}
            className={`size-full object-cover transition-[opacity,filter] delay-[0,450ms] duration-[300ms,500ms] ${imgLoading ? 'opacity-0 blur-xs' : 'opacity-100 blur-none'}`}
            src={icon.lowRes}
            alt={`${title} icon`}
          />
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
}

export default EachPopularGameCard;
