import React from 'react';
import { Shield, Sword, Crown, Heart, ShieldCheck, Footprints, Layers } from 'lucide-react';

interface ArmorPiece {
  equipped: boolean;
  integrity: number;
  level: number;
}

interface ArmorHUDProps {
  armorPieces: {
    beltOfTruth: ArmorPiece;
    breastplateOfRighteousness: ArmorPiece;
    sandalsOfPeace: ArmorPiece;
    shieldOfFaith: ArmorPiece;
    helmetOfSalvation: ArmorPiece;
    swordOfSpirit: ArmorPiece;
    cloakOfWisdom: ArmorPiece;
  };
}

const ArmorHUD: React.FC<ArmorHUDProps> = ({ armorPieces }) => {
  const getArmorIcon = (piece: string) => {
    const iconSize = 20; // Ícones maiores
    switch (piece) {
      case 'beltOfTruth': return <Shield size={iconSize} className="text-amber-700" />; // Cinturão
      case 'breastplateOfRighteousness': return <Layers size={iconSize} className="text-blue-600" />; // Couraça
      case 'sandalsOfPeace': return <Footprints size={iconSize} className="text-green-600" />; // Sandálias
      case 'shieldOfFaith': return <ShieldCheck size={iconSize} className="text-purple-600" />; // Escudo
      case 'helmetOfSalvation': return <Crown size={iconSize} className="text-yellow-500" />; // Capacete
      case 'swordOfSpirit': return <Sword size={iconSize} className="text-red-600" />; // Espada
      case 'cloakOfWisdom': return <Heart size={iconSize} className="text-indigo-600" />; // Manto
      default: return <Heart size={iconSize} />;
    }
  };

  const getArmorName = (piece: string): string => {
    switch (piece) {
      case 'beltOfTruth': return 'Cinturão';
      case 'breastplateOfRighteousness': return 'Couraça';
      case 'sandalsOfPeace': return 'Sandálias';
      case 'shieldOfFaith': return 'Escudo';
      case 'helmetOfSalvation': return 'Capacete';
      case 'swordOfSpirit': return 'Espada';
      case 'cloakOfWisdom': return 'Manto';
      default: return '';
    }
  };

  const getIntegrityColor = (integrity: number) => {
    if (integrity >= 80) return 'bg-victory';
    if (integrity >= 60) return 'bg-wisdom';
    if (integrity >= 40) return 'bg-orange-400';
    return 'bg-sin';
  };

  return (
    <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm border border-gray-100">
      {/* Header compacto */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display font-semibold text-sm sm:text-base">
          Armadura de Deus
        </h3>
        <span className="text-xs text-gray-500">Efésios 6:10-18</span>
      </div>
      
      {/* Grid de armadura em 1 linha */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1">
        {Object.entries(armorPieces).map(([key, piece]) => (
          <div key={key} className="flex-shrink-0 text-center min-w-[60px] sm:min-w-[70px]">
            <div 
              className={`armor-piece ${piece.equipped ? 'armor-complete' : 'armor-incomplete'} mb-1 w-10 h-10 sm:w-12 sm:h-12 mx-auto flex items-center justify-center transition-all duration-300 ${
                piece.equipped ? 'shadow-md border-2 border-spiritual/30' : 'opacity-40'
              }`}
            >
              {getArmorIcon(key)}
            </div>
            
            {piece.equipped && (
              <div className="w-full bg-gray-200 rounded-full h-1 mb-0.5">
                <div 
                  className={`h-1 rounded-full transition-all duration-300 ${getIntegrityColor(piece.integrity)}`}
                  style={{ width: `${piece.integrity}%` }}
                />
              </div>
            )}
            
            <div className="text-[8px] sm:text-[9px] text-gray-600 font-medium leading-tight">
              {piece.equipped ? (
                <>
                  <div className="hidden sm:block text-gray-700 truncate">{getArmorName(key)}</div>
                  <div className="text-spiritual font-bold">{piece.integrity}%</div>
                </>
              ) : (
                <span className="text-gray-400 text-[8px] truncate block">
                  {getArmorName(key)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArmorHUD;