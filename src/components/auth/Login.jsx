import { useEffect, useState } from 'react';
import { GoogleIcon } from '../Svgs';
import { Link } from 'react-router-dom';

function Login() {
  useEffect(() => {
    document.querySelector('title').textContent = 'Login • Lotus Play';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErr, setEmailErr] = useState(null);
  const [passErr, setPassErr] = useState(null);

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
          <input
            onChange={(e) => {
              setPassErr(null);
              setPassword(e.target.value);
            }}
            value={password}
            className="w-full min-w-0 rounded-full border border-zinc-200 bg-white px-4 py-2 tracking-wide outline-none placeholder:text-zinc-400 focus:border-zinc-400"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <span
            className={`overflow-hidden pl-1 text-sm text-red-500 transition-[height] duration-150 ${passErr ? 'h-5' : 'h-0'}`}
          >
            {passErr}
          </span>
        </div>

        <div>
          <button
            onClick={sendLoginRequest}
            className="block h-[45px] w-full rounded-full bg-zinc-800 tracking-wide text-white"
          >
            Login
          </button>
        </div>
      </div>

      <div className="mt-4">
        <button className="mx-auto block text-sm pointer-fine:hover:text-(--accent) pointer-fine:hover:underline">
          Forgot password?
        </button>
      </div>

      <div className="mt-4">
        <button className="flex h-[45px] w-full items-center justify-center gap-2 rounded-full bg-zinc-800 tracking-wide text-white">
          <span>
            <GoogleIcon size="20" />
          </span>
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="mt-4 flex justify-center text-sm">
        <span className="flex items-center gap-2">
          <span>Don't have an account?</span>
          <Link className="text-(--accent) underline" to="/auth/register" children="Register" />
        </span>
      </div>
    </div>
  );
}

export default Login;
