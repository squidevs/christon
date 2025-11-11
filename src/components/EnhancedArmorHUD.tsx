import React, { useState, useEffect } from 'react';
import { Shield, Sword, Crown, ShieldCheck, Footprints, AlertTriangle, Clock, Package } from 'lucide-react';
import { inventoryManager } from '../utils/inventoryManager';

interface ActiveConsumable {
  name: string;
  expiresAt: number;
  icon: string;
}

interface EnhancedArmorHUDProps {
  sin?: number;
}

const EnhancedArmorHUD: React.FC<EnhancedArmorHUDProps> = ({ sin = 0 }) => {
  const [equippedArmor, setEquippedArmor] = useState<string[]>([]);
  const [activeConsumables, setActiveConsumables] = useState<ActiveConsumable[]>([]);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Atualizar tempo a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Carregar armadura equipada
  useEffect(() => {
    const loadEquipment = () => {
      const equipped = inventoryManager.getEquippedArmor();
      setEquippedArmor(equipped);
    };

    loadEquipment();
    const interval = setInterval(loadEquipment, 2000); // Atualiza a cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  // Carregar consumíveis ativos (mock - integrar com sistema real depois)
  useEffect(() => {
    // TODO: Integrar com sistema de consumíveis real
    // Por enquanto, apenas um exemplo
    const mockConsumables: ActiveConsumable[] = [];
    setActiveConsumables(mockConsumables);
  }, []);

  const getArmorIcon = (name: string) => {
    if (name.includes('Cinturão')) return <Shield className="w-5 h-5" />;
    if (name.includes('Couraça')) return <ShieldCheck className="w-5 h-5" />;
    if (name.includes('Sandálias')) return <Footprints className="w-5 h-5" />;
    if (name.includes('Escudo')) return <Shield className="w-5 h-5" />;
    if (name.includes('Capacete')) return <Crown className="w-5 h-5" />;
    if (name.includes('Espada')) return <Sword className="w-5 h-5" />;
    return <Shield className="w-5 h-5" />;
  };

  const formatTimeRemaining = (expiresAt: number): string => {
    const diff = expiresAt - currentTime;
    
    if (diff <= 0) return 'Expirado';

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <h3 className="font-sans font-semibold text-base sm:text-lg text-center">
          Armadura de Deus
        </h3>
        
        {/* Indicador de Pecado */}
        {sin > 0 && (
          <div className="flex items-center space-x-1 bg-sin/10 px-2 sm:px-3 py-1 rounded-full border border-sin/20">
            <AlertTriangle size={14} className="sm:w-4 sm:h-4 text-sin" />
            <span className="text-sin font-bold text-xs sm:text-sm">{sin}</span>
            <span className="text-sin text-xs">Pecado</span>
          </div>
        )}
      </div>

      {/* Armadura Equipada */}
      <div className="border-t pt-3">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-spiritual" />
          <h4 className="font-semibold text-sm text-gray-700">Equipamento</h4>
        </div>
        
        {equippedArmor.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {equippedArmor.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-spiritual/5 px-2 py-1.5 rounded-lg border border-spiritual/20"
              >
                <div className="text-spiritual">
                  {getArmorIcon(item)}
                </div>
                <span className="text-xs font-medium text-gray-700 truncate">
                  {item.replace('da ', '').replace('do ', '').replace('das ', '')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 italic">Nenhum equipamento</p>
        )}
      </div>

      {/* Consumíveis Ativos */}
      {activeConsumables.length > 0 && (
        <div className="border-t pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-wisdom" />
            <h4 className="font-semibold text-sm text-gray-700">Efeitos Ativos</h4>
          </div>
          
          <div className="space-y-2">
            {activeConsumables.map((consumable, index) => {
              const timeLeft = formatTimeRemaining(consumable.expiresAt);
              const isExpiring = (consumable.expiresAt - currentTime) < 60000; // Menos de 1 minuto
              
              return (
                <div 
                  key={index}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border ${
                    isExpiring 
                      ? 'bg-sin/5 border-sin/20' 
                      : 'bg-victory/5 border-victory/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${isExpiring ? 'text-sin' : 'text-victory'}`} />
                    <span className="text-xs font-medium text-gray-700">
                      {consumable.name}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${isExpiring ? 'text-sin' : 'text-victory'}`}>
                    {timeLeft}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 pt-2 border-t">
        <span className="font-medium">Efésios 6:10-18</span>
      </div>
    </div>
  );
};

export default EnhancedArmorHUD;
