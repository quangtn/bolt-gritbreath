import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Trash2, Download, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TestResult } from '../../types';
import { getAssessmentDetails } from '../../data/assessmentData';

const HistoryPage: React.FC = () => {
  const [testResults, setTestResults] = useLocalStorage<TestResult[]>('gritbreath-results', []);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const clearHistory = () => {
    setTestResults([]);
    setShowConfirmDelete(false);
  };

  const exportData = () => {
    const csvData = [
      ['Date', 'Duration (seconds)', 'Performance Level'],
      ...testResults.map(result => [
        new Date(result.date).toLocaleDateString(),
        result.duration.toFixed(2),
        result.performanceLevel
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gritbreath-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartData = testResults
    .slice(0, 10)
    .reverse()
    .map((result, index) => ({
      test: `Test ${index + 1}`,
      duration: result.duration,
      date: new Date(result.date).toLocaleDateString(),
      level: result.performanceLevel
    }));

  const getAverageImprovement = () => {
    if (testResults.length < 2) return null;
    
    const recent = testResults.slice(0, 5);
    const older = testResults.slice(5, 10);
    
    if (older.length === 0) return null;

    const recentAvg = recent.reduce((sum, r) => sum + r.duration, 0) / recent.length;
    const olderAvg = older.reduce((sum, r) => sum + r.duration, 0) / older.length;
    
    return ((recentAvg - olderAvg) / olderAvg) * 100;
  };

  const improvement = getAverageImprovement();

  if (testResults.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8 pb-20 md:pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No History Yet</h2>
            <p className="text-gray-600 mb-6">
              Complete breath-hold tests to track your progress over time.
            </p>
            <p className="text-sm text-gray-500">
              Your improvement journey starts with the first test!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Progress History</h1>
          <div className="flex space-x-3">
            <button
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 size={16} />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Tests</h3>
            <p className="text-3xl font-bold text-[#24880C]">{testResults.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Duration</h3>
            <p className="text-3xl font-bold text-blue-600">
              {Math.max(...testResults.map(r => r.duration)).toFixed(1)}s
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Trend</h3>
            {improvement !== null ? (
              <p className={`text-3xl font-bold ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {improvement >= 0 ? '+' : ''}{improvement.toFixed(1)}%
              </p>
            ) : (
              <p className="text-lg text-gray-500">Need more data</p>
            )}
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Chart</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="test" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    label={{ value: 'Duration (seconds)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(1)}s`, 'Duration']}
                    labelFormatter={(label) => {
                      const data = chartData.find(d => d.test === label);
                      return data ? `${label} (${data.date})` : label;
                    }}
                  />
                  
                  {/* Reference lines for performance levels */}
                  <ReferenceLine y={30} stroke="#F72585" strokeDasharray="5 5" />
                  <ReferenceLine y={60} stroke="#FFC53D" strokeDasharray="5 5" />
                  <ReferenceLine y={120} stroke="#24880C" strokeDasharray="5 5" />
                  
                  <Line 
                    type="monotone" 
                    dataKey="duration" 
                    stroke="#24880C" 
                    strokeWidth={3}
                    dot={{ fill: '#24880C', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#24880C', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Reference lines: 30s (Average threshold), 60s (Good threshold), 120s (Excellent threshold)
            </div>
          </div>
        )}

        {/* Recent Results */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Results</h2>
          <div className="space-y-4">
            {testResults.slice(0, 10).map((result, index) => {
              const assessment = getAssessmentDetails(result.duration);
              const minutes = Math.floor(result.duration / 60);
              const seconds = Math.floor(result.duration % 60);
              const formattedDuration = minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;
              
              return (
                <div key={result.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold text-gray-900">#{testResults.length - index}</div>
                    <div>
                      <div className="font-medium text-gray-900">{formattedDuration}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(result.date).toLocaleDateString()} at {new Date(result.date).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div 
                    className="px-3 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: assessment.color }}
                  >
                    {assessment.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirm Delete Modal */}
        {showConfirmDelete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Clear All History?</h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. All your test results and progress data will be permanently deleted.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={clearHistory}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;