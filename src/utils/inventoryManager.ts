import { safeLocalStorage } from './storage';

interface PlayerInventory {
  items: string[];
  equipment: {
    biblia: boolean;
    espada: boolean;
    capacete: boolean;
    couraca: boolean;
    escudo: boolean;
    sandalias: boolean;
    cinturao: boolean;
  };
}

const INVENTORY_KEY = 'christon-inventory';

export const inventoryManager = {
  // Carregar inventário
  loadInventory(): PlayerInventory {
    try {
      const saved = safeLocalStorage.getItem(INVENTORY_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Erro ao carregar inventário:', error);
    }
    
    // Inventário padrão vazio
    return {
      items: [],
      equipment: {
        biblia: false,
        espada: false,
        capacete: false,
        couraca: false,
        escudo: false,
        sandalias: false,
        cinturao: false
      }
    };
  },

  // Salvar inventário
  saveInventory(inventory: PlayerInventory): void {
    try {
      safeLocalStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch (error) {
      console.error('Erro ao salvar inventário:', error);
    }
  },

  // Adicionar item ao inventário
  addItem(itemName: string): void {
    const inventory = this.loadInventory();
    
    // Verificar se é equipamento da armadura
    const itemLower = itemName.toLowerCase();
    
    if (itemLower.includes('bíblia') || itemLower.includes('biblia')) {
      inventory.equipment.biblia = true;
    } else if (itemLower.includes('espada')) {
      inventory.equipment.espada = true;
    } else if (itemLower.includes('capacete')) {
      inventory.equipment.capacete = true;
    } else if (itemLower.includes('couraça') || itemLower.includes('couraca')) {
      inventory.equipment.couraca = true;
    } else if (itemLower.includes('escudo')) {
      inventory.equipment.escudo = true;
    } else if (itemLower.includes('sandálias') || itemLower.includes('sandalias')) {
      inventory.equipment.sandalias = true;
    } else if (itemLower.includes('cinturão') || itemLower.includes('cinturao')) {
      inventory.equipment.cinturao = true;
    } else {
      // Item consumível normal
      inventory.items.push(itemName);
    }
    
    this.saveInventory(inventory);
  },

  // Verificar se tem Bíblia equipada
  hasBible(): boolean {
    const inventory = this.loadInventory();
    return inventory.equipment.biblia;
  },

  // Verificar se tem Espada equipada
  hasSword(): boolean {
    const inventory = this.loadInventory();
    return inventory.equipment.espada;
  },

  // Verificar peça específica da armadura
  hasArmorPiece(piece: keyof PlayerInventory['equipment']): boolean {
    const inventory = this.loadInventory();
    return inventory.equipment[piece];
  },

  // Obter todas as peças da armadura equipadas
  getEquippedArmor(): string[] {
    const inventory = this.loadInventory();
    const equipped: string[] = [];
    
    if (inventory.equipment.cinturao) equipped.push('Cinturão da Verdade');
    if (inventory.equipment.couraca) equipped.push('Couraça da Justiça');
    if (inventory.equipment.sandalias) equipped.push('Sandálias do Evangelho');
    if (inventory.equipment.escudo) equipped.push('Escudo da Fé');
    if (inventory.equipment.capacete) equipped.push('Capacete da Salvação');
    if (inventory.equipment.espada) equipped.push('Espada do Espírito');
    if (inventory.equipment.biblia) equipped.push('Bíblia Sagrada');
    
    return equipped;
  },

  // Resetar inventário (DEBUG)
  resetInventory(): void {
    safeLocalStorage.removeItem(INVENTORY_KEY);
  }
};
