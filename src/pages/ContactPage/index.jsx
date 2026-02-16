import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, Send, Linkedin, Github, Twitter } from 'lucide-react';
import Button from '@common/Button';
import * as S from './styles';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <S.Wrapper>
      <S.BackgroundGlowLeft />
      <S.BackgroundGlowRight />
      <S.BackgroundGrid />

      <S.Container>
        <S.HeroSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <S.Badge>{t('contact_page.hero.badge')}</S.Badge>
          <S.HeroTitle>
            {t('contact_page.hero.title_start')}{' '}
            <S.Highlight>{t('contact_page.hero.title_highlight')}</S.Highlight>
          </S.HeroTitle>
          <S.HeroDesc>{t('contact_page.hero.description')}</S.HeroDesc>
        </S.HeroSection>

        <S.ContactLayout>
          <S.InfoColumn
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <S.InfoCard>
              <S.InfoTitle>{t('contact_page.info.title')}</S.InfoTitle>
              <S.InfoList>
                <S.InfoItem>
                  <S.IconWrapper>
                    <Mail size={24} />
                  </S.IconWrapper>
                  <S.InfoText>
                    <S.InfoLabel>{t('contact_page.info.email')}</S.InfoLabel>
                    <S.InfoLink href="mailto:hello@weises.tech">hello@weises.tech</S.InfoLink>
                  </S.InfoText>
                </S.InfoItem>
                <S.InfoItem>
                  <S.IconWrapper>
                    <Phone size={24} />
                  </S.IconWrapper>
                  <S.InfoText>
                    <S.InfoLabel>{t('contact_page.info.call')}</S.InfoLabel>
                    <S.InfoLink href="tel:+1234567890">+1 (234) 567-890</S.InfoLink>
                  </S.InfoText>
                </S.InfoItem>
                <S.InfoItem>
                  <S.IconWrapper>
                    <MapPin size={24} />
                  </S.IconWrapper>
                  <S.InfoText>
                    <S.InfoLabel>{t('contact_page.info.visit')}</S.InfoLabel>
                    <S.InfoValue>
                      123 Innovation Dr,
                      <br />
                      Tech City, TC 90210
                    </S.InfoValue>
                  </S.InfoText>
                </S.InfoItem>
              </S.InfoList>
            </S.InfoCard>

            <S.InfoCard>
              <S.FollowTitle>{t('contact_page.follow.title')}</S.FollowTitle>
              <S.SocialLinks>
                {[Linkedin, Github, Twitter].map((Icon, i) => (
                  <S.SocialIcon key={i} href="#">
                    <Icon size={20} />
                  </S.SocialIcon>
                ))}
              </S.SocialLinks>
            </S.InfoCard>
          </S.InfoColumn>

          <S.FormColumn
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <S.ContactForm>
              <S.FormTitle>{t('contact_page.form.title')}</S.FormTitle>

              <S.FormGrid>
                <div>
                  <S.Label>{t('contact_page.form.name')}</S.Label>
                  <S.Input type="text" placeholder={t('contact_page.form.name_placeholder')} />
                </div>
                <div>
                  <S.Label>{t('contact_page.form.email')}</S.Label>
                  <S.Input type="email" placeholder={t('contact_page.form.email_placeholder')} />
                </div>
              </S.FormGrid>

              <S.FormGroup>
                <S.Label>{t('contact_page.form.subject')}</S.Label>
                <S.Input type="text" placeholder={t('contact_page.form.subject_placeholder')} />
              </S.FormGroup>

              <S.MessageWrapper>
                <S.Label>{t('contact_page.form.message')}</S.Label>
                <S.TextArea rows={6} placeholder={t('contact_page.form.message_placeholder')} />
              </S.MessageWrapper>

              <Button variant="primary" className="icon-button">
                {t('contact_page.form.submit')} <Send size={18} />
              </Button>
            </S.ContactForm>
          </S.FormColumn>
        </S.ContactLayout>
      </S.Container>
    </S.Wrapper>
  );
};

export default ContactPage;
