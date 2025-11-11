export type MissionType = 'daily' | 'weekly' | 'monthly' | 'quiz';
export type MissionCategory = 'cruz_diaria' | 'batalha_espiritual' | 'guerra_santa' | 'afiar_espada';
export type MissionStatus = 'available' | 'in_progress' | 'completed' | 'failed' | 'abandoned';

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: MissionType;
  category: MissionCategory;
  duration: number; // em horas
  icon: string; // emoji ou nome do ícone
  
  // Recompensas
  xpReward: number;
  wisdomReward: number;
  spiritReward?: number;
  itemRewards?: string[];
  
  // Penalidades por desistir
  sinPenalty: number;
  xpPenalty: number;
  
  // Requisitos
  requirements?: {
    spiritLevel?: number;
    completedMissions?: string[];
    maritalStatus?: 'solteiro' | 'casado';
  };
  
  // Para missões com múltiplos objetivos
  objectives?: string[];
  
  // Para quizzes
  questions?: string[];
  
  // Estado atual
  status: MissionStatus;
  startTime?: Date;
  endTime?: Date;
  progress?: number; // 0-1
}

// Missões Diárias - Cruz Diária (24h)
export const dailyMissions: Mission[] = [
  {
    id: 'daily_prayer',
    title: 'Não mentir',
    description: 'Passe o dia sem contar nenhuma mentira',
    type: 'daily',
    category: 'cruz_diaria',
    duration: 24,
    icon: '💒',
    xpReward: 50,
    wisdomReward: 10,
    spiritReward: 5,
    sinPenalty: 1,
    xpPenalty: 25,
    status: 'available'
  },
  {
    id: 'daily_no_gossip',
    title: 'Não fofocar',
    description: 'Fuja da aparência do mal, não fofoque!',
    type: 'daily',
    category: 'cruz_diaria',
    duration: 24,
    icon: '🤐',
    xpReward: 50,
    wisdomReward: 10,
    spiritReward: 5,
    sinPenalty: 1,
    xpPenalty: 25,
    status: 'available'
  },
  {
    id: 'daily_read_bible',
    title: 'Ler a Bíblia',
    description: 'Dedique tempo para ler as Escrituras hoje',
    type: 'daily',
    category: 'cruz_diaria',
    duration: 24,
    icon: '📖',
    xpReward: 75,
    wisdomReward: 20,
    spiritReward: 10,
    sinPenalty: 1,
    xpPenalty: 30,
    status: 'available'
  }
];

// Missões Semanais - Batalha Espiritual (7 dias)
export const weeklyMissions: Mission[] = [
  {
    id: 'weekly_declare_love',
    title: 'Declarar amor',
    description: 'Diga que ama seu cônjuge',
    type: 'weekly',
    category: 'batalha_espiritual',
    duration: 168, // 7 dias
    icon: '💕',
    xpReward: 100,
    wisdomReward: 30,
    spiritReward: 15,
    sinPenalty: 2,
    xpPenalty: 50,
    requirements: {
      maritalStatus: 'casado'
    },
    status: 'available'
  },
  {
    id: 'weekly_fast',
    title: 'Jejum semanal',
    description: 'Pratique o jejum por um período desta semana',
    type: 'weekly',
    category: 'batalha_espiritual',
    duration: 168,
    icon: '🙏',
    xpReward: 150,
    wisdomReward: 40,
    spiritReward: 25,
    sinPenalty: 2,
    xpPenalty: 75,
    status: 'available'
  }
];

// Missões Mensais - Guerra Santa (30 dias)
export const monthlyMissions: Mission[] = [
  {
    id: 'monthly_family_devotion',
    title: 'Devoção familiar',
    description: 'Mantenha a devoção familiar durante todo o mês',
    type: 'monthly',
    category: 'guerra_santa',
    duration: 720, // 30 dias
    icon: '👨‍👩‍👧‍👦',
    xpReward: 500,
    wisdomReward: 100,
    spiritReward: 50,
    sinPenalty: 5,
    xpPenalty: 200,
    objectives: [
      'Fazer devoção familiar 20 dias do mês',
      'Incluir todos os membros da família',
      'Usar material bíblico adequado'
    ],
    requirements: {
      maritalStatus: 'casado'
    },
    status: 'available'
  },
  {
    id: 'monthly_evangelism',
    title: 'Evangelismo mensal',
    description: 'Compartilhe o evangelho com pelo menos 5 pessoas',
    type: 'monthly',
    category: 'guerra_santa',
    duration: 720,
    icon: '📢',
    xpReward: 300,
    wisdomReward: 80,
    spiritReward: 40,
    sinPenalty: 3,
    xpPenalty: 100,
    objectives: [
      'Conversar sobre fé com 5 pessoas',
      'Distribuir material evangelístico',
      'Convidar alguém para a igreja'
    ],
    status: 'available'
  }
];

// Quizzes - Afiar a Espada
export const quizMissions: Mission[] = [
  {
    id: 'quiz_genesis',
    title: 'Estudar bíblia',
    description: 'Afie a espada de Deus',
    type: 'quiz',
    category: 'afiar_espada',
    duration: 1, // 1 hora
    icon: '⚔️',
    xpReward: 80,
    wisdomReward: 80,
    sinPenalty: 1,
    xpPenalty: 40,
    questions: ['gen_001', 'gen_002', 'gen_003'],
    status: 'available'
  }
];

// Todas as missões
export const allMissions: Mission[] = [
  ...dailyMissions,
  ...weeklyMissions,
  ...monthlyMissions,
  ...quizMissions
];

// Função para filtrar missões por status do usuário
export const getAvailableMissions = (userStatus: 'solteiro' | 'casado'): Mission[] => {
  return allMissions.filter(mission => {
    if (mission.requirements?.maritalStatus && mission.requirements.maritalStatus !== userStatus) {
      return false;
    }
    return true;
  });
};

// Função para calcular tempo restante
export const getTimeRemaining = (endTime: Date): string => {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();
  
  if (diff <= 0) return '00h00m';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}d${hours % 24}h`;
  }
  
  return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m`;
};

// Função para obter cor da categoria
export const getCategoryColor = (category: MissionCategory): string => {
  switch (category) {
    case 'cruz_diaria': return 'bg-blue-100 text-blue-700';
    case 'batalha_espiritual': return 'bg-purple-100 text-purple-700';
    case 'guerra_santa': return 'bg-red-100 text-red-700';
    case 'afiar_espada': return 'bg-orange-100 text-orange-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// Função para obter nome da categoria
export const getCategoryName = (category: MissionCategory): string => {
  switch (category) {
    case 'cruz_diaria': return 'Cruz Diária';
    case 'batalha_espiritual': return 'Batalha Espiritual Semanal';
    case 'guerra_santa': return 'Guerra Santa Mensal';
    case 'afiar_espada': return 'Quiz';
    default: return 'Missão';
  }
};