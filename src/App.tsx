import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import TestPage from './components/pages/TestPage';
import AssessmentPage from './components/pages/AssessmentPage';
import HistoryPage from './components/pages/HistoryPage';
import HowItWorksPage from './components/pages/HowItWorksPage';
import SafetyPage from './components/pages/SafetyPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="relative">
          <Routes>
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="*" element={<Navigate to="/how-it-works" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;