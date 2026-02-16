import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown, ChevronRight, Copy, Check, Server, Shield, Globe } from 'lucide-react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

const Introduction = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    margin-bottom: 1rem;

    h3 {
        color: var(--color-white);
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
    }

    p {
        color: var(--color-gray-400);
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    .meta {
        display: flex;
        gap: 1.5rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.875rem;
        flex-wrap: wrap;

        span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--color-primary);
            background: var(--color-primary-10);
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
        }
    }
`;

const EndpointGroup = styled.div`
    margin-bottom: 2rem;
`;

const GroupTitle = styled.h4`
    font-size: 1rem;
    color: var(--color-gray-300);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-left: 0.5rem;
    border-left: 3px solid var(--color-primary);
`;

const EndpointCard = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: 1rem;
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--color-gray-600);
    }
`;

const CardHeader = styled.div`
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: ${(props) => (props.$isOpen ? 'var(--color-surface-hover)' : 'transparent')};
    transition: background 0.2s;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 768px) {
        padding: 1rem;
        flex-direction: column;
        align-items: flex-start;
    }

    &:hover {
        background: var(--color-surface-hover);
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
    }
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
    }
`;

const MethodBadge = styled.span`
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    min-width: 70px;
    text-align: center;
    
    ${(props) => {
      switch (props.$method) {
        case 'GET':
          return 'background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2);';
        case 'POST':
          return 'background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2);';
        case 'PUT':
          return 'background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2);';
        case 'DELETE':
          return 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2);';
        case 'PATCH':
          return 'background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.2);';
        default:
          return 'background: var(--color-gray-700); color: var(--color-gray-300);';
      }
    }}
`;

const EndpointPath = styled.code`
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    color: var(--color-white);
    
    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

const CardContent = styled.div`
    padding: 1.5rem;
    border-top: 1px solid var(--color-border);
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const SectionTitle = styled.h4`
    font-size: 0.75rem;
    color: var(--color-gray-400);
    margin-bottom: 0.75rem;
    margin-top: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &:first-child { margin-top: 0; }
`;

const CodeBlock = styled.div`
    background: #1e1e24;
    padding: 1rem;
    border-radius: var(--radius-md);
    position: relative;
    border: 1px solid var(--color-border);
    overflow: hidden;
`;

const Code = styled.pre`
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #e2e8f0;
    overflow-x: auto;
    margin: 0;
    line-height: 1.5;

    &::-webkit-scrollbar {
        height: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--color-gray-600);
        border-radius: 3px;
    }
`;

const CopyButton = styled.button`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(255,255,255,0.1);
    border: none;
    border-radius: 4px;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--color-gray-400);
    transition: all 0.2s;

    &:hover {
        background: rgba(255,255,255,0.2);
        color: white;
    }
`;

const ParamTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    
    th, td {
        text-align: left;
        padding: 0.75rem;
        border-bottom: 1px solid var(--color-border);
    }

    th {
        color: var(--color-gray-400);
        font-weight: 500;
        text-transform: uppercase;
        font-size: 0.75rem;
        width: 30%;
    }

    td {
        color: var(--color-gray-300);
    }
    
    code {
        color: var(--color-primary);
        background: var(--color-primary-10);
        padding: 0.1rem 0.3rem;
        border-radius: 3px;
        font-family: 'Fira Code', monospace;
        font-size: 0.8rem;
    }
`;

const Endpoint = ({ method, path, description, params, request, response }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <EndpointCard>
      <CardHeader onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <HeaderLeft>
          <MethodBadge $method={method}>{method}</MethodBadge>
          <EndpointPath>{path}</EndpointPath>
        </HeaderLeft>
        <HeaderRight>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
            {description}
          </span>
          {isOpen ? (
            <ChevronDown size={18} color="var(--color-gray-400)" />
          ) : (
            <ChevronRight size={18} color="var(--color-gray-400)" />
          )}
        </HeaderRight>
      </CardHeader>
      <CardContent $isOpen={isOpen}>
        {params && (
          <>
            <SectionTitle>URL Parameters</SectionTitle>
            <ParamTable>
              <tbody>
                {params.map((p, i) => (
                  <tr key={i}>
                    <th>
                      {p.name}{' '}
                      {p.required && <span style={{ color: 'var(--color-red-400)' }}>*</span>}
                    </th>
                    <td>{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </ParamTable>
          </>
        )}

        {request && (
          <>
            <SectionTitle>Request Body</SectionTitle>
            <CodeBlock>
              <Code>{JSON.stringify(request, null, 2)}</Code>
              <CopyButton onClick={() => handleCopy(JSON.stringify(request, null, 2))}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </CopyButton>
            </CodeBlock>
          </>
        )}

        <SectionTitle>Response Example</SectionTitle>
        <CodeBlock>
          <Code>{JSON.stringify(response, null, 2)}</Code>
          <CopyButton onClick={() => handleCopy(JSON.stringify(response, null, 2))}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </CopyButton>
        </CodeBlock>
      </CardContent>
    </EndpointCard>
  );
};

const ApiTab = () => {
  const endpoints = {
    auth: [
      {
        method: 'GET',
        path: '/api/auth/me',
        description: 'Get current user profile',
        response: {
          success: true,
          data: {
            uid: 'user_abc123',
            email: 'admin@example.com',
            displayName: 'Admin User',
            role: 'admin',
            photoURL: 'https://...',
            createdAt: '2024-02-16T12:00:00Z',
          },
        },
      },
      {
        method: 'POST',
        path: '/api/auth/register',
        description: 'Register a new admin (Admin only)',
        request: {
          email: 'newadmin@example.com',
          password: 'SecurePassword123!',
          displayName: 'New Admin',
        },
        response: {
          success: true,
          data: {
            uid: 'user_def456',
            email: 'newadmin@example.com',
            role: 'admin',
            createdAt: '2024-02-16T12:05:00Z',
          },
        },
      },
    ],
    projects: [
      {
        method: 'GET',
        path: '/api/projects',
        description: 'List all projects',
        response: {
          success: true,
          data: [
            {
              id: 'proj_123',
              title: 'Neon Banking App',
              description: 'A fintech mobile application redesign.',
              status: 'In Progress',
              clientId: 'client_789',
              category: 'Mobile App',
              deadline: '2024-12-31',
              image: 'https://storage...',
              createdAt: '2024-01-15T10:00:00Z',
              updatedAt: '2024-01-20T15:30:00Z',
              // Full details fields
              challenge: 'Legacy system integration...',
              solution: 'Microservices architecture...',
              methodology: 'Agile/Scrum',
              teamSize: 6,
              platform: 'iOS/Android',
              year: '2024',
              duration: '6 Months',
              liveLink: 'https://neon.app',
              services: ['UI/UX Design', 'Mobile Dev'],
              stack: ['React Native', 'Node.js', 'Firebase'],
              gallery: ['url1', 'url2'],
            },
          ],
        },
      },
      {
        method: 'GET',
        path: '/api/projects/:id',
        description: 'Get single project details',
        params: [{ name: 'id', desc: 'Project ID', required: true }],
        response: {
          success: true,
          data: {
            id: 'proj_123',
            title: 'Neon Banking App',
            status: 'In Progress',
            // ... all other fields
            privateDetails: {
              value: 50000.0, // Decrypted for admin
            },
          },
        },
      },
      {
        method: 'GET',
        path: '/api/projects/:id/credentials',
        description: 'Get project credentials (decrypted)',
        params: [{ name: 'id', desc: 'Project ID', required: true }],
        response: {
          success: true,
          data: [
            {
              id: 'cred_001',
              name: 'Vercel Deployment',
              url: 'https://vercel.com/...',
              username: 'deploy_bot',
              password: 'decrypted_password_123',
            },
          ],
        },
      },
    ],
    clients: [
      {
        method: 'GET',
        path: '/api/clients',
        description: 'List all clients',
        response: {
          success: true,
          data: [
            {
              id: 'client_ABC',
              name: 'John Doe',
              company: 'Acme Corp',
              email: 'john@acme.com',
              status: 'Active',
              clientPanelAccess: true,
              avatar: 'https://ui-avatars...',
              paymentMethods: [], // subcollection summary often omitted in list
            },
          ],
        },
      },
      {
        method: 'POST',
        path: '/api/clients',
        description: 'Create a new client',
        request: {
          name: 'Jane Smith',
          company: 'Tech Start',
          email: 'jane@tech.com',
          clientPanelAccess: true,
          password: 'InitialPassword123', // Optional, for initial access
        },
        response: {
          success: true,
          data: {
            id: 'client_XYZ',
            name: 'Jane Smith',
            // ...
            userId: 'user_auth_uid_if_created',
          },
        },
      },
    ],
    tasks: [
      {
        method: 'GET',
        path: '/api/tasks',
        description: 'List all Kanban tasks',
        response: {
          success: true,
          data: [
            {
              id: 'task_1',
              title: 'Design Login Flow',
              description: 'Create wireframes...',
              status: 'in-progress',
              priority: 'high',
              projectId: 'proj_123',
              assignee: 'Designer Name',
              dueDate: '2024-02-20',
            },
          ],
        },
      },
    ],
    transactions: [
      {
        method: 'GET',
        path: '/api/transactions',
        description: 'List financial transactions',
        response: {
          success: true,
          data: [
            {
              id: 'tx_999',
              type: 'income',
              amount: 15000.0,
              category: 'Project Milestone',
              description: 'Payment for Phase 1',
              date: '2024-02-15',
              status: 'paid',
              projectId: 'proj_123',
              clientId: 'client_ABC',
              isRecurring: false,
            },
          ],
        },
      },
    ],
    services: [
      {
        method: 'GET',
        path: '/api/services',
        description: 'Get service catalog',
        response: {
          success: true,
          data: [
            {
              id: 'svc_1',
              name: 'Web Development',
              description: 'Full stack dev...',
              price: 5000,
              icon: 'Code',
              isActive: true,
            },
          ],
        },
      },
    ],
  };

  return (
    <Container>
      <Introduction>
        <h3>System API Reference</h3>
        <p>
          Full documentation of the REST API endpoints available in the system. Authentication is
          handled via Firebase Auth Tokens passed in the <code>Authorization: Bearer</code> header.
        </p>
        <div className="meta">
          <span>
            <Server size={14} /> Base URL: /api
          </span>
          <span>
            <Shield size={14} /> Auth: Bearer Token
          </span>
          <span>
            <Globe size={14} /> Format: JSON
          </span>
        </div>
      </Introduction>

      <EndpointGroup>
        <GroupTitle>Authentication & Users</GroupTitle>
        {endpoints.auth.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </EndpointGroup>

      <EndpointGroup>
        <GroupTitle>Creative Projects</GroupTitle>
        {endpoints.projects.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </EndpointGroup>

      <EndpointGroup>
        <GroupTitle>Clients (CRM)</GroupTitle>
        {endpoints.clients.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </EndpointGroup>

      <EndpointGroup>
        <GroupTitle>Tasks & Management</GroupTitle>
        {endpoints.tasks.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </EndpointGroup>

      <EndpointGroup>
        <GroupTitle>Finance</GroupTitle>
        {endpoints.transactions.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </EndpointGroup>

      <EndpointGroup>
        <GroupTitle>Services Catalog</GroupTitle>
        {endpoints.services.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </EndpointGroup>
    </Container>
  );
};

export default ApiTab;
