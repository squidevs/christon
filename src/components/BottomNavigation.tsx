import React from 'react';
import { Home, Target, Package, Trophy, BookOpen } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'inicio', name: 'Início', icon: Home },
    { id: 'missoes', name: 'Missões', icon: Target },
    { id: 'estudos', name: 'Estudos', icon: BookOpen },
    { id: 'conquistas', name: 'Conquistas', icon: Trophy },
    { id: 'inventario', name: 'Inventário', icon: Package }
  ];

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-spiritual bg-spiritual/10' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;