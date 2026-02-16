import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import EmptyState from '@ui/EmptyState';
import Loader from '../../components/ui/Loader';
import * as S from './styles';

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects/public');
      if (response.success) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const currentProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <S.Wrapper>
        <S.BackgroundGrid>
          <S.GridLayer />
          <S.GradientLayer />
        </S.BackgroundGrid>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader />
        </div>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.BackgroundGrid>
        <S.GridLayer />
        <S.GradientLayer />
      </S.BackgroundGrid>

      <S.Container>
        <S.Header>
          <S.Title initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {t('projects_page.hero.title_start')}{' '}
            <S.Highlight>{t('projects_page.hero.title_highlight')}</S.Highlight>
          </S.Title>
          <S.Description>{t('projects_page.hero.description')}</S.Description>
        </S.Header>

        {projects.length > 0 ? (
          <S.ProjectsGrid>
            <AnimatePresence mode="wait">
              {currentProjects.map((project, index) => (
                <S.ProjectCard
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <S.CardLink to={`/projects/${project.id}`}>
                    <S.CardImageContainer>
                      <S.CardOverlay />
                      <S.CardImage src={project.image} alt={project.title} />
                    </S.CardImageContainer>

                    <S.CardContent>
                      <S.CardCategory>{project.category}</S.CardCategory>
                      <S.CardTitle>{project.title}</S.CardTitle>
                    </S.CardContent>
                    <S.HoverArrow>
                      <ArrowUpRight size={24} color="white" />
                    </S.HoverArrow>
                  </S.CardLink>
                </S.ProjectCard>
              ))}
            </AnimatePresence>
          </S.ProjectsGrid>
        ) : (
          <S.EmptyStateContainer>
            <EmptyState
              title={t('projects_page.empty.title')}
              description={t('projects_page.empty.description')}
            />
          </S.EmptyStateContainer>
        )}

        {totalPages > 1 && (
          <S.PaginationContainer>
            <S.PaginationButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={24} />
            </S.PaginationButton>

            <S.PaginationInfo>
              {t('projects_page.pagination')}{' '}
              <S.PaginationCurrent>{currentPage}</S.PaginationCurrent> of {totalPages}
            </S.PaginationInfo>

            <S.PaginationButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={24} />
            </S.PaginationButton>
          </S.PaginationContainer>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

export default ProjectsPage;
