import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../../../context/AdminContext';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, Layout, Key, ListChecks, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import CredentialsModal from '../../components/CredentialsModal';
import ProgressModal from '../../components/ProgressModal';
import DeleteConfirmationModal from '../../../common/DeleteConfirmationModal';
import Pagination from '../../../ui/Pagination';
import Loader from '../../../ui/Loader';
import EmptyState from '../../../ui/EmptyState';
import * as S from './styles';

const ProjectList = () => {
  const {
    projects,
    clients,
    deleteProject,
    updateProjectProgress,
    isLoading,
    searchTerm,
    setSearchTerm,
  } = useAdmin();
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [progressProject, setProgressProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    return () => setSearchTerm('');
  }, [setSearchTerm]);

  if (isLoading) return <Loader />;

  const getClientName = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClientName(project.clientId).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setProjectToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSaveProgress = (projectId, updatedStages) => {
    updateProjectProgress(projectId, updatedStages);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>{t('admin.projects.title')}</S.Title>
        <S.AddButton to="/admin/projects/new">{t('admin.projects.add_project')}</S.AddButton>
      </S.Header>

      {currentProjects.length > 0 ? (
        <S.ProjectsGrid>
          {currentProjects.map((project) => (
            <S.ProjectCard key={project.id}>
              <S.CardHeader>
                <div>
                  <S.ProjectTitle>{project.title}</S.ProjectTitle>
                  <S.ClientName>{getClientName(project.clientId)}</S.ClientName>
                </div>
                <S.StatusBadge $status={project.status}>
                  {t(`admin.projects.status.${project.status.toLowerCase().replace(' ', '_')}`)}
                </S.StatusBadge>
              </S.CardHeader>

              <S.CardDescription>{project.description}</S.CardDescription>

              <S.CardFooter>
                <S.TaskCount to={`/admin/projects/${project.id}/board`}>
                  <Layout size={16} />
                  {t('admin.projects.task_board')}
                </S.TaskCount>

                <S.Actions>
                  <S.ActionButton
                    title={t('admin.projects.progress_modal.title')}
                    onClick={() => setProgressProject(project)}
                  >
                    <ListChecks size={16} />
                  </S.ActionButton>
                  <S.ActionButton
                    title={t('admin.projects.private_details')}
                    onClick={() => setSelectedProject(project)}
                  >
                    <Key size={16} />
                  </S.ActionButton>
                  <Link to={`/admin/projects/edit/${project.id}`}>
                    <S.ActionButton title={t('common.actions.edit')}>
                      <Edit2 size={16} />
                    </S.ActionButton>
                  </Link>
                  <S.ActionButton
                    $danger
                    title={t('common.actions.delete')}
                    onClick={() => handleDeleteClick(project)}
                  >
                    <Trash2 size={16} />
                  </S.ActionButton>
                </S.Actions>
              </S.CardFooter>
            </S.ProjectCard>
          ))}
        </S.ProjectsGrid>
      ) : (
        <EmptyState
          title={searchTerm ? 'No projects found' : 'No projects yet'}
          description={
            searchTerm
              ? `We couldn't find any projects matching "${searchTerm}"`
              : 'Start managing your creative projects here.'
          }
          icon={Layout}
        >
          {!searchTerm && (
            <S.AddButton to="/admin/projects/new">
              <Plus size={20} />
              {t('admin.projects.add_project')}
            </S.AddButton>
          )}
        </EmptyState>
      )}

      <S.PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </S.PaginationWrapper>

      {selectedProject && (
        <CredentialsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {progressProject && (
        <ProgressModal
          project={progressProject}
          onClose={() => setProgressProject(null)}
          onSave={handleSaveProgress}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={t('admin.projects.delete_project_modal.title')}
        message={t('admin.projects.delete_project_modal.message')}
        itemName={projectToDelete?.title}
      />
    </S.Container>
  );
};

export default ProjectList;
