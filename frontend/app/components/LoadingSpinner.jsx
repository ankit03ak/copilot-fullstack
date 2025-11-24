"use client";

export default function LoadingSpinner({ label, small }) {
  return (
    <div className="flex items-center gap-2">
      
      <div className="relative">
        {/* <span
          className={`inline-block rounded-full border-2 border-slate-300 dark:border-slate-700/30 ${
            small ? "w-3.5 h-3.5" : "w-4 h-4"
          }`}
        /> */}
        <span
          className={`absolute inset-[-8px] inline-block rounded-full border-2 border-transparent border-t-blue-600 border-r-purple-600 dark:border-t-blue-400 dark:border-r-purple-400 animate-spin ${
            small ? "w-3.5 h-3.5" : "w-4 h-4"
          }`}
        />
      </div>
      
      {label && (
        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}