import { Mission } from '../types/mission';

const now = Date.now();
const oneDay = 24 * 60 * 60 * 1000;
const oneWeek = 7 * oneDay;
const oneMonth = 30 * oneDay;

export const missions: Mission[] = [
  // MISSÕES DA ARMADURA DE DEUS - INICIAIS
  {
    id: 101,
    categoria: 'acao',
    tags: ['verdade', 'honestidade', 'armadura'],
    titulo: 'Cinturão da Verdade',
    descricao: 'Fale apenas a verdade hoje. Não minta, não exagere, não omita. "Portanto, cada um de vocês deve abandonar a mentira e falar a verdade ao seu próximo." - Efésios 4:25',
    tipoMissao: 'diaria',
    nivelDificuldade: 'comum',
    tempoRestante: '24h',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'Shield',
      corTema: '#8B4513',
      background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 50,
      moedasFe: 20,
      armadura: {
        capacete: 0,
        espada: 0,
        escudo: 0,
        couraca: 0,
        sandalias: 0,
        oracao: 0
      },
      consumiveis: [
        { tipo: 'Cinturão da Verdade', quantidade: 1, duracao: 'permanente' }
      ]
    },
    penalidades: {
      descricao: '+2 Pecado por mentir.',
      efeitos: {
        pecado: 2,
        perdaXp: 10
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 50,
      fe: 20,
      pecado: 0,
      espirito: 10,
      salvacao: 5
    }
  },
  {
    id: 102,
    categoria: 'acao',
    tags: ['justica', 'retidao', 'armadura'],
    titulo: 'Couraça da Justiça',
    descricao: 'Pratique a justiça hoje. Seja correto em suas ações, ajude quem precisa, não se envolva em nada desonesto. "Revistam-se da couraça da justiça." - Efésios 6:14',
    tipoMissao: 'diaria',
    nivelDificuldade: 'comum',
    tempoRestante: '24h',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'ShieldCheck',
      corTema: '#4169E1',
      background: 'linear-gradient(135deg, #4169E1 0%, #1E90FF 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 50,
      moedasFe: 20,
      armadura: {
        capacete: 0,
        espada: 0,
        escudo: 0,
        couraca: 1,
        sandalias: 0,
        oracao: 0
      },
      consumiveis: []
    },
    penalidades: {
      descricao: '+2 Pecado por agir com injustiça.',
      efeitos: {
        pecado: 2,
        perdaXp: 10
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 50,
      fe: 20,
      pecado: 0,
      espirito: 10,
      salvacao: 5
    }
  },
  {
    id: 103,
    categoria: 'acao',
    tags: ['evangelho', 'evangelismo', 'armadura'],
    titulo: 'Sandálias do Evangelho',
    descricao: 'Compartilhe o evangelho com alguém hoje. Fale de Jesus, envie uma mensagem de fé ou convide alguém para a igreja. "Calcem os pés com a prontidão do evangelho da paz." - Efésios 6:15',
    tipoMissao: 'diaria',
    nivelDificuldade: 'rara',
    tempoRestante: '24h',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'Footprints',
      corTema: '#32CD32',
      background: 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 60,
      moedasFe: 30,
      armadura: {
        capacete: 0,
        espada: 0,
        escudo: 0,
        couraca: 0,
        sandalias: 1,
        oracao: 0
      },
      consumiveis: []
    },
    penalidades: {
      descricao: '+1 Pecado por não evangelizar.',
      efeitos: {
        pecado: 1,
        perdaXp: 10
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 60,
      fe: 30,
      pecado: 0,
      espirito: 15,
      salvacao: 10
    }
  },
  {
    id: 104,
    categoria: 'acao',
    tags: ['fe', 'confianca', 'armadura'],
    titulo: 'Escudo da Fé',
    descricao: 'Confie em Deus em uma situação difícil hoje. Não se deixe abalar pela ansiedade ou medo. Ore e entregue suas preocupações. "Tomem o escudo da fé para apagar as setas inflamadas do maligno." - Efésios 6:16',
    tipoMissao: 'diaria',
    nivelDificuldade: 'comum',
    tempoRestante: '24h',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'Shield',
      corTema: '#FFD700',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 50,
      moedasFe: 25,
      armadura: {
        capacete: 0,
        espada: 0,
        escudo: 1,
        couraca: 0,
        sandalias: 0,
        oracao: 0
      },
      consumiveis: []
    },
    penalidades: {
      descricao: '+1 Pecado por falta de fé.',
      efeitos: {
        pecado: 1,
        perdaXp: 10
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 50,
      fe: 25,
      pecado: 0,
      espirito: 12,
      salvacao: 8
    }
  },
  {
    id: 105,
    categoria: 'acao',
    tags: ['salvacao', 'seguranca', 'armadura'],
    titulo: 'Capacete da Salvação',
    descricao: 'Reafirme sua fé em Jesus Cristo hoje. Leia sobre a salvação, ore agradecendo por ela e compartilhe seu testemunho. "Tomem o capacete da salvação." - Efésios 6:17',
    tipoMissao: 'diaria',
    nivelDificuldade: 'comum',
    tempoRestante: '24h',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'ShieldAlert',
      corTema: '#DC143C',
      background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 50,
      moedasFe: 20,
      armadura: {
        capacete: 1,
        espada: 0,
        escudo: 0,
        couraca: 0,
        sandalias: 0,
        oracao: 0
      },
      consumiveis: []
    },
    penalidades: {
      descricao: '+1 Pecado por negligenciar a salvação.',
      efeitos: {
        pecado: 1,
        perdaXp: 10
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 50,
      fe: 20,
      pecado: 0,
      espirito: 10,
      salvacao: 15
    }
  },
  {
    id: 106,
    categoria: 'acao',
    tags: ['palavra', 'biblia', 'armadura'],
    titulo: 'Espada do Espírito',
    descricao: 'Leia e medite na Palavra de Deus por pelo menos 15 minutos hoje. A Bíblia é sua arma espiritual. "Tomem a espada do Espírito, que é a palavra de Deus." - Efésios 6:17',
    tipoMissao: 'diaria',
    nivelDificuldade: 'comum',
    tempoRestante: '24h',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'Sword',
      corTema: '#C0C0C0',
      background: 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 50,
      moedasFe: 20,
      armadura: {
        capacete: 0,
        espada: 1,
        escudo: 0,
        couraca: 0,
        sandalias: 0,
        oracao: 0
      },
      consumiveis: []
    },
    penalidades: {
      descricao: '+1 Pecado por negligenciar a Palavra.',
      efeitos: {
        pecado: 1,
        perdaXp: 10
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 50,
      fe: 20,
      pecado: 0,
      espirito: 10,
      salvacao: 5
    }
  },
  {
    id: 107,
    categoria: 'acao',
    tags: ['biblia', 'leitura', 'estudo'],
    titulo: 'Adquirir a Bíblia Sagrada',
    descricao: 'Comprometa-se a ler a Bíblia regularmente. Complete esta missão para receber a Bíblia Sagrada e desbloquear a área de Estudos.',
    tipoMissao: 'diaria',
    nivelDificuldade: 'comum',
    tempoRestante: '24h',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'BookOpen',
      corTema: '#8B4513',
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 30,
      moedasFe: 15,
      armadura: {
        capacete: 0,
        espada: 0,
        escudo: 0,
        couraca: 0,
        sandalias: 0,
        oracao: 0
      },
      consumiveis: [
        { tipo: 'Bíblia Sagrada', quantidade: 1, duracao: 'permanente' }
      ]
    },
    penalidades: {
      descricao: '+1 Pecado por negligenciar a leitura.',
      efeitos: {
        pecado: 1,
        perdaXp: 5
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 30,
      fe: 15,
      pecado: 0,
      espirito: 8,
      salvacao: 3
    }
  },

  // MISSÕES ORIGINAIS
  {
    id: 1,
    categoria: 'acao',
    tags: ['vigiar', 'orar', 'verdade'],
    titulo: 'Não mentir',
    descricao: 'Passe o dia inteiro sem contar nenhuma mentira. Ore para que o Espírito Santo guie sua língua e seus pensamentos.',
    tipoMissao: 'diaria',
    nivelDificuldade: 'comum',
    tempoRestante: '22h 43m',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: true
    },
    elementos: {
      icone: 'Shield',
      corTema: '#e9c46a',
      background: 'linear-gradient(135deg, #f4a261 0%, #e76f51 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 20,
      moedasFe: 10,
      armadura: {
        capacete: 0,
        espada: 2,
        escudo: 0,
        couraca: 0,
        sandalias: 0,
        oracao: 12
      },
      consumiveis: [
        { tipo: 'fe', quantidade: 2, duracao: '15min' }
      ]
    },
    penalidades: {
      descricao: '+1 Pecado por desistir ou não cumprir a tempo.',
      efeitos: {
        pecado: 1,
        perdaXp: 5
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 20,
      fe: 15,
      pecado: 0,
      espirito: 5,
      salvacao: 0
    }
  },
  {
    id: 2,
    categoria: 'quiz',
    tags: ['conhecimento', 'biblia', 'verdade'],
    titulo: 'Quiz: Versículos da Verdade',
    descricao: 'Teste seu conhecimento sobre os versículos que falam sobre a verdade e a mentira.',
    tipoMissao: 'diaria',
    nivelDificuldade: 'comum',
    tempoRestante: '18h 30m',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'BookOpen',
      corTema: '#4979C8',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: false
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: true,
        perguntas: [
          'Qual versículo diz que a verdade liberta?',
          'Quem é chamado de pai da mentira?',
          'O que acontece com quem ama e pratica a mentira?'
        ],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 30,
      moedasFe: 15,
      armadura: {
        capacete: 3,
        espada: 5,
        escudo: 2,
        couraca: 0,
        sandalias: 0,
        oracao: 10
      },
      consumiveis: []
    },
    penalidades: {
      descricao: '+1 Pecado e -10 XP por desistir.',
      efeitos: {
        pecado: 1,
        perdaXp: 10
      }
    },
    quizDados: {
      ativo: true,
      questoes: [
        {
          id: 1,
          pergunta: 'Qual versículo diz que a verdade liberta?',
          opcoes: ['João 8:32', 'Provérbios 12:22', 'Efésios 4:25', 'Salmos 119:160'],
          correta: 'João 8:32'
        },
        {
          id: 2,
          pergunta: 'Quem é chamado de pai da mentira?',
          opcoes: ['Satanás', 'Judas', 'Caim', 'Faraó'],
          correta: 'Satanás'
        },
        {
          id: 3,
          pergunta: 'O que acontece com quem ama e pratica a mentira?',
          opcoes: [
            'Ficará fora da cidade santa',
            'Será perdoado automaticamente',
            'Receberá uma segunda chance',
            'Nada acontece'
          ],
          correta: 'Ficará fora da cidade santa'
        }
      ],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 30,
      fe: 10,
      pecado: 0,
      espirito: 8,
      salvacao: 2
    }
  },
  {
    id: 3,
    categoria: 'casal',
    tags: ['amor', 'paciencia', 'casamento'],
    titulo: 'Servir ao Cônjuge',
    descricao: 'Faça algo especial pelo seu cônjuge hoje. Demonstre amor através do serviço e sacrifício.',
    tipoMissao: 'diaria',
    nivelDificuldade: 'rara',
    tempoRestante: '20h 15m',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: true,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'Heart',
      corTema: '#e63946',
      background: 'linear-gradient(135deg, #f72585 0%, #b5179e 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 40,
      moedasFe: 25,
      armadura: {
        capacete: 2,
        espada: 0,
        escudo: 5,
        couraca: 3,
        sandalias: 0,
        oracao: 15
      },
      consumiveis: [
        { tipo: 'amor', quantidade: 1, duracao: '24h' }
      ]
    },
    penalidades: {
      descricao: '+2 Pecado por negligenciar o cônjuge.',
      efeitos: {
        pecado: 2,
        perdaXp: 10
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 40,
      fe: 20,
      pecado: 0,
      espirito: 10,
      salvacao: 5
    }
  },
  {
    id: 4,
    categoria: 'checklist',
    tags: ['jejum', 'oracao', 'guerra'],
    titulo: 'Batalha Espiritual Semanal',
    descricao: 'Complete todos os objetivos espirituais desta semana para fortalecer sua armadura.',
    tipoMissao: 'semanal',
    nivelDificuldade: 'rara',
    tempoRestante: '5d 12h',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneWeek,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: true
    },
    elementos: {
      icone: 'Swords',
      corTema: '#9d4edd',
      background: 'linear-gradient(135deg, #7209b7 0%, #560bad 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: false,
        desistir: true,
        concluir: false
      },
      progresso: {
        porcentagem: 0,
        checkboxes: [
          { id: 1, texto: 'Orar todos os dias desta semana', feito: false },
          { id: 2, texto: 'Ler 3 capítulos da Bíblia', feito: false },
          { id: 3, texto: 'Jejuar por 1 dia', feito: false },
          { id: 4, texto: 'Evangelizar alguém', feito: false },
          { id: 5, texto: 'Participar de um culto', feito: false }
        ]
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 100,
      moedasFe: 50,
      armadura: {
        capacete: 5,
        espada: 8,
        escudo: 10,
        couraca: 7,
        sandalias: 5,
        oracao: 30
      },
      consumiveis: [
        { tipo: 'protecao', quantidade: 1, duracao: '7d' }
      ]
    },
    penalidades: {
      descricao: '+3 Pecado e -20 XP por desistir da batalha.',
      efeitos: {
        pecado: 3,
        perdaXp: 20
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 100,
      fe: 50,
      pecado: 0,
      espirito: 25,
      salvacao: 10
    }
  },
  {
    id: 5,
    categoria: 'checklist',
    tags: ['guerra', 'consagracao', 'santidade'],
    titulo: 'Guerra Santa Mensal',
    descricao: 'Complete todos os atos espirituais deste mês para alcançar um novo nível de santidade.',
    tipoMissao: 'mensal',
    nivelDificuldade: 'lendaria',
    tempoRestante: '28d 5h',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneMonth,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: true,
      requerSalvo: true
    },
    elementos: {
      icone: 'Crown',
      corTema: '#ffd60a',
      background: 'linear-gradient(135deg, #ffd60a 0%, #fca311 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: false,
        desistir: true,
        concluir: false
      },
      progresso: {
        porcentagem: 0,
        checkboxes: [
          { id: 1, texto: 'Orar 7 dias seguidos', feito: false },
          { id: 2, texto: 'Ler 10 capítulos de Provérbios', feito: false },
          { id: 3, texto: 'Evangelizar 3 pessoas', feito: false },
          { id: 4, texto: 'Participar de 4 cultos', feito: false },
          { id: 5, texto: 'Jejuar 3 vezes', feito: false },
          { id: 6, texto: 'Fazer uma obra de caridade', feito: false },
          { id: 7, texto: 'Confessar todos os pecados', feito: false }
        ]
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 500,
      moedasFe: 200,
      armadura: {
        capacete: 20,
        espada: 25,
        escudo: 30,
        couraca: 25,
        sandalias: 20,
        oracao: 100
      },
      consumiveis: [
        { tipo: 'gloria', quantidade: 1, duracao: '30d' },
        { tipo: 'santidade', quantidade: 1, duracao: 'permanente' }
      ]
    },
    penalidades: {
      descricao: '+5 Pecado e -50 XP por abandonar a guerra santa.',
      efeitos: {
        pecado: 5,
        perdaXp: 50
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 500,
      fe: 200,
      pecado: 0,
      espirito: 100,
      salvacao: 50
    }
  },
  {
    id: 6,
    categoria: 'acao',
    tags: ['perdao', 'reconciliacao'],
    titulo: 'Perdoar Alguém',
    descricao: 'Perdoe sinceramente alguém que te magoou. Liberte-se do peso do rancor.',
    tipoMissao: 'diaria',
    nivelDificuldade: 'rara',
    tempoRestante: '15h 20m',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'HandHeart',
      corTema: '#2a9d8f',
      background: 'linear-gradient(135deg, #2a9d8f 0%, #264653 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 30,
      moedasFe: 20,
      armadura: {
        capacete: 3,
        espada: 0,
        escudo: 5,
        couraca: 4,
        sandalias: 0,
        oracao: 15
      },
      consumiveis: []
    },
    penalidades: {
      descricao: '+1 Pecado por guardar rancor.',
      efeitos: {
        pecado: 1,
        perdaXp: 8
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 30,
      fe: 20,
      pecado: 0,
      espirito: 15,
      salvacao: 5
    }
  },
  {
    id: 7,
    categoria: 'acao',
    tags: ['jejum', 'consagracao'],
    titulo: 'Jejum de 24 horas',
    descricao: 'Abstenha-se de alimentos por 24 horas e dedique-se à oração e meditação.',
    tipoMissao: 'diaria',
    nivelDificuldade: 'lendaria',
    tempoRestante: '23h 55m',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: false,
      somenteBatizado: false,
      requerSalvo: true
    },
    elementos: {
      icone: 'Flame',
      corTema: '#d62828',
      background: 'linear-gradient(135deg, #e63946 0%, #a4161a 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 80,
      moedasFe: 40,
      armadura: {
        capacete: 10,
        espada: 15,
        escudo: 10,
        couraca: 12,
        sandalias: 8,
        oracao: 50
      },
      consumiveis: [
        { tipo: 'revelacao', quantidade: 1, duracao: '48h' }
      ]
    },
    penalidades: {
      descricao: '+2 Pecado por quebrar o jejum antes do tempo.',
      efeitos: {
        pecado: 2,
        perdaXp: 20
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 80,
      fe: 40,
      pecado: 0,
      espirito: 30,
      salvacao: 15
    }
  },
  {
    id: 8,
    categoria: 'casal',
    tags: ['casamento', 'oracao', 'unidade'],
    titulo: 'Oração em Casal',
    descricao: 'Orem juntos por pelo menos 15 minutos. Fortaleçam sua união espiritual.',
    tipoMissao: 'diaria',
    nivelDificuldade: 'comum',
    tempoRestante: '19h 30m',
    status: 'ativa',
    dataInicio: now,
    dataExpiracao: now + oneDay,
    restricoes: {
      somenteCasado: true,
      somenteBatizado: false,
      requerSalvo: false
    },
    elementos: {
      icone: 'Users',
      corTema: '#e07a5f',
      background: 'linear-gradient(135deg, #f4978e 0%, #f08080 100%)'
    },
    interacoes: {
      botoes: {
        iniciar: true,
        desistir: true,
        concluir: true
      },
      progresso: {
        porcentagem: 0,
        checkboxes: []
      },
      quiz: {
        ativo: false,
        perguntas: [],
        respostas: [],
        corretas: []
      }
    },
    recompensas: {
      xpSabedoria: 25,
      moedasFe: 15,
      armadura: {
        capacete: 2,
        espada: 0,
        escudo: 3,
        couraca: 2,
        sandalias: 0,
        oracao: 20
      },
      consumiveis: []
    },
    penalidades: {
      descricao: '+1 Pecado por negligenciar a oração em casal.',
      efeitos: {
        pecado: 1,
        perdaXp: 5
      }
    },
    quizDados: {
      ativo: false,
      questoes: [],
      acertos: 0,
      erros: 0
    },
    metricaEspiritual: {
      sabedoria: 25,
      fe: 15,
      pecado: 0,
      espirito: 12,
      salvacao: 3
    }
  }
];
