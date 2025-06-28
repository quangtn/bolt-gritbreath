import React, { useState, useEffect } from 'react';
import { NavigationTab } from './types';
import Navigation from './components/Navigation';
import TestPage from './components/pages/TestPage';
import AssessmentPage from './components/pages/AssessmentPage';
import HistoryPage from './components/pages/HistoryPage';
import HowItWorksPage from './components/pages/HowItWorksPage';
import SafetyPage from './components/pages/SafetyPage';

function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('how-it-works');

  // Start with tutorial for first-time users
  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem('gritbreath-tutorial-completed');
    if (!hasCompletedTutorial) {
      setActiveTab('how-it-works');
      localStorage.setItem('gritbreath-tutorial-completed', 'true');
    } else {
      setActiveTab('test');
    }
  }, []);

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'test':
        return <TestPage onNavigate={handleNavigate} />;
      case 'assessment':
        return <AssessmentPage />;
      case 'history':
        return <HistoryPage />;
      case 'safety':
        return <SafetyPage />;
      default:
        return <TestPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="relative">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;