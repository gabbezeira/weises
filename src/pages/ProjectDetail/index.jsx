import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';
import Loader from '../../components/ui/Loader';
import * as S from './styles';

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/public/${id}`);
        if (response.success) {
          setProject(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
        setError('Project not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <S.Wrapper>
        <S.BackgroundMesh>
          <S.MeshPattern />
        </S.BackgroundMesh>
        <div
          style={{
            height: '100vh',
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

  if (error || !project) {
    return <S.NotFoundContainer>Project not found</S.NotFoundContainer>;
  }

  // Use DB data directly, specific translation fallbacks if needed, but DB is source of truth
  const services = project.services || [];
  const stack = project.stack || [];

  return (
    <S.Wrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <S.BackgroundMesh>
        <S.MeshPattern />
      </S.BackgroundMesh>
      <S.HeroSection>
        <S.HeroBackground>
          <S.HeroImage src={project.image} alt={project.title} />
          <S.HeroOverlay />
        </S.HeroBackground>

        <S.HeroContent>
          <S.BackLink>
            <S.BackLinkInner to="/">
              <ArrowLeft size={20} />
              {t('project_detail.back')}
            </S.BackLinkInner>
          </S.BackLink>

          <S.HeroText
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <S.Category>{project.category}</S.Category>
            <S.Title>{project.title}</S.Title>
          </S.HeroText>
        </S.HeroContent>
      </S.HeroSection>

      <S.ContentSection>
        <S.StatsRow>
          {project.methodology && (
            <S.StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <S.StatValue>{project.methodology}</S.StatValue>
              <S.StatLabel>{t('project_detail.stats_labels.methodology')}</S.StatLabel>
            </S.StatItem>
          )}
          {project.teamSize && (
            <S.StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <S.StatValue>{project.teamSize}</S.StatValue>
              <S.StatLabel>{t('project_detail.stats_labels.team_size')}</S.StatLabel>
            </S.StatItem>
          )}
          {project.platform && (
            <S.StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <S.StatValue>{project.platform}</S.StatValue>
              <S.StatLabel>{t('project_detail.stats_labels.platform')}</S.StatLabel>
            </S.StatItem>
          )}
        </S.StatsRow>

        <S.MainGrid>
          <S.MainContent>
            <S.Description>
              <S.DescriptionText>{project.description}</S.DescriptionText>

              <S.ChallengeSolutionGrid>
                {project.challenge && (
                  <S.ContentBlock>
                    <S.BlockTitle>{t('project_detail.labels.challenge')}</S.BlockTitle>
                    <S.BlockText>{project.challenge}</S.BlockText>
                  </S.ContentBlock>
                )}
                {project.solution && (
                  <S.ContentBlock>
                    <S.BlockTitle>{t('project_detail.labels.solution')}</S.BlockTitle>
                    <S.BlockText>{project.solution}</S.BlockText>
                  </S.ContentBlock>
                )}
              </S.ChallengeSolutionGrid>
            </S.Description>

            {project.gallery && project.gallery.length > 0 && (
              <S.GallerySection>
                <S.GalleryTitle>{t('project_detail.labels.gallery')}</S.GalleryTitle>
                <S.GalleryGrid>
                  {project.gallery.map((img, index) => (
                    <S.GalleryItem
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <S.GalleryImage src={img} alt={`Project gallery ${index + 1}`} />
                    </S.GalleryItem>
                  ))}
                </S.GalleryGrid>
              </S.GallerySection>
            )}
          </S.MainContent>

          <S.Sidebar>
            <S.SidebarCard>
              {services.length > 0 && (
                <S.SidebarSection>
                  <S.SidebarTitle>{t('project_detail.labels.services')}</S.SidebarTitle>
                  <S.TagsContainer>
                    {services.map((service) => (
                      <S.ServiceTag key={service}>{service}</S.ServiceTag>
                    ))}
                  </S.TagsContainer>
                </S.SidebarSection>
              )}

              {stack.length > 0 && (
                <S.SidebarSection>
                  <S.SidebarTitle>{t('project_detail.labels.stack')}</S.SidebarTitle>
                  <S.TagsContainer>
                    {stack.map((tech) => (
                      <S.TechTag key={tech}>{tech}</S.TechTag>
                    ))}
                  </S.TagsContainer>
                </S.SidebarSection>
              )}

              <S.InfoSection>
                <S.SidebarTitle>{t('project_detail.labels.info')}</S.SidebarTitle>
                <S.InfoList>
                  <S.InfoRow>
                    <span>{t('project_detail.labels.client')}</span>
                    <S.InfoValue>
                      {project.clientName || t('project_detail.labels.confidential')}
                    </S.InfoValue>
                  </S.InfoRow>
                  <S.InfoRow>
                    <span>{t('project_detail.labels.industry')}</span>
                    <S.InfoValue>{project.category}</S.InfoValue>
                  </S.InfoRow>
                  {project.duration && (
                    <S.InfoRow>
                      <span>{t('project_detail.labels.duration')}</span>
                      <S.InfoValue>{project.duration}</S.InfoValue>
                    </S.InfoRow>
                  )}
                  {project.year && (
                    <S.InfoRow>
                      <span>{t('project_detail.labels.year')}</span>
                      <S.InfoValue>{project.year}</S.InfoValue>
                    </S.InfoRow>
                  )}
                </S.InfoList>
              </S.InfoSection>

              {project.liveLink && (
                <S.VisitButton
                  as="a"
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('project_detail.labels.visit')} <ExternalLink size={18} />
                </S.VisitButton>
              )}
            </S.SidebarCard>
          </S.Sidebar>
        </S.MainGrid>
      </S.ContentSection>
    </S.Wrapper>
  );
};

export default ProjectDetail;
