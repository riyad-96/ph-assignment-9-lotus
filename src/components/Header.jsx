import LotusLogo from './LotusLogo';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header fixed top-0 left-0 z-5 flex h-10 w-full items-center bg-white px-2 backdrop-blur-sm transition-[box-shadow,background-color] duration-[200ms,900ms] md:h-15 md:px-4">
      <div className="mx-auto flex max-w-[1100px] flex-1 items-center justify-between">
        <LotusLogo />

        <nav className="flex gap-2">
          <button
            onClick={() => navigate('/auth/log-in')}
            className="rounded-md border border-(--accent) px-2 py-0.5 text-sm text-(--accent) md:px-4 md:py-1"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/auth/register')}
            className="rounded-md bg-(--accent) px-2 py-0.5 text-sm text-white md:px-4 md:py-1"
          >
            Register
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
