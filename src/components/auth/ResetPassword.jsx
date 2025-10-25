import { confirmPasswordReset } from 'firebase/auth';
import { toast } from 'kitzo/react';
import { CheckCheck } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from '../../configs/firebase';

function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const oobCode = params.get('oobCode');

  const [newPass, setNewPass] = useState('');
  const [passErr, setPassErr] = useState('');

  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  function isAbleToReset() {
    let ableToReset = true;

    const minPassLength = 6;
    const hasUpper = /[A-Z]/.test(newPass);
    const hasLower = /[a-z]/.test(newPass);

    function checkPass() {
      if (!newPass) {
        setPassErr('Password is required');
        ableToReset = false;
        return;
      } else if (newPass.length < minPassLength) {
        setPassErr(`Password must be minimum ${minPassLength} chars.`);
        ableToReset = false;
        return;
      } else if (!hasUpper) {
        setPassErr(`At least 1 uppercase character required`);
        ableToReset = false;
        return;
      } else if (!hasLower) {
        setPassErr(`At least 1 lowercase character required`);
        ableToReset = false;
        return;
      } else {
        setPassErr('');
      }
    }
    checkPass();
    return ableToReset;
  }

  function sendResetPassRequest() {
    const ableToReset = isAbleToReset();
    if (!ableToReset) return;

    setResetting(true);
    toast.promise(confirmPasswordReset(auth, oobCode, newPass), {
      loading: 'Setting new password...',
      success: () => {
        setResetSuccess(true);
        return 'Password reset successful';
      },
      error: (err) => {
        console.error(err);
        setResetting(false);
        return 'Password reset failed';
      },
    });
  }

  return (
    <div className="space-y-3">
      {resetSuccess ? (
        <>
          <div className="grid justify-items-center text-center">
            <span>
              <CheckCheck size="50" />
            </span>
            <p>Password reset successful.</p>

            <div className="mt-4 grid gap-4">
              <p>Please login with new password</p>
              <button
                onClick={() => {
                  window.location.replace('/auth/log-in');
                }}
                className="mx-auto block h-10 w-fit rounded-full bg-zinc-800 px-9 font-light tracking-wide text-white"
              >
                Login
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-1">
            <label className="w-fit pl-1" htmlFor="new-pass">
              New Password
            </label>
            <input
              className="rounded-full border border-zinc-300 bg-white px-5 py-2 tracking-wide outline-none placeholder:text-zinc-400 focus:border-zinc-500"
              onChange={(e) => {
                setPassErr('');
                setNewPass(e.target.value);
              }}
              value={newPass}
              type="text"
              id="new-pass"
              placeholder="Enter new password"
            />
            <span
              className={`overflow-hidden pl-2 text-sm text-red-500 transition-[height] duration-150 ${passErr ? 'h-5' : 'h-0'}`}
            >
              {passErr}
            </span>
          </div>
          <button
            onClick={() => {
              if (resetting) return;
              sendResetPassRequest();
            }}
            className="h-10 w-full rounded-full bg-zinc-800 font-light tracking-wide text-white"
          >
            {resetting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span className="font-light tracking-wide">Reset password</span>
            )}
          </button>
        </>
      )}
    </div>
  );
}

export default ResetPassword;
