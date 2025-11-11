import React from 'react';
import { Shield, Sword, Crown, Heart } from 'lucide-react';

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
    switch (piece) {
      case 'shieldOfFaith': return <Shield size={16} />;
      case 'swordOfSpirit': return <Sword size={16} />;
      case 'helmetOfSalvation': return <Crown size={16} />;
      default: return <Heart size={16} />;
    }
  };

  const getIntegrityColor = (integrity: number) => {
    if (integrity >= 80) return 'bg-victory';
    if (integrity >= 60) return 'bg-wisdom';
    if (integrity >= 40) return 'bg-orange-400';
    return 'bg-sin';
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h3 className="font-display font-semibold text-lg mb-4 text-center">
        Armadura de Deus
      </h3>
      
      <div className="grid grid-cols-4 gap-3 mb-4">
        {Object.entries(armorPieces).map(([key, piece]) => (
          <div key={key} className="text-center">
            <div 
              className={`armor-piece ${piece.equipped ? 'armor-complete' : 'armor-incomplete'} mb-2`}
            >
              {getArmorIcon(key)}
            </div>
            
            {piece.equipped && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getIntegrityColor(piece.integrity)}`}
                  style={{ width: `${piece.integrity}%` }}
                />
              </div>
            )}
            
            <div className="text-xs text-gray-600 mt-1">
              {piece.equipped ? `${piece.integrity}%` : 'Não equipado'}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-600">
        <span className="font-medium">Efésios 6:10-18</span> - 
        Revesti-vos de toda a armadura de Deus
      </div>
    </div>
  );
};

export default ArmorHUD;