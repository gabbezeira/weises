import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  LogOut,
  X,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../context/AuthContext';
import * as S from './styles';

import logo from '../../../../assets/images/logo.svg';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const navItems = [
    { icon: LayoutDashboard, label: t('admin.sidebar.dashboard'), path: '/admin' },
    { icon: Users, label: t('admin.sidebar.clients'), path: '/admin/clients' },
    { icon: FolderKanban, label: t('admin.sidebar.projects'), path: '/admin/projects' },
    { icon: Zap, label: t('admin.sidebar.services'), path: '/admin/services' },
    { icon: TrendingUp, label: t('admin.sidebar.financial'), path: '/admin/financial' },
    { icon: Settings, label: t('admin.sidebar.settings'), path: '/admin/settings' },
  ];

  const getDisplayName = () => {
    if (profile?.displayName) return profile.displayName;
    if (user?.displayName) return user.displayName;
    return 'Admin User';
  };

  const getPhotoURL = () => {
    if (profile?.photoURL) return profile.photoURL;
    if (user?.photoURL) return user.photoURL;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=random`;
  };

  return (
    <S.SidebarContainer $isOpen={isOpen}>
      <S.SidebarHeader>
        <S.Logo src={logo} alt="Admin Panel" />
        <S.CloseButton onClick={toggleSidebar}>
          <X size={24} />
        </S.CloseButton>
      </S.SidebarHeader>

      <S.Nav>
        {navItems.map((item) => (
          <S.NavItem
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            onClick={toggleSidebar}
          >
            <item.icon size={20} />
            <S.Label>{item.label}</S.Label>
          </S.NavItem>
        ))}
      </S.Nav>

      <S.Footer>
        <S.UserProfile>
          <S.UserAvatar src={getPhotoURL()} alt={getDisplayName()} />
          <S.UserInfo>
            <S.UserName>{getDisplayName()}</S.UserName>
            <S.UserRole>{profile?.role === 'admin' ? 'Administrator' : 'User'}</S.UserRole>
          </S.UserInfo>
        </S.UserProfile>
        <S.LogoutButton onClick={handleLogout} title={t('admin.header.logout')}>
          <LogOut size={20} />
        </S.LogoutButton>
      </S.Footer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
