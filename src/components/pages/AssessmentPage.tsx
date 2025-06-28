import React from 'react';
import { ExternalLink, AlertTriangle, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TestResult } from '../../types';
import { getAssessmentDetails } from '../../data/assessmentData';

const AssessmentPage: React.FC = () => {
  const [lastResult] = useLocalStorage<TestResult | null>('gritbreath-last-result', null);

  if (!lastResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8 pb-20 md:pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Assessment Available</h2>
            <p className="text-gray-600 mb-6">Complete a breath-hold test to see your assessment and recommendations.</p>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const assessment = getAssessmentDetails(lastResult.duration);
  const minutes = Math.floor(lastResult.duration / 60);
  const seconds = Math.floor(lastResult.duration % 60);
  const formattedDuration = minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Medical Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Medical Disclaimer</h3>
              <p className="text-sm text-yellow-700">
                This assessment is for informational purposes only and is not medical advice. 
                Consult a healthcare provider before beginning any breathing exercise program.
              </p>
            </div>
          </div>
        </div>

        {/* Performance Score */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Assessment</h1>
            <p className="text-gray-600">Based on your breath-hold duration of {formattedDuration}</p>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div 
              className="px-6 py-3 rounded-full text-white font-bold text-xl"
              style={{ backgroundColor: assessment.color }}
            >
              {assessment.title}
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-lg text-gray-700 mb-4">{assessment.description}</p>
            <p className="text-gray-600">{assessment.feedback}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Medical Note</h3>
            <p className="text-sm text-blue-800">{assessment.medicalNote}</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Evidence-Based Recommendations</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {assessment.recommendations.map((exercise, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{exercise.title}</h3>
                <p className="text-gray-600 mb-4">{exercise.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Technique:</h4>
                  <ul className="space-y-1">
                    {exercise.technique.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="text-[#24880C] mr-2">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Duration:</span>
                    <p className="text-sm text-gray-900">{exercise.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Frequency:</span>
                    <p className="text-sm text-gray-900">{exercise.frequency}</p>
                  </div>
                </div>

                {exercise.caution && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Caution:</strong> {exercise.caution}
                    </p>
                  </div>
                )}

                <a
                  href={exercise.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <ExternalLink size={16} />
                  <span>{exercise.source}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;