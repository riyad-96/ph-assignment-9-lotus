import { updateProfile } from 'firebase/auth';
import { useRef, useState } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { toast } from 'kitzo/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function UpdateProfile() {
  const navigate = useNavigate();
  const { user } = useGlobalContext();

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
          setUpdating(false);
          setTimeout(() => {
            window.location.reload();
          }, 500);
          return 'Update successful';
        },
        error: (err) => {
          setUpdating(false);
          if (err.code === 'auth/invalid-profile-attribute') return 'Photo url too long';
          return 'Update failed';
        },
      },
    );
  }

  return (
    <div className="px-2 md:px-3">
      <div className="relative mx-auto max-w-[1100px] py-16">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-0 left-0 flex items-center gap-2 rounded-lg bg-zinc-200 py-1 pr-4 pl-3 text-sm"
        >
          <span>
            <ArrowLeft size="18" />
          </span>
          <span>Go back</span>
        </button>
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

export default UpdateProfile;
