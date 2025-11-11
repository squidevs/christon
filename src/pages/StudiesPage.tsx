import React, { useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { ALL_BIBLE_BOOKS } from '../data/bibleBooks';
import { fetchChapter } from '../services/bibleApi';
import { ChapterQuiz, generateQuizQuestions } from '../components/ChapterQuiz';

interface StudiesPageProps {
  onBack?: () => void;
}

export default function StudiesPage({ onBack }: StudiesPageProps) {
  // Estados principais
  const [stage, setStage] = useState<'books' | 'chapters' | 'reading' | 'quiz' | 'completed'>('books');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [chapterVerses, setChapterVerses] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [quizStage, setQuizStage] = useState<'reading' | 'quiz' | 'done'>('reading');
  const [quizScore, setQuizScore] = useState<number>(0);

  // Carregar versículos da API ao entrar na leitura
  React.useEffect(() => {
    if (stage === 'reading' && selectedBook && selectedChapter) {
      fetchChapter(selectedBook, selectedChapter).then((chapterData) => {
        if (chapterData && Array.isArray(chapterData.verses)) {
          setChapterVerses(chapterData.verses.map(v => v.text));
        } else {
          setChapterVerses([]);
        }
      });
      setProgress(0);
      setQuizStage('reading');
      setQuizScore(0);
    }
  }, [stage, selectedBook, selectedChapter]);

  // Progresso por livro e capítulos concluídos
  function getBookProgress(bookId: string, totalChapters: number): number {
    try {
      const raw = window?.localStorage?.getItem(`progress_${bookId}`);
      if (!raw) return 0;
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return Math.min(arr.length / totalChapters, 1);
      }
    } catch (e) {
      return 0;
    }
    return 0;
  }
  function markChapterComplete(bookId: string, chapter: number) {
    try {
      const key = `progress_${bookId}`;
      const raw = window?.localStorage?.getItem(key);
      let arr = raw ? JSON.parse(raw) : [];
      if (!arr.includes(chapter)) {
        arr.push(chapter);
        window?.localStorage?.setItem(key, JSON.stringify(arr));
      }
    } catch {}
  }
  function isChapterComplete(bookId: string, chapter: number): boolean {
    try {
      const raw = window?.localStorage?.getItem(`progress_${bookId}`);
      if (!raw) return false;
      const arr = JSON.parse(raw);
      return Array.isArray(arr) && arr.includes(chapter);
    } catch {
      return false;
    }
  }

  // Verificação de equipamentos
  function hasRequiredEquipment(): boolean {
    try {
      const playerRaw = window?.localStorage?.getItem('player');
      if (!playerRaw) return true; // Libera para demo se não houver dados
      const player = JSON.parse(playerRaw);
      // Libera se espada OU bíblia estiverem presentes/equipados
      const espadaEquipada = player.armorPieces?.swordOfSpirit?.equipped === true;
      const temBiblia = player.inventory?.biblia_sagrada > 0;
      // Para demo, libera se qualquer um estiver presente
      return espadaEquipada || temBiblia;
    } catch (e) {
      return true; // Libera para demo em caso de erro
    }
  }

  const oldBooks = ALL_BIBLE_BOOKS.filter((b: any) => b.testament === 'old');
  const newBooks = ALL_BIBLE_BOOKS.filter((b: any) => b.testament === 'new');
  const canStudy = hasRequiredEquipment();

  // Renderização principal
  if (stage === 'books') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-spiritual/5 to-gray-50 pb-20">
        <div className="bg-gradient-to-r from-spiritual to-victory text-white p-4 sticky top-0 z-10 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Estudos Bíblicos</h1>
          </div>
        </div>
        <div className="max-w-6xl mx-auto p-4">
          {!canStudy && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 mb-6 text-center">
              <strong>Acesso bloqueado!</strong><br />
              Equipe <span className="font-bold">Espada do Espírito</span> e tenha uma <span className="font-bold">Bíblia Sagrada</span> no inventário para liberar os estudos.
            </div>
          )}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${!canStudy ? 'pointer-events-none opacity-60' : ''}`}>
            {/* Coluna Antigo Testamento */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-spiritual">Antigo Testamento</h2>
              <div className="grid grid-cols-2 gap-4">
                {oldBooks.map((book: any) => {
                  const progress = getBookProgress(book.id, book.chapters);
                  return (
                    <div key={book.id} className={`bg-white rounded-xl p-4 shadow flex flex-col items-center relative overflow-hidden ${!canStudy ? 'grayscale opacity-70' : 'hover:scale-105 transition'}`}>
                      <button
                        className="absolute inset-0 w-full h-full z-10"
                        style={{cursor: canStudy ? 'pointer' : 'not-allowed'}}
                        disabled={!canStudy}
                        onClick={() => {
                          if (!canStudy) return;
                          setSelectedBook(book.id);
                          setStage('chapters');
                        }}
                      ></button>
                      <div className="flex flex-col items-center w-full">
                        <BookOpen size={32} className="mb-2 text-spiritual z-0" />
                        <span className="font-bold text-gray-800 text-center z-0">{book.name}</span>
                        <span className="text-xs text-gray-500 z-0">{book.chapters} capítulos</span>
                      </div>
                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-4 flex items-center justify-center absolute left-0 bottom-0">
                        <div
                          className="h-full rounded-full transition-all duration-700 flex items-center justify-center"
                          style={{ width: `${Math.round(progress * 100)}%`, background: progress === 1 ? '#22c55e' : 'linear-gradient(90deg,#7c3aed,#22d3ee)' }}
                        >
                          <span className="text-xs font-bold text-white w-full text-center" style={{textShadow:'0 1px 2px #000'}}>{Math.round(progress * 100)}%</span>
                        </div>
                      </div>
                      {!canStudy && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M12 17v2m-6-7V9a6 6 0 1 1 12 0v3m-9 0h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Coluna Novo Testamento */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-victory">Novo Testamento</h2>
              <div className="grid grid-cols-2 gap-4">
                {newBooks.map((book: any) => {
                  const progress = getBookProgress(book.id, book.chapters);
                  return (
                    <div key={book.id} className={`bg-white rounded-xl p-4 shadow flex flex-col items-center relative overflow-hidden ${!canStudy ? 'grayscale opacity-70' : 'hover:scale-105 transition'}`}>
                      <button
                        className="absolute inset-0 w-full h-full z-10"
                        style={{cursor: canStudy ? 'pointer' : 'not-allowed'}}
                        disabled={!canStudy}
                        onClick={() => {
                          if (!canStudy) return;
                          setSelectedBook(book.id);
                          setStage('chapters');
                        }}
                      ></button>
                      <div className="flex flex-col items-center w-full">
                        <BookOpen size={32} className="mb-2 text-victory z-0" />
                        <span className="font-bold text-gray-800 text-center z-0">{book.name}</span>
                        <span className="text-xs text-gray-500 z-0">{book.chapters} capítulos</span>
                      </div>
                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-4 flex items-center justify-center absolute left-0 bottom-0">
                        <div
                          className="h-full rounded-full transition-all duration-700 flex items-center justify-center"
                          style={{ width: `${Math.round(progress * 100)}%`, background: progress === 1 ? '#22c55e' : 'linear-gradient(90deg,#7c3aed,#22d3ee)' }}
                        >
                          <span className="text-xs font-bold text-white w-full text-center" style={{textShadow:'0 1px 2px #000'}}>{Math.round(progress * 100)}%</span>
                        </div>
                      </div>
                      {!canStudy && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M12 17v2m-6-7V9a6 6 0 1 1 12 0v3m-9 0h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderização dos capítulos do livro selecionado
  if (stage === 'chapters' && selectedBook) {
    const bookInfo = oldBooks.concat(newBooks).find((b: any) => b.id === selectedBook);
    if (!bookInfo) return null;
    return (
      <div className="min-h-screen bg-gradient-to-b from-spiritual/5 to-gray-50 pb-20">
        <div className="bg-gradient-to-r from-spiritual to-victory text-white p-4 sticky top-0 z-10 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={() => setStage('books')} className="p-2 hover:bg-white/10 rounded-lg">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">{bookInfo.name}</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto p-4">
          {/* Barra de progresso fixa no topo */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-6 sticky top-0 z-20">
            <div
              className="h-full rounded-full transition-all duration-700 flex items-center justify-center"
              style={{ width: `${Math.round(getBookProgress(bookInfo.id, bookInfo.chapters) * 100)}%`, background: getBookProgress(bookInfo.id, bookInfo.chapters) === 1 ? '#22c55e' : 'linear-gradient(90deg,#7c3aed,#22d3ee)' }}
            >
              <span className="text-xs font-bold text-white w-full text-center" style={{textShadow:'0 1px 2px #000'}}>{Math.round(getBookProgress(bookInfo.id, bookInfo.chapters) * 100)}%</span>
            </div>
          </div>
          <h2 className="text-lg font-bold mb-4">Selecione um capítulo</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {Array.from({ length: bookInfo.chapters }, (_, i) => i + 1).map(chapterNum => (
              <button
                key={chapterNum}
                className={`bg-white rounded-xl p-3 shadow hover:scale-105 transition flex flex-col items-center relative ${isChapterComplete(bookInfo.id, chapterNum) ? 'border-2 border-green-500' : ''}`}
                onClick={() => {
                  setSelectedChapter(chapterNum);
                  setStage('reading');
                }}
              >
                <span className="font-bold text-spiritual text-lg">{chapterNum}</span>
                {isChapterComplete(bookInfo.id, chapterNum) && (
                  <span className="absolute top-1 right-2 text-green-600" title="Concluído">✔️</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Renderização da leitura do capítulo
  if (stage === 'reading' && selectedBook && selectedChapter) {
    const bookInfo = oldBooks.concat(newBooks).find((b: any) => b.id === selectedBook);
    function handleScroll(e: React.UIEvent<HTMLDivElement>) {
      const el = e.currentTarget;
      const scroll = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(scroll / max, 1) : 1);
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-spiritual/5 to-gray-50 pb-20">
        <div className="bg-gradient-to-r from-spiritual to-victory text-white p-4 sticky top-0 z-10 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={() => setStage('chapters')} className="p-2 hover:bg-white/10 rounded-lg">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">{bookInfo?.name} - Capítulo {selectedChapter}</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto p-4">
          {/* Barra de progresso fixa no topo */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4 sticky top-0 z-20">
            <div
              className="h-full rounded-full transition-all duration-700 flex items-center justify-center"
              style={{ width: `${Math.round(progress * 100)}%`, background: progress === 1 ? '#22c55e' : 'linear-gradient(90deg,#7c3aed,#22d3ee)' }}
            >
              <span className="text-xs font-bold text-white w-full text-center" style={{textShadow:'0 1px 2px #000'}}>{Math.round(progress * 100)}%</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 mb-6" style={{maxHeight: '60vh', overflowY: 'auto'}} onScroll={handleScroll}>
            <h2 className="text-lg font-bold mb-2">Versículos</h2>
            {chapterVerses.length === 0 ? (
              <p className="text-gray-700">Carregando versículos...</p>
            ) : (
              <ul className="space-y-2">
                {chapterVerses.map((v, i) => (
                  <li key={i} className="text-gray-800"><span className="font-bold text-spiritual mr-2">{i+1}</span>{v}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Botão para quiz aparece só com progresso 100% */}
          {quizStage === 'reading' && progress === 1 && (
            <button className="btn-primary w-full" onClick={() => setQuizStage('quiz')}>Concluir e fazer Quiz</button>
          )}
          {/* Quiz do capítulo */}
          {quizStage === 'quiz' && (
            <div className="bg-white rounded-xl shadow p-6 mt-6">
              <h2 className="text-lg font-bold mb-2">Quiz do capítulo</h2>
              <ChapterQuiz
                bookId={selectedBook}
                chapterNumber={selectedChapter}
                questions={generateQuizQuestions(selectedBook, selectedChapter)}
                onComplete={(passed: boolean, score: number) => {
                  setQuizScore(score);
                  if (passed && score >= 65) {
                    markChapterComplete(selectedBook, selectedChapter!);
                    setQuizStage('done');
                  }
                }}
              />
              {quizScore > 0 && quizScore < 65 && (
                <div className="text-red-600 mt-2">Você precisa de pelo menos 65% para avançar!</div>
              )}
            </div>
          )}
          {/* Finalização */}
          {quizStage === 'done' && (
            <div className="bg-green-100 border border-green-300 text-green-700 rounded-lg p-4 mt-6 text-center">
              Parabéns! Capítulo concluído com sucesso.
              <button className="btn-primary w-full mt-4" onClick={() => setStage('chapters')}>Voltar aos capítulos</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ...outros estágios (quiz, completed) podem ser implementados aqui...

  return null;
}