import React from 'react';
import { useTranslation } from 'react-i18next';
import glow from '@assets/images/glow.svg';
import steveJobsImg from '@assets/images/steve-jobs.webp';
import * as S from './styles';

const Testimonial = () => {
  const { t } = useTranslation();

  return (
    <S.Section>
      <S.GlowImage
        src={glow}
        alt=""
        style={{ top: '-40%', left: '-35%', transform: 'rotate(-20deg)' }}
      />
      <S.GlowImage
        src={glow}
        alt=""
        style={{ bottom: '-30%', right: '-40%', transform: 'rotate(180deg)' }}
      />

      <S.Separator />

      <S.Container>
        <S.ContentWrapper>
          <S.ImageSide
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <S.ImageContainer>
              <S.ImageOverlay />
              <S.Portrait src={steveJobsImg} alt="Steve Jobs" />
              <S.BorderRight />
              <S.BorderBottom />
            </S.ImageContainer>
          </S.ImageSide>

          <S.TextSide
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <S.Quote>"{t('inspiration.quote')}"</S.Quote>

            <div>
              <S.AuthorName>Steve Jobs</S.AuthorName>
              <S.AuthorRole>{t('inspiration.role')}</S.AuthorRole>
            </div>
          </S.TextSide>
        </S.ContentWrapper>
      </S.Container>
    </S.Section>
  );
};

export default Testimonial;
