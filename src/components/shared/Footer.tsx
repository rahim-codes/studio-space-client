import { BasketballIcon } from "@/components/shared/navbar";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b0f17] text-white pt-16 pb-8 px-6 lg:px-20 border-t border-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
        {/* Column 1: Logo & Mission (Takes 2 columns on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            {/* Logo Icon */}
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-amber-500">
                <BasketballIcon className="size-5 text-[#0B1120]" />
              </span>
              <span className="text-xl font-bold text-white">StudioSpace</span>
            </Link>
          </div>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Our mission is to put every creator in the right room, at the right
            hour.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#f59e0b] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/studios"
                className="hover:text-[#f59e0b] transition-colors"
              >
                Explore Studios
              </Link>
            </li>
            <li>
              <Link
                href="/how-it-works"
                className="hover:text-[#f59e0b] transition-colors"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[#f59e0b] transition-colors"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Popular Categories */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base">
            Popular Categories
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li>
              <Link
                href="/categories/photo-studios"
                className="hover:text-[#f59e0b] transition-colors"
              >
                Photo Studios
              </Link>
            </li>
            <li>
              <Link
                href="/categories/sound-stages"
                className="hover:text-[#f59e0b] transition-colors"
              >
                Sound Stages
              </Link>
            </li>
            <li>
              <Link
                href="/categories/podcast-rooms"
                className="hover:text-[#f59e0b] transition-colors"
              >
                Podcast Rooms
              </Link>
            </li>
            <li>
              <Link
                href="/categories/music-suites"
                className="hover:text-[#f59e0b] transition-colors"
              >
                Music Suites
              </Link>
            </li>
            <li>
              <Link
                href="/categories/art-workshops"
                className="hover:text-[#f59e0b] transition-colors"
              >
                Art Workshops
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base">Newsletter</h4>
          <div className="space-y-3">
            <label htmlFor="email" className="block text-xs text-gray-400">
              Email address
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="bg-[#111827] border border-gray-800 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#f59e0b] w-full"
              />
              <button
                type="submit"
                className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-all whitespace-nowrap shadow-md"
              >
                Join
              </button>
            </div>
          </div>

          {/* Social Icon (X) */}
          <div className="pt-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#111827] border border-gray-800 text-gray-300 hover:text-[#f59e0b] hover:border-gray-700 transition-all"
            >
              {/* X (Twitter) Icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2026 StudioSpace. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Terms & Privacy.</p>
      </div>
    </footer>
  );
}
