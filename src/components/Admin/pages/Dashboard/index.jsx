import React from 'react';
import { Users, FolderKanban, CheckSquare, TrendingUp, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '@context/AdminContext';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { clients, projects, tasks, transactions } = useAdmin();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Calculate Total Revenue (Realized Income)
  const totalRevenue = transactions
    .filter((t) => t.type === 'income' && t.status === 'paid')
    .reduce((acc, t) => acc + t.amount, 0);

  const stats = [
    {
      title: t('admin.dashboard.total_clients'),
      value: clients.length,
      icon: Users,
      trend: '+12%',
      color: 'var(--color-primary)',
    },
    {
      title: t('admin.dashboard.active_projects'),
      value: projects.filter((p) => p.status === 'In Progress').length,
      icon: FolderKanban,
      trend: '+5%',
      color: 'var(--color-secondary)',
    },
    {
      title: t('admin.dashboard.pending_tasks'),
      value: tasks.filter((t) => t.status !== 'done').length,
      icon: CheckSquare,
      trend: '-2%',
      color: 'var(--color-accent)',
    },
    {
      title: t('admin.dashboard.revenue'),
      value: `R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      trend: '+8%',
      color: 'var(--color-green-500)',
    },
  ];

  return (
    <S.Container>
      <S.StatsGrid>
        {stats.map((stat, index) => (
          <S.StatCard key={index}>
            <S.StatIconWrapper color={stat.color}>
              <stat.icon size={24} />
            </S.StatIconWrapper>
            <S.StatInfo>
              <S.StatTitle>{stat.title}</S.StatTitle>
              <S.StatValue>{stat.value}</S.StatValue>
              <S.StatTrend $positive={stat.trend.startsWith('+')}>
                {stat.trend} from last month
              </S.StatTrend>
            </S.StatInfo>
          </S.StatCard>
        ))}
      </S.StatsGrid>

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>{t('admin.dashboard.quick_actions')}</S.SectionTitle>
        </S.SectionHeader>
        <S.ActionsGrid>
          <S.ActionButton onClick={() => navigate('/admin/clients/new')}>
            <Plus size={20} />
            {t('admin.dashboard.new_client')}
          </S.ActionButton>
          <S.ActionButton onClick={() => navigate('/admin/projects/new')}>
            <Plus size={20} />
            {t('admin.dashboard.new_project')}
          </S.ActionButton>
        </S.ActionsGrid>
      </S.Section>
    </S.Container>
  );
};

export default Dashboard;
