import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextViewer } from '../components/TextViewer';
import { getSavedText } from '../utils/storage';
import { ArrowLeft } from 'lucide-react';

/**
 * Viewer page: one full "page" of the site dedicated to the viewer.
 * The viewer runs in a fixed-size frame (specific width % and 100% height)
 * so pagination is calculated for that size on each device.
 */
export function ViewerPage() {
  const [savedText, setSavedText] = useState('');

  useEffect(() => {
    setSavedText(getSavedText());
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
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

      <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-0">
        {/* Fixed-size frame: one "page" per device — 92% width, 90% height so layout is consistent */}
        <div
          className="w-[92vw] max-w-[420px] h-[90vh] max-h-[700px] shrink-0 shadow-lg rounded-lg overflow-hidden bg-white border border-slate-200"
          style={{ minHeight: '400px' }}
        >
          <TextViewer text={savedText} />
        </div>
      </main>
    </div>
  );
}
