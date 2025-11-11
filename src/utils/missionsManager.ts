import { Mission } from '../data/missions';
import { safeLocalStorage } from './storage';

export type MissionStatus = 'available' | 'in_progress' | 'completed' | 'abandoned' | 'unavailable';

export interface MissionState {
  id: string;
  status: MissionStatus;
  startTime?: string; // ISO
  endTime?: string; // ISO
  progress?: number; // 0..1
  acceptedAt?: string;
}

const STORAGE_KEY = 'christon-missions-state';

export const loadMissionStates = (): Record<string, MissionState> => {
  const raw = safeLocalStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to parse mission states', error);
    return {};
  }
};

export const saveMissionStates = (states: Record<string, MissionState>) => {
  safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(states));
};

// Helper to compute endTime based on schedule
export const computeEndTime = (schedule: 'daily' | 'weekly' | 'monthly' | 'once', from?: Date): string => {
  const start = from ? new Date(from) : new Date();
  let end = new Date(start);

  switch (schedule) {
    case 'daily':
      end.setDate(start.getDate() + 1);
      break;
    case 'weekly':
      end.setDate(start.getDate() + 7);
      break;
    case 'monthly':
      end.setMonth(start.getMonth() + 1);
      break;
    case 'once':
    default:
      // default to 30 days
      end.setDate(start.getDate() + 30);
      break;
  }

  return end.toISOString();
};

export const initializeMissionStates = (allMissions: Mission[]) => {
  const existing = loadMissionStates();
  let changed = false;

  allMissions.forEach(m => {
    if (!existing[m.id]) {
      existing[m.id] = {
        id: m.id,
        status: 'available',
        progress: 0
      };
      changed = true;
    }
  });

  if (changed) saveMissionStates(existing);
  return existing;
};

export const acceptMission = (mission: Mission) => {
  const states = loadMissionStates();
  const s = states[mission.id] || { id: mission.id, status: 'available', progress: 0 };
  if (s.status === 'in_progress') return s;

  s.status = 'in_progress';
  s.startTime = new Date().toISOString();
  // compute endTime based on mission.schedule
  s.endTime = computeEndTime(mission.schedule || 'once', new Date());
  s.acceptedAt = s.startTime;
  s.progress = 0;

  states[mission.id] = s;
  saveMissionStates(states);
  return s;
};

export const completeMission = (mission: Mission) => {
  const states = loadMissionStates();
  const s = states[mission.id];
  if (!s) return null;
  s.status = 'completed';
  s.progress = 1;
  s.endTime = new Date().toISOString();
  saveMissionStates(states);
  return s;
};

export const abandonMission = (mission: Mission) => {
  const states = loadMissionStates();
  const s = states[mission.id] || { id: mission.id, status: 'available', progress: 0 };
  s.status = 'abandoned';
  s.endTime = new Date().toISOString();
  saveMissionStates(states);
  return s;
};

export const resetMission = (missionId: string) => {
  const states = loadMissionStates();
  delete states[missionId];
  saveMissionStates(states);
};

export const getMissionState = (missionId: string) => {
  const states = loadMissionStates();
  return states[missionId];
};

export const isMissionAvailable = (mission: Mission, completed: string[]) => {
  // check requirements
  if (mission.requirements) {
    if (mission.requirements.completedMissions) {
      const ok = mission.requirements.completedMissions.every(r => completed.includes(r));
      if (!ok) return false;
    }
  }
  return true;
};

export const getTimeRemaining = (endIso?: string) => {
  if (!endIso) return null;
  const now = Date.now();
  const end = new Date(endIso).getTime();
  const diff = end - now;
  if (diff <= 0) return 'Expirada';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export default {
  loadMissionStates,
  saveMissionStates,
  initializeMissionStates,
  acceptMission,
  completeMission,
  abandonMission,
  getMissionState,
  computeEndTime,
  isMissionAvailable,
  getTimeRemaining
};
