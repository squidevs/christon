import { useState, useEffect } from 'react';
import Header from './components/Header';
import ArmorHUD from './components/ArmorHUD';
import BottomNavigation from './components/BottomNavigation';
import ActionsPage from './pages/ActionsPage';
import ItemsPage from './pages/ItemsPage';
import { safeLocalStorage } from './utils/storage';
import EnhancedMissionsPage from './pages/EnhancedMissionsPage';
import ProfilePage from './pages/ProfilePage';
import AchievementsPage from './pages/AchievementsPage';
import StudiesPage from './pages/StudiesPage';

// Import dos dados JSON (simulação)
import playerData from './data/player.json';

function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [playerAvatar, setPlayerAvatar] = useState<string>(() => {
    return safeLocalStorage.getItem('christon-avatar') || '';
  });

  const [avatarBackground, setAvatarBackground] = useState<string>(() => {
    return safeLocalStorage.getItem('christon-avatar-background') || 'spiritual1';
  });

  const [playerStatus, setPlayerStatus] = useState<'solteiro' | 'casado'>(() => {
    try {
      const savedProfile = safeLocalStorage.getItem('christon-profile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        return profile.status || 'solteiro';
      }
    } catch (error) {
      console.warn('Failed to load player status:', error);
    }
    return 'solteiro';
  });

  // Função para atualizar o avatar globalmente
  const updatePlayerAvatar = (newAvatar: string) => {
    setPlayerAvatar(newAvatar);
    safeLocalStorage.setItem('christon-avatar', newAvatar);
  };

  // Função para atualizar o fundo do avatar globalmente
  const updateAvatarBackground = (newBackground: string) => {
    setAvatarBackground(newBackground);
    safeLocalStorage.setItem('christon-avatar-background', newBackground);
  };

  // Função para atualizar o status civil
  const updatePlayerStatus = (newStatus: 'solteiro' | 'casado') => {
    setPlayerStatus(newStatus);
  };

  // Função para gerar avatar padrão
  const generateDefaultAvatar = () => {
    const defaultParams = new URLSearchParams();
    defaultParams.append('avatarStyle', 'Transparent');
    defaultParams.append('topType', 'ShortHairShortFlat');
    defaultParams.append('accessoriesType', 'Blank');
    defaultParams.append('hairColor', 'BrownDark');
    defaultParams.append('facialHairType', 'Blank');
    defaultParams.append('clotheType', 'ShirtCrewNeck');
    defaultParams.append('clotheColor', 'Gray01');
    defaultParams.append('eyeType', 'Default');
    defaultParams.append('eyebrowType', 'Default');
    defaultParams.append('mouthType', 'Default');
    defaultParams.append('skinColor', 'Light');
    
    return `https://avataaars.io/?${defaultParams.toString()}`;
  };

  // Gerar avatar automaticamente se não existir
  useEffect(() => {
    if (!playerAvatar) {
      const defaultAvatar = generateDefaultAvatar();
      updatePlayerAvatar(defaultAvatar);
    }
  }, [playerAvatar]);

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return <ActionsPage />;
      case 'missoes':
        return <EnhancedMissionsPage />;
      case 'estudos':
        return <StudiesPage onBack={() => setActiveTab('inicio')} />;
      case 'conquistas':
        return <AchievementsPage onBack={() => setActiveTab('inicio')} />;
      case 'inventario':
        return <ItemsPage />;
      case 'perfil':
        return <ProfilePage 
          onAvatarUpdate={updatePlayerAvatar} 
          onStatusUpdate={updatePlayerStatus}
          onBackgroundUpdate={updateAvatarBackground}
        />;
      default:
        return <ActionsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <Header
        playerName={playerData.name}
        spiritLevel={playerData.spiritLevel}
        wisdom={playerData.wisdom}
        streak={playerData.streak}
        avatarUrl={playerAvatar}
        avatarBackground={avatarBackground}
        onNavigate={setActiveTab}
      />
      
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'inicio' && (
          <div className="p-4 mb-4">
            <ArmorHUD armorPieces={playerData.armorPieces} />
          </div>
        )}
        {renderContent()}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0">
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}

export default App;