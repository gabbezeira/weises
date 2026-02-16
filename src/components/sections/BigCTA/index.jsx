import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import * as S from './styles';

const BigCTA = () => {
  const { t } = useTranslation();

  return (
    <S.Section>
      <S.Separator />
      <S.BackgroundGrid />

      <S.Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <S.Title>
            {t('ready.title_start')} <br />
            {t('ready.title_middle')} <S.Highlight>{t('ready.title_highlight')}</S.Highlight>
          </S.Title>

          <S.Description>{t('ready.description')}</S.Description>

          <S.CTAButton>
            <MessageCircle size={24} />
            <span>{t('ready.cta')}</span>
          </S.CTAButton>
        </motion.div>
      </S.Container>
    </S.Section>
  );
};

export default BigCTA;
