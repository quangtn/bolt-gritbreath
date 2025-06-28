import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Target, Play, Square, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowItWorksPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      icon: Settings,
      title: 'Set the Stage',
      description: 'Find a quiet, comfortable space free from distractions. Sit or lie down in a relaxed position. Ensure you have emergency contact information available.',
      background: 'from-blue-500 to-blue-600',
      tips: ['Choose a quiet environment', 'Sit comfortably', 'Remove distractions', 'Have water nearby']
    },
    {
      id: 2,
      icon: Target,
      title: 'Fill Your Lungs',
      description: 'Take a deep, natural breath through your nose. Fill your lungs completely but comfortably. Avoid hyperventilation or forced breathing.',
      background: 'from-green-500 to-green-600',
      tips: ['Breathe naturally', 'Fill lungs completely', 'No hyperventilation', 'Stay relaxed']
    },
    {
      id: 3,
      icon: Play,
      title: 'Start the Clock',
      description: 'Press the start button and begin holding your breath. Stay calm and relaxed. The timer will track your progress with precision.',
      background: 'from-purple-500 to-purple-600',
      tips: ['Press start button', 'Hold breath calmly', 'Stay relaxed', 'Trust the process']
    },
    {
      id: 4,
      icon: Square,
      title: 'Stop When Ready',
      description: 'End the test when you feel the natural urge to breathe. Don\'t push beyond comfort. Your safety is the top priority.',
      background: 'from-red-500 to-red-600',
      tips: ['Listen to your body', 'Stop when ready', 'Safety first', 'No competition']
    },
    {
      id: 5,
      icon: Award,
      title: 'Check Results',
      description: 'View your assessment and evidence-based recommendations. Track your progress over time and follow medical guidelines.',
      background: 'from-yellow-500 to-yellow-600',
      tips: ['View assessment', 'Read recommendations', 'Track progress', 'Follow medical advice']
    }
  ];

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/test');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20 md:pb-8">
      <div className="relative h-screen overflow-hidden">
        {/* Slide Content */}
        <div className={`h-full bg-gradient-to-br ${currentSlideData.background} flex items-center justify-center text-white relative`}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            {/* Icon */}
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Icon size={48} />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {currentSlideData.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {currentSlideData.description}
            </p>

            {/* Tips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {currentSlideData.tips.map((tip, index) => (
                <div key={index} className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm font-medium">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicator */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <div className="text-lg font-semibold">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-8 md:right-8">
        <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center shadow-lg">
          <p className="text-sm text-gray-700">
            <strong>Safety First:</strong> Always prioritize safety over performance. Stop immediately if you feel uncomfortable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;