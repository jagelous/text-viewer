import { useState, useEffect } from 'react';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
    <Card className="h-full flex flex-col border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="h-full flex flex-col gap-2">
          <Label htmlFor="editor" className="text-sm text-slate-600">
            Write or paste your text below
          </Label>
          <Textarea
            id="editor"
            value={localValue}
            onChange={handleChange}
            placeholder="Start typing your text here... Line breaks are preserved."
            className="flex-1 min-h-[200px] resize-none font-mono text-sm leading-relaxed p-4 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}