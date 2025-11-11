import { BookOpen, Award, Star, Shield, Heart, Target, Crown, Gift, Flame } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType;
  category: 'biblia' | 'espiritual' | 'missoes' | 'especial' | 'devocional';
  points: number;
  rewards: {
    xp?: number;
    wisdom?: number;
    items?: string[];
    spirit?: number;
  };
  requirement: {
    type: 'chapters_read' | 'missions_completed' | 'prayers' | 'consecutive_days' | 'wisdom_points' | 'special_action' | 'bible_books';
    target: number | string;
  };
  unlocked?: boolean;
  unlockedAt?: Date;
}

// 66 Conquistas dos livros da Bíblia
const bibleBooks = [
  'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Josué', 'Juízes', 'Rute',
  '1 Samuel', '2 Samuel', '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras', 'Neemias',
  'Ester', 'Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cantares', 'Isaías', 'Jeremias',
  'Lamentações', 'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós', 'Obadias', 'Jonas',
  'Miqueias', 'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias', 'Malaquias',
  'Mateus', 'Marcos', 'Lucas', 'João', 'Atos', 'Romanos', '1 Coríntios', '2 Coríntios',
  'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses',
  '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro', '2 Pedro',
  '1 João', '2 João', '3 João', 'Judas', 'Apocalipse'
];

export const achievements: Achievement[] = [
  // Conquistas dos 66 livros da Bíblia
  ...bibleBooks.map((book) => ({
    id: `bible_${book.toLowerCase().replace(/\s+/g, '_')}`,
    name: `Estudioso de ${book}`,
    description: `Complete o estudo do livro de ${book}`,
    icon: BookOpen,
    category: 'biblia' as const,
    points: 10,
    rewards: {
      xp: 50,
      wisdom: 25,
      spirit: 5
    },
    requirement: {
      type: 'bible_books' as const,
      target: book
    }
  })),

  // Conquistas Espirituais
  {
    id: 'first_prayer',
    name: 'Primeiros Passos',
    description: 'Faça sua primeira oração',
    icon: Heart,
    category: 'espiritual',
    points: 5,
    rewards: {
      xp: 25,
      wisdom: 10,
      items: ['cruz_pequena']
    },
    requirement: {
      type: 'prayers',
      target: 1
    }
  },
  {
    id: 'wisdom_seeker',
    name: 'Buscador de Sabedoria',
    description: 'Acumule 50 pontos de sabedoria',
    icon: Star,
    category: 'espiritual',
    points: 10,
    rewards: {
      xp: 75,
      wisdom: 30,
      items: ['pergaminho_sabedoria']
    },
    requirement: {
      type: 'wisdom_points',
      target: 50
    }
  },
  {
    id: 'wisdom_scholar',
    name: 'Erudito da Sabedoria',
    description: 'Acumule 200 pontos de sabedoria',
    icon: Award,
    category: 'espiritual',
    points: 25,
    rewards: {
      xp: 150,
      wisdom: 75,
      items: ['biblia_dourada'],
      spirit: 15
    },
    requirement: {
      type: 'wisdom_points',
      target: 200
    }
  },
  {
    id: 'wisdom_master',
    name: 'Mestre da Sabedoria',
    description: 'Acumule 500 pontos de sabedoria',
    icon: Crown,
    category: 'espiritual',
    points: 75,
    rewards: {
      xp: 300,
      wisdom: 150,
      items: ['coroa_sabedoria', 'dobro_fe_permanente'],
      spirit: 25
    },
    requirement: {
      type: 'wisdom_points',
      target: 500
    }
  },
  {
    id: 'prayer_devotee',
    name: 'Devoto da Oração',
    description: 'Faça 50 orações',
    icon: Heart,
    category: 'espiritual',
    points: 35,
    rewards: {
      xp: 200,
      wisdom: 100,
      items: ['rosario_sagrado'],
      spirit: 20
    },
    requirement: {
      type: 'prayers',
      target: 50
    }
  },

  // Conquistas de Missões
  {
    id: 'mission_starter',
    name: 'Guerreiro Iniciante',
    description: 'Complete 5 missões espirituais',
    icon: Target,
    category: 'missoes',
    points: 20,
    rewards: {
      xp: 100,
      wisdom: 50,
      items: ['escudo_fe']
    },
    requirement: {
      type: 'missions_completed',
      target: 5
    }
  },
  {
    id: 'mission_warrior',
    name: 'Guerreiro Experiente',
    description: 'Complete 25 missões espirituais',
    icon: Target,
    category: 'missoes',
    points: 40,
    rewards: {
      xp: 250,
      wisdom: 125,
      items: ['espada_espirito', 'elmo_salvacao']
    },
    requirement: {
      type: 'missions_completed',
      target: 25
    }
  },
  {
    id: 'mission_champion',
    name: 'Campeão das Missões',
    description: 'Complete 100 missões espirituais',
    icon: Crown,
    category: 'missoes',
    points: 100,
    rewards: {
      xp: 500,
      wisdom: 250,
      items: ['armadura_completa', 'multiplicador_xp'],
      spirit: 30
    },
    requirement: {
      type: 'missions_completed',
      target: 100
    }
  },

  // Conquistas Devocionais (Ofensivas)
  {
    id: 'faithful_three',
    name: 'Fiel por Três',
    description: 'Mantenha sua ofensiva por 3 dias consecutivos',
    icon: Flame,
    category: 'devocional',
    points: 15,
    rewards: {
      xp: 100,
      wisdom: 40,
      items: ['chama_fe']
    },
    requirement: {
      type: 'consecutive_days',
      target: 3
    }
  },
  {
    id: 'faithful_week',
    name: 'Guardião Semanal',
    description: 'Mantenha sua ofensiva por 7 dias consecutivos',
    icon: Shield,
    category: 'devocional',
    points: 30,
    rewards: {
      xp: 200,
      wisdom: 80,
      items: ['escudo_perseveranca', 'dobro_fe_semanal']
    },
    requirement: {
      type: 'consecutive_days',
      target: 7
    }
  },
  {
    id: 'faithful_month',
    name: 'Fiel Incansável',
    description: 'Mantenha sua ofensiva por 30 dias consecutivos',
    icon: Flame,
    category: 'devocional',
    points: 100,
    rewards: {
      xp: 600,
      wisdom: 300,
      items: ['coroa_perseveranca', 'multiplicador_permanente'],
      spirit: 40
    },
    requirement: {
      type: 'consecutive_days',
      target: 30
    }
  },

  // Conquistas Especiais
  {
    id: 'first_login',
    name: 'Bem-vindo ao Reino',
    description: 'Faça seu primeiro login no Christ.On',
    icon: Gift,
    category: 'especial',
    points: 5,
    rewards: {
      xp: 50,
      wisdom: 20,
      items: ['biblia_inicial']
    },
    requirement: {
      type: 'special_action',
      target: 'first_login'
    }
  },
  {
    id: 'armor_complete',
    name: 'Soldado Completo',
    description: 'Equipe todas as peças da Armadura de Deus',
    icon: Shield,
    category: 'especial',
    points: 50,
    rewards: {
      xp: 300,
      wisdom: 150,
      items: ['benção_divina', 'proteção_total'],
      spirit: 25
    },
    requirement: {
      type: 'special_action',
      target: 'complete_armor'
    }
  },
  {
    id: 'perfect_week',
    name: 'Semana Perfeita',
    description: 'Complete todas as ações diárias por uma semana',
    icon: Star,
    category: 'especial',
    points: 80,
    rewards: {
      xp: 400,
      wisdom: 200,
      items: ['halo_perfeicao', 'dobro_tudo'],
      spirit: 30
    },
    requirement: {
      type: 'special_action',
      target: 'perfect_week'
    }
  },
  {
    id: 'evangelist',
    name: 'Evangelista Digital',
    description: 'Compartilhe o app com 5 amigos',
    icon: Heart,
    category: 'especial',
    points: 40,
    rewards: {
      xp: 250,
      wisdom: 100,
      items: ['semente_fe', 'multiplicador_evangelismo']
    },
    requirement: {
      type: 'special_action',
      target: 'share_with_friends'
    }
  },

  // Conquistas Bíblicas Especiais
  {
    id: 'pentateuco_master',
    name: 'Mestre do Pentateuco',
    description: 'Complete o estudo dos 5 primeiros livros da Bíblia',
    icon: BookOpen,
    category: 'biblia',
    points: 50,
    rewards: {
      xp: 300,
      wisdom: 150,
      items: ['tabuas_lei', 'bastao_moises']
    },
    requirement: {
      type: 'special_action',
      target: 'complete_pentateuco'
    }
  },
  {
    id: 'old_testament',
    name: 'Conhecedor do Antigo',
    description: 'Complete o estudo de todo o Antigo Testamento',
    icon: BookOpen,
    category: 'biblia',
    points: 200,
    rewards: {
      xp: 1000,
      wisdom: 500,
      items: ['arca_alianca', 'multiplicador_antigo'],
      spirit: 50
    },
    requirement: {
      type: 'special_action',
      target: 'complete_old_testament'
    }
  },
  {
    id: 'new_testament',
    name: 'Seguidor do Novo',
    description: 'Complete o estudo de todo o Novo Testamento',
    icon: Heart,
    category: 'biblia',
    points: 150,
    rewards: {
      xp: 800,
      wisdom: 400,
      items: ['cruz_salvador', 'graca_infinita'],
      spirit: 40
    },
    requirement: {
      type: 'special_action',
      target: 'complete_new_testament'
    }
  },
  {
    id: 'bible_scholar',
    name: 'Erudito das Escrituras',
    description: 'Complete o estudo de toda a Bíblia (66 livros)',
    icon: Crown,
    category: 'biblia',
    points: 500,
    rewards: {
      xp: 2000,
      wisdom: 1000,
      items: ['coroa_rei_reis', 'sabedoria_infinita', 'multiplicador_divino'],
      spirit: 100
    },
    requirement: {
      type: 'special_action',
      target: 'complete_entire_bible'
    }
  }
];

export const getAchievementsByCategory = (category: Achievement['category']) => {
  return achievements.filter(achievement => achievement.category === category);
};

export const checkAchievementUnlock = (achievement: Achievement, playerStats: any): boolean => {
  switch (achievement.requirement.type) {
    case 'chapters_read':
      return playerStats.chaptersRead >= achievement.requirement.target;
    case 'missions_completed':
      return playerStats.missionsCompleted >= achievement.requirement.target;
    case 'prayers':
      return playerStats.prayers >= achievement.requirement.target;
    case 'consecutive_days':
      return playerStats.consecutiveDays >= achievement.requirement.target;
    case 'wisdom_points':
      return playerStats.wisdom >= achievement.requirement.target;
    case 'bible_books':
      return playerStats.completedBooks?.includes(achievement.requirement.target);
    case 'special_action':
      return playerStats.specialActions?.includes(achievement.requirement.target);
    default:
      return false;
  }
};