import { toast } from 'kitzo/react';
import { useGlobalContext } from '../contexts/GlobalContext';
import LotusLogo from './LotusLogo';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../configs/firebase';
import { useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const { user } = useGlobalContext();

  function sendLogoutRequest() {
    toast.promise(
      signOut(auth),
      {
        loading: 'Logging out...',
        success: 'Logout successful',
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
    <header className="header fixed top-0 left-0 z-5 flex h-[50px] w-full items-center bg-white px-3 backdrop-blur-sm transition-[box-shadow,background-color] duration-[200ms,900ms] md:h-15 md:px-4">
      <div className="mx-auto flex max-w-[1100px] flex-1 items-center justify-between">
        <LotusLogo onClick={() => navigate('/')} />

        <nav className="flex items-center gap-3">
          {user ? (
            <>
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
                className="rounded-md bg-(--accent) px-2 py-1 text-sm text-white md:px-4 md:py-1.5"
              >
                Logout
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
