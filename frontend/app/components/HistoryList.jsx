"use client";

import Pagination from "./Pagination";
import { useState } from "react";

export default function HistoryList({
  items,
  pagination,
  onPageChange,
  isLoading,
  onSelectItem,
  onDeleteItem,
  onToggleFavorite,
  selectedId
}) {

  
  
  const [languageFilter, setLanguageFilter] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  
  const filteredItems = (items || []).filter((item) => {
    const lang = (item.language || "").toLowerCase();
    
    if (languageFilter !== "all" && lang !== languageFilter) {
      return false;
    }
    
    if (favoritesOnly && !item.isFavorite) {
      return false;
    }
    
    return true;
  });
  
  if (!isLoading && (!items || items.length === 0)) {

    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center max-w-xs">
          <div className="mb-3">
            <svg
              className="w-12 h-12 mx-auto text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            No history yet
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Generate code to see your history here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4">


      {!isLoading && filteredItems.length === 0 && (
  <div className="text-[11px] text-slate-500 py-4 text-center border border-dashed border-slate-800 rounded-lg">
    No history items match the current filters.
  </div>
)}

<div className="flex flex-col gap-2 text-[11px] text-slate-400">
  <div className="flex items-center justify-between gap-2">
    <span className="uppercase tracking-wide font-semibold text-slate-500">
      History Filters
    </span>

    <button
      type="button"
      onClick={() => setFavoritesOnly((prev) => !prev)}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] transition-colors ${
        favoritesOnly
          ? "border-yellow-400/60 bg-yellow-500/15 text-yellow-300"
          : "border-slate-700 bg-slate-900/80 text-slate-300 hover:bg-slate-800"
      }`}
    >
      <span className="text-xs">{favoritesOnly ? "★" : "☆"}</span>
      <span>Favourites</span>
    </button>
  </div>

  <div className="flex flex-wrap gap-1.5">
    <button onClick={() => setLanguageFilter("all")} className="filter-pill border border-sky-500 rounded-xl p-1 hover:bg-blue-300">All</button>
    <button onClick={() => setLanguageFilter("python")} className="filter-pill border border-sky-500 rounded-xl p-1 hover:bg-blue-300">Python</button>
    <button onClick={() => setLanguageFilter("javascript")} className="filter-pill border border-sky-500 rounded-xl p-1 hover:bg-blue-300">JavaScript</button>
    <button onClick={() => setLanguageFilter("typescript")} className="filter-pill border border-sky-500 rounded-xl p-1 hover:bg-blue-300">TypeScript</button>
    <button onClick={() => setLanguageFilter("cpp")} className="filter-pill border border-sky-500 rounded-xl p-1 hover:bg-blue-300">C++</button>
  </div>
</div>



      <div className="flex flex-col gap-3 max-h-[420px] overflow-auto pr-1 custom-scrollbar">
        {filteredItems.map((item) => {
          const isSelected = selectedId === item.id;
          const isFavorite = !!item.isFavorite;
          return (
            <article
              key={item.id}
              onClick={() => onSelectItem && onSelectItem(item)}
              className={`group relative border rounded-xl p-3.5 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-blue-500/50 bg-gradient-to-br from-blue-950/40 to-purple-950/20 shadow-lg shadow-blue-500/10"
                  : "border-slate-800/50 bg-slate-950/50 hover:border-slate-700/50 hover:bg-slate-900/50"
              }`}
            >
              
              {isSelected && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
              )}

              <div className="flex items-start justify-between mb-2 gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                    isSelected 
                      ? "bg-blue-800/20 text-blue-500 border border-blue-500/30"
                      : "bg-slate-800/50 text-slate-300 border border-slate-700/50"
                  }`}>
                    {item.language}
                  </span>
                  
                  <span className="text-[10px] text-slate-600 font-medium">
                    {new Date(item.createdAt || item.created_at).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      onToggleFavorite && onToggleFavorite(item);
                    }}
                    className={`text-2xl leading-none  ${
                      isFavorite ? "text-yellow-400" : "text-slate-600"
                    } hover:text-yellow-300`}
                    aria-label="Toggle favourite"
                  >
                    {isFavorite ? "★" : "☆"}
                  </button>



                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem && onDeleteItem(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-2.5 py-1 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 hover:bg-red-500/20 hover:border-red-300/50 font-medium"
                  title="Delete this item"
                >
                  Delete
                </button>
              </div>

              <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed pl-0.5">
                {item.prompt}
              </p>

              {!isSelected && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
              )}
            </article>
          );
        })}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="pt-2 border-t border-slate-800/50">
          <Pagination pagination={pagination} onPageChange={onPageChange} />
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(2 6 23 / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(71 85 105 / 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(71 85 105 / 0.6);
        }
      `}</style>
    </div>
  );
}