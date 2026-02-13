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
  
  const isWord = (t: string) => /\S/.test(t);
  const lastTokenIsNewline = () => currentPage.length > 0 && currentPage[currentPage.length - 1] === '\n';

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // After a line break in the source, the next word must start on a new page
    if (isWord(token) && lastTokenIsNewline()) {
      pages.push({
        words: currentPage,
        content: currentPage.join('')
      });
      currentPage = [token];
      continue;
    }

    // Test if adding this token would overflow (each word/space/newline has real size)
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