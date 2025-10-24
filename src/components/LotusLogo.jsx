import { Play } from 'lucide-react';

function LotusLogo({ onClick }) {
  return (
    <div className="relative flex items-center gap-2 select-none">
      <button onClick={onClick} className="absolute inset-0 z-2"></button>
      <span className="grid size-[25px] place-items-center rounded-md bg-(--accent) text-white md:size-[30px] md:rounded-lg">
        <Play className="size-4 md:size-5" />
      </span>
      <span className="inline-block text-lg font-medium text-(--pale-dark-blue) md:text-2xl">
        Lotus Play
      </span>
    </div>
  );
}

export default LotusLogo;
