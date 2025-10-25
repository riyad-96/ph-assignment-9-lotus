import { toast } from 'kitzo/react';
import { useGlobalContext } from '../contexts/GlobalContext';
import LotusLogo from './LotusLogo';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../configs/firebase';
import { useState } from 'react';
import { ArrowDown, LogOut } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

function Header() {
  const navigate = useNavigate();
  const { user } = useGlobalContext();

  function sendLogoutRequest() {
    toast.promise(
      signOut(auth),
      {
        loading: 'Logging out...',
        success: () => {
          localStorage.removeItem('installed-games');
          return 'Logout successful';
        },
        error: (err) => {
          console.error(err);
          return 'Logout failed';
        },
      },
      { duration: 2500 },
    );
  }

  const [isValidImg, setIsValidImg] = useState(true);

  return (
    <header className="header fixed top-0 left-0 z-20 flex h-[50px] w-full items-center bg-white px-3 backdrop-blur-sm transition-[box-shadow,background-color] duration-[200ms,900ms] md:h-15 md:px-4">
      <div className="mx-auto flex max-w-[1100px] flex-1 items-center justify-between">
        <LotusLogo
          onClick={() => {
            navigate('/');
            if (document.querySelector('.home')) {
              document
                .querySelector('.home')
                .scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
          }}
        />

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <div className="relative">
                <button className="relative grid size-[30px] place-items-center rounded-full border-2 border-zinc-400 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 md:size-[35px]">
                  <ArrowDown strokeWidth="3" className="size-4 md:size-5" />
                  {(() => {
                    const installedGames =
                      JSON.parse(localStorage.getItem('installed-games')) || [];
                    if (installedGames.length > 0) {
                      return (
                        <span className="absolute right-0 bottom-0 z-2 grid size-3.5 translate-1/3 place-items-center rounded-full bg-(--accent) text-[10px] leading-0 text-white shadow">
                          <span className="leading-0">{installedGames.length}</span>
                        </span>
                      );
                    }
                  })()}
                </button>

                <AnimatePresence></AnimatePresence>
                <div className="absolute"></div>
              </div>

              <div className="relative">
                <button onClick={() => navigate('/profile')} className="absolute inset-0"></button>
                <div className="size-[30px] overflow-hidden rounded-full bg-[#9c9da0] shadow-md md:size-[35px]">
                  <img
                    src={isValidImg ? user.photoURL : '/profile-placeholder.png'}
                    onError={() => setIsValidImg(false)}
                    alt={user.displayName || 'Unknown user'}
                  />
                </div>
              </div>

              <button
                onClick={sendLogoutRequest}
                className="flex items-center gap-2 rounded-md bg-(--accent) px-2 py-1 text-sm text-white md:px-4 md:py-1.5"
              >
                <span>
                  <LogOut size="16" />
                </span>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/auth/log-in')}
                className="rounded-md border border-(--accent) px-2 py-0.5 text-sm text-(--accent) md:px-4 md:py-1.5"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/auth/register')}
                className="rounded-md bg-(--accent) px-2 py-1 text-sm text-white md:px-4 md:py-1.5"
              >
                Register
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
