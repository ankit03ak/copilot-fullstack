"use client";

import { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { toast } from "sonner";

export default function CodeResult({ language, code, isEmpty, fontScale = 1 }) {
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    hljs.highlightAll();
  }, [code, language]);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  if (isEmpty) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-3">
            <svg
              className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-500 font-medium">
            Generated code will appear here
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-600 mt-1">
            Enter a prompt above to get started
          </p>
        </div>
      </div>
    );
  }

  const fontSizeRem = 0.875 * fontScale;

  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-500">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="font-medium">{code.split('\n').length} lines</span>
        </div>
        
        <button
          type="button"
          onClick={handleCopy}
          className="group relative text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 dark:hover:from-blue-500/20 dark:hover:to-purple-500/20 border border-blue-500/20 hover:border-blue-400/30 dark:border-blue-500/20 dark:hover:border-blue-400/30 text-blue-600 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200 transition-all duration-200 font-medium"
        >
          <span className="flex items-center gap-1.5">
            {copied ? (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Code
              </>
            )}
          </span>
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-lg border border-slate-300 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-950/50 shadow-xl">
       
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        <div className="overflow-auto h-full custom-scrollbar">
          <pre
            className="p-4 min-h-full"
            style={{ 
              fontSize: `${fontSizeRem}rem`, 
              lineHeight: 1.6,
              margin: 0
            }}
          >
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(248 250 252 / 0.5);
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(2 6 23 / 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(148 163 184 / 0.5);
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(71 85 105 / 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(148 163 184 / 0.7);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(71 85 105 / 0.7);
        }
        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </div>
  );
}