import React from 'react';
import { AlertTriangle, Phone, ExternalLink, Shield, Heart, Zap } from 'lucide-react';
import { contraindications, dangerousActivities, emergencyWarnings, medicalConsultationRecommended } from '../../data/safetyData';

const SafetyPage: React.FC = () => {
  const medicalResources = [
    {
      title: 'FDA Mobile Medical Applications Guidance',
      url: 'https://www.fda.gov/medical-devices/digital-health-center-excellence/device-software-functions-including-mobile-medical-applications',
      description: 'Official FDA guidance on mobile health applications'
    },
    {
      title: 'Cleveland Clinic: Diaphragmatic Breathing',
      url: 'https://my.clevelandclinic.org/health/articles/9445-diaphragmatic-breathing',
      description: 'Medical center guidance on breathing exercises'
    },
    {
      title: 'Effects of Diaphragmatic Breathing on Health (PMC)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7602530/',
      description: 'Peer-reviewed research on breathing exercise benefits'
    },
    {
      title: 'Dangers of the Wim Hof Method (Live Science)',
      url: 'https://www.livescience.com/health/gambling-with-your-life-experts-weigh-in-on-dangers-of-the-wim-hof-method',
      description: 'Expert analysis of breath-holding risks'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 px-4 py-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Emergency Section */}
        <div className="bg-red-100 border-2 border-red-300 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-900">Emergency Warning</h2>
              <p className="text-red-700">When to seek immediate medical attention</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-red-900 mb-3">🚨 STOP and seek emergency care if experiencing:</h3>
              <ul className="space-y-2">
                {emergencyWarnings.map((warning, index) => (
                  <li key={index} className="flex items-start space-x-2 text-red-800">
                    <AlertTriangle size={16} className="mt-1 flex-shrink-0" />
                    <span className="text-sm">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-200 rounded-lg p-4">
              <h3 className="font-bold text-red-900 mb-2">Emergency Numbers</h3>
              <p className="text-red-800 text-lg font-bold">📞 911 (US)</p>
              <p className="text-red-800 text-lg font-bold">📞 112 (EU)</p>
              <p className="text-sm text-red-700 mt-2">
                Call immediately if you experience any of the symptoms listed.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Medical Disclaimer */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Medical Disclaimer</h2>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-blue-900 mb-3 text-lg">FOR INFORMATIONAL PURPOSES ONLY - NOT MEDICAL ADVICE</h3>
            <p className="text-blue-800 leading-relaxed">
              This application is intended for informational and educational purposes only and is <strong>NOT</strong> intended to replace professional medical advice, diagnosis, or treatment. The breath-hold assessment and breathing exercise recommendations provided herein should not be considered medical advice or used as a substitute for consultation with a qualified healthcare provider.
            </p>
            <p className="text-blue-800 font-semibold mt-4">
              <strong>ALWAYS consult with your physician or other qualified healthcare provider before beginning any breathing exercises or breath-hold activities, especially if you have any pre-existing medical conditions.</strong>
            </p>
          </div>
        </div>

        {/* Contraindications */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Heart className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Contraindications</h2>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-red-900 mb-4 text-lg">⚠️ DO NOT USE THIS APP IF YOU HAVE:</h3>
            <div className="grid gap-4">
              {contraindications.map((item, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  item.severity === 'high' ? 'bg-red-100 border-red-300' : 'bg-yellow-100 border-yellow-300'
                }`}>
                  <div className="font-semibold text-gray-900 mb-1">{item.condition}</div>
                  <div className="text-sm text-gray-700">{item.reason}</div>
                  <div className={`text-xs mt-1 font-medium ${
                    item.severity === 'high' ? 'text-red-700' : 'text-yellow-700'
                  }`}>
                    Risk Level: {item.severity.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dangerous Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-900">Dangerous Activities</h2>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="font-bold text-orange-900 mb-4 text-lg">🚫 NEVER ATTEMPT:</h3>
            <ul className="space-y-3">
              {dangerousActivities.map((activity, index) => (
                <li key={index} className="flex items-start space-x-3 p-3 bg-orange-100 rounded-lg">
                  <span className="text-orange-600 font-bold text-lg">⚠️</span>
                  <span className="text-orange-800">{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medical Consultation */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Consult a Healthcare Provider</h2>
          
          <p className="text-gray-700 mb-4">
            You should consult with a healthcare provider before using breathing exercises if you have:
          </p>
          
          <ul className="space-y-2 mb-6">
            {medicalConsultationRecommended.map((condition, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-gray-700">{condition}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Remember:</strong> Your healthcare provider knows your medical history and can provide personalized guidance on whether breathing exercises are appropriate for your specific situation.
            </p>
          </div>
        </div>

        {/* Medical Resources */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Resources & Citations</h2>
          
          <div className="grid gap-4">
            {medicalResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-600 hover:text-blue-700">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Source Verification:</strong> All medical information and citations in this app are from peer-reviewed medical literature, 
              established medical institutions, or authoritative health organizations. Links are provided for transparency and verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyPage;