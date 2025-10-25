import { Outlet } from 'react-router-dom';

function Profile() {
  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1100px] py-16">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
