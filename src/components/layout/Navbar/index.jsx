import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@common/LanguageSelector';
import logo from '@assets/images/logo.svg';
import * as S from './styles';

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: t('navbar.home'), href: '/' },
    { name: t('navbar.tech'), href: '/#tech-stack' },
    { name: t('navbar.projects'), href: '/#projects' },
    { name: t('navbar.skills'), href: '/#skills' },
    { name: t('navbar.inspiration'), href: '/#inspiration' },
    { name: t('navbar.ready'), href: '/#ready' },
    { name: t('navbar.about'), href: '/about' },
  ];

  const handleNavigation = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (href.startsWith('/#')) {
      const elementId = href.replace('/#', '');
      if (location.pathname === '/') {
        const element = document.getElementById(elementId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <S.Nav $scrolled={scrolled}>
      <S.Container>
        <S.LogoLink href="/" onClick={(e) => handleNavigation(e, '/')}>
          <S.LogoImage src={logo} alt="Weises Logo" />
        </S.LogoLink>

        <S.DesktopMenu>
          {links.map((link) => (
            <S.NavLink
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavigation(e, link.href)}
            >
              {link.name}
              <S.NavLinkBar />
            </S.NavLink>
          ))}

          <S.Actions>
            <LanguageSelector />
            <S.ContactButton onClick={() => navigate('/contact')}>
              {t('navbar.contact')}
            </S.ContactButton>
          </S.Actions>
        </S.DesktopMenu>

        <S.MobileMenuToggle>
          <LanguageSelector />
          <S.ToggleButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </S.ToggleButton>
        </S.MobileMenuToggle>
      </S.Container>

      <AnimatePresence>
        {mobileMenuOpen && (
          <S.MobileMenuOverlay
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <S.MobileMenuContent>
              {links.map((link) => (
                <S.MobileNavLink
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                >
                  {link.name}
                </S.MobileNavLink>
              ))}
              <S.MobileContactButton
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/contact');
                }}
              >
                {t('navbar.contact')}
              </S.MobileContactButton>
            </S.MobileMenuContent>
          </S.MobileMenuOverlay>
        )}
      </AnimatePresence>
    </S.Nav>
  );
};

export default Navbar;
