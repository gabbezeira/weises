import React from 'react';
import { useTranslation } from 'react-i18next';
import { Atom, FileCode, Database, Cloud, BrainCircuit, Code2, Server } from 'lucide-react';
import * as S from './styles';

const technologies = [
  { name: 'React', icon: <Atom /> },
  { name: 'TypeScript', icon: <Code2 /> },
  { name: 'JavaScript', icon: <FileCode /> },
  { name: 'Python', icon: <FileCode /> },
  { name: 'Django', icon: <Server /> },
  { name: 'Firebase', icon: <Database /> },
  { name: 'Vercel', icon: <Cloud /> },
  { name: 'AI Models', icon: <BrainCircuit /> },
];

const TechStack = () => {
  const { t } = useTranslation();

  return (
    <S.Section>
      <S.Separator />

      <S.BackgroundGrid />

      <S.Container>
        <S.HeaderContent>
          <S.Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('tech.title_start')} <br /> <S.Highlight>{t('tech.title_highlight')}</S.Highlight>
          </S.Title>
          <S.Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('tech.description')}
          </S.Description>
        </S.HeaderContent>
      </S.Container>

      <S.MarqueeTrack>
        <S.MarqueeContent
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {[...technologies, ...technologies, ...technologies, ...technologies].map(
            (tech, index) => (
              <S.TechItem key={index}>
                <S.IconWrapper>
                  {React.cloneElement(tech.icon, { size: 32, strokeWidth: 1.5 })}
                </S.IconWrapper>
                <S.TechName>{tech.name}</S.TechName>
              </S.TechItem>
            ),
          )}
        </S.MarqueeContent>
      </S.MarqueeTrack>
    </S.Section>
  );
};

export default TechStack;
