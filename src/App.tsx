import { Routes, Route } from 'react-router-dom';
import { EditorPage } from './pages/EditorPage';
import { ViewerPage } from './pages/ViewerPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EditorPage />} />
      <Route path="/view" element={<ViewerPage />} />
    </Routes>
  );
}

export default App;
