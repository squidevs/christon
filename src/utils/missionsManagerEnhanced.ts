import { Mission } from '../types/mission';
import { safeLocalStorage } from './storage';
import { inventoryManager } from './inventoryManager';

const STORAGE_KEY = 'christon-missions-state';

interface MissionState {
  [missionId: number]: {
    status: Mission['status'];
    checkboxes: { [checkboxId: number]: boolean };
    quizProgress: number;
    lastUpdated: number;
  };
}

export const missionsManager = {
  // Carregar estado das missões
  loadMissionsState(): MissionState {
    try {
      const saved = safeLocalStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.warn('Erro ao carregar estado das missões:', error);
      return {};
    }
  },

  // Salvar estado das missões
  saveMissionsState(state: MissionState): void {
    try {
      safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Erro ao salvar estado das missões:', error);
    }
  },

  // Atualizar status de uma missão
  updateMissionStatus(missionId: number, status: Mission['status']): void {
    const state = this.loadMissionsState();
    if (!state[missionId]) {
      state[missionId] = {
        status: 'ativa',
        checkboxes: {},
        quizProgress: 0,
        lastUpdated: Date.now()
      };
    }
    state[missionId].status = status;
    state[missionId].lastUpdated = Date.now();
    this.saveMissionsState(state);
  },

  // Alternar checkbox
  toggleCheckbox(missionId: number, checkboxId: number): void {
    const state = this.loadMissionsState();
    if (!state[missionId]) {
      state[missionId] = {
        status: 'ativa',
        checkboxes: {},
        quizProgress: 0,
        lastUpdated: Date.now()
      };
    }
    state[missionId].checkboxes[checkboxId] = !state[missionId].checkboxes[checkboxId];
    state[missionId].lastUpdated = Date.now();
    this.saveMissionsState(state);
  },

  // Atualizar progresso do quiz
  updateQuizProgress(missionId: number, progress: number): void {
    const state = this.loadMissionsState();
    if (!state[missionId]) {
      state[missionId] = {
        status: 'ativa',
        checkboxes: {},
        quizProgress: 0,
        lastUpdated: Date.now()
      };
    }
    state[missionId].quizProgress = progress;
    state[missionId].lastUpdated = Date.now();
    this.saveMissionsState(state);
  },

  // Aplicar estado salvo às missões
  applyStateToMissions(missions: Mission[]): Mission[] {
    const state = this.loadMissionsState();
    
    return missions.map(mission => {
      const savedState = state[mission.id];
      if (!savedState) return mission;

      // Atualizar status
      const updatedMission = { ...mission, status: savedState.status };

      // Atualizar checkboxes se houver
      if (mission.interacoes.progresso.checkboxes.length > 0) {
        updatedMission.interacoes = {
          ...mission.interacoes,
          progresso: {
            ...mission.interacoes.progresso,
            checkboxes: mission.interacoes.progresso.checkboxes.map(cb => ({
              ...cb,
              feito: savedState.checkboxes[cb.id] || false
            }))
          }
        };
      }

      // Atualizar progresso do quiz
      if (savedState.quizProgress > 0) {
        updatedMission.interacoes = {
          ...mission.interacoes,
          progresso: {
            ...mission.interacoes.progresso,
            porcentagem: savedState.quizProgress
          }
        };
      }

      return updatedMission;
    });
  },

  // Verificar e atualizar missões expiradas
  checkExpiredMissions(missions: Mission[]): Mission[] {
    const now = Date.now();
    
    return missions.map(mission => {
      // Se já está marcada como expirada ou concluída, manter
      if (mission.status === 'expirada' || mission.status === 'concluida') {
        return mission;
      }

      // Verificar se expirou
      if (mission.dataExpiracao && now > mission.dataExpiracao) {
        // Atualizar no estado
        this.updateMissionStatus(mission.id, 'expirada');
        return { ...mission, status: 'expirada' };
      }

      return mission;
    });
  },

  // Completar missão e aplicar recompensas
  completeMission(missionId: number, mission: Mission): void {
    this.updateMissionStatus(missionId, 'concluida');
    
    // Aplicar recompensas ao jogador
    this.applyRewards(mission);
  },

  // Desistir de missão e aplicar penalidades
  giveUpMission(missionId: number, mission: Mission): void {
    this.updateMissionStatus(missionId, 'desistida');
    
    // Aplicar penalidades ao jogador
    this.applyPenalties(mission);
  },

  // Aplicar recompensas (integrar com sistema do jogador)
  applyRewards(mission: Mission): void {
    try {
      const profile = safeLocalStorage.getItem('christon-profile');
      if (!profile) return;

      const playerData = JSON.parse(profile);
      
      // Adicionar XP de sabedoria
      playerData.wisdom = (playerData.wisdom || 0) + mission.recompensas.xpSabedoria;
      
      // Adicionar moedas de fé (se houver sistema de moedas)
      if (playerData.coins !== undefined) {
        playerData.coins = (playerData.coins || 0) + mission.recompensas.moedasFe;
      }

      safeLocalStorage.setItem('christon-profile', JSON.stringify(playerData));
      
      // Adicionar consumíveis/equipamentos ao inventário
      if (mission.recompensas.consumiveis.length > 0) {
        mission.recompensas.consumiveis.forEach(consumivel => {
          for (let i = 0; i < consumivel.quantidade; i++) {
            inventoryManager.addItem(consumivel.tipo);
          }
        });
      }
    } catch (error) {
      console.error('Erro ao aplicar recompensas:', error);
    }
  },

  // Aplicar penalidades (integrar com sistema do jogador)
  applyPenalties(mission: Mission): void {
    try {
      const profile = safeLocalStorage.getItem('christon-profile');
      if (!profile) return;

      const playerData = JSON.parse(profile);
      
      // Adicionar pecados
      playerData.sin = (playerData.sin || 0) + mission.penalidades.efeitos.pecado;
      
      // Remover XP
      playerData.wisdom = Math.max(0, (playerData.wisdom || 0) - mission.penalidades.efeitos.perdaXp);

      safeLocalStorage.setItem('christon-profile', JSON.stringify(playerData));
    } catch (error) {
      console.error('Erro ao aplicar penalidades:', error);
    }
  },

  // Resetar todas as missões (útil para debug)
  resetAllMissions(): void {
    safeLocalStorage.removeItem(STORAGE_KEY);
  }
};
