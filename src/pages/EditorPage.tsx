import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextEditor } from '../components/TextEditor';
import { Button } from '../components/ui/button';
import { getSavedText, setSavedText } from '../utils/storage';
import { Save, Eye } from 'lucide-react';

export function EditorPage() {
  const [textContent, setTextContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTextContent(getSavedText());
  }, []);

  const handleTextChange = (value: string) => {
    setTextContent(value);
  };

  const handleSaveAndView = () => {
    setSavedText(textContent);
    navigate('/view');
  };

  const handleSave = () => {
    setSavedText(textContent);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 shrink-0">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">TextFlow Viewer</h1>
            <p className="text-sm text-slate-600 mt-1">
              Write your text, then save and open the viewer to see it paginated.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="border-slate-300"
            >
              <Save className="w-4 h-4 mr-1.5" />
              Save
            </Button>
            <Button
              size="sm"
              onClick={handleSaveAndView}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Eye className="w-4 h-4 mr-1.5" />
              Save &amp; view
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full">
        <div className="h-full min-h-[50vh]">
          <TextEditor value={textContent} onChange={handleTextChange} />
        </div>
      </main>
    </div>
  );
}
