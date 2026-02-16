import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Users, BookOpen } from 'lucide-react';
import AdminUsers from './tabs/AdminUsers';
import SystemWiki from './tabs/SystemWiki';

const Container = styled.div`
    padding: 2rem;
`;

const Header = styled.div`
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: 0.5rem;
`;

const TabsContainer = styled.div`
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 2rem;
`;

const Tab = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: none;
    border: none;
    border-bottom: 2px solid ${(props) => (props.$active ? 'var(--color-primary)' : 'transparent')};
    color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-gray-500)')};
    font-weight: ${(props) => (props.$active ? '600' : '400')};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-white)')};
    }
`;

const Settings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <Container>
      <Header>
        <Title>{t('admin.sidebar.settings')}</Title>
      </Header>

      <TabsContainer>
        <Tab $active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
          <Users size={18} />
          Admin Users
        </Tab>
        <Tab $active={activeTab === 'wiki'} onClick={() => setActiveTab('wiki')}>
          <BookOpen size={18} />
          System Wiki
        </Tab>
      </TabsContainer>

      {activeTab === 'users' && <AdminUsers />}
      {activeTab === 'wiki' && <SystemWiki />}
    </Container>
  );
};

export default Settings;
