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

  // Import Loader and EmptyState (assuming they are available in relative paths)
  // Note: I need to add imports at the top, so I will do a multi-replace or just replace the whole file to be safe and clean.
  // Actually, I'll use replace_file_content for the body, but I need to add imports.
  // Let's just replace the whole file content to ensure imports are correct.

  // WAIT, I should use the proper tool usage. I'll act as if I am writing the whole file.

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
