"use client";

export default function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="relative rounded-xl border border-red-300 dark:border-red-500/30 bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 backdrop-blur-sm overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-400 dark:via-red-500/50 to-transparent" />
      
      <div className="flex items-start gap-3 px-4 py-3">
      
        <div className="flex-shrink-0 mt-0.5">
          <svg
            className="w-4 h-4 text-red-600 dark:text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-red-800 dark:text-red-100 font-medium leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}