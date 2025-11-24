"use client";

export default function Pagination({ pagination, onPageChange }) {
  const { page, totalPages } = pagination;

  const handlePrev = () => onPageChange(page - 1);
  const handleNext = () => onPageChange(page + 1);

  return (
    <div className="flex items-center justify-between mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      <button
        type="button"
        onClick={handlePrev}
        disabled={page <= 1}
        className="
          px-3 py-1 rounded-full border 
          border-gray-400 dark:border-gray-700
          bg-white dark:bg-gray-900
          hover:bg-gray-200 dark:hover:bg-gray-800
          transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Prev
      </button>

      <span className="text-center">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      <button
        type="button"
        onClick={handleNext}
        disabled={page >= totalPages}
        className="
          px-3 py-1 rounded-full border
          border-gray-400 dark:border-gray-700
          bg-white dark:bg-gray-900
          hover:bg-gray-200 dark:hover:bg-gray-800
          transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Next
      </button>
    </div>
  );
}
