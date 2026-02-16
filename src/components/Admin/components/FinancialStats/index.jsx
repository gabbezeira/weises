import React, { useState } from 'react';
import * as S from './styles';
import { useAdmin } from '@context/AdminContext';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, Users, FolderKanban, Wallet } from 'lucide-react';

const FinancialStats = () => {
  const { t } = useTranslation();
  const { transactions, clients, projects, taxSettings } = useAdmin();
  const [timeFilter, setTimeFilter] = useState('month');

  const filterTransactions = (txs) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Define end of current month
    const endOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);

    return txs.filter((t) => {
      // For now, keeping strictly 'paid'. If user wants accrual, we'd need a toggle.
      if (t.status !== 'paid') return false;

      const txDate = new Date(t.date);
      const txMonth = txDate.getMonth();
      const txYear = txDate.getFullYear();

      if (timeFilter === 'month') {
        return txMonth === currentMonth && txYear === currentYear;
      }

      if (timeFilter === 'quarter') {
        const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
        const quarterStart = new Date(currentYear, quarterStartMonth, 1);
        const quarterEnd = new Date(currentYear, quarterStartMonth + 3, 0, 23, 59, 59, 999);
        return txDate >= quarterStart && txDate <= quarterEnd;
      }

      if (timeFilter === 'year') {
        // "Year" usually implies Current Year (YTD) in financial contexts
        return txYear === currentYear;
      }

      if (timeFilter === 'all') {
        return true;
      }

      return false;
    });
  };

  const filteredTransactions = filterTransactions(transactions);

  // 1. Total Revenue (Income & Paid)
  const totalRevenue = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  // 2. Total Expenses (Paid)
  const totalExpenses = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  // 3. Tax Calculation
  const totalTaxRate = Object.values(taxSettings).reduce((acc, val) => acc + val, 0);
  const estimatedTax = totalRevenue * (totalTaxRate / 100);

  // 4. Net Profit (Revenue - Expenses - Estimated Tax)
  const netProfit = totalRevenue - totalExpenses - estimatedTax;

  // 5. Clients Logic
  const activeClients = clients.filter((c) => c.status === 'Active').length;

  // 6. Projects Logic
  const activeProjects = projects.filter((p) => p.status === 'In Progress').length;
  const planningProjects = projects.filter((p) => p.status === 'Planning').length;

  const stats = [
    {
      title: t('financial.overview.total_revenue'),
      value: `R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtext:
        timeFilter === 'month'
          ? t('financial.filters.current_month')
          : timeFilter === 'quarter'
            ? t('financial.filters.current_quarter')
            : timeFilter === 'year'
              ? t('financial.filters.current_year')
              : t('financial.filters.all_time'),
      icon: TrendingUp,
      color: 'var(--color-success)',
    },
    {
      title: t('financial.overview.total_expenses') || 'Total Expenses', // Fallback if translation missing
      value: `R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtext: t('financial.overview.expenses_paid'),
      icon: TrendingDown, // Need to import this
      color: 'var(--color-danger)',
    },
    {
      title: t('financial.overview.net_profit'),
      value: `R$ ${netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtext: t('financial.overview.after_tax', { rate: totalTaxRate }),
      icon: Wallet,
      color: 'var(--color-primary)',
    },
    {
      title: t('admin.dashboard.total_clients'),
      value: clients.length,
      subtext: `${activeClients} ${t('admin.clients.status.active')} / ${clients.length - activeClients} ${t('admin.clients.status.inactive')}`,
      icon: Users,
      color: 'var(--color-secondary)',
    },
  ];

  return (
    <S.Container>
      <S.FilterBar>
        <S.FilterLabel>{t('financial.overview.title')}</S.FilterLabel>
        <S.FilterSelect value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
          <option value="month">{t('financial.filters.current_month')}</option>
          <option value="quarter">{t('financial.filters.current_quarter')}</option>
          <option value="year">{t('financial.filters.current_year')}</option>
          <option value="all">{t('financial.filters.all_time')}</option>
        </S.FilterSelect>
      </S.FilterBar>

      <S.StatsGrid>
        {stats.map((stat, index) => (
          <S.StatCard key={index} $color={stat.color}>
            <S.Header>
              <S.Title>{stat.title}</S.Title>
              <S.IconBox $color={stat.color}>
                <stat.icon size={24} strokeWidth={2} />
              </S.IconBox>
            </S.Header>

            <S.MainValue>{stat.value}</S.MainValue>

            <S.Footer>
              <S.TrendPill $isPositive={true}>+0%</S.TrendPill>
              <span>{stat.subtext}</span>
            </S.Footer>
          </S.StatCard>
        ))}
      </S.StatsGrid>
    </S.Container>
  );
};

export default FinancialStats;
