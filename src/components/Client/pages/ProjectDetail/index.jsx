import {
  ArrowLeft,
  Briefcase,
  Check,
  CheckCircle,
  Copy,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Key,
  Shield,
  Upload,
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useClient } from '../../../../context/ClientContext';
import CredentialsModal from '../../../Admin/components/CredentialsModal';
import Pagination from '../../../ui/Pagination';
import PaymentModal from '../../components/PaymentModal';
import * as S from './styles';

const INVOICES_PER_PAGE = 5;

const ClientProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clientProjects, clientInvoices } = useClient();
  const { t } = useTranslation();
  const project = clientProjects.find((p) => p.id === id);

  const projectInvoices = clientInvoices.filter((inv) => inv.projectId === id);

  const [activeTab, setActiveTab] = useState('overview');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoicePage, setInvoicePage] = useState(1);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);

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

  const steps = project.stages || [];
  const hasStages = steps.length > 0;

  const sortedSteps = [...steps].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  const firstIncompleteIndex = sortedSteps.findIndex((s) => !s.completed);
  const currentStepIndex = firstIncompleteIndex === -1 ? sortedSteps.length : firstIncompleteIndex;

  const getStatusText = (status) => t(`client.billing.status.${status}`, status);

  const completedCount = sortedSteps.filter((s) => s.completed).length;
  const progressPercent =
    sortedSteps.length > 1
      ? Math.round(
          ((completedCount > 0 ? completedCount - 0.5 : 0) / (sortedSteps.length - 1)) * 100,
        )
      : completedCount > 0
        ? 100
        : 0;

  const totalInvoicePages = Math.max(1, Math.ceil(projectInvoices.length / INVOICES_PER_PAGE));
  const paginatedInvoices = projectInvoices.slice(
    (invoicePage - 1) * INVOICES_PER_PAGE,
    invoicePage * INVOICES_PER_PAGE,
  );

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
              date: project.estimatedCompletion
                ? new Date(project.estimatedCompletion).toLocaleDateString()
                : project.deadline
                  ? new Date(project.deadline).toLocaleDateString()
                  : 'TBD',
            })}
          </span>
        </S.TimelineHeader>

        {hasStages ? (
          <S.Stepper $progress={progressPercent}>
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
                    <span>
                      {step.date
                        ? new Date(step.date).toLocaleDateString()
                        : t('client.projects.details.progress_timeline.pending')}
                    </span>
                  </S.StepLabel>
                </S.StepItem>
              );
            })}
          </S.Stepper>
        ) : (
          <S.EmptyTimeline>{t('client.projects.details.progress_timeline.empty')}</S.EmptyTimeline>
        )}
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
              <p>
                {project.challenge ||
                  t(
                    'client.projects.details.overview.no_challenge',
                    'Nenhuma descrição de desafio disponível.',
                  )}
              </p>
              <h3>{t('client.projects.details.overview.solution')}</h3>
              <p>
                {project.solution ||
                  t(
                    'client.projects.details.overview.no_solution',
                    'Nenhuma descrição de solução disponível.',
                  )}
              </p>
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
                  {[
                    t('client.projects.details.overview.deliverables_list.design', 'Design System'),
                    t('client.projects.details.overview.deliverables_list.backend', 'Backend API'),
                    t(
                      'client.projects.details.overview.deliverables_list.frontend',
                      'Frontend Interface',
                    ),
                  ].map((item) => (
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
          <>
            <S.CredentialsButton onClick={() => setIsCredentialsModalOpen(true)}>
              <Key size={16} />{' '}
              {t('client.projects.details.credentials.open_modal', 'Ver Credenciais')}
            </S.CredentialsButton>
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
                          {t('client.projects.details.credentials.access')}{' '}
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    <S.CredentialField>
                      <label>{t('client.projects.details.credentials.username')}</label>
                      <div className="value-group">
                        <code>{cred.username}</code>
                        <button
                          onClick={() => copyToClipboard(cred.username)}
                          title="Copy Username"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </S.CredentialField>
                    <S.CredentialField>
                      <label>{t('client.projects.details.credentials.password')}</label>
                      <div className="value-group">
                        <code>
                          {visiblePasswords[cred.id] ? cred.password : '••••••••••••••••'}
                        </code>
                        <button
                          onClick={() => togglePassword(cred.id)}
                          title={visiblePasswords[cred.id] ? 'Hide' : 'Show'}
                        >
                          {visiblePasswords[cred.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(cred.password)}
                          title="Copy Password"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </S.CredentialField>
                  </S.CredentialCard>
                ))}
            </S.VaultGrid>
          </>
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
                <h3>
                  {t(
                    'client.projects.details.contract.document_title',
                    'Website Development Agreement',
                  )}
                </h3>
                <p>
                  {t(
                    'client.projects.details.contract.document_desc',
                    'Signed on January 10, 2026. This document outlines the scope, deliverables, timeline, and payment terms for the project.',
                  )}
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
            <S.SectionHeader>
              <h2>{t('client.projects.details.financials.title')}</h2>
              <S.InvoiceCount>
                {projectInvoices.length} {t('client.billing.stats.total', 'fatura(s)')}
              </S.InvoiceCount>
            </S.SectionHeader>

            <S.InvoiceTable>
              <table>
                <thead>
                  <tr>
                    <th>{t('client.billing.table.due_date')}</th>
                    <th>{t('client.billing.table.description')}</th>
                    <th>{t('client.billing.table.amount')}</th>
                    <th>{t('client.billing.table.status')}</th>
                    <th>{t('client.billing.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {projectInvoices.length > 0 ? (
                    paginatedInvoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="date">
                          {inv.dueDate
                            ? new Date(inv.dueDate).toLocaleDateString('pt-BR')
                            : new Date(inv.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td>{inv.description}</td>
                        <td className="amount">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(inv.amount)}
                        </td>
                        <td>
                          <S.InvoiceStatusBadge $status={inv.status}>
                            {getStatusText(inv.status)}
                          </S.InvoiceStatusBadge>
                        </td>
                        <td>
                          {inv.status === 'pending' && (
                            <S.PayButton onClick={() => setSelectedInvoice(inv)}>
                              {t('client.billing.table.pay_now')}
                            </S.PayButton>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <S.EmptyStateCell colSpan="5">
                        {t('client.projects.details.financials.no_invoices')}
                      </S.EmptyStateCell>
                    </tr>
                  )}
                </tbody>
              </table>
            </S.InvoiceTable>

            {totalInvoicePages > 1 && (
              <S.PaginationWrapper>
                <Pagination
                  currentPage={invoicePage}
                  totalPages={totalInvoicePages}
                  onPageChange={setInvoicePage}
                />
              </S.PaginationWrapper>
            )}
          </S.Section>
        )}
      </S.TabContent>
      <PaymentModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      {isCredentialsModalOpen && (
        <CredentialsModal project={project} onClose={() => setIsCredentialsModalOpen(false)} />
      )}
    </S.Container>
  );
};

export default ClientProjectDetail;
