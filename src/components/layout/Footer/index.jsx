import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '@assets/images/logo.svg';
import * as S from './styles';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <S.FooterWrapper>
      <S.SeparatorTop />

      <S.BackgroundGlow />
      <S.SeparatorBottom />

      <S.Container>
        <S.ContentWrapper>
          <S.BrandColumn>
            <S.LogoLink href="#">
              <S.LogoImage src={logo} alt="Weises Logo" />
            </S.LogoLink>
            <S.CompanyDesc>{t('footer.company_desc')}</S.CompanyDesc>
          </S.BrandColumn>

          <S.LinksColumns>
            <div>
              <S.ColumnTitle>{t('footer.explore')}</S.ColumnTitle>
              <S.LinkList>
                <li>
                  <S.FooterLink href="/">{t('navbar.home')}</S.FooterLink>
                </li>
                <li>
                  <S.FooterLink href="/about">{t('navbar.about')}</S.FooterLink>
                </li>
                <li>
                  <S.FooterLink href="/projects">{t('navbar.projects')}</S.FooterLink>
                </li>
                <li>
                  <S.FooterLink href="/contact">{t('navbar.contact')}</S.FooterLink>
                </li>
              </S.LinkList>
            </div>
            <div>
              <S.ColumnTitle>{t('footer.capabilities')}</S.ColumnTitle>
              <S.LinkList>
                <li>
                  <S.GroupLink href="/#skills">
                    <S.GroupSpan>{t('navbar.skills')}</S.GroupSpan>
                  </S.GroupLink>
                </li>
                <li>
                  <S.FooterLink href="/#tech-stack">{t('navbar.tech')}</S.FooterLink>
                </li>
              </S.LinkList>
            </div>
            <div>
              <S.ColumnTitle>{t('footer.insights')}</S.ColumnTitle>
              <S.LinkList>
                <li>
                  <S.GroupLink href="/#inspiration">
                    <S.GroupSpan>{t('navbar.inspiration')}</S.GroupSpan>
                  </S.GroupLink>
                </li>
                <li>
                  <S.GroupLink href="/#ready">
                    <S.GroupSpan>{t('navbar.ready')}</S.GroupSpan>
                  </S.GroupLink>
                </li>
              </S.LinkList>
            </div>
          </S.LinksColumns>
        </S.ContentWrapper>

        <S.FooterBottom>
          <S.Copyright>
            &copy; {new Date().getFullYear()} WEISES COMPANY. {t('footer.rights')}
          </S.Copyright>

          <S.SocialIcons>
            <S.SocialIcon>
              <Globe size={20} />
            </S.SocialIcon>
          </S.SocialIcons>
        </S.FooterBottom>
      </S.Container>
    </S.FooterWrapper>
  );
};

export default Footer;
