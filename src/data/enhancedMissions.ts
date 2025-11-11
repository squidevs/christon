export interface Mission {
  id: string;
  name: string;
  description: string;
  type: 'cruz_diaria' | 'batalha_espiritual' | 'guerra_santa' | 'quiz_biblia';
  category: 'verdade' | 'sabedoria' | 'amor' | 'conhecimento' | 'oracao' | 'jejum' | 'quiz';
  duration: number;
  startTime: string;
  endTime: string;
  reward: {
    wisdom: number;
    spiritPoints: number;
    items: string[];
  };
  penalty?: {
    sin: number;
    wisdomLoss: number;
  };
  status: 'ativa' | 'completa' | 'falhada' | 'disponivel';
  progress: number;
  armorEffect: string;
  verse: {
    text: string;
    reference: string;
  };
  // Para missões de quiz
  quizData?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  // Para missões relacionais
  relationshipStatus?: 'solteiro' | 'casado';
}

export const missions: Mission[] = [
  // Cruz Diária - Missões da vida real diárias
  {
    id: "nao_mentir_001",
    name: "Não mentir",
    description: "Passe o dia sem contar nenhuma mentira",
    type: "cruz_diaria",
    category: "verdade",
    duration: 86400000,
    startTime: "2025-11-10T06:00:00Z",
    endTime: "2025-11-11T06:00:00Z",
    reward: {
      wisdom: 25,
      spiritPoints: 5,
      items: []
    },
    penalty: {
      sin: 1,
      wisdomLoss: 10
    },
    status: "ativa",
    progress: 0.65,
    armorEffect: "beltOfTruth",
    verse: {
      text: "Portanto, deixem a mentira e falem a verdade cada um ao seu próximo",
      reference: "Efésios 4:25"
    }
  },
  {
    id: "oracao_matinal_001",
    name: "Oração Matinal",
    description: "Faça sua primeira oração do dia até às 9h",
    type: "cruz_diaria",
    category: "oracao",
    duration: 86400000,
    startTime: "2025-11-10T06:00:00Z",
    endTime: "2025-11-11T06:00:00Z",
    reward: {
      wisdom: 20,
      spiritPoints: 8,
      items: []
    },
    penalty: {
      sin: 0,
      wisdomLoss: 5
    },
    status: "disponivel",
    progress: 0,
    armorEffect: "helmetOfSalvation",
    verse: {
      text: "De manhã ouves a minha voz, ó Senhor; de manhã te apresento a minha oração",
      reference: "Salmos 5:3"
    }
  },
  {
    id: "declarar_amor_001",
    name: "Declarar amor",
    description: "Diga que ama seu cônjuge",
    type: "cruz_diaria",
    category: "amor",
    duration: 86400000,
    startTime: "2025-11-10T06:00:00Z", 
    endTime: "2025-11-11T06:00:00Z",
    reward: {
      wisdom: 35,
      spiritPoints: 10,
      items: ["agua_vida"]
    },
    penalty: {
      sin: 2,
      wisdomLoss: 15
    },
    status: "ativa",
    progress: 0,
    armorEffect: "cloakOfWisdom",
    verse: {
      text: "Acima de tudo, revistam-se do amor, que é o elo perfeito",
      reference: "Colossenses 3:14"
    },
    relationshipStatus: "casado"
  },

  // Batalha Espiritual Semanal
  {
    id: "nao_fofocar_001", 
    name: "Não fofocar",
    description: "Não faça aparência do mal, não fofoque durante toda a semana",
    type: "batalha_espiritual",
    category: "sabedoria",
    duration: 604800000,
    startTime: "2025-11-09T00:00:00Z",
    endTime: "2025-11-16T00:00:00Z",
    reward: {
      wisdom: 50,
      spiritPoints: 15,
      items: ["oleo_uncao"]
    },
    penalty: {
      sin: 3,
      wisdomLoss: 25
    },
    status: "ativa",
    progress: 0.43,
    armorEffect: "breastplateOfRighteousness",
    verse: {
      text: "Quem muito fala, muito erra; quem é sábio refreia a língua",
      reference: "Provérbios 10:19"
    }
  },
  {
    id: "jejum_semanal_001",
    name: "Jejum de 24h",
    description: "Faça um jejum completo de 24 horas durante a semana",
    type: "batalha_espiritual",
    category: "jejum",
    duration: 604800000,
    startTime: "2025-11-09T00:00:00Z",
    endTime: "2025-11-16T00:00:00Z",
    reward: {
      wisdom: 75,
      spiritPoints: 20,
      items: ["oleo_uncao", "agua_vida"]
    },
    penalty: {
      sin: 0,
      wisdomLoss: 30
    },
    status: "disponivel",
    progress: 0,
    armorEffect: "shieldOfFaith",
    verse: {
      text: "Jejuai e orai para que não entreis em tentação",
      reference: "Mateus 26:41"
    }
  },
  {
    id: "orar_por_outros_001",
    name: "Orar por outros",
    description: "Ore por pelo menos 5 pessoas diferentes durante a semana",
    type: "batalha_espiritual",
    category: "oracao",
    duration: 604800000,
    startTime: "2025-11-09T00:00:00Z",
    endTime: "2025-11-16T00:00:00Z",
    reward: {
      wisdom: 60,
      spiritPoints: 18,
      items: ["agua_vida"]
    },
    penalty: {
      sin: 1,
      wisdomLoss: 20
    },
    status: "disponivel",
    progress: 0,
    armorEffect: "helmetOfSalvation",
    verse: {
      text: "Orai uns pelos outros para que sareis",
      reference: "Tiago 5:16"
    }
  },

  // Guerra Santa Mensal
  {
    id: "estudar_biblia_001",
    name: "Estudar bíblia",
    description: "Complete o estudo de um livro bíblico inteiro",
    type: "guerra_santa",
    category: "conhecimento",
    duration: 2592000000,
    startTime: "2025-11-01T00:00:00Z",
    endTime: "2025-12-01T00:00:00Z",
    reward: {
      wisdom: 100,
      spiritPoints: 25,
      items: ["biblia_sagrada"]
    },
    penalty: {
      sin: 5,
      wisdomLoss: 50
    },
    status: "completa",
    progress: 1,
    armorEffect: "swordOfSpirit",
    verse: {
      text: "Toda Escritura é inspirada por Deus e útil para o ensino",
      reference: "2 Timóteo 3:16"
    }
  },
  {
    id: "evangelismo_mensal_001",
    name: "Compartilhar o Evangelho",
    description: "Compartilhe o evangelho com pelo menos 3 pessoas este mês",
    type: "guerra_santa",
    category: "amor",
    duration: 2592000000,
    startTime: "2025-11-01T00:00:00Z",
    endTime: "2025-12-01T00:00:00Z",
    reward: {
      wisdom: 150,
      spiritPoints: 40,
      items: ["biblia_sagrada", "oleo_uncao"]
    },
    penalty: {
      sin: 2,
      wisdomLoss: 40
    },
    status: "ativa",
    progress: 0.2,
    armorEffect: "shoesOfPeace",
    verse: {
      text: "Como são belos os pés dos que anunciam boas novas",
      reference: "Romanos 10:15"
    }
  },

  // Quiz Bíblico - Afiar a Espada
  {
    id: "quiz_genesis_001",
    name: "Gênesis: No Princípio",
    description: "Teste seus conhecimentos sobre o livro de Gênesis",
    type: "quiz_biblia",
    category: "quiz",
    duration: 0, // Quiz não tem duração específica
    startTime: "2025-11-10T00:00:00Z",
    endTime: "2025-12-31T23:59:59Z",
    reward: {
      wisdom: 30,
      spiritPoints: 10,
      items: []
    },
    status: "disponivel",
    progress: 0,
    armorEffect: "swordOfSpirit",
    verse: {
      text: "No princípio criou Deus os céus e a terra",
      reference: "Gênesis 1:1"
    },
    quizData: {
      question: "Quantos dias Deus levou para criar o mundo?",
      options: ["5 dias", "6 dias", "7 dias", "8 dias"],
      correctAnswer: 1,
      explanation: "Deus criou o mundo em 6 dias e descansou no sétimo dia, conforme descrito em Gênesis 1-2."
    }
  },
  {
    id: "quiz_exodus_001",
    name: "Êxodo: A Libertação",
    description: "Teste seus conhecimentos sobre o livro de Êxodo",
    type: "quiz_biblia",
    category: "quiz",
    duration: 0,
    startTime: "2025-11-10T00:00:00Z",
    endTime: "2025-12-31T23:59:59Z",
    reward: {
      wisdom: 30,
      spiritPoints: 10,
      items: []
    },
    status: "disponivel",
    progress: 0,
    armorEffect: "swordOfSpirit",
    verse: {
      text: "Eu sou o Senhor teu Deus, que te tirei da terra do Egito",
      reference: "Êxodo 20:2"
    },
    quizData: {
      question: "Quem libertou o povo de Israel do Egito?",
      options: ["Abraão", "Moisés", "Davi", "Salomão"],
      correctAnswer: 1,
      explanation: "Moisés foi escolhido por Deus para libertar o povo de Israel da escravidão no Egito."
    }
  },
  {
    id: "quiz_psalms_001",
    name: "Salmos: Cânticos do Coração",
    description: "Teste seus conhecimentos sobre os Salmos",
    type: "quiz_biblia",
    category: "quiz",
    duration: 0,
    startTime: "2025-11-10T00:00:00Z",
    endTime: "2025-12-31T23:59:59Z",
    reward: {
      wisdom: 35,
      spiritPoints: 12,
      items: []
    },
    status: "disponivel",
    progress: 0,
    armorEffect: "swordOfSpirit",
    verse: {
      text: "O Senhor é o meu pastor; nada me faltará",
      reference: "Salmos 23:1"
    },
    quizData: {
      question: "Qual é o salmo mais famoso conhecido como 'Salmo do Pastor'?",
      options: ["Salmo 1", "Salmo 23", "Salmo 91", "Salmo 119"],
      correctAnswer: 1,
      explanation: "O Salmo 23 é conhecido como 'Salmo do Pastor' e começa com 'O Senhor é o meu pastor'."
    }
  },
  {
    id: "quiz_john_001",
    name: "João: O Amor de Deus",
    description: "Teste seus conhecimentos sobre o Evangelho de João",
    type: "quiz_biblia",
    category: "quiz",
    duration: 0,
    startTime: "2025-11-10T00:00:00Z",
    endTime: "2025-12-31T23:59:59Z",
    reward: {
      wisdom: 40,
      spiritPoints: 15,
      items: ["agua_vida"]
    },
    status: "disponivel",
    progress: 0,
    armorEffect: "swordOfSpirit",
    verse: {
      text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito",
      reference: "João 3:16"
    },
    quizData: {
      question: "Complete o versículo: 'Porque Deus amou o mundo de tal maneira que...'",
      options: [
        "salvou a todos",
        "deu o seu Filho unigênito", 
        "perdoou os pecados",
        "criou o paraíso"
      ],
      correctAnswer: 1,
      explanation: "João 3:16 é um dos versículos mais conhecidos da Bíblia, falando sobre o amor de Deus."
    }
  }
];

export const getMissionsByType = (type: Mission['type']) => {
  return missions.filter(mission => mission.type === type);
};

export const getMissionsByCategory = (category: Mission['category']) => {
  return missions.filter(mission => mission.category === category);
};

export const getMissionsByStatus = (status: Mission['status']) => {
  return missions.filter(mission => mission.status === status);
};

export const getAvailableMissionsForUser = (userStatus: 'solteiro' | 'casado') => {
  return missions.filter(mission => {
    // Se a missão tem requisito de status de relacionamento, verificar
    if (mission.relationshipStatus) {
      return mission.relationshipStatus === userStatus;
    }
    // Se não tem requisito, está disponível para todos
    return true;
  });
};