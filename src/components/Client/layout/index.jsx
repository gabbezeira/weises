import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import * as S from './styles';
import { useClient } from '../../../context/ClientContext';
import { useAuth } from '../../../context/AuthContext';
import { LogOut, Plus, Menu, X } from 'lucide-react';
import Loader from '@ui/Loader';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../common/LanguageSelector';
import { useNavigate } from 'react-router-dom';

import Logo from '../../../assets/images/logo.svg';

const ClientLayout = () => {
  const { currentClient, isLoading } = useClient();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  if (isLoading) {
    return (
      <S.LoaderContainer>
        <Loader />
      </S.LoaderContainer>
    );
  }

  if (!currentClient) {
    return (
      <S.LayoutContainer>
        <S.LoaderContainer>
          <S.NotFoundContent>
            <h3>{t('client.layout.not_found.title')}</h3>
            <p>{t('client.layout.not_found.message')}</p>
          </S.NotFoundContent>
        </S.LoaderContainer>
      </S.LayoutContainer>
    );
  }

  return (
    <S.LayoutContainer>
      <S.Header>
        <S.LogoGroup>
          <img src={Logo} alt="Weises Logo" />
        </S.LogoGroup>

        <S.NavLinks>
          <NavLink to="/client" end className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('client.layout.nav.overview')}
          </NavLink>
          <NavLink to="/client/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('client.layout.nav.projects')}
          </NavLink>
          <NavLink to="/client/services" className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('client.layout.nav.services')}
          </NavLink>
          <NavLink to="/client/billing" className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('client.layout.nav.billing')}
          </NavLink>
        </S.NavLinks>

        <S.HeaderActions>
          <LanguageSelector />
          <S.RequestButton to="/client/services">
            <Plus size={16} /> {t('client.layout.request_service')}
          </S.RequestButton>

          <S.UserMenu>
            <div className="info">
              <strong>{currentClient?.name}</strong>
              <span>{currentClient?.company}</span>
            </div>
            <img src={currentClient?.avatar} alt={currentClient?.name} className="avatar" />
            <S.LogoutButton onClick={handleLogout} title={t('common.logout')}>
              <LogOut size={20} />
            </S.LogoutButton>
          </S.UserMenu>
        </S.HeaderActions>

        <S.MenuButton onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </S.MenuButton>
      </S.Header>

      {isMobileMenuOpen && <S.MobileOverlay onClick={closeMobileMenu} />}

      <S.MobileMenu $isOpen={isMobileMenuOpen}>
        <S.MobileMenuHeader>
          <S.CloseButton onClick={closeMobileMenu}>
            <X size={24} />
          </S.CloseButton>
        </S.MobileMenuHeader>

        <S.MobileUserInfo>
          <img src={currentClient?.avatar} alt={currentClient?.name} className="avatar" />
          <div className="info">
            <strong>{currentClient?.name}</strong>
            <span>{currentClient?.company}</span>
          </div>
        </S.MobileUserInfo>

        <S.MobileNavLinks>
          <NavLink
            to="/client"
            end
            onClick={closeMobileMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {t('client.layout.nav.overview')}
          </NavLink>
          <NavLink
            to="/client/projects"
            onClick={closeMobileMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {t('client.layout.nav.projects')}
          </NavLink>
          <NavLink
            to="/client/services"
            onClick={closeMobileMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {t('client.layout.nav.services')}
          </NavLink>
          <NavLink
            to="/client/billing"
            onClick={closeMobileMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {t('client.layout.nav.billing')}
          </NavLink>
        </S.MobileNavLinks>

        <S.MobileMenuFooter>
          <LanguageSelector />
          <S.RequestButton to="/client/services" onClick={closeMobileMenu}>
            <Plus size={16} /> {t('client.layout.request_service')}
          </S.RequestButton>
          <S.LogoutButton onClick={handleLogout} title={t('common.logout')}>
            <LogOut size={20} />
          </S.LogoutButton>
        </S.MobileMenuFooter>
      </S.MobileMenu>

      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.LayoutContainer>
  );
};

export default ClientLayout;
