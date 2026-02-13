import { useState, useEffect } from 'react';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { PenTool } from 'lucide-react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextEditor({ value, onChange }: TextEditorProps) {
  const [localValue, setLocalValue] = useState(value);
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };
  
  return (
    <div className="h-full flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Text Editor</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Write or paste your content below
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col bg-white">
        <div className="h-full flex flex-col gap-3">
          <Label htmlFor="editor" className="text-sm font-medium text-slate-600">
            Your content
          </Label>
          <Textarea
            id="editor"
            value={localValue}
            onChange={handleChange}
            placeholder="Start typing your text here... Line breaks are preserved."
            className="flex-1 min-h-[480px] sm:min-h-[60vh] resize-none text-[15px] leading-relaxed p-6 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-slate-800 placeholder:text-slate-400 transition-all duration-200 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
