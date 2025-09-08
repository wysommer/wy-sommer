"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed w-full z-[100]">
      <div className="flex justify-between items-center px-4 py-4 relative">
        {/* Theme Toggle in top-left */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? (
            // Sun icon for light mode
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>

        {/* Home icon in top-center */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>

        {/* Plus button in top-right */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            // X icon when menu is open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Plus icon when menu is closed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation menu */}
      <div 
        className={`px-4 py-3 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-wrap gap-y-3 justify-evenly">
          <Link
            href="/work-with-me"
            className="font-grape-nuts text-xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            hire me
          </Link>
          <Link
            href="/portfolio"
            className="font-grape-nuts text-xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            portfolio
          </Link>
          <Link
            href="/resume"
            className="font-grape-nuts text-xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            resumé
          </Link>
          <Link
            href="/contact"
            className="font-grape-nuts text-xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            contact
          </Link>
        </div>
      </div>
    </div>
  );
} 