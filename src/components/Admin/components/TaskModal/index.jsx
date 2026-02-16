import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Calendar, User, Tag, AlignLeft, Flag } from 'lucide-react';
import * as S from './styles';

const TaskModal = ({ isOpen, onClose, project, existingTask, addTask, updateTask }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    assignee: '',
    status: 'todo',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    if (existingTask) {
      setFormData({
        title: existingTask.title || '',
        priority: existingTask.priority || 'medium',
        assignee: existingTask.assignee || '',
        status: existingTask.status || 'todo',
        description: existingTask.description || '',
        dueDate: existingTask.dueDate || '',
      });
    } else {
      // Reset form for new task
      setFormData({
        title: '',
        priority: 'medium',
        assignee: '',
        status: 'todo',
        description: '',
        dueDate: '',
      });
    }
  }, [existingTask, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingTask) {
      updateTask(existingTask.id, formData);
    } else {
      addTask({ ...formData, projectId: project.id });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>
            {existingTask
              ? t('admin.projects.modal.edit_title')
              : t('admin.projects.modal.new_title')}
          </S.ModalTitle>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label>{t('admin.projects.modal.input.title')}</S.Label>
            <S.Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder={t('admin.projects.modal.input.title_placeholder')}
              autoFocus
            />
          </S.FormGroup>

          <S.TwoColumns>
            <S.FormGroup>
              <S.Label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Flag size={14} /> {t('admin.projects.modal.input.priority')}
              </S.Label>
              <S.Select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="low">{t('admin.projects.modal.priority.low')}</option>
                <option value="medium">{t('admin.projects.modal.priority.medium')}</option>
                <option value="high">{t('admin.projects.modal.priority.high')}</option>
                <option value="critical">{t('admin.projects.modal.priority.critical')}</option>
              </S.Select>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={14} /> {t('admin.projects.modal.input.due_date')}
              </S.Label>
              <S.Input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </S.FormGroup>
          </S.TwoColumns>

          <S.FormGroup>
            <S.Label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <User size={14} /> {t('admin.projects.modal.input.assignee')}
            </S.Label>
            <S.Input
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              placeholder={t('admin.projects.modal.input.assignee_placeholder')}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <AlignLeft size={14} /> {t('admin.projects.modal.input.description')}
            </S.Label>
            <S.TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t('admin.projects.modal.input.description_placeholder')}
            />
          </S.FormGroup>

          <S.ButtonGroup>
            <S.Button type="button" onClick={onClose}>
              {t('common.actions.cancel')}
            </S.Button>
            <S.Button type="submit" $variant="primary">
              {existingTask ? t('common.actions.save') : t('admin.projects.new_task')}
            </S.Button>
          </S.ButtonGroup>
        </S.Form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default TaskModal;
