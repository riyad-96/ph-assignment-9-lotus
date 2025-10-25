import { useRef, useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { reload, updateProfile } from 'firebase/auth';
import { toast } from 'kitzo/react';

function Profile() {
  const { user } = useGlobalContext();
  const [isValidImg, setIsValidImg] = useState(true);

  const displayName = useRef();
  const photoURL = useRef();
  const [updating, setUpdating] = useState(false);

  async function sendUpdateProfileRequest() {
    setUpdating(true);
    toast.promise(
      updateProfile(user, {
        displayName: displayName.current.value,
        photoURL: photoURL.current.value,
      }),
      {
        loading: 'Updating profile data',
        success: async () => {
          await reload(user);
          setUpdating(false);
          setTimeout(() => {
            window.location.reload();
          }, 500);
          return 'Update successful';
        },
        error: (err) => {
          console.err(err);
          setUpdating(false);
          return 'Update failed';
        },
      },
    );
  }

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

        <div className="mx-auto max-w-[450px] space-y-4">
          <div className="grid gap-2">
            <label className="pl-1" htmlFor="name">
              Name
            </label>
            <input
              ref={displayName}
              className="focuse:text-zinc-400 w-full min-w-0 rounded-full border border-zinc-300 bg-white px-6 py-2.5 outline-none placeholder:text-zinc-300"
              placeholder="Enter your name"
              id="name"
              type="text"
              defaultValue={user?.displayName}
            />
          </div>

          <div className="grid gap-2">
            <label className="pl-1" htmlFor="photoURL">
              PhotoURL
            </label>
            <input
              ref={photoURL}
              className={`border-zinc700 w-full min-w-0 rounded-full border border-zinc-300 bg-white px-6 py-2.5 outline-none placeholder:text-zinc-300 focus:outline-zinc-800`}
              placeholder="PhotoURL here"
              id="photoURL"
              type="text"
              defaultValue={user?.photoURL}
            />
          </div>

          <div>
            <button
              onClick={() => {
                if (updating) return;
                sendUpdateProfileRequest();
              }}
              className="ml-auto block h-10 w-25 rounded-full bg-(--accent) text-white"
            >
              {updating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <span className="text-sm">Update</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
