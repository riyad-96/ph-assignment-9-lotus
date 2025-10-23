import React from 'react';

function Footer() {
  return (
    <footer className="px-2 py-8 md:px-4">
      <div className="mx-auto max-w-[1100px]">
        <div className="py-5">
          <span className="block h-px bg-zinc-200"></span>
        </div>

        <div className="text-(--pale-dark-blue)">
          <div className="gap-8 max-sm:space-y-4 sm:flex">
            <div className="basis-[200px]">
              <span className="text-sm font-medium">Lotus Play</span>
              <div className="grid text-sm font-light">
                <a href="#" className="inline-block w-fit py-0.5 hover:text-emerald-700">
                  Play Pass
                </a>
                <a href="#" className="inline-block w-fit py-0.5 hover:text-emerald-700">
                  Play Points
                </a>
                <a href="#" className="inline-block w-fit py-0.5 hover:text-emerald-700">
                  Gift cards
                </a>
                <a href="#" className="inline-block w-fit py-0.5 hover:text-emerald-700">
                  Redeem
                </a>
              </div>
            </div>

            <div className="grow">
              <span className="text-sm font-medium">Kitds & family</span>
              <div className="grid text-sm font-light">
                <a href="#" className="inline-block w-fit py-0.5 hover:text-emerald-700">
                  Parent Guide
                </a>
                <a href="#" className="inline-block w-fit py-0.5 hover:text-emerald-700">
                  Family sharing
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 text-xs max-sm:justify-center font-light">
            <a href="#" className="hover:text-emerald-700">
              Terms of Service
            </a>
            <a href="#" className="hover:text-emerald-700">
              Privacy
            </a>
            <a href="#" className="hover:text-emerald-700">
              About Lotus Play
            </a>
            <a href="#" className="hover:text-emerald-700">
              Developers
            </a>
            <a href="#" className="hover:text-emerald-700">
              Lotus Store
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
