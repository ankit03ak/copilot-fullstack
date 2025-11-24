"use client";

import { useState } from "react";
import LanguageSelect from "./LanguageSelect";
import { toast } from "sonner";

export default function PromptForm({
  selectedLanguage,
  onLanguageChange,
  onSubmit,
  isSubmitting
}) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = prompt.trim();
    if (!trimmed) return;
    const hasSpace = trimmed.includes(" ");
    const hasLongWord = trimmed
      .split(/\s+/)
      .some((word) => word.length >= 3);

    if (trimmed.length < 10 || !hasSpace || !hasLongWord) {
      toast.warning('Please enter a valid prompt (e.g. "Write a Python function to reverse a string").');
      return;
    }

    onSubmit(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Prompt
          <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <div className="relative">
          <textarea
            className="w-full min-h-[118px] rounded-xl bg-white dark:bg-slate-950/50 border border-slate-300 dark:border-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-slate-400 dark:hover:border-slate-700/50 transition-all resize-y"
            placeholder='Example: "Write a Python function to reverse a string"'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 dark:text-slate-600 font-medium">
            {prompt.length} chars
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex-1 md:max-w-[240px]">
          <LanguageSelect
            value={selectedLanguage}
            onChange={onLanguageChange}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !prompt.trim()}
          className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-sm font-semibold px-6 py-2.5 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-500 hover:to-purple-500 dark:hover:from-blue-400 dark:hover:to-purple-400 transition-all duration-200 shadow-lg shadow-blue-500/25 dark:shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-500/25 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Generating...
            </>
          ) : (
            <>
              Generate Code
            </>
          )}
        </button>
      </div>
    </form>
  );
}