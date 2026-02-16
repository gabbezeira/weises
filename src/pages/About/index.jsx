import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';
import logo from '@assets/images/logo.svg';
import * as S from './styles';

const About = () => {
  const { t } = useTranslation();
  const [hoveredQuality, setHoveredQuality] = useState(null);

  const qualities = [
    {
      id: 1,
      icon: <Shield size={24} />,
      title: t('about.qualities.security.title'),
      description: t('about.qualities.security.desc'),
      style: { top: 0, left: '50%', transform: 'translate(-50%, -3rem)' },
    },
    {
      id: 2,
      icon: <Zap size={24} />,
      title: t('about.qualities.performance.title'),
      description: t('about.qualities.performance.desc'),
      style: { top: '50%', right: 0, transform: 'translate(3rem, -50%)' },
    },
    {
      id: 3,
      icon: <Lightbulb size={24} />,
      title: t('about.qualities.incubation.title'),
      description: t('about.qualities.incubation.desc'),
      style: { bottom: 0, left: '50%', transform: 'translate(-50%, 3rem)' },
    },
    {
      id: 4,
      icon: <TrendingUp size={24} />,
      title: t('about.qualities.value.title'),
      description: t('about.qualities.value.desc'),
      style: { top: '50%', left: 0, transform: 'translate(-3rem, -50%)' },
    },
  ];

  return (
    <S.Wrapper>
      <S.BackgroundGrid>
        <S.GridLayer />
        <S.GradientLayer />
      </S.BackgroundGrid>
      <S.CentralGlow />

      <S.Container>
        <S.HeroSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <S.HeroTitle>
              {t('about.hero.title_start')} <br />
              <S.Highlight>{t('about.hero.title_highlight')}</S.Highlight>
            </S.HeroTitle>
            <S.HeroDescription>{t('about.hero.description')}</S.HeroDescription>
          </motion.div>
        </S.HeroSection>

        <S.DiagramSection>
          <S.OrbitLines>
            <S.OrbitInner />
            <S.OrbitOuter />
          </S.OrbitLines>

          <S.CentralCore>
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <S.CoreImage src={logo} alt="Weises Company" />
            </motion.div>
            <S.CorePulse />
          </S.CentralCore>

          <S.SatellitesContainer>
            <S.SatellitesWrapper>
              {qualities.map((quality) => (
                <S.SatelliteItem
                  key={quality.id}
                  style={quality.style}
                  onMouseEnter={() => setHoveredQuality(quality.id)}
                  onMouseLeave={() => setHoveredQuality(null)}
                >
                  <S.SatelliteIcon
                    whileHover={{ scale: 1.2 }}
                    isActive={hoveredQuality === quality.id}
                  >
                    <div style={{ color: 'white' }}>
                      {React.cloneElement(quality.icon, { size: 28 })}
                    </div>
                  </S.SatelliteIcon>

                  <AnimatePresence>
                    {hoveredQuality === quality.id && (
                      <S.Tooltip
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      >
                        <S.TooltipTitle>{quality.title}</S.TooltipTitle>
                        <S.TooltipDesc>{quality.description}</S.TooltipDesc>
                      </S.Tooltip>
                    )}
                  </AnimatePresence>
                </S.SatelliteItem>
              ))}
            </S.SatellitesWrapper>
          </S.SatellitesContainer>
        </S.DiagramSection>

        <S.NarrativeSection>
          <S.NarrativeHeader>
            <S.NarrativeTitle>{t('about.narrative.title')}</S.NarrativeTitle>
            <S.NarrativeDesc>
              {t('about.narrative.description_start')}
              <S.NarrativeHighlight>
                {' '}
                {t('about.narrative.description_highlight')}
              </S.NarrativeHighlight>
              .
            </S.NarrativeDesc>
          </S.NarrativeHeader>

          <S.NarrativeGrid>
            <S.NarrativeCard>
              <S.CardGradient />
              <S.CardContent>
                <S.CardIcon>
                  <Shield size={28} />
                </S.CardIcon>
                <S.CardTitle>{t('about.narrative.cards.security.title')}</S.CardTitle>
                <S.CardDesc>{t('about.narrative.cards.security.desc')}</S.CardDesc>
              </S.CardContent>
            </S.NarrativeCard>

            <S.NarrativeCard>
              <S.CardGradient />
              <S.CardContent>
                <S.CardIcon>
                  <Zap size={28} />
                </S.CardIcon>
                <S.CardTitle>{t('about.narrative.cards.performance.title')}</S.CardTitle>
                <S.CardDesc>{t('about.narrative.cards.performance.desc')}</S.CardDesc>
              </S.CardContent>
            </S.NarrativeCard>

            <S.NarrativeCard>
              <S.CardGradient />
              <S.CardContent>
                <S.CardIcon>
                  <Lightbulb size={28} />
                </S.CardIcon>
                <S.CardTitle>{t('about.narrative.cards.access.title')}</S.CardTitle>
                <S.CardDesc>{t('about.narrative.cards.access.desc')}</S.CardDesc>
              </S.CardContent>
            </S.NarrativeCard>
          </S.NarrativeGrid>

          <S.CtaContainer>
            <S.CtaLink to="/contact">
              {t('about.narrative.cta')} <ArrowRight size={20} />
            </S.CtaLink>
          </S.CtaContainer>
        </S.NarrativeSection>
      </S.Container>
    </S.Wrapper>
  );
};

export default About;
