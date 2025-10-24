import { Outlet, useNavigate } from 'react-router-dom';
import LotusLogo from '../components/LotusLogo';

function Auth() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center p-4">
      <div className="mx-auto max-w-[350px] flex-1 py-8">
        <div className="mx-auto w-fit">
          <LotusLogo onClick={() => navigate('/')} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
