import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAdmin } from '../../../../context/AdminContext';
import { useTranslation } from 'react-i18next';
import { Plus, MoreVertical, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import DeleteConfirmationModal from '../../../common/DeleteConfirmationModal';
import TaskModal from '../../components/TaskModal';
import * as S from './styles';

const ProjectBoard = () => {
  const { id: projectId } = useParams();
  const { projects, tasks, addTask, updateTask, deleteTask } = useAdmin();
  const { t } = useTranslation();
  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((t) => t.projectId === projectId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  if (!project) return <div>{t('admin.projects.not_found')}</div>;

  const columns = [
    { id: 'todo', title: t('admin.projects.columns.todo') },
    { id: 'in-progress', title: t('admin.projects.columns.in_progress') },
    { id: 'done', title: t('admin.projects.columns.done') },
  ];

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTaskClick = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleOnDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleMoveTask = (task, direction) => {
    const currentIndex = columns.findIndex((col) => col.id === task.status);
    let newIndex = currentIndex;

    if (direction === 'next' && currentIndex < columns.length - 1) {
      newIndex++;
    } else if (direction === 'prev' && currentIndex > 0) {
      newIndex--;
    }

    if (newIndex !== currentIndex) {
      updateTask(task.id, { status: columns[newIndex].id });
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <S.Title>{project.title}</S.Title>
          <S.SubTitle>{t('admin.projects.task_board')}</S.SubTitle>
        </S.TitleWrapper>
        <S.AddButton onClick={handleAddTask}>
          <Plus size={16} />
          {t('admin.projects.new_task')}
        </S.AddButton>
      </S.Header>

      <S.Board onDragOver={handleOnDragOver}>
        {columns.map((column) => (
          <S.Column
            key={column.id}
            onDragOver={handleOnDragOver}
            onDrop={(e) => handleOnDrop(e, column.id)}
          >
            <S.ColumnHeader>
              <S.ColumnTitle>
                {column.title}
                <S.TaskCount>
                  {projectTasks.filter((t) => t.status === column.id).length}
                </S.TaskCount>
              </S.ColumnTitle>
              <MoreVertical size={16} color="var(--color-gray-500)" />
            </S.ColumnHeader>
            <S.TaskList>
              {projectTasks
                .filter((t) => t.status === column.id)
                .map((task) => (
                  <S.TaskCard
                    key={task.id}
                    onClick={() => handleEditTask(task)}
                    draggable
                    onDragStart={(e) => handleOnDragStart(e, task.id)}
                  >
                    <S.TaskHeader>
                      <S.TaskTitle>{task.title}</S.TaskTitle>
                      {task.priority !== 'low' && (
                        <S.PriorityBadge $priority={task.priority}>{task.priority}</S.PriorityBadge>
                      )}
                    </S.TaskHeader>

                    <S.TaskMeta>
                      <S.Assignee>
                        <S.AssigneeAvatar>
                          {task.assignee ? task.assignee.charAt(0) : '?'}
                        </S.AssigneeAvatar>
                        {task.assignee || 'Unassigned'}
                      </S.Assignee>
                      <S.TaskActions>
                        {column.id !== 'todo' && (
                          <S.TaskActionButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveTask(task, 'prev');
                            }}
                            title={t('admin.projects.actions.move_back')}
                            $secondary // Style variant for visual distinction if needed
                          >
                            <ArrowLeft size={14} />
                          </S.TaskActionButton>
                        )}

                        <S.TaskActionButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTask(task);
                          }}
                          title={t('common.actions.edit')}
                        >
                          <MoreVertical size={14} />
                        </S.TaskActionButton>

                        <S.TaskActionButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTaskClick(task);
                          }}
                          title={t('common.actions.delete')}
                        >
                          <Trash2 size={14} />
                        </S.TaskActionButton>

                        {column.id !== 'done' && (
                          <S.TaskActionButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveTask(task, 'next');
                            }}
                            title={t('admin.projects.actions.move_forward')}
                            $secondary
                          >
                            <ArrowRight size={14} />
                          </S.TaskActionButton>
                        )}
                      </S.TaskActions>
                    </S.TaskMeta>
                  </S.TaskCard>
                ))}
            </S.TaskList>
          </S.Column>
        ))}
      </S.Board>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteTask}
        title={t('admin.projects.delete_modal.title')}
        message={t('admin.projects.delete_modal.message')}
        itemName={taskToDelete?.title}
      />

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={project}
          existingTask={editingTask}
          addTask={addTask}
          updateTask={updateTask}
        />
      )}
    </S.Container>
  );
};

export default ProjectBoard;
