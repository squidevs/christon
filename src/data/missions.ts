export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  book: string;
  chapter?: number;
  verse?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  // scheduling: daily / weekly / monthly / once
  schedule?: 'daily' | 'weekly' | 'monthly' | 'once';
  type: 'quiz' | 'reading' | 'prayer' | 'meditation' | 'study';
  difficulty: 'facil' | 'medio' | 'dificil';
  xpReward: number;
  wisdomReward: number;
  requirements: {
    spirit?: number;
    completedMissions?: string[];
    booksRead?: string[];
  };
  questions?: QuizQuestion[];
  content?: {
    text: string;
    scripture?: string;
    reflection?: string;
  };
  timeEstimate: number; // em minutos
  category: 'espada' | 'escudo' | 'capacete' | 'couraca' | 'calca' | 'pe' | 'cinto';
  isCompleted?: boolean;
  completedAt?: Date;
}

export const quizQuestions: QuizQuestion[] = [
  // Questões Fáceis - Gênesis
  {
    id: 'gen_001',
    question: 'No princípio, quem criou os céus e a terra?',
    options: ['Deus', 'Jesus', 'Espírito Santo', 'Anjos'],
    correctAnswer: 0,
    explanation: 'Segundo Gênesis 1:1, "No princípio, Deus criou os céus e a terra."',
    difficulty: 'facil',
    book: 'Gênesis',
    chapter: 1,
    verse: 'Gênesis 1:1'
  },
  {
    id: 'gen_002',
    question: 'Qual foi o primeiro homem criado por Deus?',
    options: ['Abel', 'Caim', 'Adão', 'Enoque'],
    correctAnswer: 2,
    explanation: 'Adão foi o primeiro homem, formado do pó da terra (Gênesis 2:7).',
    difficulty: 'facil',
    book: 'Gênesis',
    chapter: 2,
    verse: 'Gênesis 2:7'
  },
  {
    id: 'gen_003',
    question: 'Como se chamava a mulher de Adão?',
    options: ['Maria', 'Sara', 'Eva', 'Rebeca'],
    correctAnswer: 2,
    explanation: 'Eva foi o nome dado por Adão à sua mulher (Gênesis 3:20).',
    difficulty: 'facil',
    book: 'Gênesis',
    chapter: 3,
    verse: 'Gênesis 3:20'
  },

  // Questões Médias - Vários livros
  {
    id: 'sal_001',
    question: 'Complete o versículo: "O Senhor é o meu pastor, ___________"',
    options: ['nada me faltará', 'sempre me protegerá', 'me dará força', 'me abençoará'],
    correctAnswer: 0,
    explanation: 'Salmo 23:1 - "O Senhor é o meu pastor, nada me faltará."',
    difficulty: 'medio',
    book: 'Salmos',
    chapter: 23,
    verse: 'Salmos 23:1'
  },
  {
    id: 'joa_001',
    question: 'Qual é o versículo mais famoso da Bíblia sobre o amor de Deus?',
    options: [
      'João 3:16',
      'Romanos 8:28',
      '1 Coríntios 13:4',
      'Filipenses 4:13'
    ],
    correctAnswer: 0,
    explanation: 'João 3:16 - "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito..."',
    difficulty: 'medio',
    book: 'João',
    chapter: 3,
    verse: 'João 3:16'
  },

  // Questões Difíceis
  {
    id: 'apo_001',
    question: 'Quantas igrejas são mencionadas no Apocalipse?',
    options: ['5', '7', '10', '12'],
    correctAnswer: 1,
    explanation: 'Apocalipse menciona 7 igrejas: Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodicéia.',
    difficulty: 'dificil',
    book: 'Apocalipse',
    chapter: 2,
    verse: 'Apocalipse 2-3'
  },
  {
    id: 'dan_001',
    question: 'Quantos dias Daniel e seus amigos pediram para fazer a dieta de vegetais?',
    options: ['7 dias', '10 dias', '14 dias', '21 dias'],
    correctAnswer: 1,
    explanation: 'Daniel 1:12 - Daniel pediu 10 dias para provar a dieta de vegetais e água.',
    difficulty: 'dificil',
    book: 'Daniel',
    chapter: 1,
    verse: 'Daniel 1:12'
  }
];

export const missions: Mission[] = [
  // Missões da Espada (Palavra de Deus)
  {
    id: 'espada_001',
    title: 'Afiando a Espada - Início',
    description: 'Teste seus conhecimentos básicos sobre Gênesis',
    type: 'quiz',
    difficulty: 'facil',
    xpReward: 50,
    wisdomReward: 25,
    requirements: {
      spirit: 10
    },
    questions: ['gen_001', 'gen_002', 'gen_003'].map(id => 
      quizQuestions.find(q => q.id === id)!
    ),
    timeEstimate: 10,
    category: 'espada'
  },
  {
    id: 'espada_002',
    title: 'Lâmina Afiada - Salmos',
    description: 'Mergulhe nos Salmos e fortaleça sua fé',
    type: 'quiz',
    difficulty: 'medio',
    xpReward: 75,
    wisdomReward: 40,
    requirements: {
      spirit: 25,
      completedMissions: ['espada_001']
    },
    questions: ['sal_001'].map(id => 
      quizQuestions.find(q => q.id === id)!
    ),
    timeEstimate: 15,
    category: 'espada'
  },
  {
    id: 'espada_003',
    title: 'Espada Flamejante - Apocalipse',
    description: 'Desafie-se com os mistérios do Apocalipse',
    type: 'quiz',
    difficulty: 'dificil',
    xpReward: 100,
    wisdomReward: 60,
    requirements: {
      spirit: 50,
      completedMissions: ['espada_001', 'espada_002']
    },
    questions: ['apo_001', 'dan_001'].map(id => 
      quizQuestions.find(q => q.id === id)!
    ),
    timeEstimate: 20,
    category: 'espada'
  },

  // Missões do Escudo (Fé)
  {
    id: 'escudo_001',
    title: 'Escudo da Fé - Confiança',
    description: 'Medite sobre a confiança em Deus',
    type: 'meditation',
    difficulty: 'facil',
    xpReward: 40,
    wisdomReward: 30,
    requirements: {
      spirit: 15
    },
    content: {
      text: 'A fé é o escudo que nos protege das adversidades da vida.',
      scripture: 'Hebreus 11:1 - "A fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem."',
      reflection: 'Reflita sobre momentos em que sua fé foi testada e como Deus se mostrou fiel.'
    },
    timeEstimate: 5,
    category: 'escudo'
  },

  // Missões do Capacete (Salvação)
  {
    id: 'capacete_001',
    title: 'Capacete da Salvação - Gratidão',
    description: 'Ore agradecendo pela salvação em Cristo',
    type: 'prayer',
    difficulty: 'facil',
    xpReward: 35,
    wisdomReward: 20,
    requirements: {
      spirit: 10
    },
    content: {
      text: 'A salvação é o presente mais precioso que recebemos de Deus.',
      scripture: 'Efésios 2:8-9 - "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus."',
      reflection: 'Ore agradecendo a Deus pela salvação e pelo sacrifício de Jesus na cruz.'
    },
    timeEstimate: 8,
    category: 'capacete'
  },

  // Missões da Couraça (Justiça)
  {
    id: 'couraca_001',
    title: 'Couraça da Justiça - Integridade',
    description: 'Estude sobre viver uma vida íntegra',
    type: 'study',
    difficulty: 'medio',
    xpReward: 60,
    wisdomReward: 45,
    requirements: {
      spirit: 30
    },
    content: {
      text: 'A justiça de Deus nos protege e nos guia no caminho correto.',
      scripture: 'Provérbios 11:3 - "A integridade dos retos os guia, mas a perversidade dos traidores os destrói."',
      reflection: 'Como você pode viver com mais integridade em seu dia a dia?'
    },
    timeEstimate: 12,
    category: 'couraca'
  }
];

export const getMissionsByCategory = (category: Mission['category']) => {
  return missions.filter(mission => mission.category === category);
};

export const getMissionsByDifficulty = (difficulty: Mission['difficulty']) => {
  return missions.filter(mission => mission.difficulty === difficulty);
};

export const getAvailableMissions = (playerSpirit: number, completedMissions: string[]) => {
  return missions.filter(mission => {
    // Verificar se tem espírito suficiente
    if (mission.requirements.spirit && playerSpirit < mission.requirements.spirit) {
      return false;
    }
    
    // Verificar se completou missões necessárias
    if (mission.requirements.completedMissions) {
      const hasCompletedRequired = mission.requirements.completedMissions.every(
        requiredId => completedMissions.includes(requiredId)
      );
      if (!hasCompletedRequired) {
        return false;
      }
    }
    
    // Verificar se já foi completada
    if (completedMissions.includes(mission.id)) {
      return false;
    }
    
    return true;
  });
};