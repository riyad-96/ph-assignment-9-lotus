import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useState } from 'react';

function ProfileIndex() {
  const { user } = useGlobalContext();
  const [isValidImg, setIsValidImg] = useState(true);

  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1100px] py-16">
        <div className="mx-auto size-[150px] overflow-hidden rounded-full shadow transition-[width,height] md:size-[220px]">
          <img
            className="size-full object-cover"
            src={isValidImg ? user?.photoURL : '/profile-placeholder.png'}
            onError={() => setIsValidImg(false)}
            alt={user?.displayName || 'Unknown user'}
          />
        </div>

        <div className="mt-4 grid justify-center text-center">
          <h3 className="line-clamp-1 text-2xl font-medium">
            {user?.displayName || 'Unknown user'}
          </h3>
          <span>{user?.email}</span>
        </div>

        <Link to="/profile/update-profile" className="mx-auto mt-5 block w-fit rounded-full bg-(--accent) px-5 py-2 text-nowrap text-white">
          Update profile
        </Link>
      </div>
    </div>
  );
}

export default ProfileIndex;
