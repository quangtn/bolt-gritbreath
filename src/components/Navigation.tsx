import { Link, useLocation } from 'react-router-dom';
import { Activity, Award, BarChart3, Shield, BookOpen } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const activeTab = location.pathname.replace('/', '');

  const tabs = [
    { id: 'test', label: 'Test', path: '/test', icon: Activity },
    { id: 'assessment', label: 'Assessment', path: '/assessment', icon: Award },
    { id: 'history', label: 'History', path: '/history', icon: BarChart3 },
    { id: 'safety', label: 'Safety', path: '/safety', icon: Shield },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white/70 backdrop-blur-lg border-b border-white/20 px-6 py-4">
        <div className="flex space-x-8 mx-auto">
          {tabs.map(({ id, label, path, icon: Icon }) => (
            <Link
              key={id}
              to={path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === id
                  ? 'bg-[#24880C] text-white shadow-lg'
                  : 'text-gray-600 hover:text-[#24880C] hover:bg-white/50'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 px-4 py-2 z-50">
        <div className="flex justify-around">
          {tabs.map(({ id, label, path, icon: Icon }) => (
            <Link
              key={id}
              to={path}
              className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                activeTab === id ? 'text-[#24880C]' : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;