import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import glow from '@assets/images/glow.svg';
import * as S from './styles';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <S.Section>
      <S.GlowImageTop src={glow} alt="" />
      <S.GlowImageBottom src={glow} alt="" />

      <S.Grid />

      <S.GradientFade />

      <S.Container>
        <S.BadgeWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <S.Badge>{t('hero.badge')}</S.Badge>
        </S.BadgeWrapper>

        <S.Title
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {t('hero.title_start')} <br />
          <S.Highlight>{t('hero.title_highlight')}</S.Highlight>
        </S.Title>

        <S.Description
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {t('hero.description')}
        </S.Description>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <S.CTAButton>{t('hero.cta')}</S.CTAButton>
        </motion.div>
      </S.Container>
    </S.Section>
  );
};

export default Hero;
