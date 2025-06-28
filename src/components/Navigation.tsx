import React from 'react';
import { Activity, Award, BarChart3, Shield } from 'lucide-react';
import { NavigationTab } from '../types';

interface NavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'test' as NavigationTab, label: 'Test', icon: Activity },
    { id: 'assessment' as NavigationTab, label: 'Assessment', icon: Award },
    { id: 'history' as NavigationTab, label: 'History', icon: BarChart3 },
    { id: 'safety' as NavigationTab, label: 'Safety', icon: Shield }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white/70 backdrop-blur-lg border-b border-white/20 px-6 py-4">
        <div className="flex space-x-8 mx-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === id
                  ? 'bg-[#24880C] text-white shadow-lg'
                  : 'text-gray-600 hover:text-[#24880C] hover:bg-white/50'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 px-4 py-2 z-50">
        <div className="flex justify-around">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                activeTab === id
                  ? 'text-[#24880C]'
                  : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;