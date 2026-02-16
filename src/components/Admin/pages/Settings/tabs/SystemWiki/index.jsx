import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Database, Server, Shield } from 'lucide-react';

import ArchitectureTab from './ArchitectureTab';
import DatabaseTab from './DatabaseTab';
import ApiTab from './ApiTab';
import SecurityTab from './SecurityTab';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Nav = styled.div`
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1px;
`;

const NavItem = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    border-bottom: 2px solid ${(props) => (props.$active ? 'var(--color-primary)' : 'transparent')};
    color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-gray-400)')};
    font-weight: ${(props) => (props.$active ? '600' : '500')};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-white)')};
        background: var(--color-surface-hover);
        border-radius: var(--radius-md) var(--radius-md) 0 0;
    }
`;

const Content = styled.div`
    min-height: 400px;
`;

const SystemWiki = () => {
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <Container>
      <Nav>
        <NavItem
          $active={activeTab === 'architecture'}
          onClick={() => setActiveTab('architecture')}
        >
          <Layout size={18} /> Architecture
        </NavItem>
        <NavItem $active={activeTab === 'database'} onClick={() => setActiveTab('database')}>
          <Database size={18} /> Database & Storage
        </NavItem>
        <NavItem $active={activeTab === 'api'} onClick={() => setActiveTab('api')}>
          <Server size={18} /> API Reference
        </NavItem>
        <NavItem $active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
          <Shield size={18} /> Security
        </NavItem>
      </Nav>

      <Content>
        {activeTab === 'architecture' && <ArchitectureTab />}
        {activeTab === 'database' && <DatabaseTab />}
        {activeTab === 'api' && <ApiTab />}
        {activeTab === 'security' && <SecurityTab />}
      </Content>
    </Container>
  );
};

export default SystemWiki;
