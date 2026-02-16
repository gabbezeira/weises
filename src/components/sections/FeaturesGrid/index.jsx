import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Shield, Globe, Cpu, Database, BarChart } from 'lucide-react';
import * as S from './styles';

const FeaturesGrid = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Zap />,
      title: t('skills.features.lightning.title'),
      description: t('skills.features.lightning.desc'),
    },
    {
      icon: <Shield />,
      title: t('skills.features.security.title'),
      description: t('skills.features.security.desc'),
    },
    {
      icon: <Globe />,
      title: t('skills.features.scale.title'),
      description: t('skills.features.scale.desc'),
    },
    {
      icon: <Cpu />,
      title: t('skills.features.ai.title'),
      description: t('skills.features.ai.desc'),
    },
    {
      icon: <Database />,
      title: t('skills.features.realtime.title'),
      description: t('skills.features.realtime.desc'),
    },
    {
      icon: <BarChart />,
      title: t('skills.features.analytics.title'),
      description: t('skills.features.analytics.desc'),
    },
  ];

  return (
    <S.Section>
      <S.Separator />

      <S.Container>
        <S.Header>
          <S.Title>
            {t('skills.title_start')} <br />
            <S.Highlight>{t('skills.title_highlight')}</S.Highlight>
          </S.Title>
        </S.Header>

        <S.Grid>
          {features.map((feature, index) => (
            <S.FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <S.CardOverlay />

              <S.CardContent>
                <S.IconWrapper>{React.cloneElement(feature.icon, { size: 28 })}</S.IconWrapper>
                <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                <S.FeatureDescription>{feature.description}</S.FeatureDescription>
              </S.CardContent>
            </S.FeatureCard>
          ))}
        </S.Grid>
      </S.Container>
    </S.Section>
  );
};

export default FeaturesGrid;
