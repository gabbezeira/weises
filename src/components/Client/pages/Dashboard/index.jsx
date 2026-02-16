import React from 'react';
import * as S from './styles';
import { useClient } from '../../../../context/ClientContext';
import {
  Briefcase,
  CreditCard,
  Activity,
  ArrowRight,
  Plus,
  FileText,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ClientProjectCard from '../../components/ClientProjectCard';
import { useTranslation } from 'react-i18next';

const ClientDashboard = () => {
  const { currentClient, clientProjects, clientInvoices } = useClient();
  const { t } = useTranslation();

  const activeProjects = clientProjects.filter((p) => p.status === 'In Progress').length;
  const completedProjects = clientProjects.filter((p) => p.status === 'Completed').length;

  const nextDueInvoice = clientInvoices
    .filter((t) => t.type === 'income' && t.status === 'pending')
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const totalInvested = clientInvoices
    .filter((t) => t.type === 'income' && t.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <S.Container>
      <S.WelcomeSection>
        <h1>{t('client.dashboard.welcome', { name: currentClient?.name.split(' ')[0] })}</h1>
        <p>{t('client.dashboard.overview', { company: currentClient?.company })}</p>
      </S.WelcomeSection>

      <S.StatsGrid>
        <S.StatCard>
          <div className="header">
            <span>{t('client.dashboard.stats.active_projects')}</span>
            <div className="icon-wrapper">
              <Briefcase size={20} />
            </div>
          </div>
          <div className="value">{activeProjects}</div>
          <div className="footer">
            {t('client.dashboard.stats.completed_projects', { count: completedProjects })}
          </div>
        </S.StatCard>

        <S.StatCard>
          <div className="header">
            <span>{t('client.dashboard.stats.next_due_invoice')}</span>
            <div className="icon-wrapper">
              <CreditCard size={20} />
            </div>
          </div>
          <div className="value">
            {nextDueInvoice
              ? `R$ ${nextDueInvoice.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} `
              : t('client.dashboard.stats.all_paid')}
          </div>
          <div className="footer neutral">
            {nextDueInvoice
              ? t('client.dashboard.stats.due_date', {
                  date: new Date(nextDueInvoice.date).toLocaleDateString(),
                })
              : t('client.dashboard.stats.no_pending')}
          </div>
        </S.StatCard>

        <S.StatCard>
          <div className="header">
            <span>{t('client.dashboard.stats.total_invested')}</span>
            <div className="icon-wrapper">
              <Activity size={20} />
            </div>
          </div>
          <div className="value">
            R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="footer">{t('client.dashboard.stats.lifetime_value')}</div>
        </S.StatCard>
      </S.StatsGrid>

      {clientProjects.length > 0 && (
        <S.Section>
          <S.ProjectsHeader>
            <S.SectionTitle>{t('client.dashboard.projects.active_title')}</S.SectionTitle>
            <S.ViewAllLink to="/client/projects">
              {t('client.dashboard.projects.view_all')} <ArrowRight size={16} />
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
                <Plus size={24} />
              </div>
              <div className="info">
                <h3>{t('client.dashboard.quick_actions.request_service_title')}</h3>
                <p>{t('client.dashboard.quick_actions.request_service_desc')}</p>
              </div>
              <ArrowRight className="arrow" size={20} />
            </S.ActionCard>

            <S.ActionCard to="/client/projects">
              <div className="icon-box">
                <FileText size={24} />
              </div>
              <div className="info">
                <h3>{t('client.dashboard.quick_actions.view_contracts_title')}</h3>
                <p>{t('client.dashboard.quick_actions.view_contracts_desc')}</p>
              </div>
              <ArrowRight className="arrow" size={20} />
            </S.ActionCard>
          </S.QuickActionsColumn>

          <S.SupportCard>
            <div className="header">
              <h3>{t('client.dashboard.support.title')}</h3>
              <p>{t('client.dashboard.support.desc')}</p>
            </div>
            <button className="contact-btn">
              <MessageCircle size={18} /> {t('client.dashboard.support.chat_btn')}
            </button>
            <S.SupportFooter>
              <HelpCircle size={14} />
              <span>{t('client.dashboard.support.help_center')}</span>
            </S.SupportFooter>
          </S.SupportCard>
        </S.DualColumnGrid>
      </S.Section>
    </S.Container>
  );
};

export default ClientDashboard;
