import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PaginationNav } from './PaginationNav';
import { paginateText, Page } from '../utils/paginateText';

interface TextViewerProps {
  text: string;
}

export function TextViewer({ text }: TextViewerProps) {
  const [pages, setPages] = useState<Page[]>([{ words: [], content: '' }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
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
    const headerHeight = 60; // Approximate header height
    const navHeight = 50; // Approximate nav height
    const padding = 32; // Top and bottom padding
    
    const availableHeight = containerRect.height - headerHeight - navHeight - padding;
    const availableWidth = containerRect.width - padding;
    
    setContainerHeight(availableHeight);
    setContainerWidth(availableWidth);
    
    // Ensure measure element has correct width before pagination (so line wrapping matches)
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
    setCurrentPage(prev => Math.max(1, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentPage(prev => Math.min(pages.length, prev + 1));
  };

  const handleGoToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(pages.length, page)));
  };
  
  const currentPageData = pages[currentPage - 1] || { words: [], content: '' };
  
  return (
    <Card className="h-full flex flex-col border-slate-200 shadow-sm" ref={containerRef}>
      <CardHeader className="pb-3 border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Viewer
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col overflow-hidden relative">
        {/* Hidden measurement element */}
        <div
          ref={measureRef}
          className="absolute invisible"
          style={{
            width: containerWidth,
            fontSize: '14px',
            lineHeight: '1.625',
            padding: '16px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'system-ui, sans-serif'
          }}
        />
        
        {/* Page content */}
        <div className="flex-1 overflow-hidden p-4">
          <div
            ref={contentRef}
            className="w-full h-full text-sm leading-relaxed text-slate-700 whitespace-pre-wrap break-words"
            style={{
              maxHeight: containerHeight,
              overflow: 'hidden'
            }}
          >
            {currentPageData.content || (
              <span className="text-slate-400 italic">Your paginated text will appear here...</span>
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
      </CardContent>
    </Card>
  );
}