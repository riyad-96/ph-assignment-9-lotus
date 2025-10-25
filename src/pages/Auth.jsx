import { Outlet, useNavigate } from 'react-router-dom';
import LotusLogo from '../components/LotusLogo';

function Auth() {
  const navigate = useNavigate();

  return (
    <div className="grid h-screen items-center overflow-y-auto p-4">
      <div className="mx-auto w-full max-w-[350px] pb-8">
        <div className="fixed top-3 left-3 mx-auto w-fit">
          <LotusLogo onClick={() => navigate('/')} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
