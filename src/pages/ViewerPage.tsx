import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextViewer } from '../components/TextViewer';
import { getSavedText } from '../utils/storage';
import { ArrowLeft } from 'lucide-react';

export function ViewerPage() {
  const [savedText, setSavedText] = useState('');

  useEffect(() => {
    setSavedText(getSavedText());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-4 py-3 shrink-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to editor
          </Link>
          <span className="text-xs text-slate-500">Paginated view</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 min-h-0 w-full">
        <div
          className="w-full max-w-[min(95vw,720px)] h-[85vh] max-h-[800px] shrink-0 shadow-lg rounded-lg overflow-hidden bg-white border border-slate-200"
          style={{ minHeight: '500px' }}
        >
          <TextViewer text={savedText} />
        </div>
      </main>
    </div>
  );
}
