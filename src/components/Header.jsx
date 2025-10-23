import { Play } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const [lal, setLal] = useState();

  return (
    <header className="header fixed top-0 left-0 z-5 flex h-10 w-full items-center bg-white px-2 transition-shadow md:h-15 md:px-4">
      <div className="mx-auto flex max-w-[1100px] flex-1 items-center justify-between">
        <div className="flex cursor-pointer items-center gap-2 select-none">
          <span className="grid size-[25px] place-items-center rounded-md bg-emerald-400 text-white md:size-[30px] md:rounded-lg">
            <Play className="size-4 md:size-5" />
          </span>
          <span className="inline-block text-lg font-medium text-(--pale-dark-blue) md:text-2xl">
            Lotus Play
          </span>
        </div>

        <nav className="flex gap-2">
          <button className="rounded-md border border-emerald-500 px-2 py-0.5 text-sm text-emerald-500 md:px-4 md:py-1">
            Login
          </button>
          <button className="rounded-md bg-emerald-500 px-2 py-0.5 text-sm text-white md:px-4 md:py-1">
            Register
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
