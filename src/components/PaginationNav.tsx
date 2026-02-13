import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToPage: (page: number) => void;
}

export function PaginationNav({ currentPage, totalPages, onPrevious, onNext, onGoToPage }: PaginationNavProps) {
  const [inputValue, setInputValue] = useState(String(currentPage));

  useEffect(() => {
    setInputValue(String(currentPage));
  }, [currentPage]);

  const goToPage = () => {
    const n = parseInt(inputValue, 10);
    if (!Number.isNaN(n)) {
      const page = Math.max(1, Math.min(totalPages, n));
      onGoToPage(page);
      setInputValue(String(page));
    } else {
      setInputValue(String(currentPage));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') goToPage();
  };

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 py-5 sm:py-6 px-6 sm:px-8 border-t border-slate-200 bg-white">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className="border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed p-2.5"
        aria-label="Previous page"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <div className="flex items-center gap-2 px-3">
        <span className="text-sm font-medium text-slate-600">Page</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={goToPage}
          onKeyDown={handleKeyDown}
          className="w-14 h-9 text-center text-sm font-semibold border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
          aria-label="Page number"
        />
        <span className="text-sm font-medium text-slate-600">of {totalPages}</span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed p-2.5"
        aria-label="Next page"
      >
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
