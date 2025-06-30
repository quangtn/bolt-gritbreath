import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TestPage from './components/pages/TestPage';
import AssessmentPage from './components/pages/AssessmentPage';
import HistoryPage from './components/pages/HistoryPage';
import SafetyPage from './components/pages/SafetyPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="relative flex-1">
          <Routes>
            <Route path="/test" element={<TestPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="*" element={<Navigate to="/test" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;