import React, { useState, useEffect } from 'react';
import { Play, Square, RotateCcw, Shield, HelpCircle } from 'lucide-react';
import { useBreathHoldTimer } from '../../hooks/useBreathHoldTimer';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TestResult, NavigationTab } from '../../types';
import { getAssessmentDetails } from '../../data/assessmentData';
import CircularProgress from '../CircularProgress';
import SafetyModal from '../SafetyModal';
import HowItWorksPage from './HowItWorksPage';

interface TestPageProps {
  onNavigate: (tab: NavigationTab) => void;
}

const TestPage: React.FC<TestPageProps> = ({ onNavigate }) => {
  const { isRunning, start, stop, reset, getFormattedTime } = useBreathHoldTimer();
  const [testResults, setTestResults] = useLocalStorage<TestResult[]>('gritbreath-results', []);
  const [safetyAccepted, setSafetyAccepted] = useLocalStorage('gritbreath-safety-accepted', false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [lastResult, setLastResult] = useLocalStorage<TestResult | null>('gritbreath-last-result', null);
  const [testComplete, setTestComplete] = useState(false);

  const timeData = getFormattedTime();
  const maxTime = 120; // 2 minutes max for safety
  const progress = Math.min((timeData.totalSeconds / maxTime) * 100, 100);

  useEffect(() => {
    if (!safetyAccepted) {
      setShowSafetyModal(true);
    }
  }, [safetyAccepted]);

  const handleStart = () => {
    if (!safetyAccepted) {
      setShowSafetyModal(true);
      return;
    }
    setTestComplete(false);
    start();
  };

  const handleStop = () => {
    stop();
    
    const duration = timeData.totalSeconds;
    const assessment = getAssessmentDetails(duration);
    
    const result: TestResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration,
      performanceLevel: assessment.level
    };

    setTestResults(prev => [result, ...prev]);
    setLastResult(result);
    setTestComplete(true);
  };

  const handleReset = () => {
    reset();
    setTestComplete(false);
  };

  const handleSafetyAccept = () => {
    setSafetyAccepted(true);
    setShowSafetyModal(false);
  };

  const handleViewResults = () => {
    onNavigate('assessment');
  };

  const getStatusText = () => {
    if (testComplete) {
      return "Test complete! Check your results.";
    }
    if (isRunning) {
      return "Hold your breath...";
    }
    return "Ready to begin breath-hold test";
  };

  const getStatusColor = () => {
    if (testComplete) return "text-[#24880C]";
    if (isRunning) return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 pb-20 md:pb-4">
      <SafetyModal 
        isOpen={showSafetyModal}
        onClose={() => setShowSafetyModal(false)}
        onAccept={handleSafetyAccept}
      />
      
      {/* How It Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="relative h-full">
            <button
              onClick={() => setShowHowItWorks(false)}
              className="absolute top-4 right-4 z-60 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <HowItWorksPage onClose={() => setShowHowItWorks(false)} />
          </div>
        </div>
      )}
      
      {/* Help and Safety Buttons */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 flex space-x-2">
        <button
          onClick={() => setShowHowItWorks(true)}
          className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          title="How It Works"
        >
          <HelpCircle className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => onNavigate('safety')}
          className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          title="Safety Information"
        >
          <Shield className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">GritBreath</h1>
        <p className="text-lg text-gray-600">Breathe Deep. Build Resilience.</p>
      </div>

      {/* Timer Display */}
      <div className="relative mb-8">
        <CircularProgress 
          progress={progress} 
          size={240}
          strokeWidth={12}
          isActive={isRunning}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-mono font-bold text-gray-900 mb-2">
              {timeData.formatted}
            </div>
            <div className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-4 mb-8">
        {!isRunning && !testComplete && (
          <button
            onClick={handleStart}
            className="flex items-center space-x-2 px-8 py-4 bg-[#24880C] text-white rounded-full font-semibold text-lg hover:bg-[#1f7a0a] transition-colors shadow-lg"
          >
            <Play size={24} />
            <span>Start Test</span>
          </button>
        )}

        {isRunning && (
          <button
            onClick={handleStop}
            className="flex items-center space-x-2 px-8 py-4 bg-red-500 text-white rounded-full font-semibold text-lg hover:bg-red-600 transition-colors shadow-lg"
          >
            <Square size={24} />
            <span>Stop</span>
          </button>
        )}

        {(testComplete || timeData.totalSeconds > 0) && !isRunning && (
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-4 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 transition-colors shadow-lg"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Results Button */}
      {testComplete && (
        <button
          onClick={handleViewResults}
          className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg"
        >
          View Results & Recommendations
        </button>
      )}

      {/* Safety Reminder */}
      <div className="mt-8 max-w-md text-center">
        <p className="text-sm text-gray-500">
          Maximum test duration: 2 minutes for safety. Stop immediately if you feel dizzy or uncomfortable.
        </p>
      </div>
    </div>
  );
};

export default TestPage;