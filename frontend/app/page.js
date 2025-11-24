"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PromptForm from "./components/PromptForm";
import CodeResult from "./components/CodeResult";
import HistoryList from "./components/HistoryList";
import ErrorAlert from "./components/ErrorAlert";
import LoadingSpinner from "./components/LoadingSpinner";
import ThemeToggle from "./components/ThemeToggle";
import Image from "next/image";
import logo from "./public/logo.png";
import { toast } from "sonner";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [generatedCode, setGeneratedCode] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPages: 0,
  });
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  const [error, setError] = useState(null);
  const [codeFontScale, setCodeFontScale] = useState(1);

  const fetchHistory = async (page = 1, pageSize = 5) => {
    try {
      setIsHistoryLoading(true);
      setError(null);

      const res = await axios.get(`${API_BASE_URL}/history`, {
        params: { page, pageSize },
      });

      setHistory(res.data.items || []);
      setPagination(res.data.pagination || {});
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to load history. Please try again."
      );
    } finally {
      setIsHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(1, pagination.pageSize);
  }, []);

  const handleGenerate = async (prompt) => {
    setError(null);
    setGeneratedCode("");
    setCurrentPrompt(prompt);
    setIsGenerating(true);
    setSelectedHistoryId(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/generate`, {
        prompt,
        language: selectedLanguage,
      });

      setGeneratedCode(res.data.code || "");
      setCurrentPrompt(res.data.prompt || prompt);

      await fetchHistory(1, pagination.pageSize || 5);

      toast.success("Code generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate code. Please try again.");
      setError(
        err.response?.data?.message ||
          "Failed to generate code. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (
      newPage < 1 ||
      (pagination.totalPages && newPage > pagination.totalPages)
    ) {
      return;
    }
    fetchHistory(newPage, pagination.pageSize || 5);
  };

  const handleIncreaseFont = () => {
    setCodeFontScale((prev) => Math.min(prev + 0.15, 1.4));
  };

  const handleDecreaseFont = () => {
    setCodeFontScale((prev) => Math.max(prev - 0.15, 0.7));
  };

  const handleSelectHistoryItem = (item) => {
    setSelectedHistoryId(item.id);
    setGeneratedCode(item.code || "");
    setCurrentPrompt(item.prompt || "");
    if (item.language) {
      setSelectedLanguage(item.language);
    }
  };

  const handleDeleteHistoryItem = async (id) => {
    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/history/${id}`);
      if (selectedHistoryId === id) {
        setSelectedHistoryId(null);
        setGeneratedCode("");
        setCurrentPrompt("");
      }
      await fetchHistory(pagination.page, pagination.pageSize || 5);
      toast.success("History item deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete history item. Please try again.");
      setError(
        err.response?.data?.message ||
          "Failed to delete history item. Please try again."
      );
    }
  };

  const handleClearHistory = async () => {
    const ok = window.confirm("Are you sure you want to clear all history?");
    if (!ok) return;

    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/history`);
      setSelectedHistoryId(null);
      await fetchHistory(1, pagination.pageSize || 5);
      toast.success("History cleared!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear history. Please try again.");
      setError(
        err.response?.data?.message ||
          "Failed to clear history. Please try again."
      );
    }
  };


  const handleToggleFavorite = async (item) => {
  try {
    setError(null);
    await axios.patch(`${API_BASE_URL}/history/${item.id}/favorite`, {
      isFavorite: !item.isFavorite
    });
    await fetchHistory(pagination.page, pagination.pageSize || 5);
    toast.success("Favourite updated!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update favorite. Please try again.");
    setError(
      err.response?.data?.message ||
        "Failed to update favorite. Please try again."
    );
  }
};

  return (
  <main className="flex flex-col gap-6">
    <header className="relative">
      <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-300 dark:border-slate-800/50 rounded-2xl p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="CodePilotX Logo"
              width={48}
              height={48}
              className="drop-shadow-lg hover:scale-110 transition-transform duration-200 rounded-full"
            />

            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                CodePilotX
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md">
                Enter a natural language prompt, pick a language, and generate code instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>

    {error && <ErrorAlert message={error} />}

    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      
      <div className="flex flex-col gap-4">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-300 dark:border-slate-800/50 rounded-xl p-5 hover:border-slate-400 dark:hover:border-slate-700/50 transition-colors">
          <PromptForm
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onSubmit={handleGenerate}
            isSubmitting={isGenerating}
          />
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-300 dark:border-slate-800/50 rounded-xl overflow-hidden hover:border-slate-400 dark:hover:border-slate-700/50 transition-colors">
          <div className="border-b border-slate-300 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50 px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Generated Code
                  </h2>
                  {generatedCode && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20">
                      {selectedLanguage}
                    </span>
                  )}
                </div>
                {currentPrompt && (
                  <p className="text-[11px] text-slate-600 dark:text-slate-500 line-clamp-1">
                    {currentPrompt}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="font-medium">A</span>
                  <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700/50 overflow-hidden bg-slate-100 dark:bg-slate-800/30">
                    <button
                      type="button"
                      onClick={handleDecreaseFont}
                      className="px-2.5 py-1 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                      title="Decrease font size"
                    >
                      −
                    </button>
                    <div className="w-px bg-slate-300 dark:bg-slate-700/50" />
                    <button
                      type="button"
                      onClick={handleIncreaseFont}
                      className="px-2.5 py-1 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                      title="Increase font size"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5">
            <CodeResult
              language={selectedLanguage}
              code={generatedCode}
              isEmpty={!generatedCode && !isGenerating}
              fontScale={codeFontScale}
            />
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-300 dark:border-slate-800/50 rounded-xl overflow-hidden hover:border-slate-400 dark:hover:border-slate-700/50 transition-colors">
        <div className="border-b border-slate-300 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50 px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                History
              </h2>
              {pagination.total > 0 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20">
                  {pagination.total} {pagination.total === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-[11px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700/50 hover:bg-red-100 dark:hover:bg-red-500/10 hover:border-red-300 dark:hover:border-red-500/30 text-slate-700 dark:text-slate-300 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 font-medium"
                >
                  Clear All
                </button>
              )}
              {isHistoryLoading && <LoadingSpinner label="Loading..." small />}
            </div>
          </div>
        </div>

        <div className="p-5">
          <HistoryList
            items={history}
            pagination={pagination}
            onPageChange={handlePageChange}
            isLoading={isHistoryLoading}
            onSelectItem={handleSelectHistoryItem}
            onDeleteItem={handleDeleteHistoryItem}
            onToggleFavorite={handleToggleFavorite}
            selectedId={selectedHistoryId}
          />
        </div>
      </div>
    </section>
  </main>
);

}
