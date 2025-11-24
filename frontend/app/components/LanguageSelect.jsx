"use client";

const LANGUAGE_OPTIONS = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "cpp", label: "C++" },
  { value: "typescript", label: "TypeScript" }
];

export default function LanguageSelect({ value, onChange }) {
  const selectedLang = LANGUAGE_OPTIONS.find(lang => lang.value === value);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
        <svg
          className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        Target Language
      </label>
      
      <div className="relative">
        <select
          className="w-full appearance-none rounded-xl bg-white dark:bg-slate-950/50 border border-slate-300 dark:border-slate-800/50 pl-3 pr-10 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-slate-400 dark:hover:border-slate-700/50 transition-all cursor-pointer font-medium"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {LANGUAGE_OPTIONS.map((lang) => (
            <option key={lang.value} value={lang.value}>
               {lang.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-slate-500 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none blur-sm -z-10" />
      </div>
    </div>
  );
}