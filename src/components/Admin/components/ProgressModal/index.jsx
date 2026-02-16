import React, { useState, useEffect } from 'react';
import { X, Check, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

const ProgressModal = ({ project, onClose, onSave }) => {
  const { t } = useTranslation();
  const [stages, setStages] = useState([]);
  const [newStageName, setNewStageName] = useState('');
  const [newStageDate, setNewStageDate] = useState('');

  useEffect(() => {
    if (project?.stages) {
      setStages(
        project.stages.map((s) => ({
          ...s,
          id: s.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
          completed: s.completed || false,
        })),
      );
    } else {
      setStages([]);
    }
  }, [project]);

  const toggleStage = (stageId) => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, completed: !s.completed } : s)),
    );
  };

  const handleAddStage = () => {
    if (!newStageName) return;
    const newStage = {
      id: Date.now().toString(),
      name: newStageName,
      date: newStageDate,
      completed: false,
    };
    setStages((prev) => [...prev, newStage]);
    setNewStageName('');
    setNewStageDate('');
  };

  const handleRemoveStage = (stageId) => {
    setStages((prev) => prev.filter((s) => s.id !== stageId));
  };

  const completedCount = stages.filter((s) => s.completed).length;
  const progressPercent =
    stages.length > 0 ? Math.round((completedCount / stages.length) * 100) : 0;

  const handleSave = () => {
    onSave(project.id, stages);
    onClose();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>{t('admin.projects.progress_modal.title')}</S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          <S.ProgressText>
            <span>{t('admin.projects.progress_modal.progress')}</span>
            <span>{progressPercent}%</span>
          </S.ProgressText>
          <S.ProgressBar>
            <S.ProgressFill $percent={progressPercent} />
          </S.ProgressBar>

          <div
            style={{
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'flex-end',
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)',
                  marginBottom: '0.25rem',
                  display: 'block',
                }}
              >
                Stage Name
              </label>
              <S.Input
                value={newStageName}
                onChange={(e) => setNewStageName(e.target.value)}
                placeholder="New Stage Name"
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ width: '140px' }}>
              <label
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)',
                  marginBottom: '0.25rem',
                  display: 'block',
                }}
              >
                Date
              </label>
              <S.Input
                type="date"
                value={newStageDate}
                onChange={(e) => setNewStageDate(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <S.SaveButton
              onClick={handleAddStage}
              disabled={!newStageName}
              style={{ height: '40px', padding: '0 1rem' }}
            >
              <Plus size={16} />
            </S.SaveButton>
          </div>

          <S.StagesList>
            {stages.length > 0 ? (
              stages.map((stage) => (
                <S.StageRow key={stage.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <S.StageCheckbox
                      $checked={stage.completed}
                      onClick={() => toggleStage(stage.id)}
                    >
                      {stage.completed && <Check size={14} />}
                    </S.StageCheckbox>
                    <S.StageInfo>
                      <S.StageName $completed={stage.completed}>{stage.name}</S.StageName>
                      {stage.date && (
                        <S.StageDate>{new Date(stage.date).toLocaleDateString()}</S.StageDate>
                      )}
                    </S.StageInfo>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <S.StageStatus $completed={stage.completed}>
                      {stage.completed
                        ? t('admin.projects.progress_modal.completed')
                        : t('admin.projects.progress_modal.pending')}
                    </S.StageStatus>
                    <button
                      onClick={() => handleRemoveStage(stage.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-red-500)',
                        cursor: 'pointer',
                        opacity: 0.6,
                      }}
                      title="Remove Stage"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </S.StageRow>
              ))
            ) : (
              <S.EmptyState>{t('admin.projects.progress_modal.no_stages')}</S.EmptyState>
            )}
          </S.StagesList>
        </S.Content>

        <S.Footer>
          <S.CancelButton onClick={onClose}>{t('common.actions.cancel')}</S.CancelButton>
          <S.SaveButton onClick={handleSave}>{t('common.actions.save')}</S.SaveButton>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  );
};

export default ProgressModal;
