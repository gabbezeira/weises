import React from 'react';
import styled from 'styled-components';
import { Shield, Lock, Users, Eye, Edit } from 'lucide-react';

const Container = styled.div`
    padding: 1rem;
`;

const Section = styled.div`
    margin-bottom: 2rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
`;

const Header = styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    gap: 1rem;

    h3 {
        color: var(--color-white);
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    text-align: left;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-gray-400);
    font-size: 0.875rem;
    text-transform: uppercase;
    background: var(--color-surface-hover);
`;

const Td = styled.td`
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    font-size: 0.9rem;

    &:last-child {
        border-bottom: none;
    }
`;

const RoleBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    
    ${(props) =>
      props.$role === 'admin'
        ? `
        background: rgba(139, 92, 246, 0.1);
        color: #8b5cf6;
        border: 1px solid rgba(139, 92, 246, 0.2);
    `
        : `
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.2);
    `}
`;

const Permission = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${(props) => (props.$allowed ? 'var(--color-text)' : 'var(--color-gray-600)')};
    text-decoration: ${(props) => (props.$allowed ? 'none' : 'line-through')};

    svg {
        color: ${(props) => (props.$allowed ? 'var(--color-success)' : 'var(--color-gray-600)')};
    }
`;

const SecurityTab = () => {
  return (
    <Container>
      <Section>
        <Header>
          <Shield size={24} color="#ef4444" />
          <div>
            <h3>Role-Based Access Control (RBAC)</h3>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Defined in <code>firestore.rules</code> and <code>middleware/roleGuard.js</code>
            </p>
          </div>
        </Header>

        <Table>
          <thead>
            <tr>
              <Th>Resource</Th>
              <Th>
                <RoleBadge $role="admin">
                  <Lock size={12} /> Admin
                </RoleBadge>
              </Th>
              <Th>
                <RoleBadge $role="client">
                  <Users size={12} /> Client
                </RoleBadge>
              </Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>
                <strong>Users</strong>
              </Td>
              <Td>
                <Permission $allowed={true}>
                  <Edit size={14} /> Full Access (Create, Edit, Delete)
                </Permission>
              </Td>
              <Td>
                <Permission $allowed={true}>
                  <Eye size={14} /> Read Own Profile Only
                </Permission>
              </Td>
            </tr>
            <tr>
              <Td>
                <strong>Projects</strong>
              </Td>
              <Td>
                <Permission $allowed={true}>
                  <Edit size={14} /> Full Access
                </Permission>
              </Td>
              <Td>
                <Permission $allowed={true}>
                  <Eye size={14} /> Read Assigned Projects
                </Permission>
                <Permission $allowed={false}>
                  <Edit size={14} /> Cannot Edit
                </Permission>
              </Td>
            </tr>
            <tr>
              <Td>
                <strong>Private Credentials</strong>
              </Td>
              <Td>
                <Permission $allowed={true}>
                  <Eye size={14} /> Decrypt & View
                </Permission>
              </Td>
              <Td>
                <Permission $allowed={true}>
                  <Eye size={14} /> Decrypt (Own Projects Only)
                </Permission>
              </Td>
            </tr>
            <tr>
              <Td>
                <strong>Financials (Transactions)</strong>
              </Td>
              <Td>
                <Permission $allowed={true}>
                  <Edit size={14} /> Full Access
                </Permission>
              </Td>
              <Td>
                <Permission $allowed={false}>
                  <Eye size={14} /> No Access (Internal Only)
                </Permission>
              </Td>
            </tr>
            <tr>
              <Td>
                <strong>Services Catalog</strong>
              </Td>
              <Td>
                <Permission $allowed={true}>
                  <Edit size={14} /> Manage Services
                </Permission>
              </Td>
              <Td>
                <Permission $allowed={true}>
                  <Eye size={14} /> View Available Services
                </Permission>
              </Td>
            </tr>
          </tbody>
        </Table>
      </Section>
    </Container>
  );
};

export default SecurityTab;
