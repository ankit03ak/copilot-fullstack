"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

 
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[88px] h-[40px] rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-300 dark:border-slate-800/50 hover:border-slate-400 dark:hover:border-slate-700/50 transition-all duration-200 group"
      aria-label="Toggle theme"
    >
      
      <svg
        className={`w-4 h-4 transition-all duration-300 ${
          theme === "dark"
            ? "rotate-0 scale-100 text-amber-500"
            : "rotate-90 scale-0 absolute text-slate-400"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      
      <svg
        className={`w-4 h-4 transition-all duration-300 ${
          theme === "light"
            ? "rotate-0 scale-100 text-indigo-600"
            : "-rotate-90 scale-0 absolute text-slate-400"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}