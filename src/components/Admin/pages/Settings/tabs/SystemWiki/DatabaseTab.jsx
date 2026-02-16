import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronRight, ChevronDown, Folder, FileText, Database, HardDrive } from 'lucide-react';

const Container = styled.div`
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 0.5rem;
    }
`;

const Section = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--color-surface-hover);

    h3 {
        font-size: 1rem;
        color: var(--color-white);
    }

    @media (max-width: 768px) {
        padding: 0.75rem 1rem;
    }
`;

const TreeContainer = styled.div`
    padding: 1rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.875rem;
    overflow-x: auto; /* Allow horizontal scrolling on mobile */
    
    /* Custom Scrollbar for Tree */
    &::-webkit-scrollbar {
        height: 6px;
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: var(--color-background);
    }
    &::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: 3px;
    }

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.75rem; /* Smaller font on mobile */
    }
`;

const TreeNode = styled.div`
    margin-left: ${(props) => props.$depth * 1.5}rem;

    @media (max-width: 768px) {
        margin-left: ${(props) => props.$depth * 0.75}rem; /* Reduced indentation on mobile */
    }
`;

const NodeLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    border-radius: 4px;
    color: var(--color-gray-300);
    transition: all 0.2s;
    white-space: nowrap; /* Prevent wrapping of labels */

    &:hover {
        background: var(--color-primary-10);
        color: var(--color-white);
    }

    svg {
        min-width: 16px;
    }
`;

const NodeContent = styled.div`
    margin-left: 1.5rem;
    padding: 0.5rem;
    border-left: 1px solid var(--color-border);
    margin-bottom: 0.5rem;
    color: var(--color-gray-400);
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};

    @media (max-width: 768px) {
        margin-left: 0.75rem;
        padding-left: 0.5rem;
    }
`;

const Field = styled.div`
    margin-bottom: 0.25rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap; /* Allow wrapping on very small screens */

    span.key { color: var(--color-primary); white-space: nowrap; }
    span.type { color: var(--color-gray-500); font-style: italic; white-space: nowrap; }
    span.desc { 
        color: var(--color-gray-600); 
        margin-left: auto; 
        @media (max-width: 768px) {
            margin-left: 0;
            width: 100%;
            font-size: 0.7rem;
        }
    }
`;

const DidacticSection = styled.div`
    margin-top: 3rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;

    @media (max-width: 768px) {
        margin-top: 1.5rem;
        padding: 1rem;
    }
`;

const DidacticTitle = styled.h3`
    font-size: 1.25rem;
    color: var(--color-white);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const DidacticText = styled.div`
    color: var(--color-gray-400);
    line-height: 1.6;
    font-size: 0.95rem;

    p { margin-bottom: 1rem; }
    ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
    li { margin-bottom: 0.5rem; }
    strong { color: var(--color-white); }

    @media (max-width: 768px) {
        font-size: 0.85rem;
        ul { padding-left: 1rem; }
    }
`;

const TreeItem = ({ label, type, content, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(type === 'collection');
  const hasChildren = !!content;

  return (
    <TreeNode $depth={depth}>
      <NodeLabel onClick={() => hasChildren && setIsOpen(!isOpen)}>
        {hasChildren ? (
          isOpen ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronRight size={14} />
          )
        ) : (
          <span style={{ width: 14 }} />
        )}

        {type === 'collection' && <Folder size={16} color="#f59e0b" fill="#f59e0b30" />}
        {type === 'doc' && <FileText size={16} color="#3b82f6" />}
        {type === 'bucket' && <HardDrive size={16} color="#10b981" />}

        <span>{label}</span>
      </NodeLabel>

      {hasChildren &&
        (isOpen ? (
          Array.isArray(content) ? (
            content.map((item, i) => <TreeItem key={i} {...item} depth={depth + 1} />)
          ) : (
            <NodeContent $isOpen={isOpen}>
              {Object.entries(content).map(([key, rawVal]) => {
                const val = typeof rawVal === 'string' ? { type: rawVal } : rawVal;
                return (
                  <Field key={key}>
                    <span className="key">{key}:</span>
                    <span className="type">{val.type}</span>
                    {val.desc && <span className="desc">// {val.desc}</span>}
                  </Field>
                );
              })}
            </NodeContent>
          )
        ) : null)}
    </TreeNode>
  );
};

const firestoreStructure = [
  {
    label: 'users (Access Profiles)',
    type: 'collection',
    content: [
      {
        label: '{uid}',
        type: 'doc',
        content: {
          role: { type: "'admin' | 'client'" },
          email: { type: 'string' },
          displayName: { type: 'string' },
          photoURL: { type: 'string' },
          clientId: { type: 'reference', desc: 'Link to clients/{id} (Optional)' },
          createdAt: { type: 'timestamp' },
          updatedAt: { type: 'timestamp' },
        },
      },
    ],
  },
  {
    label: 'clients',
    type: 'collection',
    content: [
      {
        label: '{clientId}',
        type: 'doc',
        content: {
          name: 'string',
          company: 'string',
          email: 'string',
          phone: 'string',
          status: "'Active' | 'Inactive'",
          businessSector: 'string',
          hasMonthlyPlan: 'boolean',
          monthlyValue: 'number',
          clientPanelAccess: 'boolean',
          contractStart: 'timestamp',
          leadSource: 'string',
          avatar: 'string',
          createdAt: 'timestamp',
          updatedAt: 'timestamp',
        },
      },
      {
        label: 'payment_methods (sub-col)',
        type: 'collection',
        content: [
          {
            label: '{methodId}',
            type: 'doc',
            content: {
              brand: 'string',
              lastFour: 'string',
              holderName: 'string',
              expiry: 'string',
              isDefault: 'boolean',
              createdAt: 'timestamp',
            },
          },
        ],
      },
    ],
  },
  {
    label: 'projects',
    type: 'collection',
    content: [
      {
        label: '{projectId}',
        type: 'doc',
        content: {
          title: 'string',
          description: 'string',
          challenge: 'string',
          solution: 'string',
          status: "'Planning' | 'In Progress' | 'Completed' | 'On Hold'",
          category: 'string',
          clientId: 'reference',
          deadline: 'timestamp',
          estimatedCompletion: 'string',
          methodology: 'string',
          teamSize: 'number',
          platform: 'string',
          year: 'string',
          duration: 'string',
          liveLink: 'string',
          services: { type: 'array<string>', desc: 'List of services provided' },
          stack: { type: 'array<string>', desc: 'Tech stack used' },
          gallery: { type: 'array<string>', desc: 'URLs of additional images' },
          image: { type: 'string', desc: 'Cover Image URL' },
          createdAt: 'timestamp',
          updatedAt: 'timestamp',
          privateDetails: { type: 'object', desc: 'Encrypted value' },
        },
      },
      {
        label: 'credentials',
        type: 'collection',
        content: [
          {
            label: '{credId}',
            type: 'doc',
            content: {
              name: { type: 'string', desc: 'Service Name' },
              url: 'string',
              username: 'string',
              password: { type: 'encrypted', desc: 'AES-256' },
            },
          },
        ],
      },
      {
        label: 'stages',
        type: 'collection',
        content: [
          {
            label: '{stageId}',
            type: 'doc',
            content: {
              name: 'string',
              order: 'number',
              date: 'timestamp',
              completed: 'boolean',
            },
          },
        ],
      },
      {
        label: 'invoices',
        type: 'collection',
        content: [
          {
            label: '{invId}',
            type: 'doc',
            content: {
              amount: 'number',
              description: 'string',
              date: 'timestamp',
              dueDate: 'timestamp',
              status: "'paid' | 'pending'",
              pdfUrl: 'string',
            },
          },
        ],
      },
      {
        label: 'contracts',
        type: 'collection',
        content: [
          {
            label: '{contractId}',
            type: 'doc',
            content: {
              title: 'string',
              description: 'string',
              fileUrl: 'string',
              status: "'draft' | 'signed'",
              signedDate: 'timestamp',
            },
          },
        ],
      },
    ],
  },
  {
    label: 'tasks',
    type: 'collection',
    content: [
      {
        label: '{taskId}',
        type: 'doc',
        content: {
          title: 'string',
          description: 'string',
          projectId: 'reference',
          status: "'todo' | 'in-progress' | 'review' | 'done'",
          priority: "'low' | 'medium' | 'high'",
          assignee: 'string',
          dueDate: 'timestamp',
          createdAt: 'timestamp',
          updatedAt: 'timestamp',
        },
      },
    ],
  },
  {
    label: 'transactions',
    type: 'collection',
    content: [
      {
        label: '{txId}',
        type: 'doc',
        content: {
          type: "'income'|'expense'",
          amount: 'number',
          category: 'string',
          description: 'string',
          date: 'timestamp',
          status: "'paid' | 'pending'",
          projectId: { type: 'reference', desc: 'Optional' },
          clientId: { type: 'reference', desc: 'Optional' },
          isRecurring: 'boolean',
          createdAt: 'timestamp',
          updatedAt: 'timestamp',
        },
      },
    ],
  },
  {
    label: 'services (Catalog)',
    type: 'collection',
    content: [
      {
        label: '{serviceId}',
        type: 'doc',
        content: {
          name: 'string',
          description: 'string',
          price: 'number',
          isActive: 'boolean',
          icon: 'string',
          order: 'number',
          createdAt: 'timestamp',
          updatedAt: 'timestamp',
        },
      },
    ],
  },
  {
    label: 'service_requests',
    type: 'collection',
    content: [
      {
        label: '{requestId}',
        type: 'doc',
        content: {
          serviceId: 'reference',
          clientId: 'reference',
          status: "'pending' | 'approved' | 'completed'",
          notes: 'string',
          requestedAt: 'timestamp',
          updatedAt: 'timestamp',
        },
      },
    ],
  },
];

const storageStructure = [
  {
    label: 'projects',
    type: 'bucket',
    content: [
      {
        label: 'covers',
        type: 'bucket',
        content: [{ label: 'timestamp_name.jpg', type: 'doc', content: {} }],
      },
      {
        label: 'gallery',
        type: 'bucket',
        content: [{ label: 'timestamp_name.jpg', type: 'doc', content: {} }],
      },
    ],
  },
  {
    label: 'users',
    type: 'bucket',
    content: [
      {
        label: 'photos',
        type: 'bucket',
        content: [{ label: 'timestamp_name.jpg', type: 'doc', content: {} }],
      },
    ],
  },
];

const DatabaseTab = () => {
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Section>
          <Header>
            <Database size={20} color="#f59e0b" />
            <h3>Firestore (NoSQL Schema)</h3>
          </Header>
          <TreeContainer>
            {firestoreStructure.map((item, i) => (
              <TreeItem key={i} {...item} />
            ))}
          </TreeContainer>
        </Section>

        <DidacticSection>
          <DidacticTitle>
            <FileText size={20} color="var(--color-primary)" />
            How the Database Works
          </DidacticTitle>
          <DidacticText>
            <p>
              This database (Firestore) works like a giant <strong>filing cabinet</strong>. Each
              main "Folder" is called a <strong>Collection</strong>, and inside it are "Files"
              called <strong>Documents</strong>.
            </p>

            <strong>Key Collections:</strong>
            <ul>
              <li>
                <strong>users:</strong> Access profiles. When someone logs in, the system checks
                here to see if they are an Admin or a Client.
              </li>
              <li>
                <strong>clients:</strong> Your CRM. Contains company details, contacts, and status.
              </li>
              <li>
                <strong>projects:</strong> The central hub. Contains everything about creative work.
                Data specific to a project (like passwords or stages) lives inside it as{' '}
                <em>Sub-collections</em>.
              </li>
              <li>
                <strong>tasks:</strong> The Kanban board. Each task "points" to a project ID,
                linking them together.
              </li>
              <li>
                <strong>transactions:</strong> Your cash flow. Records income and expenses. Can be
                linked to projects or clients.
              </li>
            </ul>
          </DidacticText>
        </DidacticSection>
      </div>

      <Section style={{ height: 'fit-content' }}>
        <Header>
          <HardDrive size={20} color="#10b981" />
          <h3>Storage Buckets</h3>
        </Header>
        <TreeContainer>
          {storageStructure.map((item, i) => (
            <TreeItem key={i} {...item} />
          ))}
        </TreeContainer>
      </Section>
    </Container>
  );
};

export default DatabaseTab;
