import { useState, useCallback } from 'react';
import { TextEditor } from './components/TextEditor';
import { TextViewer } from './components/TextViewer';

function App() {
  const [textContent, setTextContent] = useState('');
  
  const handleTextChange = useCallback((value: string) => {
    setTextContent(value);
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">TextFlow Viewer</h1>
          <p className="text-sm text-slate-600 mt-1">
            Write freely, view beautifully paginated — words never split across pages
          </p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">
          {/* Editor panel - 60% on desktop, 100% on mobile */}
          <div className="w-full lg:w-3/5 h-full">
            <TextEditor value={textContent} onChange={handleTextChange} />
          </div>
          
          {/* Viewer panel - 40% on desktop, 100% on mobile */}
          <div className="w-full lg:w-2/5 h-full">
            <TextViewer text={textContent} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;