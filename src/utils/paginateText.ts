export interface Page {
  words: string[];
  content: string;
}

export function paginateText(
  text: string,
  _containerWidth: number,
  containerHeight: number,
  measureHeight: (words: string[]) => number
): Page[] {
  if (!text.trim()) {
    return [{ words: [], content: '' }];
  }

  // Split text into words, preserving line breaks as separate tokens
  const tokens = text.split(/(\s+)/).filter(token => token.length > 0);
  
  const pages: Page[] = [];
  let currentPage: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // Only start a new page when adding this token would actually overflow (word/space/newline all have real measured size)
    const testWords = [...currentPage, token];
    const height = measureHeight(testWords);

    if (height > containerHeight && currentPage.length > 0) {
      // Current page is full, save it and start new one
      pages.push({
        words: currentPage,
        content: currentPage.join('')
      });
      currentPage = [token];
    } else {
      currentPage.push(token);
    }
  }
  
  // Add the last page if it has content
  if (currentPage.length > 0) {
    pages.push({
      words: currentPage,
      content: currentPage.join('')
    });
  }
  
  return pages.length > 0 ? pages : [{ words: [], content: '' }];
}