import React, { useState } from 'react';
import { AlertTriangle, X, ExternalLink } from 'lucide-react';
import { contraindications, dangerousActivities } from '../data/safetyData';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose, onAccept }) => {
  const [hasReadDisclaimer, setHasReadDisclaimer] = useState(false);
  const [acknowledgedRisks, setAcknowledgedRisks] = useState(false);

  if (!isOpen) return null;

  const handleAccept = () => {
    if (hasReadDisclaimer && acknowledgedRisks) {
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Medical Safety Warning</h2>
                <p className="text-sm text-gray-600">Required before using GritBreath</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Primary Medical Disclaimer */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-900 mb-2">FOR INFORMATIONAL PURPOSES ONLY - NOT MEDICAL ADVICE</h3>
            <p className="text-red-800 text-sm leading-relaxed">
              This application is intended for informational and educational purposes only and is NOT intended to replace professional medical advice, diagnosis, or treatment. 
              <strong> ALWAYS consult with your physician or other qualified healthcare provider before beginning any breathing exercises or breath-hold activities.</strong>
            </p>
          </div>

          {/* Contraindications */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">⚠️ DO NOT USE THIS APP IF YOU HAVE:</h3>
            <div className="space-y-2">
              {contraindications.map((item, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  item.severity === 'high' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="font-medium text-gray-900">{item.condition}</div>
                  <div className="text-sm text-gray-600">{item.reason}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dangerous Activities */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">🚫 NEVER ATTEMPT:</h3>
            <ul className="space-y-2">
              {dangerousActivities.map((activity, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Resources */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">📚 Medical Resources:</h3>
            <div className="space-y-2">
              <a 
                href="https://www.fda.gov/medical-devices/digital-health-center-excellence/device-software-functions-including-mobile-medical-applications"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                <ExternalLink size={16} />
                <span>FDA Mobile Medical Applications Guidance</span>
              </a>
              <a 
                href="https://my.clevelandclinic.org/health/articles/9445-diaphragmatic-breathing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                <ExternalLink size={16} />
                <span>Cleveland Clinic: Breathing Exercises</span>
              </a>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasReadDisclaimer}
                onChange={(e) => setHasReadDisclaimer(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#24880C] border-gray-300 rounded focus:ring-[#24880C]"
              />
              <span className="text-sm text-gray-700">
                I have read and understand that this app is for informational purposes only and is not medical advice. 
                I understand I should consult a healthcare provider before beginning any breathing exercises.
              </span>
            </label>
            
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgedRisks}
                onChange={(e) => setAcknowledgedRisks(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#24880C] border-gray-300 rounded focus:ring-[#24880C]"
              />
              <span className="text-sm text-gray-700">
                I acknowledge the contraindications and dangerous activities listed above. I confirm that I do not have any of the listed medical conditions that would make breath-hold exercises unsafe for me.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAccept}
              disabled={!hasReadDisclaimer || !acknowledgedRisks}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                hasReadDisclaimer && acknowledgedRisks
                  ? 'bg-[#24880C] text-white hover:bg-[#1f7a0a]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              I Accept and Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyModal;