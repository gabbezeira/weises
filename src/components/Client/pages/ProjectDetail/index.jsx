import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './styles';
import { useClient } from '../../../../context/ClientContext';
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  Shield,
  Briefcase,
  FileText,
  CheckCircle,
  Download,
  Check,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ClientProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clientProjects, clientInvoices } = useClient();
  const { t } = useTranslation();
  const project = clientProjects.find((p) => p.id === id);

  const projectInvoices = clientInvoices.filter(
    (inv) => inv.projectId === id && inv.type === 'income',
  );

  const [activeTab, setActiveTab] = useState('overview');
  const [visiblePasswords, setVisiblePasswords] = useState({});

  if (!project) {
    return <S.NotFound>{t('client.layout.not_found.message')}</S.NotFound>;
  }

  const togglePassword = (credId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [credId]: !prev[credId],
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Timeline Logic
  const steps =
    project.stages && project.stages.length > 0
      ? project.stages
      : [
          {
            id: 'planning',
            label: 'Planning',
            date: project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'TBD',
            completed: true,
          },
          { id: 'execution', label: 'Execution', date: 'Ongoing', completed: false },
          {
            id: 'completion',
            label: 'Completion',
            date: project.deadline ? new Date(project.deadline).toLocaleDateString() : 'TBD',
            completed: false,
          },
        ];

  // Calculate current step index based on last completed stage
  // If steps are ordered, the last completed one defines progress
  // We assume backend returns stages in order or we sort them?
  // Let's rely on the order they were added for now, or sort by date if available.
  // Ideally, stages should be sorted by date.
  const sortedSteps = [...steps].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  // Find the index of the last completed step
  // If no steps are completed, index is -1 (start of first step)
  // We want to highlight the *current* step being worked on (first non-completed)
  // OR show all completed up to the point.

  // Logic: Highlight all completed steps as completed.
  // Highlight the *first non-completed* step as "Active".
  const firstIncompleteIndex = sortedSteps.findIndex((s) => !s.completed);
  const currentStepIndex = firstIncompleteIndex === -1 ? sortedSteps.length : firstIncompleteIndex;

  return (
    <S.Container>
      <S.Header>
        <S.TitleGroup>
          <S.BackButton onClick={() => navigate('/client/projects')}>
            <ArrowLeft size={16} /> {t('client.projects.details.back')}
          </S.BackButton>
          <h1>{project.title}</h1>
          <div className="meta">
            <S.StatusBadge $status={project.status}>{project.status}</S.StatusBadge>
            <span>{project.category}</span>
          </div>
        </S.TitleGroup>
      </S.Header>

      <S.TimelineSection>
        <S.TimelineHeader>
          <h3>{t('client.projects.details.progress_timeline.title')}</h3>
          <span>
            {t('client.projects.details.progress_timeline.estimated_completion', {
              date: new Date(project.deadline).toLocaleDateString(),
            })}
          </span>
        </S.TimelineHeader>

        <S.Stepper>
          {sortedSteps.map((step, index) => {
            const isCompleted = step.completed;
            const isActive = index === currentStepIndex;

            return (
              <S.StepItem key={step.id || index}>
                <S.StepCircle $active={isActive} $completed={isCompleted}>
                  {isCompleted ? <Check size={16} /> : <span>{index + 1}</span>}
                </S.StepCircle>
                <S.StepLabel
                  $active={isActive}
                  $completed={isCompleted}
                  $align={
                    index === 0
                      ? 'flex-start'
                      : index === sortedSteps.length - 1
                        ? 'flex-end'
                        : 'center'
                  }
                >
                  <strong>{step.name || step.label}</strong>
                  <span>{step.date ? new Date(step.date).toLocaleDateString() : 'Pending'}</span>
                </S.StepLabel>
              </S.StepItem>
            );
          })}
        </S.Stepper>
      </S.TimelineSection>

      <S.Tabs>
        {['overview', 'credentials', 'contract', 'financials'].map((tab) => (
          <S.Tab key={tab} $active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {t(`client.projects.details.tabs.${tab}`)}
          </S.Tab>
        ))}
      </S.Tabs>

      <S.TabContent>
        {activeTab === 'overview' && (
          <S.InfoGrid>
            <S.Section>
              <h2>
                <Briefcase size={20} /> {t('client.projects.details.overview.about')}
              </h2>
              <p>{project.description}</p>
              <h3>{t('client.projects.details.overview.challenge')}</h3>
              <p>{project.challenge || 'No challenge description available.'}</p>
              <h3>{t('client.projects.details.overview.solution')}</h3>
              <p>{project.solution || 'No solution description available.'}</p>
            </S.Section>
            <S.SideColumn>
              <S.Section>
                <h2>{t('client.projects.details.overview.tech_stack')}</h2>
                <S.TechStack>
                  {project.stack && project.stack.map((tech) => <span key={tech}>{tech}</span>)}
                </S.TechStack>
              </S.Section>
              <S.Section>
                <h2>{t('client.projects.details.overview.deliverables')}</h2>
                <S.DeliverablesList>
                  {['Design System', 'Backend API', 'Frontend Interface'].map((item) => (
                    <S.IconRow key={item}>
                      <CheckCircle size={16} color="var(--color-primary)" /> {item}
                    </S.IconRow>
                  ))}
                </S.DeliverablesList>
              </S.Section>
            </S.SideColumn>
          </S.InfoGrid>
        )}

        {activeTab === 'credentials' && (
          <S.VaultGrid>
            {project.privateDetails?.credentials &&
              project.privateDetails.credentials.map((cred) => (
                <S.CredentialCard key={cred.id}>
                  <div className="header">
                    <S.IconRow className="header">
                      <Shield size={18} color="var(--color-primary)" />
                      <h3>{cred.name}</h3>
                    </S.IconRow>
                    {cred.url && (
                      <a href={cred.url} target="_blank" rel="noopener noreferrer">
                        {t('client.projects.details.credentials.access')} <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <S.CredentialField>
                    <label>{t('client.projects.details.credentials.username')}</label>
                    <div className="value-group">
                      <code>{cred.username}</code>
                      <button onClick={() => copyToClipboard(cred.username)} title="Copy Username">
                        <Copy size={16} />
                      </button>
                    </div>
                  </S.CredentialField>
                  <S.CredentialField>
                    <label>{t('client.projects.details.credentials.password')}</label>
                    <div className="value-group">
                      <code>{visiblePasswords[cred.id] ? cred.password : '••••••••••••••••'}</code>
                      <button
                        onClick={() => togglePassword(cred.id)}
                        title={visiblePasswords[cred.id] ? 'Hide' : 'Show'}
                      >
                        {visiblePasswords[cred.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button onClick={() => copyToClipboard(cred.password)} title="Copy Password">
                        <Copy size={16} />
                      </button>
                    </div>
                  </S.CredentialField>
                </S.CredentialCard>
              ))}
          </S.VaultGrid>
        )}

        {activeTab === 'contract' && (
          <S.Section>
            <h2>
              <FileText size={20} /> {t('client.projects.details.contract.title')}
            </h2>
            <S.ContractCard>
              <div className="icon-box">
                <FileText size={32} />
              </div>
              <div className="info">
                <h3>Website Development Agreement</h3>
                <p>
                  Signed on January 10, 2026. This document outlines the scope, deliverables,
                  timeline, and payment terms for the project.
                </p>
              </div>
              <div className="actions">
                <S.Button>{t('client.projects.details.contract.view')}</S.Button>
                <S.Button $primary>
                  <Download size={16} /> {t('client.projects.details.contract.download')}
                </S.Button>
              </div>
            </S.ContractCard>
          </S.Section>
        )}

        {activeTab === 'financials' && (
          <S.Section>
            <h2>{t('client.projects.details.financials.title')}</h2>
            {projectInvoices.length > 0 ? (
              <S.InvoiceList>
                {projectInvoices.map((inv) => (
                  <S.InvoiceItem key={inv.id}>
                    <div className="info">
                      <strong>{inv.description}</strong>
                      <span>{new Date(inv.date).toLocaleDateString()}</span>
                    </div>
                    <div className="amount-group">
                      <span className="amount">
                        R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <S.StatusBadge $status={inv.status === 'paid' ? 'Completed' : 'In Progress'}>
                        {inv.status}
                      </S.StatusBadge>
                      <S.Button>
                        <Download size={14} />
                      </S.Button>
                    </div>
                  </S.InvoiceItem>
                ))}
              </S.InvoiceList>
            ) : (
              <p>{t('client.projects.details.financials.empty')}</p>
            )}
          </S.Section>
        )}
      </S.TabContent>
    </S.Container>
  );
};

export default ClientProjectDetail;
