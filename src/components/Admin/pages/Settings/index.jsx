import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, BookOpen } from 'lucide-react';
import AdminUsers from './tabs/AdminUsers';
import SystemWiki from './tabs/SystemWiki';

import * as S from './styles';

const Settings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <S.Container>
      <S.Header>
        <S.Title>{t('admin.sidebar.settings')}</S.Title>
      </S.Header>

      <S.TabsContainer>
        <S.Tab $active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
          <Users size={18} />
          Admin Users
        </S.Tab>
        <S.Tab $active={activeTab === 'wiki'} onClick={() => setActiveTab('wiki')}>
          <BookOpen size={18} />
          System Wiki
        </S.Tab>
      </S.TabsContainer>

      {activeTab === 'users' && <AdminUsers />}
      {activeTab === 'wiki' && <SystemWiki />}
    </S.Container>
  );
};

export default Settings;
