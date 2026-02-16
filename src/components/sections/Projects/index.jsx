import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../../services/api';
import glow from '@assets/images/glow.svg';
import EmptyState from '@ui/EmptyState';
import * as S from './styles';

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
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
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (projects.length === 0) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    if (projects.length === 0) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getVisibleProjects = () => {
    if (projects.length === 0) return [];
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(projects[(activeIndex + i) % projects.length]);
    }
    return visible;
  };

  const visibleProjects = getVisibleProjects();

  if (loading) return null; // Or a subtle loader

  return (
    <S.Section id="projects">
      <S.GlowImageTop src={glow} alt="" />
      <S.GlowImageBottom src={glow} alt="" />

      <S.Separator />
      <S.BackgroundGrid />

      <S.Container>
        <S.Header>
          <S.Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home_projects.title_start')} <br />
            {t('home_projects.title_middle')}{' '}
            <S.Highlight>{t('home_projects.title_highlight')}</S.Highlight>
          </S.Title>
          <S.Description>
            {t('home_projects.description_start')}{' '}
            <S.ItalicText>{t('home_projects.description_highlight')}</S.ItalicText>
          </S.Description>

          <S.ButtonWrapper>
            <S.ButtonGradientMain />
            <S.ButtonGradientSecondary />

            <S.CaseStudyLink to="/projects">{t('home_projects.cta')}</S.CaseStudyLink>
          </S.ButtonWrapper>
        </S.Header>

        <S.CarouselContainer>
          {projects.length > visibleCount && (
            <>
              <S.NavButton onClick={prevSlide} position="left">
                <ChevronLeft size={24} />
              </S.NavButton>
              <S.NavButton onClick={nextSlide} position="right">
                <ChevronRight size={24} />
              </S.NavButton>
            </>
          )}

          {projects.length > 0 ? (
            <S.ProjectsGrid>
              {visibleProjects.map((project, i) => (
                <S.ProjectCard key={`${project.id}-${activeIndex + i}`}>
                  <S.CardLink to={`/projects/${project.id}`}>
                    <S.ImageContainer>
                      <S.CardOverlay />
                      <S.ProjectImage src={project.image} alt={project.title} />
                    </S.ImageContainer>

                    <S.CardContent>
                      <S.CategoryWrapper>
                        <S.CategoryBadge>{project.category}</S.CategoryBadge>
                      </S.CategoryWrapper>

                      <S.ProjectTitle>{project.title}</S.ProjectTitle>
                    </S.CardContent>

                    <S.HoverArrow>
                      <ArrowUpRight size={24} color="white" />
                    </S.HoverArrow>
                  </S.CardLink>
                </S.ProjectCard>
              ))}
            </S.ProjectsGrid>
          ) : (
            <S.EmptyStateContainer>
              <EmptyState
                title={t('projects_page.empty.title')}
                description={t('projects_page.empty.description')}
              />
            </S.EmptyStateContainer>
          )}
        </S.CarouselContainer>
      </S.Container>
    </S.Section>
  );
};

export default Projects;
