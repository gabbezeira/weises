import React, { useState } from 'react';
import * as S from './styles';
import { useClient } from '../../../../context/ClientContext';
import Pagination from '../../../ui/Pagination';
import ClientProjectCard from '../../components/ClientProjectCard';
import { useTranslation } from 'react-i18next';
import Loader from '../../../ui/Loader';
import EmptyState from '../../../ui/EmptyState';
import { FolderOpen } from 'lucide-react';

const ClientProjects = () => {
  const { clientProjects, isLoading } = useClient();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(clientProjects.length / itemsPerPage);
  const paginatedProjects = clientProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) return <Loader />;

  return (
    <S.Container>
      <S.Header>
        <h1>{t('client.projects.title')}</h1>
      </S.Header>

      {clientProjects.length > 0 ? (
        <>
          <S.ProjectsGrid>
            {paginatedProjects.map((project) => (
              <ClientProjectCard key={project.id} project={project} />
            ))}
          </S.ProjectsGrid>

          {clientProjects.length > itemsPerPage && (
            <S.PaginationWrapper>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </S.PaginationWrapper>
          )}
        </>
      ) : (
        <EmptyState
          title={t('projects_page.empty.title')}
          description={t('projects_page.empty.description')}
          icon={FolderOpen}
        />
      )}
    </S.Container>
  );
};

export default ClientProjects;
