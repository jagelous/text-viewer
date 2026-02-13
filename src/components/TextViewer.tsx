import { useState, useEffect, useRef, useCallback } from 'react';
import { PaginationNav } from './PaginationNav';
import { paginateText, Page } from '../utils/paginateText';
import { BookOpen } from 'lucide-react';

interface TextViewerProps {
  text: string;
}

export function TextViewer({ text }: TextViewerProps) {
  const [pages, setPages] = useState<Page[]>([{ words: [], content: '' }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  
  // Measure text height using a hidden element
  const measureTextHeight = useCallback((words: string[]): number => {
    if (!measureRef.current) return 0;
    
    measureRef.current.textContent = words.join('');
    return measureRef.current.offsetHeight;
  }, []);
  
  // Recalculate pages when text or container dimensions change
  const recalculatePages = useCallback(() => {
    if (!containerRef.current || !measureRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const headerHeight = 80;
    const navHeight = 80;
    const padding = 40;
    
    const availableHeight = containerRect.height - headerHeight - navHeight - padding;
    const availableWidth = containerRect.width - padding;
    
    setContainerHeight(availableHeight);
    setContainerWidth(availableWidth);
    
    // Ensure measure element has correct width before pagination
    measureRef.current.style.width = `${availableWidth}px`;
    
    const newPages = paginateText(text, availableWidth, availableHeight, measureTextHeight);
    setPages(newPages);
    
    // Reset to page 1 if current page is out of bounds
    setCurrentPage(prev => Math.min(prev, Math.max(1, newPages.length)));
  }, [text, measureTextHeight]);
  
  // Set up ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      recalculatePages();
    });
    
    resizeObserver.observe(containerRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [recalculatePages]);
  
  // Recalculate when text changes
  useEffect(() => {
    recalculatePages();
  }, [text, recalculatePages]);
  
  const handlePrevious = () => {
    setIsAnimating(true);
    setCurrentPage(prev => Math.max(1, prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  const handleNext = () => {
    setIsAnimating(true);
    setCurrentPage(prev => Math.min(pages.length, prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleGoToPage = (page: number) => {
    setIsAnimating(true);
    setCurrentPage(Math.max(1, Math.min(pages.length, page)));
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  const currentPageData = pages[currentPage - 1] || { words: [], content: '' };
  
  return (
    <div className="h-full flex flex-col bg-white" ref={containerRef}>
      <div className="px-6 sm:px-8 pt-7 sm:pt-8 pb-5 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-500">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Content Viewer
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Page <span className="font-bold text-emerald-600">{currentPage}</span> of <span className="font-bold text-slate-600">{pages.length}</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Hidden measurement element */}
        <div
          ref={measureRef}
          className="absolute invisible"
          style={{
            width: containerWidth,
            fontSize: '15px',
            lineHeight: '1.7',
            padding: '20px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        />
        
        {/* Page content */}
        <div className="flex-1 overflow-hidden px-6 sm:px-8 py-7 sm:py-8">
          <div
            ref={contentRef}
            className={`w-full h-full text-[15px] leading-relaxed text-slate-800 whitespace-pre-wrap break-words font-serif ${isAnimating ? 'opacity-70' : 'opacity-100'} transition-opacity duration-300`}
            style={{
              maxHeight: containerHeight,
              overflow: 'hidden'
            }}
          >
            {currentPageData.content || (
              <div className="flex items-center justify-center h-full">
                <span className="text-slate-400 italic text-center text-lg">
                  Your paginated text will appear here...
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Pagination navigation */}
        <PaginationNav
          currentPage={currentPage}
          totalPages={pages.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onGoToPage={handleGoToPage}
        />
      </div>
    </div>
  );
}
