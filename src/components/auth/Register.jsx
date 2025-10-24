import { useEffect, useRef, useState } from 'react';
import { EyeOff, EyeOpened, GoogleIcon } from '../Svgs';
import { Link } from 'react-router-dom';
import { toast } from 'kitzo/react';
import {
  createUserWithEmailAndPassword,
  reload,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, GoogleProvider } from '../../configs/firebase';
import { AnimatePresence, motion } from 'motion/react';

function Register() {
  useEffect(() => {
    document.querySelector('title').textContent = 'Register • Lotus Play';
  }, []);

  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameErr, setNameErr] = useState(null);
  const [photoURLErr, setPhotoURLErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passErr, setPassErr] = useState(null);

  const [passShowing, setPassShowing] = useState(false);
  const [registering, setRegistering] = useState(false);
  const passInput = useRef();

  function isAbleToRegister() {
    let ableToLogin = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    function checkEmail() {
      if (!email) {
        setEmailErr('Email is required');
        ableToLogin = false;
        return;
      } else if (!emailRegex.test(email)) {
        setEmailErr('Insert a valid email');
        ableToLogin = false;
        return;
      } else {
        setEmailErr('');
      }
    }
    checkEmail();

    const minPassLength = 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    function checkPass() {
      if (!password) {
        setPassErr('Password is required');
        ableToLogin = false;
        return;
      } else if (password.length < minPassLength) {
        setPassErr(`Password must be minimum ${minPassLength} chars.`);
        ableToLogin = false;
        return;
      } else if (!hasUpper) {
        setPassErr(`At least 1 uppercase character required`);
        ableToLogin = false;
        return;
      } else if (!hasLower) {
        setPassErr(`At least 1 lowercase character required`);
        ableToLogin = false;
        return;
      } else {
        setPassErr('');
      }
    }
    checkPass();

    function checkNameAndPhotoURL() {
      if (!name.trim()) {
        setNameErr('Name is required');
        ableToLogin = false;
      }
      if (!photoURL.trim()) {
        setPhotoURLErr('PhotoURL is required');
        ableToLogin = false;
      }
    }
    checkNameAndPhotoURL();
    return ableToLogin;
  }

  async function sendRegisterRequest() {
    const ableToRegister = isAbleToRegister();
    if (!ableToRegister) return;

    setRegistering(true);
    toast.promise(
      createUserWithEmailAndPassword(auth, email, password).then((res) => ({
        user: res.user,
        update: () => updateProfile(res.user, { displayName: name, photoURL }),
      })),
      {
        loading: 'Creating account...',
        success: async ({ user, update }) => {
          await update();
          await reload(user);
          setRegistering(false);
          return 'Registration successful.';
        },
        error: (err) => {
          setRegistering(false);

          if (err.code === 'auth/network-request-failed') return 'Network error';
          if (err.code === 'auth/email-already-in-use') return 'Email already exists';
          return 'Registration failed';
        },
      },
      {
        duration: 3000,
      },
    );
  }

  async function signupWithGoogle() {
    try {
      const res = await signInWithPopup(auth, GoogleProvider);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2 className="my-8 text-center text-2xl font-medium opacity-80">Welcome back</h2>
      <div className="space-y-3">
        <div className="grid">
          <label className="w-fit pb-2 pl-1 leading-4" htmlFor="name">
            Name
          </label>
          <input
            onChange={(e) => {
              setNameErr(null);
              setName(e.target.value);
            }}
            value={name}
            className="w-full min-w-0 rounded-full border border-zinc-200 bg-white px-4 py-2 tracking-wide outline-none placeholder:text-zinc-400 focus:border-zinc-400"
            id="name"
            type="text"
            placeholder="Enter your Name"
          />
          <span
            className={`overflow-hidden pl-1 text-sm text-red-500 transition-[height] duration-150 ${nameErr ? 'h-5' : 'h-0'}`}
          >
            {nameErr}
          </span>
        </div>

        <div className="grid">
          <label className="w-fit pb-2 pl-1 leading-4" htmlFor="photoURL">
            PhotoURL
          </label>
          <input
            onChange={(e) => {
              setPhotoURLErr(null);
              setPhotoURL(e.target.value);
            }}
            value={photoURL}
            className="w-full min-w-0 rounded-full border border-zinc-200 bg-white px-4 py-2 tracking-wide outline-none placeholder:text-zinc-400 focus:border-zinc-400"
            id="photoURL"
            type="text"
            placeholder="Enter your photoURL"
          />
          <span
            className={`overflow-hidden pl-1 text-sm text-red-500 transition-[height] duration-150 ${photoURLErr ? 'h-5' : 'h-0'}`}
          >
            {photoURLErr}
          </span>
        </div>

        <div className="grid">
          <label className="w-fit pb-2 pl-1 leading-4" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmailErr(null);
              setEmail(e.target.value);
            }}
            value={email}
            className="w-full min-w-0 rounded-full border border-zinc-200 bg-white px-4 py-2 tracking-wide outline-none placeholder:text-zinc-400 focus:border-zinc-400"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <span
            className={`overflow-hidden pl-1 text-sm text-red-500 transition-[height] duration-150 ${emailErr ? 'h-5' : 'h-0'}`}
          >
            {emailErr}
          </span>
        </div>

        <div className="grid">
          <label className="w-fit pb-2 pl-1 leading-4" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <AnimatePresence>
              {password && (
                <motion.button
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  onClick={() => {
                    setPassShowing((prev) => !prev);
                    passInput.current.focus();
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.1,
                    },
                    scale: {
                      duration: 0.2,
                      type: 'spring',
                      stiffness: 900,
                      damping: 25,
                    },
                  }}
                  className="absolute top-1/2 right-2 z-2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-zinc-600"
                >
                  {passShowing ? <EyeOff size="20" /> : <EyeOpened size="20" />}
                </motion.button>
              )}
            </AnimatePresence>
            <input
              ref={passInput}
              onChange={(e) => {
                setPassErr(null);
                setPassword(e.target.value);
              }}
              value={password}
              className="w-full min-w-0 rounded-full border border-zinc-200 bg-white px-4 py-2 tracking-wide outline-none placeholder:text-zinc-400 focus:border-zinc-400"
              id="password"
              type={passShowing ? 'text' : 'password'}
              placeholder="Enter your password"
              required
            />
          </div>
          <span
            className={`overflow-hidden pl-1 text-sm text-red-500 transition-[height] duration-150 ${passErr ? 'h-5' : 'h-0'}`}
          >
            {passErr}
          </span>
        </div>

        <div>
          <button
            onClick={() => {
              if (registering) return;
              sendRegisterRequest();
            }}
            className="grid h-[45px] w-full place-items-center rounded-full bg-zinc-800 tracking-wide text-white"
          >
            {registering ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span>Register</span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-2 text-center text-sm">or</div>

      <div className="mt-2">
        <button
          onClick={() => signupWithGoogle()}
          className="flex h-[45px] w-full items-center justify-center gap-2 rounded-full bg-zinc-800 tracking-wide text-white"
        >
          <span>
            <GoogleIcon size="20" />
          </span>
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="mt-4 flex justify-center text-sm">
        <span className="flex items-center gap-2">
          <span>Already have an account?</span>
          <Link className="text-(--accent) underline" to="/auth/log-in" children="Login" replace />
        </span>
      </div>
    </div>
  );
}

export default Register;
