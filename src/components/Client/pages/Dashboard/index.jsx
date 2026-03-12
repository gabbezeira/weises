import {
  Activity,
  AlertCircle,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  HelpCircle,
  MessageCircle,
  Plus,
} from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useClient } from '../../../../context/ClientContext';
import ClientProjectCard from '../../components/ClientProjectCard';
import * as S from './styles';

const ClientDashboard = () => {
  const { currentClient, clientProjects, clientInvoices } = useClient();
  const { t } = useTranslation();

  const activeProjects = clientProjects.filter((p) => p.status !== 'Completed').length;
  const completedProjects = clientProjects.filter((p) => p.status === 'Completed').length;

  const pendingInvoices = clientInvoices.filter((inv) => inv.status === 'pending');
  const totalInvested = clientInvoices
    .filter((inv) => inv.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const today = new Date().toISOString().split('T')[0];
  const hasOverdue = pendingInvoices.some((inv) => inv.dueDate && inv.dueDate < today);

  let billingStatusText = t('client.dashboard.stats.all_paid');
  let billingStatusColor = 'success';
  let BillingIcon = CheckCircle;

  if (hasOverdue) {
    billingStatusText = t('client.dashboard.stats.overdue');
    billingStatusColor = 'danger';
    BillingIcon = AlertCircle;
  } else if (pendingInvoices.length > 0) {
    billingStatusText = t('client.dashboard.stats.pending');
    billingStatusColor = 'warning';
    BillingIcon = Clock;
  }

  return (
    <S.Container>
      <S.WelcomeSection>
        <h1>{t('client.dashboard.welcome', { name: currentClient?.name?.split(' ')[0] })}</h1>
        <p>{t('client.dashboard.overview', { company: currentClient?.company })}</p>
      </S.WelcomeSection>

      <S.StatsGrid>
        <S.StatCard>
          <div className="header">
            <span>{t('client.dashboard.stats.active_projects')}</span>
            <div className="icon-wrapper">
              <Briefcase size={18} />
            </div>
          </div>
          <div className="value">{activeProjects}</div>
          <div className="footer">
            {t('client.dashboard.stats.completed_projects', { count: completedProjects })}
          </div>
        </S.StatCard>

        <S.StatCard $color={billingStatusColor}>
          <div className="header">
            <span>{t('client.dashboard.stats.billing_status')}</span>
            <div className={`icon-wrapper ${billingStatusColor}`}>
              <BillingIcon size={18} />
            </div>
          </div>
          <div className={`value text-${billingStatusColor}`}>{billingStatusText}</div>
          <div className="footer neutral">
            {pendingInvoices.length} {t('client.dashboard.stats.pending_count')}
          </div>
        </S.StatCard>

        <S.InvestedCard>
          <div className="header">
            <span>{t('client.dashboard.stats.total_invested')}</span>
            <div className="icon-wrapper">
              <Activity size={18} />
            </div>
          </div>
          <div className="value">
            R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="footer">{t('client.dashboard.stats.lifetime_value')}</div>
        </S.InvestedCard>
      </S.StatsGrid>

      {clientProjects.length > 0 && (
        <S.Section>
          <S.ProjectsHeader>
            <S.SectionTitle>
              {t('client.dashboard.projects.active_title')}
              <S.SectionBadge>{activeProjects}</S.SectionBadge>
            </S.SectionTitle>
            <S.ViewAllLink to="/client/projects">
              {t('client.dashboard.projects.view_all')} <ArrowRight size={14} />
            </S.ViewAllLink>
          </S.ProjectsHeader>
          <S.StatsGrid>
            {clientProjects.slice(0, 2).map((project) => (
              <S.ProjectWrapper key={project.id}>
                <ClientProjectCard project={project} />
              </S.ProjectWrapper>
            ))}
          </S.StatsGrid>
        </S.Section>
      )}

      <S.Section>
        <S.SectionTitle>{t('client.dashboard.quick_actions.title')}</S.SectionTitle>
        <S.DualColumnGrid>
          <S.QuickActionsColumn>
            <S.ActionCard to="/client/billing">
              <div className="icon-box">
                <Plus size={22} />
              </div>
              <div className="info">
                <h3>{t('client.dashboard.quick_actions.request_service_title')}</h3>
                <p>{t('client.dashboard.quick_actions.request_service_desc')}</p>
              </div>
              <ArrowRight className="arrow" size={18} />
            </S.ActionCard>

            <S.ActionCard to="/client/projects">
              <div className="icon-box">
                <FileText size={22} />
              </div>
              <div className="info">
                <h3>{t('client.dashboard.quick_actions.view_contracts_title')}</h3>
                <p>{t('client.dashboard.quick_actions.view_contracts_desc')}</p>
              </div>
              <ArrowRight className="arrow" size={18} />
            </S.ActionCard>
          </S.QuickActionsColumn>

          <S.SupportCard>
            <div className="header">
              <h3>{t('client.dashboard.support.title')}</h3>
              <p>{t('client.dashboard.support.desc')}</p>
            </div>
            <button className="contact-btn">
              <MessageCircle size={17} /> {t('client.dashboard.support.chat_btn')}
            </button>
            <S.SupportFooter>
              <HelpCircle size={13} />
              <span>{t('client.dashboard.support.help_center')}</span>
            </S.SupportFooter>
          </S.SupportCard>
        </S.DualColumnGrid>
      </S.Section>
    </S.Container>
  );
};

export default ClientDashboard;
