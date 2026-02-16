import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './styles';
import LanguageSelector from '../../../common/LanguageSelector';

import { useAdmin } from '../../../../context/AdminContext';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { searchTerm, setSearchTerm } = useAdmin();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return t('admin.sidebar.dashboard');
    if (path.includes('/clients')) return t('admin.clients.title');
    if (path.includes('/projects')) return t('admin.projects.title');
    return 'Admin Panel';
  };

  const getSearchPlaceholder = () => {
    const title = getPageTitle();
    if (title === t('admin.clients.title')) return t('admin.clients.search_placeholder');
    // if (title === t('admin.projects.title')) return t('admin.projects.search_placeholder');
    return t('admin.clients.search_placeholder').replace('clients', '...'); // Fallback
  };

  return (
    <S.HeaderContainer>
      <S.LeftSection>
        <S.MenuButton onClick={toggleSidebar}>
          <Menu size={24} />
        </S.MenuButton>
        <S.PageTitle>{getPageTitle()}</S.PageTitle>
      </S.LeftSection>

      <S.RightSection>
        <S.SearchWrapper>
          <S.SearchIconWrapper>
            <Search size={20} />
          </S.SearchIconWrapper>
          <S.SearchInput
            placeholder={getSearchPlaceholder()}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchWrapper>

        <LanguageSelector />

        <S.ActionButton title={t('admin.header.profile')}>
          <Bell size={20} />
        </S.ActionButton>
      </S.RightSection>
    </S.HeaderContainer>
  );
};

export default Header;
