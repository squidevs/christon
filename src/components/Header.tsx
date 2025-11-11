import React, { useState, useEffect, useRef } from 'react';
import { User, Settings, Bell, ChevronDown, UserCog, LogOut } from 'lucide-react';
import AvatarWithBackground from './AvatarBackgrounds';

interface HeaderProps {
  playerName: string;
  spiritLevel: number;
  wisdom: number;
  streak: number;
  avatarUrl?: string;
  avatarBackground?: string;
  onNavigate?: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ playerName, spiritLevel, wisdom, streak, avatarUrl, avatarBackground = 'spiritual1', onNavigate }) => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-dark text-white p-4 flex items-center justify-between relative">
      <div className="flex items-center space-x-3">
        <AvatarWithBackground
          avatarUrl={avatarUrl}
          backgroundId={avatarBackground}
          size="md"
          fallbackIcon={<User size={20} />}
        />
        <div>
          <h2 className="font-display font-semibold text-lg">{playerName}</h2>
          <p className="text-sm text-gray-300">Nível {spiritLevel} • Espírito Santo</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <div className="text-wisdom font-bold text-lg">{wisdom}</div>
          <div className="text-xs text-gray-300">Sabedoria</div>
        </div>
        
        <div className="text-center">
          <div className="text-victory font-bold text-lg">{streak}</div>
          <div className="text-xs text-gray-300">Ofensiva</div>
        </div>
        
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative">
          <Bell size={20} />
          {/* Mock de notificações - substituir por lógica real */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>
        
        {/* Menu de Configurações com Dropdown */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-1"
          >
            <Settings size={20} />
            <ChevronDown size={16} className={`transition-transform ${showSettingsMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu */}
          {showSettingsMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={() => {
                  onNavigate?.('perfil');
                  setShowSettingsMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <UserCog size={16} />
                <span>Perfil</span>
              </button>
              
              <button
                onClick={() => {
                  // Implementar configurações gerais posteriormente
                  setShowSettingsMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Settings size={16} />
                <span>Configurações</span>
              </button>
              
              <hr className="my-2 border-gray-200" />
              
              <button
                onClick={() => {
                  // Implementar logout posteriormente
                  setShowSettingsMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;