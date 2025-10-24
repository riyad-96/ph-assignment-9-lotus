import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  useEffect(() => {
    document.querySelector('title').textContent = 'Not found • Lotus Play';
  }, []);

  return (
    <div className="grid min-h-screen bg-(--main-bg) p-4">
      <div className="py-8">
        <h2 className="text-center text-2xl font-medium opacity-70">404 Page not found.</h2>
        <div className="relative mx-auto max-w-[300px] select-none">
          <span className="absolute inset-0 z-5"></span>
          <img className="opacity-80" src="/not-found.png" alt="not found" />
        </div>
        <Link
          className="mx-auto mt-5 block w-fit rounded-md bg-zinc-800 px-4 py-1 text-white"
          children="Go back to Home page"
        />
      </div>
    </div>
  );
}

export default NotFound;
