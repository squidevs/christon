import React, { useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { ALL_BIBLE_BOOKS } from '../data/bibleBooks';

export default function StudiesPage({ onBack }) {
  // Estados principais
  const [stage, setStage] = useState('books');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookName, setSelectedBookName] = useState('');

  // Progresso por livro
  function getBookProgress(bookId, totalChapters) {
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

  // Verificação de equipamentos
  function hasRequiredEquipment() {
    try {
      const playerRaw = window?.localStorage?.getItem('player');
      if (!playerRaw) return false;
      // TODO: lógica real de verificação de slots/inventário
      return true;
    } catch (e) {
      return false;
    }
  }

  const oldBooks = ALL_BIBLE_BOOKS.filter(b => b.testament === 'old');
  const newBooks = ALL_BIBLE_BOOKS.filter(b => b.testament === 'new');
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
                {oldBooks.map(book => {
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
                          setSelectedBookName(book.name);
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
                {newBooks.map(book => {
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
                          setSelectedBookName(book.name);
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

  // ...outros estágios (chapters, reading, quiz) podem ser implementados aqui...

  return null;
}