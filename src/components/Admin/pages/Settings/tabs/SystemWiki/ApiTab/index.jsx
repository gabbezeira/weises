import React, { useState } from 'react';
import { Copy, Check, Server, Shield, Globe, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';
const Endpoint = ({ method, path, description, params, request, response }) => {
  const { t } = useTranslation();
  const [copiedReq, setCopiedReq] = useState(false);
  const [copiedRes, setCopiedRes] = useState(false);

  const handleCopy = (text, isReq) => {
    navigator.clipboard.writeText(text);
    if (isReq) {
      setCopiedReq(true);
      setTimeout(() => setCopiedReq(false), 2000);
    } else {
      setCopiedRes(true);
      setTimeout(() => setCopiedRes(false), 2000);
    }
  };

  return (
    <S.EndpointCard>
      <S.HeaderRow>
        <div className="left">
          <S.MethodBadge $method={method}>{method}</S.MethodBadge>
          <S.EndpointPath>{path}</S.EndpointPath>
        </div>
        <div className="desc">{description}</div>
      </S.HeaderRow>

      <S.DualPane>
        <S.PaneLeft>
          {params ? (
            <>
              <S.SectionTitle>{t('admin.settings.wiki.api.query_params', 'Query / Path Parameters')}</S.SectionTitle>
              <S.ParamTable>
                <tbody>
                  {params.map((p, i) => (
                    <tr key={i}>
                      <th>
                        {p.name}
                        {p.required && <span className="required">{t('admin.settings.wiki.api.required', 'Required')}</span>}
                      </th>
                      <td>{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </S.ParamTable>
            </>
          ) : (
            <div style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              {t('admin.settings.wiki.api.no_params', 'No parameters required for this endpoint.')}
            </div>
          )}
        </S.PaneLeft>

        <S.PaneRight>
          {request && (
            <S.CodeTerminalWrapper>
              <S.CodeTerminalHeader>
                <span>{t('admin.settings.wiki.api.req_body', 'Request Body (JSON)')}</span>
                <S.CopyButton onClick={() => handleCopy(JSON.stringify(request, null, 2), true)}>
                    {copiedReq ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
                </S.CopyButton>
              </S.CodeTerminalHeader>
              <S.CodeBlock>
                <S.Code>{JSON.stringify(request, null, 2)}</S.Code>
              </S.CodeBlock>
            </S.CodeTerminalWrapper>
          )}

          <S.CodeTerminalWrapper>
            <S.CodeTerminalHeader>
              <span>{t('admin.settings.wiki.api.res_example', 'Response Example')}</span>
                <S.CopyButton onClick={() => handleCopy(JSON.stringify(response, null, 2), false)}>
                    {copiedRes ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
                </S.CopyButton>
            </S.CodeTerminalHeader>
            <S.CodeBlock>
              <S.Code>{JSON.stringify(response, null, 2)}</S.Code>
            </S.CodeBlock>
          </S.CodeTerminalWrapper>
        </S.PaneRight>
      </S.DualPane>
    </S.EndpointCard>
  );
};

const ApiTab = () => {
  const { t } = useTranslation();
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
            privateDetails: {
              value: 50000.0,
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
              paymentMethods: [],
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
          password: 'InitialPassword123',
        },
        response: {
          success: true,
          data: {
            id: 'client_XYZ',
            name: 'Jane Smith',
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
              price: '5000',
              icon: 'Code',
              isActive: true,
            },
          ],
        },
      },
    ],
    stripe: [
      {
        method: 'POST',
        path: '/api/stripe/webhook',
        description: 'Webhook listener for Stripe events (Subscription, Invoices, PaymentIntents)',
        params: [{ name: 'Stripe-Signature', desc: 'Header signature for request validation', required: true }],
        request: {
          id: "evt_123",
          object: "event",
          type: "payment_intent.succeeded"
        },
        response: {
          success: true,
          message: "Webhook processed successfully"
        },
      },
    ],
  };

  return (
    <S.Container>
      <S.Introduction>
        <h3>
          <Terminal size={24} color="var(--color-primary)" />
          {t('admin.settings.wiki.api.title', 'System API Reference')}
        </h3>
        <p>
          {t('admin.settings.wiki.api.desc1', 'Full documentation of the REST API endpoints available in the system. Authentication is handled via Firebase Auth Tokens passed in the ')}<code>Authorization: Bearer</code>{t('admin.settings.wiki.api.desc2', ' header. Use this documentation to understand the structure of the data and extend the project effectively.')}
        </p>
        <div className="meta">
          <span>
            <Server size={16} /> Base URL: /api
          </span>
          <span>
            <Shield size={16} /> Auth: Bearer Token
          </span>
          <span>
            <Globe size={16} /> Format: JSON
          </span>
        </div>
      </S.Introduction>

      <S.EndpointGroup>
        <S.GroupTitle>{t('admin.settings.wiki.api.auth_group', 'Authentication & Users')}</S.GroupTitle>
        {endpoints.auth.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </S.EndpointGroup>

      <S.EndpointGroup>
        <S.GroupTitle>{t('admin.settings.wiki.api.projects_group', 'Creative Projects')}</S.GroupTitle>
        {endpoints.projects.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </S.EndpointGroup>

      <S.EndpointGroup>
        <S.GroupTitle>{t('admin.settings.wiki.api.clients_group', 'Clients (CRM)')}</S.GroupTitle>
        {endpoints.clients.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </S.EndpointGroup>

      <S.EndpointGroup>
        <S.GroupTitle>{t('admin.settings.wiki.api.tasks_group', 'Tasks & Management')}</S.GroupTitle>
        {endpoints.tasks.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </S.EndpointGroup>

      <S.EndpointGroup>
        <S.GroupTitle>{t('admin.settings.wiki.api.finance_group', 'Finance')}</S.GroupTitle>
        {endpoints.transactions.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </S.EndpointGroup>

      <S.EndpointGroup>
        <S.GroupTitle>{t('admin.settings.wiki.api.services_group', 'Services Catalog')}</S.GroupTitle>
        {endpoints.services.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </S.EndpointGroup>

      <S.EndpointGroup>
        <S.GroupTitle>{t('admin.settings.wiki.api.stripe_group', 'Stripe Integration')}</S.GroupTitle>
        {endpoints.stripe.map((ep, i) => (
          <Endpoint key={i} {...ep} />
        ))}
      </S.EndpointGroup>
    </S.Container>
  );
};

export default ApiTab;
