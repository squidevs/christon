import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Play, Lock, Check, Star, Trophy, Target, Clock, AlertCircle } from 'lucide-react';
import { studyBooks, StudyBook, StudyChapter, getCurrentStudyData, StudyProgress } from '../data/studies';
import { quizQuestions } from '../data/missions';
import { inventoryManager } from '../utils/inventoryManager';

interface StudiesPageProps {
  onBack: () => void;
}

interface ChapterQuizState {
  chapter: StudyChapter;
  currentQuestion: number;
  answers: number[];
  score: number;
  isCompleted: boolean;
  isPassed: boolean;
}

interface FinalQuizState {
  book: StudyBook;
  currentQuestion: number;
  answers: number[];
  score: number;
  isCompleted: boolean;
  isPassed: boolean;
}

const StudiesPage: React.FC<StudiesPageProps> = ({ onBack }) => {
  const [selectedBook, setSelectedBook] = useState<StudyBook | null>(null);
  const [chapterQuiz, setChapterQuiz] = useState<ChapterQuizState | null>(null);
  const [finalQuiz, setFinalQuiz] = useState<FinalQuizState | null>(null);
  const [studyProgress, setStudyProgress] = useState<StudyProgress>(getCurrentStudyData());
  const [hasBible, setHasBible] = useState(false);

  // Verificar se tem Bíblia equipada
  useEffect(() => {
    setHasBible(inventoryManager.hasBible());
  }, []);

  // Se não tem Bíblia, mostrar tela de bloqueio
  if (!hasBible) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Lock size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Estudos Bloqueados</h2>
              <p className="text-gray-600">
                Você precisa equipar a <strong>Bíblia Sagrada</strong> para acessar os estudos bíblicos.
              </p>
            </div>

            <div className="bg-spiritual/10 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3 text-left">
                <BookOpen className="w-5 h-5 text-spiritual mt-0.5 flex-shrink-0" />
                <div className="text-sm text-spiritual">
                  <p className="font-medium mb-1">Como obter a Bíblia Sagrada:</p>
                  <p>Complete a missão <strong>"Adquirir a Bíblia Sagrada"</strong> na área de Missões.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full btn-primary"
            >
              Voltar para Missões
            </button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Atualizar progresso dos livros baseado nos capítulos completados
    studyBooks.forEach(book => {
      const completedInBook = studyProgress.completedChapters.filter(chId => 
        book.chapters.some(ch => ch.id === chId)
      ).length;
      book.progress = Math.round((completedInBook / book.chapters.length) * 100);
      book.isCompleted = book.progress === 100 && studyProgress.completedBooks.includes(book.id);
    });
  }, [studyProgress]);

  const startChapterQuiz = (chapter: StudyChapter) => {
    setChapterQuiz({
      chapter,
      currentQuestion: 0,
      answers: [],
      score: 0,
      isCompleted: false,
      isPassed: false
    });
  };

  const startFinalQuiz = (book: StudyBook) => {
    setFinalQuiz({
      book,
      currentQuestion: 0,
      answers: [],
      score: 0,
      isCompleted: false,
      isPassed: false
    });
  };

  const answerChapterQuestion = (answerIndex: number) => {
    if (!chapterQuiz) return;

    const question = quizQuestions.find(q => q.id === chapterQuiz.chapter.questions[chapterQuiz.currentQuestion]);
    if (!question) return;

    const isCorrect = answerIndex === question.correctAnswer;
    const newAnswers = [...chapterQuiz.answers, answerIndex];
    const newScore = isCorrect ? chapterQuiz.score + 1 : chapterQuiz.score;

    if (chapterQuiz.currentQuestion + 1 >= chapterQuiz.chapter.questions.length) {
      // Quiz do capítulo completo
      const passed = newScore / chapterQuiz.chapter.questions.length >= 0.7;
      
      setChapterQuiz({
        ...chapterQuiz,
        answers: newAnswers,
        score: newScore,
        isCompleted: true,
        isPassed: passed
      });

      if (passed) {
        // Marcar capítulo como completo
        const newProgress = {
          ...studyProgress,
          completedChapters: [...studyProgress.completedChapters, chapterQuiz.chapter.id],
          totalXp: studyProgress.totalXp + chapterQuiz.chapter.xpReward,
          totalWisdom: studyProgress.totalWisdom + chapterQuiz.chapter.wisdomReward
        };
        setStudyProgress(newProgress);

        // Desbloquear próximo capítulo
        const book = studyBooks.find(b => b.id === chapterQuiz.chapter.bookId);
        if (book) {
          const chapterIndex = book.chapters.findIndex(ch => ch.id === chapterQuiz.chapter.id);
          if (chapterIndex >= 0 && chapterIndex < book.chapters.length - 1) {
            book.chapters[chapterIndex + 1].isLocked = false;
          }
        }
      }
    } else {
      // Próxima pergunta
      setChapterQuiz({
        ...chapterQuiz,
        currentQuestion: chapterQuiz.currentQuestion + 1,
        answers: newAnswers,
        score: newScore
      });
    }
  };

  const answerFinalQuestion = (answerIndex: number) => {
    if (!finalQuiz) return;

    const question = quizQuestions.find(q => q.id === finalQuiz.book.finalQuiz.questions[finalQuiz.currentQuestion]);
    if (!question) return;

    const isCorrect = answerIndex === question.correctAnswer;
    const newAnswers = [...finalQuiz.answers, answerIndex];
    const newScore = isCorrect ? finalQuiz.score + 1 : finalQuiz.score;

    if (finalQuiz.currentQuestion + 1 >= finalQuiz.book.finalQuiz.questions.length) {
      // Quiz final completo
      const percentage = (newScore / finalQuiz.book.finalQuiz.questions.length) * 100;
      const passed = percentage >= finalQuiz.book.finalQuiz.passPercentage;
      
      setFinalQuiz({
        ...finalQuiz,
        answers: newAnswers,
        score: newScore,
        isCompleted: true,
        isPassed: passed
      });

      if (passed) {
        // Marcar livro como completo
        const newProgress = {
          ...studyProgress,
          completedBooks: [...studyProgress.completedBooks, finalQuiz.book.id],
          totalXp: studyProgress.totalXp + finalQuiz.book.finalQuiz.xpReward,
          totalWisdom: studyProgress.totalWisdom + finalQuiz.book.finalQuiz.wisdomReward
        };
        setStudyProgress(newProgress);

        // Desbloquear próximo livro
        const bookIndex = studyBooks.findIndex(b => b.id === finalQuiz.book.id);
        if (bookIndex >= 0 && bookIndex < studyBooks.length - 1) {
          studyBooks[bookIndex + 1].isUnlocked = true;
        }
      }
    } else {
      // Próxima pergunta
      setFinalQuiz({
        ...finalQuiz,
        currentQuestion: finalQuiz.currentQuestion + 1,
        answers: newAnswers,
        score: newScore
      });
    }
  };

  const resetQuizzes = () => {
    setChapterQuiz(null);
    setFinalQuiz(null);
  };

  // Renderizar quiz do capítulo
  if (chapterQuiz && !chapterQuiz.isCompleted) {
    const question = quizQuestions.find(q => q.id === chapterQuiz.chapter.questions[chapterQuiz.currentQuestion]);
    if (!question) return <div>Pergunta não encontrada</div>;

    const progress = ((chapterQuiz.currentQuestion + 1) / chapterQuiz.chapter.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <button onClick={resetQuizzes} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-center">{chapterQuiz.chapter.title}</h1>
              <div className="w-8"></div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Pergunta {chapterQuiz.currentQuestion + 1} de {chapterQuiz.chapter.questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-spiritual h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => answerChapterQuestion(index)}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-spiritual hover:bg-spiritual/5 transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center">
                      <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {question.verse && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm italic text-gray-600">📖 Referência: {question.verse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Renderizar quiz final
  if (finalQuiz && !finalQuiz.isCompleted) {
    const question = quizQuestions.find(q => q.id === finalQuiz.book.finalQuiz.questions[finalQuiz.currentQuestion]);
    if (!question) return <div>Pergunta não encontrada</div>;

    const progress = ((finalQuiz.currentQuestion + 1) / finalQuiz.book.finalQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <button onClick={resetQuizzes} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-center">Quiz Final - {finalQuiz.book.name}</h1>
              <div className="w-8"></div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Pergunta {finalQuiz.currentQuestion + 1} de {finalQuiz.book.finalQuiz.questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-spiritual h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-700">
                <strong>Atenção:</strong> Você precisa de {finalQuiz.book.finalQuiz.passPercentage}% para passar no quiz final!
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => answerFinalQuestion(index)}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-spiritual hover:bg-spiritual/5 transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center">
                      <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar resultado dos quizzes
  if ((chapterQuiz && chapterQuiz.isCompleted) || (finalQuiz && finalQuiz.isCompleted)) {
    const isChapter = chapterQuiz && chapterQuiz.isCompleted;
    const quiz = isChapter ? chapterQuiz : finalQuiz;
    const totalQuestions = isChapter ? chapterQuiz!.chapter.questions.length : finalQuiz!.book.finalQuiz.questions.length;
    const percentage = (quiz!.score / totalQuestions) * 100;
    const xpReward = isChapter ? chapterQuiz!.chapter.xpReward : finalQuiz!.book.finalQuiz.xpReward;
    const wisdomReward = isChapter ? chapterQuiz!.chapter.wisdomReward : finalQuiz!.book.finalQuiz.wisdomReward;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="mb-6">
              {quiz!.isPassed ? (
                <Trophy size={64} className="text-spiritual mx-auto mb-4" />
              ) : (
                <Target size={64} className="text-red-500 mx-auto mb-4" />
              )}
              
              <h2 className="text-2xl font-bold mb-2">
                {quiz!.isPassed ? 'Parabéns!' : 'Tente novamente'}
              </h2>
              
              <p className="text-gray-600 mb-4">
                Você acertou {quiz!.score} de {totalQuestions} questões ({Math.round(percentage)}%)
              </p>

              {quiz!.isPassed && (
                <div className="bg-spiritual/10 rounded-lg p-4 mb-6">
                  <p className="text-spiritual font-medium">
                    +{xpReward} XP • +{wisdomReward} Sabedoria
                  </p>
                  {!isChapter && (
                    <p className="text-sm text-spiritual mt-2">
                      🎉 Livro {finalQuiz!.book.name} completado!
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={resetQuizzes}
                className="w-full btn-primary"
              >
                Voltar aos Estudos
              </button>
              
              {!quiz!.isPassed && (
                <button
                  onClick={() => {
                    if (isChapter) {
                      setChapterQuiz({
                        ...chapterQuiz!,
                        currentQuestion: 0,
                        answers: [],
                        score: 0,
                        isCompleted: false,
                        isPassed: false
                      });
                    } else {
                      setFinalQuiz({
                        ...finalQuiz!,
                        currentQuestion: 0,
                        answers: [],
                        score: 0,
                        isCompleted: false,
                        isPassed: false
                      });
                    }
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Tentar Novamente
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar detalhes do livro selecionado
  if (selectedBook) {
    const completedChapters = selectedBook.chapters.filter(ch => 
      studyProgress.completedChapters.includes(ch.id)
    ).length;
    
    const canTakeFinalQuiz = completedChapters === selectedBook.chapters.length && 
                            !studyProgress.completedBooks.includes(selectedBook.id);

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header do livro */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center mb-4">
              <button onClick={() => setSelectedBook(null)} className="p-2 hover:bg-gray-100 rounded-lg mr-3">
                <ArrowLeft size={20} />
              </button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-spiritual">{selectedBook.name}</h1>
                <p className="text-gray-600">{selectedBook.testament === 'old' ? 'Antigo Testamento' : 'Novo Testamento'}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progresso: {completedChapters}/{selectedBook.chapters.length} capítulos</span>
                <span>{selectedBook.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-spiritual h-3 rounded-full transition-all duration-300"
                  style={{ width: `${selectedBook.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-spiritual">{studyProgress.totalXp}</div>
                <div className="text-sm text-gray-600">XP Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-wisdom">{studyProgress.totalWisdom}</div>
                <div className="text-sm text-gray-600">Sabedoria</div>
              </div>
            </div>
          </div>

          {/* Capítulos */}
          <div className="space-y-4 mb-6">
            {selectedBook.chapters.map((chapter) => {
              const isCompleted = studyProgress.completedChapters.includes(chapter.id);
              const isLocked = chapter.isLocked && !isCompleted;
              
              return (
                <div key={chapter.id} className={`bg-white rounded-lg p-4 shadow-sm ${isLocked ? 'opacity-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCompleted ? 'bg-spiritual text-white' : 
                          isLocked ? 'bg-gray-300 text-gray-500' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {isCompleted ? <Check size={16} /> : chapter.chapterNumber}
                        </div>
                        <div>
                          <h3 className="font-semibold">{chapter.title}</h3>
                          <p className="text-sm text-gray-600">{chapter.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 ml-11">
                        <span className="flex items-center gap-1">
                          <Star size={12} />
                          +{chapter.xpReward} XP
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          +{chapter.wisdomReward} Sabedoria
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          ~5 min
                        </span>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {isCompleted ? (
                        <button 
                          onClick={() => startChapterQuiz(chapter)}
                          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                        >
                          Revisar
                        </button>
                      ) : isLocked ? (
                        <div className="p-2">
                          <Lock size={20} className="text-gray-400" />
                        </div>
                      ) : (
                        <button 
                          onClick={() => startChapterQuiz(chapter)}
                          className="px-3 py-2 btn-primary text-sm"
                        >
                          <Play size={16} className="mr-1" />
                          Estudar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quiz Final */}
          {canTakeFinalQuiz && (
            <div className="bg-gradient-to-r from-spiritual to-wisdom rounded-lg p-6 text-white text-center">
              <Trophy size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Quiz Final - {selectedBook.name}</h3>
              <p className="mb-4 opacity-90">
                Complete o quiz final para dominar este livro! 
                Você precisa de {selectedBook.finalQuiz.passPercentage}% para passar.
              </p>
              <div className="mb-4">
                <p className="text-sm opacity-75">
                  Recompensa: +{selectedBook.finalQuiz.xpReward} XP • +{selectedBook.finalQuiz.wisdomReward} Sabedoria
                </p>
              </div>
              <button 
                onClick={() => startFinalQuiz(selectedBook)}
                className="bg-white text-spiritual px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Iniciar Quiz Final
              </button>
            </div>
          )}

          {studyProgress.completedBooks.includes(selectedBook.id) && (
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <Check size={48} className="mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-bold text-green-700 mb-2">Livro Completado!</h3>
              <p className="text-green-600">
                Parabéns! Você dominou o livro de {selectedBook.name}.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Renderizar lista principal de livros
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg mr-3">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-spiritual">Estudos Bíblicos</h2>
            <p className="text-gray-600">Jornada progressiva através das Escrituras</p>
          </div>
        </div>
        
        {/* Estatísticas gerais */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-spiritual">{studyProgress.completedBooks.length}</div>
            <div className="text-sm text-gray-600">Livros Completos</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-wisdom">{studyProgress.completedChapters.length}</div>
            <div className="text-sm text-gray-600">Capítulos</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-victory">{studyProgress.totalWisdom}</div>
            <div className="text-sm text-gray-600">Sabedoria</div>
          </div>
        </div>
      </div>

      {/* Lista de livros */}
      <div className="space-y-4">
        {studyBooks.map((book, index) => {
          const isUnlocked = book.isUnlocked;
          const isCompleted = studyProgress.completedBooks.includes(book.id);
          
          return (
            <div 
              key={book.id} 
              className={`bg-white rounded-lg p-4 shadow-sm ${isUnlocked ? 'cursor-pointer hover:shadow-md transition-shadow' : 'opacity-50'}`}
              onClick={() => isUnlocked && setSelectedBook(book)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    isCompleted ? 'bg-spiritual text-white' : 
                    isUnlocked ? 'bg-spiritual/10 text-spiritual' : 'bg-gray-300 text-gray-500'
                  }`}>
                    {isCompleted ? <Check size={24} /> : index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{book.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {book.testament === 'old' ? 'Antigo Testamento' : 'Novo Testamento'}
                    </p>
                    
                    {isUnlocked && (
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{book.chapters.length} capítulos</span>
                        <span>Progress: {book.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  {!isUnlocked ? (
                    <Lock size={20} className="text-gray-400" />
                  ) : isCompleted ? (
                    <Trophy size={20} className="text-spiritual" />
                  ) : (
                    <div className="w-16">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-spiritual h-2 rounded-full transition-all duration-300"
                          style={{ width: `${book.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{book.progress}%</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudiesPage;