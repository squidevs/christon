import React, { useState, useEffect } from 'react';
import { Mission } from '../types/mission';
import { missions as initialMissions } from '../data/missions_enhanced';
import { missionsManager } from '../utils/missionsManagerEnhanced';
import MissionCard from '../components/MissionCard';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { safeLocalStorage } from '../utils/storage';

const EnhancedMissionsPage: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<'todas' | 'diaria' | 'semanal' | 'mensal'>('todas');
  const [filtroCategoria, setFiltroCategoria] = useState<'todas' | 'acao' | 'quiz' | 'casal' | 'checklist'>('todas');
  const [playerStatus, setPlayerStatus] = useState<'solteiro' | 'casado'>('solteiro');

  // Carregar status do jogador
  useEffect(() => {
    try {
      const savedProfile = safeLocalStorage.getItem('christon-profile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setPlayerStatus(profile.status || 'solteiro');
      }
    } catch (error) {
      console.warn('Erro ao carregar perfil:', error);
    }
  }, []);

  // Carregar missões com estado salvo
  useEffect(() => {
    let loadedMissions = [...initialMissions];
    
    // Aplicar estado salvo
    loadedMissions = missionsManager.applyStateToMissions(loadedMissions);
    
    // Verificar expiradas
    loadedMissions = missionsManager.checkExpiredMissions(loadedMissions);
    
    setMissions(loadedMissions);
  }, []);

  // Verificar expiradas a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setMissions(prevMissions => {
        const updated = missionsManager.checkExpiredMissions(prevMissions);
        return updated;
      });
    }, 60000); // 1 minuto

    return () => clearInterval(interval);
  }, []);

  // Handler de completar missão
  const handleComplete = (missionId: number) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;

    missionsManager.completeMission(missionId, mission);
    
    setMissions(prevMissions =>
      prevMissions.map(m =>
        m.id === missionId ? { ...m, status: 'concluida' } : m
      )
    );
  };

  // Handler de desistir
  const handleGiveUp = (missionId: number) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;

    missionsManager.giveUpMission(missionId, mission);
    
    setMissions(prevMissions =>
      prevMissions.map(m =>
        m.id === missionId ? { ...m, status: 'desistida' } : m
      )
    );
  };

  // Handler de toggle checkbox
  const handleCheckboxToggle = (missionId: number, checkboxId: number) => {
    missionsManager.toggleCheckbox(missionId, checkboxId);
    
    setMissions(prevMissions =>
      prevMissions.map(mission => {
        if (mission.id !== missionId) return mission;
        
        return {
          ...mission,
          interacoes: {
            ...mission.interacoes,
            progresso: {
              ...mission.interacoes.progresso,
              checkboxes: mission.interacoes.progresso.checkboxes.map(cb =>
                cb.id === checkboxId ? { ...cb, feito: !cb.feito } : cb
              )
            }
          }
        };
      })
    );
  };

  // Handler de iniciar quiz (placeholder)
  const handleQuizStart = (missionId: number) => {
    alert(`Quiz da missão ${missionId} será implementado em breve!`);
  };

  // Filtrar missões
  const filteredMissions = missions.filter(mission => {
    // Filtro de tipo
    if (filtroTipo !== 'todas' && mission.tipoMissao !== filtroTipo) {
      return false;
    }

    // Filtro de categoria
    if (filtroCategoria !== 'todas' && mission.categoria !== filtroCategoria) {
      return false;
    }

    // Filtro de casal - só mostrar se o jogador for casado
    if (mission.restricoes.somenteCasado && playerStatus !== 'casado') {
      return false;
    }

    return true;
  });

  // Estatísticas
  const stats = {
    total: missions.length,
    ativas: missions.filter(m => m.status === 'ativa').length,
    concluidas: missions.filter(m => m.status === 'concluida').length,
    expiradas: missions.filter(m => m.status === 'expirada').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text mb-2">Missões Espirituais</h1>
        <p className="text-gray-600">Complete missões para fortalecer sua armadura e crescer em sabedoria.</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Icons.Target className="w-5 h-5 text-spiritual" />
            <span className="text-sm text-gray-600">Total</span>
          </div>
          <p className="text-2xl font-bold text-text">{stats.total}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Icons.Zap className="w-5 h-5 text-wisdom" />
            <span className="text-sm text-gray-600">Ativas</span>
          </div>
          <p className="text-2xl font-bold text-wisdom">{stats.ativas}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Icons.CheckCircle className="w-5 h-5 text-victory" />
            <span className="text-sm text-gray-600">Concluídas</span>
          </div>
          <p className="text-2xl font-bold text-victory">{stats.concluidas}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Icons.XCircle className="w-5 h-5 text-sin" />
            <span className="text-sm text-gray-600">Expiradas</span>
          </div>
          <p className="text-2xl font-bold text-sin">{stats.expiradas}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filtro de Tipo */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periodicidade
            </label>
            <div className="flex gap-2 flex-wrap">
              {(['todas', 'diaria', 'semanal', 'mensal'] as const).map(tipo => (
                <button
                  key={tipo}
                  onClick={() => setFiltroTipo(tipo)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    filtroTipo === tipo
                      ? 'bg-spiritual text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de Categoria */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <div className="flex gap-2 flex-wrap">
              {(['todas', 'acao', 'quiz', 'casal', 'checklist'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    filtroCategoria === cat
                      ? 'bg-wisdom text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Missões */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMissions.length > 0 ? (
          filteredMissions.map(mission => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onComplete={handleComplete}
              onGiveUp={handleGiveUp}
              onCheckboxToggle={handleCheckboxToggle}
              onQuizStart={handleQuizStart}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <Icons.Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma missão encontrada com os filtros selecionados.</p>
          </motion.div>
        )}
      </div>

      {/* Botão de Reset (DEBUG - remover em produção) */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            if (window.confirm('Deseja resetar todas as missões? (DEBUG)')) {
              missionsManager.resetAllMissions();
              window.location.reload();
            }
          }}
          className="bg-sin text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors text-xs"
        >
          Reset Missões (DEBUG)
        </button>
      </div>
    </div>
  );
};

export default EnhancedMissionsPage;
