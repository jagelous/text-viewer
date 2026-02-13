const SAVED_TEXT_KEY = 'text-viewer-saved-content';

export function getSavedText(): string {
  try {
    return localStorage.getItem(SAVED_TEXT_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setSavedText(text: string): void {
  try {
    localStorage.setItem(SAVED_TEXT_KEY, text);
  } catch {
    // ignore
  }
}
