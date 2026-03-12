import { useTranslation } from 'react-i18next';
import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, Database, HardDrive, Search, Copy, Check } from 'lucide-react';
import * as S from './styles';

const highlightText = (text, highlight) => {
  if (!highlight) return text;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase()
      ? <span key={i} className="match">{part}</span>
      : part
  );
};

const TreeItem = ({ label, type, content, depth = 0, defaultOpen = false, searchTerm = '' }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || type === 'collection');
  const [copied, setCopied] = useState(false);
  const hasChildren = !!content;

  // Force open if search term matches children (simplified matching logic can be complex, just expanding all matches for now)
  React.useEffect(() => {
    if (searchTerm && label.toLowerCase().includes(searchTerm.toLowerCase())) {
      setIsOpen(true);
    }
  }, [searchTerm, label]);

  const handleCopy = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text.replace(/ \\(.+\\)/, '')); // remove description from copy
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <S.TreeNode $depth={depth}>
      <S.NodeLabelWrapper>
        <S.NodeLabel onClick={() => hasChildren && setIsOpen(!isOpen)}>
          {hasChildren ? (
            isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <span style={{ width: 14 }} />
          )}

          {type === 'collection' && <Folder size={16} color="var(--color-warning)" fill="var(--color-warning-10)" />}
          {type === 'doc' && <FileText size={16} color="var(--color-blue-400)" />}
          {type === 'bucket' && <HardDrive size={16} color="var(--color-success)" />}

          <span>{highlightText(label, searchTerm)}</span>
        </S.NodeLabel>

        <S.CopyBtn onClick={(e) => handleCopy(e, label)} title="Copy name">
          {copied ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
        </S.CopyBtn>
      </S.NodeLabelWrapper>

      {hasChildren &&
        (isOpen ? (
          Array.isArray(content) ? (
            content.map((item, i) => <TreeItem key={i} {...item} depth={depth + 1} searchTerm={searchTerm} />)
          ) : (
            <S.NodeContent $isOpen={isOpen}>
              {Object.entries(content).map(([key, rawVal]) => {
                const val = typeof rawVal === 'string' ? { type: rawVal } : rawVal;
                // Hide non-matching fields if searching, unless they match
                if (searchTerm && !key.toLowerCase().includes(searchTerm.toLowerCase()) && !val.type.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return null;
                }
                return (
                  <S.Field key={key}>
                    <span className="key">{highlightText(key, searchTerm)}:</span>
                    <span className="type">{highlightText(val.type, searchTerm)}</span>
                    {val.desc && <span className="desc">// {val.desc}</span>}
                  </S.Field>
                );
              })}
            </S.NodeContent>
          )
        ) : null)}
    </S.TreeNode>
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
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <S.Container>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <S.Section>
          <S.Header>
            <div className="title-row">
              <Database size={20} color="var(--color-warning)" />
              <h3>{t('admin.settings.wiki.firestore_schema', 'Firestore Schema')}</h3>
            </div>
            <S.SearchBar>
              <Search size={16} color="var(--color-gray-500)" />
              <input
                type="text"
                placeholder={t('admin.settings.wiki.search_schema', 'Search collections, docs, or fields...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </S.SearchBar>
          </S.Header>
          <S.TreeContainer>
            {firestoreStructure.map((item, i) => (
              <TreeItem key={i} {...item} searchTerm={searchTerm} />
            ))}
          </S.TreeContainer>
        </S.Section>

        <S.Section>
          <S.Header>
            <div className="title-row">
              <HardDrive size={20} color="var(--color-success)" />
              <h3>{t('admin.settings.wiki.storage_buckets', 'Storage Buckets')}</h3>
            </div>
          </S.Header>
          <S.TreeContainer style={{ maxHeight: '200px' }}>
            {storageStructure.map((item, i) => (
              <TreeItem key={i} {...item} searchTerm={searchTerm} />
            ))}
          </S.TreeContainer>
        </S.Section>
      </div>

      <S.DidacticSection>
        <S.DidacticTitle>
          <FileText size={20} color="var(--color-primary)" />
          {t('admin.settings.wiki.how_db_works', 'How the Database Works')}
        </S.DidacticTitle>
        <S.DidacticText>
          <p>
            {t('admin.settings.wiki.schema_desc', 'This database (Firestore) works like a giant filing cabinet. Each main "Folder" is called a Collection, and inside it are "Files" called Documents.')}
          </p>

          <h4 style={{ color: 'var(--color-white)', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            {t('admin.settings.wiki.key_collections', 'Key Collections')}
          </h4>
          <ul>
            <li>
              <strong>users & clients:</strong> {t('admin.settings.wiki.users_desc', "Access profiles and CRM. We check the user 'role' here to see if they are an Admin or a Client.")}
            </li>
            <li>
              <strong>projects:</strong> {t('admin.settings.wiki.projects_desc', "The central hub. Data specific to a project (like passwords or stages) lives inside it as Sub-collections.")}
            </li>
            <li>
              <strong>tasks:</strong> {t('admin.settings.wiki.tasks_desc', "The Kanban board. Standalone documents that contain a 'projectId' reference linking them together.")}
            </li>
            <li>
              <strong>transactions:</strong> {t('admin.settings.wiki.transactions_desc', "Your cash flow. Core financial records that can be linked to projects or clients.")}
            </li>
          </ul>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '8px', borderLeft: '3px solid var(--color-blue-400)' }}>
            <p style={{ margin: 0, color: 'var(--color-blue-400)' }}>
              <strong>{t('admin.settings.wiki.dev_tip', 'Tip for Devs:')}</strong> {t('admin.settings.wiki.dev_tip_desc', 'Firebase queries act on the collection level. Always build indexes in the Firebase Console if filtering by multiple fields simultaneously.')}
            </p>
          </div>
        </S.DidacticText>
      </S.DidacticSection>
    </S.Container>
  );
};

export default DatabaseTab;
