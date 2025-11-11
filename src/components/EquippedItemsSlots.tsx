import React, { useEffect, useState } from 'react';
import { inventoryManager, EquippedItem } from '../utils/inventoryManager';
import { X, Infinity, Package, Sparkles, BookOpen } from 'lucide-react';

interface EquippedItemsSlotsProps {
  onUpdate?: () => void;
  compact?: boolean; // Modo compacto para header
}

const EquippedItemsSlots: React.FC<EquippedItemsSlotsProps> = ({ onUpdate, compact = false }) => {
  const [consumableSlots, setConsumableSlots] = useState<(EquippedItem | null)[]>([null, null, null]);
  const [permanentSlots, setPermanentSlots] = useState<(EquippedItem | null)[]>([null, null]);

  useEffect(() => {
    loadSlots();
    
    // Atualizar a cada segundo para timers
    const interval = setInterval(() => {
      inventoryManager.clearExpiredItems();
      loadSlots();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const loadSlots = () => {
    const slots = inventoryManager.getEquippedSlots();
    console.log('🎒 Slots carregados:', slots);
    setConsumableSlots(slots.consumableSlots);
    setPermanentSlots(slots.permanentSlots);
  };

  const handleUnequip = (slotType: 'consumable' | 'permanent', index: number) => {
    inventoryManager.unequipItemFromSlot(slotType, index);
    loadSlots();
    onUpdate?.();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderSlot = (slot: EquippedItem | null, type: 'consumable' | 'permanent', index: number) => {
    if (!slot) {
      return (
        <div className={`relative bg-gray-700/30 border-2 border-dashed border-gray-600 rounded-lg ${
          compact ? 'p-1 h-10 w-10 sm:h-12 sm:w-12' : 'p-2 h-20'
        } flex flex-col items-center justify-center`}>
          <Package className={`${compact ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-6 h-6'} text-gray-500 mb-1`} />
          {!compact && (
            <span className="text-[9px] text-gray-500 text-center">
              {type === 'consumable' ? 'Consumível' : 'Permanente'}
            </span>
          )}
        </div>
      );
    }

    const timeRemaining = inventoryManager.getTimeRemaining(slot);
    const isPermanent = timeRemaining === null;

    return (
      <div className={`relative bg-gradient-to-br ${
        type === 'permanent' ? 'from-purple-600/40 to-indigo-600/40 border-purple-400' : 'from-blue-600/40 to-cyan-600/40 border-blue-400'
      } border-2 rounded-lg ${compact ? 'p-1 h-10 w-10 sm:h-12 sm:w-12' : 'p-2 h-20'} flex flex-col items-center justify-between backdrop-blur-sm`}>
        {/* Botão remover */}
        {!compact && (
          <button
            onClick={() => handleUnequip(type, index)}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors shadow-sm z-10"
          >
            <X className="w-3 h-3" />
          </button>
        )}

        {/* Ícone do item */}
        <div className="flex items-center justify-center mb-1">
          {type === 'permanent' ? (
            slot.name === 'Bíblia Sagrada' ? (
              <BookOpen className={`${compact ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-5 h-5'} text-purple-200`} />
            ) : (
              <Sparkles className={`${compact ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-5 h-5'} text-purple-200`} />
            )
          ) : (
            <Package className={`${compact ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-5 h-5'} text-blue-200`} />
          )}
        </div>

        {/* Nome do item */}
        {!compact && (
          <span className="text-[9px] font-medium text-center text-white leading-tight line-clamp-2 px-1">
            {slot.name}
          </span>
        )}

        {/* Timer */}
        <div className={`flex items-center gap-1 text-white text-xs font-bold ${compact ? 'text-[8px]' : ''}`}>
          {isPermanent ? (
            <>
              <Infinity className={`${compact ? 'w-2 h-2' : 'w-3 h-3'}`} />
              {!compact && <span className="text-[8px]">∞</span>}
            </>
          ) : (
            <span className={compact ? 'text-[8px]' : 'text-[10px]'}>{formatTime(timeRemaining!)}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={compact ? '' : 'bg-white rounded-lg p-3 shadow-sm border border-gray-100'}>
      {!compact && <h4 className="text-xs font-semibold text-gray-700 mb-2">Itens Equipados</h4>}
      
      <div className={`flex items-center ${compact ? 'gap-1 sm:gap-1.5 justify-center' : 'gap-2'}`}>
        {/* Permanentes - 2 slots (PRIMEIRO) */}
        {permanentSlots.map((slot, index) => (
          <div key={`permanent-${index}`}>
            {renderSlot(slot, 'permanent', index)}
          </div>
        ))}

        {/* Separador visual */}
        {compact && <div className="w-px h-10 bg-gray-600" />}

        {/* Consumíveis - 3 slots (DEPOIS) */}
        {consumableSlots.map((slot, index) => (
          <div key={`consumable-${index}`}>
            {renderSlot(slot, 'consumable', index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquippedItemsSlots;
