import { safeLocalStorage } from './storage';

interface AvatarCustomization {
  style: string;
  seed: string;
  accessoriesType?: string;
  clotheColor?: string;
  clotheType?: string;
  eyeType?: string;
  eyebrowType?: string;
  facialHairColor?: string;
  facialHairType?: string;
  hairColor?: string;
  hatColor?: string;
  mouthType?: string;
  skinColor?: string;
  topType?: string;
}

interface PlayerStats {
  sin: number;
  wisdom: number;
  spiritLevel: number;
  streak: number;
}

const STORAGE_KEYS = {
  ORIGINAL_AVATAR: 'christon-avatar-original',
  CURRENT_AVATAR: 'christon-avatar-customization',
  PLAYER_DATA: 'christon-player-data'
};

/**
 * Salva a customização original do avatar (sem modificações por pecado)
 */
export const saveOriginalAvatar = (customization: AvatarCustomization): void => {
  try {
    safeLocalStorage.setItem(
      STORAGE_KEYS.ORIGINAL_AVATAR,
      JSON.stringify(customization)
    );
  } catch (error) {
    console.warn('Failed to save original avatar:', error);
  }
};

/**
 * Carrega a customização original do avatar
 */
export const loadOriginalAvatar = (): AvatarCustomization | null => {
  try {
    const saved = safeLocalStorage.getItem(STORAGE_KEYS.ORIGINAL_AVATAR);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Failed to load original avatar:', error);
  }
  return null;
};

/**
 * Carrega a customização atual do avatar
 */
export const loadCurrentAvatar = (): AvatarCustomization | null => {
  try {
    const saved = safeLocalStorage.getItem(STORAGE_KEYS.CURRENT_AVATAR);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Failed to load current avatar:', error);
  }
  return null;
};

/**
 * Salva a customização atual do avatar
 */
export const saveCurrentAvatar = (customization: AvatarCustomization): void => {
  try {
    safeLocalStorage.setItem(
      STORAGE_KEYS.CURRENT_AVATAR,
      JSON.stringify(customization)
    );
  } catch (error) {
    console.warn('Failed to save current avatar:', error);
  }
};

/**
 * Carrega os dados do jogador
 */
export const loadPlayerStats = (): PlayerStats | null => {
  try {
    const saved = safeLocalStorage.getItem(STORAGE_KEYS.PLAYER_DATA);
    if (saved) {
      const data = JSON.parse(saved);
      return {
        sin: data.sin || 0,
        wisdom: data.wisdom || 0,
        spiritLevel: data.spiritLevel || 1,
        streak: data.streak || 0
      };
    }
  } catch (error) {
    console.warn('Failed to load player stats:', error);
  }
  return null;
};

/**
 * Aplica expressão triste ao avatar quando há pecado
 */
export const applySadExpression = (customization: AvatarCustomization): AvatarCustomization => {
  return {
    ...customization,
    eyeType: 'Cry', // Olhos chorando
    eyebrowType: 'SadConcerned', // Sobrancelhas tristes
    mouthType: 'Sad' // Boca triste
  };
};

/**
 * Restaura a expressão original do avatar
 */
export const restoreOriginalExpression = (): AvatarCustomization | null => {
  const original = loadOriginalAvatar();
  if (original) {
    saveCurrentAvatar(original);
    return original;
  }
  return null;
};

/**
 * Verifica se o jogador tem pecado e atualiza o avatar automaticamente
 * Retorna o avatar atualizado (triste ou original)
 */
export const checkAndUpdateAvatarBySin = (): AvatarCustomization | null => {
  const playerStats = loadPlayerStats();
  const currentAvatar = loadCurrentAvatar();
  
  if (!currentAvatar) {
    return null;
  }

  // Se não há avatar original salvo, salvar o atual como original
  const originalAvatar = loadOriginalAvatar();
  if (!originalAvatar) {
    saveOriginalAvatar(currentAvatar);
  }

  // Se há pecado, aplicar expressão triste
  if (playerStats && playerStats.sin > 0) {
    const sadAvatar = applySadExpression(originalAvatar || currentAvatar);
    saveCurrentAvatar(sadAvatar);
    return sadAvatar;
  } else {
    // Se não há pecado, restaurar expressão original
    const restoredAvatar = restoreOriginalExpression();
    return restoredAvatar || currentAvatar;
  }
};

/**
 * Gera a URL do avatar com base na customização
 */
export const generateAvatarUrl = (customization: AvatarCustomization): string => {
  const params = new URLSearchParams();
  
  // Sempre usar fundo transparente
  params.append('avatarStyle', 'Transparent');
  
  // Parâmetros de personalização
  if (customization.topType) params.append('topType', customization.topType);
  if (customization.accessoriesType) params.append('accessoriesType', customization.accessoriesType);
  if (customization.hairColor) params.append('hairColor', customization.hairColor);
  if (customization.facialHairType) params.append('facialHairType', customization.facialHairType);
  if (customization.clotheType) params.append('clotheType', customization.clotheType);
  if (customization.clotheColor) params.append('clotheColor', customization.clotheColor);
  if (customization.eyeType) params.append('eyeType', customization.eyeType);
  if (customization.eyebrowType) params.append('eyebrowType', customization.eyebrowType);
  if (customization.mouthType) params.append('mouthType', customization.mouthType);
  if (customization.skinColor) params.append('skinColor', customization.skinColor);
  
  return `https://avataaars.io/?${params.toString()}`;
};

/**
 * Hook para ser usado em componentes: atualiza avatar baseado em pecado
 */
export const useAvatarWithSinCheck = (): {
  avatarUrl: string;
  hasSin: boolean;
  updateAvatar: () => void;
} => {
  const playerStats = loadPlayerStats();
  const hasSin = (playerStats?.sin || 0) > 0;
  
  const updateAvatar = () => {
    const updatedAvatar = checkAndUpdateAvatarBySin();
    if (updatedAvatar) {
      const url = generateAvatarUrl(updatedAvatar);
      return url;
    }
    return '';
  };

  const avatarUrl = updateAvatar();

  return {
    avatarUrl,
    hasSin,
    updateAvatar
  };
};
