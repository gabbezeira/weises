import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Modal from '../../../../components/common/Modal';
import * as S from './styles';

const ProgressModal = ({ project, onClose, onSave }) => {
  const { t } = useTranslation();
  const [stages, setStages] = useState([]);

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

  const completedCount = stages.filter((s) => s.completed).length;
  const progressPercent =
    stages.length > 0 ? Math.round((completedCount / stages.length) * 100) : 0;

  const handleSave = () => {
    onSave(project.id, stages);
    onClose();
  };

  return (
    <Modal.Overlay onClick={onClose}>
      <Modal.Content $maxWidth="560px" onClick={(e) => e.stopPropagation()}>
        <Modal.Header>
          <Modal.Title>{t('admin.projects.progress_modal.title')}</Modal.Title>
          <Modal.CloseButton onClick={onClose}>
            <X size={20} />
          </Modal.CloseButton>
        </Modal.Header>

        <Modal.Body>
          <S.ProgressText>
            <span>{t('admin.projects.progress_modal.progress') || 'Progress'}</span>
            <span>{progressPercent}%</span>
          </S.ProgressText>
          <S.ProgressBar>
            <S.ProgressFill $percent={progressPercent} />
          </S.ProgressBar>

          {stages.length === 0 && (
            <S.EmptyState>
              {t('admin.projects.progress_modal.no_stages')}
            </S.EmptyState>
          )}

          <S.StagesList>
            {stages.map((stage) => (
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
                      ? t('admin.projects.progress_modal.completed') || 'Completed'
                      : t('admin.projects.progress_modal.pending') || 'Pending'}
                  </S.StageStatus>
                </div>
              </S.StageRow>
            ))}
          </S.StagesList>
        </Modal.Body>

        <Modal.Footer>
          <S.CancelButton onClick={onClose}>{t('common.actions.cancel')}</S.CancelButton>
          <S.SaveButton onClick={handleSave}>{t('common.actions.save')}</S.SaveButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Overlay>
  );
};

export default ProgressModal;
