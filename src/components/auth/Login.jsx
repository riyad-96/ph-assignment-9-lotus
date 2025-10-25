import { useEffect, useRef, useState } from 'react';
import { EyeOff, EyeOpened, GoogleIcon } from '../Svgs';
import { Link } from 'react-router-dom';
import { toast } from 'kitzo/react';

import { sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, GoogleProvider } from '../../configs/firebase';

import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailCheck } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';

function Login() {
  useEffect(() => {
    document.querySelector('title').textContent = 'Login • Lotus Play';
  }, []);

  const { setInteractionDisabled } = useGlobalContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErr, setEmailErr] = useState(null);
  const [passErr, setPassErr] = useState(null);

  const [passShowing, setPassShowing] = useState(false);
  const [loggingIn, setLogginIn] = useState(false);
  const passInput = useRef();

  function isAbleToLogin() {
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
    return ableToLogin;
  }

  async function sendLoginRequest() {
    const ableToLogin = isAbleToLogin();
    if (!ableToLogin) return;

    setLogginIn(true);
    toast.promise(
      signInWithEmailAndPassword(auth, email, password),
      {
        loading: 'Logging in...',
        success: () => {
          setLogginIn(false);
          return 'Welcome back';
        },
        error: (err) => {
          setLogginIn(false);
          if (err.code === 'auth/network-request-failed') return 'Network error';
          if (err.code === 'auth/invalid-credential') return 'Invalid credential';
          return 'Login failed';
        },
      },
      { duration: 3500 },
    );
  }

  async function loginWithGoogle() {
    setInteractionDisabled(true);
    try {
      const res = await signInWithPopup(auth, GoogleProvider);
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setInteractionDisabled(false);
    }
  }

  const [forgetPassModalShowing, setForgetPassModalShowing] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);
  const [forgetPassEmail, setForgetPassEmail] = useState('');

  async function sendResetPassEmail() {
    setSendingMail(true);
    toast.promise(sendPasswordResetEmail(auth, forgetPassEmail), {
      loading: 'Sending reset link...',
      success: () => {
        setMailSent(true);
        setSendingMail(false);
        return 'Reset link sent';
      },
      error: (err) => {
        console.error(err);
        setSendingMail(false);
        return 'Reset failed';
      },
    });
  }

  return (
    <div>
      <h2 className="my-8 text-center text-2xl font-medium opacity-80">Welcome back</h2>
      <div className="space-y-3">
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
              if (loggingIn) return;
              sendLoginRequest();
            }}
            className="grid h-[45px] w-full place-items-center rounded-full bg-zinc-800 tracking-wide text-white"
          >
            {loggingIn ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            setForgetPassModalShowing(true);
            setForgetPassEmail(email);
          }}
          className="mx-auto block text-sm pointer-fine:hover:text-(--accent) pointer-fine:hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={loginWithGoogle}
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
          <span>Don't have an account?</span>
          <Link
            className="text-(--accent) underline"
            to="/auth/register"
            children="Register"
            replace
          />
        </span>
      </div>

      <AnimatePresence>
        {forgetPassModalShowing && (
          <motion.div
            onMouseDown={() => setForgetPassModalShowing(false)}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 p-4"
          >
            <motion.div
              onMouseDown={(e) => e.stopPropagation()}
              initial={{
                y: 50,
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: 50,
                opacity: 0,
              }}
              className="max-w-[450px] flex-1 space-y-4 rounded-xl bg-(--main-bg) p-4 shadow"
            >
              {mailSent ? (
                <>
                  <div className="flex items-center gap-2">
                    <MailCheck />
                    <h3>Mail sent !</h3>
                  </div>

                  <p className="leading-5">
                    A password reset email has been sent to <strong>{forgetPassEmail}</strong>. If
                    you can’t find it, please check your spam or junk folder.
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        window.open('https://mail.google.com/', '_blank');
                      }}
                      className="grid h-10 w-full place-items-center rounded-full bg-zinc-800 font-light tracking-wide text-white"
                    >
                      Go to mail
                    </button>
                    <button
                      onClick={() => {
                        setForgetPassModalShowing(false);
                      }}
                      className="grid h-10 w-full place-items-center rounded-full bg-zinc-800 font-light tracking-wide text-white"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Mail />
                    <h3>Forget Password !</h3>
                  </div>

                  <div className="grid gap-1">
                    <label htmlFor="forget-email" className="w-fit pl-1">
                      Send link to
                    </label>
                    <input
                      value={forgetPassEmail}
                      onChange={(e) => setForgetPassEmail(e.target.value)}
                      className="rounded-full border border-zinc-300 bg-white px-5 py-2 outline-none focus:border-zinc-500"
                      type="email"
                      id="forget-email"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        if (sendingMail) return;
                        sendResetPassEmail();
                      }}
                      className="grid h-10 w-full place-items-center rounded-full bg-zinc-800 font-light tracking-wide text-white"
                    >
                      {sendingMail ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <span>Send</span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
