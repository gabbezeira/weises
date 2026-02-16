import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, PieChart, Info, Building2, Users } from 'lucide-react';
import { useAdmin } from '../../../../context/AdminContext';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

const ProfitDividends = () => {
  const { t } = useTranslation();
  const { transactions, taxSettings } = useAdmin();
  const [timeFilter, setTimeFilter] = useState('current'); // 'current', 'quarter', 'year'

  // 0. Filter Logic
  const filterTransactions = (txs) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return txs.filter((t) => {
      if (t.status !== 'paid') return false;

      const txDate = new Date(t.date);
      const txMonth = txDate.getMonth();
      const txYear = txDate.getFullYear();

      if (timeFilter === 'current') {
        return txMonth === currentMonth && txYear === currentYear;
      }

      if (timeFilter === 'quarter') {
        const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
        const quarterStart = new Date(currentYear, quarterStartMonth, 1);
        const quarterEnd = new Date(currentYear, quarterStartMonth + 3, 0, 23, 59, 59, 999);
        return txDate >= quarterStart && txDate <= quarterEnd;
      }

      if (timeFilter === 'year') {
        return txYear === currentYear;
      }

      if (timeFilter === 'all') {
        return true;
      }

      return false;
    });
  };

  const filteredTransactions = filterTransactions(transactions);

  // 1. Calculations
  const totalRevenue = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const grossProfit = totalRevenue - totalExpenses;

  // Tax Logic
  const totalTaxRate = Object.values(taxSettings).reduce((acc, val) => acc + val, 0);
  const estimatedTax = totalRevenue * (totalTaxRate / 100);
  const hasTaxSettings = totalTaxRate > 0;

  const netProfit = grossProfit - estimatedTax;

  // 2. Distribution Logic (Suggestion)
  // Reserve: 20% of Net Profit
  // Dividends: 80% of Net Profit
  const reservePercentage = 20;
  const dividendsPercentage = 80;

  const reserveAmount = Math.max(0, netProfit * (reservePercentage / 100)); // Prevent negative
  const dividendsAmount = Math.max(0, netProfit * (dividendsPercentage / 100));

  const formatCurrency = (value) =>
    value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const getFilterLabel = () => {
    switch (timeFilter) {
      case 'current':
        return t('financial.filters.current_month');
      case 'quarter':
        return t('financial.filters.current_quarter');
      case 'year':
        return t('financial.filters.current_year');
      case 'all':
        return t('financial.filters.all_time');
      default:
        return '';
    }
  };

  return (
    <S.Container>
      {/* Header & Summary */}
      <div>
        <S.Header>
          <div>
            <S.Title>{t('financial.dashboard.tabs.profit_dividends')}</S.Title>
            <S.SubTitle>
              {t('financial.filters.detailed_breakdown')} <strong>{getFilterLabel()}</strong>
            </S.SubTitle>
          </div>

          <S.FilterContainer>
            <S.FilterButton
              $active={timeFilter === 'current'}
              onClick={() => setTimeFilter('current')}
            >
              {t('financial.filters.current_month')}
            </S.FilterButton>
            <S.FilterButton
              $active={timeFilter === 'quarter'}
              onClick={() => setTimeFilter('quarter')}
            >
              {t('financial.filters.current_quarter')}
            </S.FilterButton>
            <S.FilterButton $active={timeFilter === 'year'} onClick={() => setTimeFilter('year')}>
              {t('financial.filters.current_year')}
            </S.FilterButton>
            <S.FilterButton $active={timeFilter === 'all'} onClick={() => setTimeFilter('all')}>
              {t('financial.filters.all_time')}
            </S.FilterButton>
          </S.FilterContainer>
        </S.Header>

        <S.SummaryGrid>
          {/* Total Revenue */}
          <S.Card $color="var(--color-blue-500)">
            <S.CardHeader>
              <S.IconBox $bg="rgba(59, 130, 246, 0.1)" $color="var(--color-blue-500)">
                <TrendingUp size={20} />
              </S.IconBox>
              <h3>{t('financial.overview.total_revenue')}</h3>
            </S.CardHeader>
            <S.CardValue>
              <span>R$</span>
              {formatCurrency(totalRevenue)}
            </S.CardValue>
            <S.CardFooter $color="var(--color-blue-500)">
              {t('financial.overview.sales_services')}
            </S.CardFooter>
          </S.Card>

          {/* Total Expenses */}
          <S.Card $color="var(--color-red-500)">
            <S.CardHeader>
              <S.IconBox $bg="rgba(239, 68, 68, 0.1)" $color="var(--color-red-500)">
                <TrendingDown size={20} />
              </S.IconBox>
              <h3>{t('financial.overview.total_expenses')}</h3>
            </S.CardHeader>
            <S.CardValue>
              <span>R$</span>
              {formatCurrency(totalExpenses)}
            </S.CardValue>
            <S.CardFooter $color="var(--color-red-500)">
              {t('financial.overview.operational_costs')}
            </S.CardFooter>
          </S.Card>

          {/* Gross Profit */}
          <S.Card $color="var(--color-primary)">
            <S.CardHeader>
              <S.IconBox $bg="var(--color-primary-10)" $color="var(--color-primary)">
                <Wallet size={20} />
              </S.IconBox>
              <h3>{t('financial.overview.gross_profit')}</h3>
            </S.CardHeader>
            <S.CardValue>
              <span>R$</span>
              {formatCurrency(grossProfit)}
            </S.CardValue>
            <S.CardFooter>{t('financial.overview.revenue_minus_expenses')}</S.CardFooter>
          </S.Card>

          {/* Taxes */}
          <S.Card $color="var(--color-warning)">
            <S.CardHeader>
              <S.IconBox $bg="rgba(245, 158, 11, 0.1)" $color="var(--color-warning)">
                <PieChart size={20} />
              </S.IconBox>
              <h3>{t('financial.overview.estimated_taxes')}</h3>
            </S.CardHeader>
            <S.CardValue>
              <span>R$</span>
              {formatCurrency(estimatedTax)}
            </S.CardValue>
            <S.CardFooter $color="var(--color-warning)">
              {t('financial.overview.rate')}: <strong>{totalTaxRate}%</strong>{' '}
              {t('financial.overview.on_revenue')}
            </S.CardFooter>
            {!hasTaxSettings && (
              <S.AlertBox>
                <Info size={16} /> {t('financial.overview.rate_not_set')} (0%)
              </S.AlertBox>
            )}
          </S.Card>

          {/* Net Profit */}
          <S.Card $color="var(--color-success)">
            <S.CardHeader>
              <S.IconBox $bg="var(--color-success-10)" $color="var(--color-success)">
                <Wallet size={20} />
              </S.IconBox>
              <h3>{t('financial.overview.net_profit')}</h3>
            </S.CardHeader>
            <S.CardValue>
              <span>R$</span>
              {formatCurrency(netProfit)}
            </S.CardValue>
            <S.CardFooter $color="var(--color-success)">
              {t('financial.overview.available_distribution')}
            </S.CardFooter>
          </S.Card>
        </S.SummaryGrid>
      </div>

      {/* Distribution Suggestions */}
      <S.DistributionSection>
        <S.SectionTitle>
          <PieChart size={24} color="var(--color-primary)" />
          {t('financial.distribution.title')}
        </S.SectionTitle>

        <S.Legend>
          <S.LegendItem $color="var(--color-blue-500)">
            <span /> {t('financial.distribution.company_reserve')} ({reservePercentage}%)
          </S.LegendItem>
          <S.LegendItem $color="var(--color-purple-500)">
            <span /> {t('financial.distribution.partner_dividends')} ({dividendsPercentage}%)
          </S.LegendItem>
        </S.Legend>

        <S.ProgressBar>
          <S.ProgressSegment $width={reservePercentage} $color="var(--color-blue-500)" />
          <S.ProgressSegment $width={dividendsPercentage} $color="var(--color-purple-500)" />
        </S.ProgressBar>

        <S.SuggestionGrid>
          {/* Company Reserve */}
          <S.SuggestionCard $color="var(--color-blue-500)">
            <S.SuggestionLabel>
              <Building2
                size={16}
                style={{ display: 'inline', marginRight: '8px', marginBottom: '-2px' }}
              />
              {t('financial.distribution.company_reserve')}
            </S.SuggestionLabel>
            <S.SuggestionValue $color="var(--color-blue-500)">
              R$ {formatCurrency(reserveAmount)}
            </S.SuggestionValue>
            <S.SuggestionNote>{t('financial.distribution.reserve_note')}</S.SuggestionNote>
          </S.SuggestionCard>

          {/* Partner Dividends */}
          <S.SuggestionCard $color="var(--color-purple-500)">
            <S.SuggestionLabel>
              <Users
                size={16}
                style={{ display: 'inline', marginRight: '8px', marginBottom: '-2px' }}
              />
              {t('financial.distribution.partner_dividends')}
            </S.SuggestionLabel>
            <S.SuggestionValue $color="var(--color-purple-500)">
              R$ {formatCurrency(dividendsAmount)}
            </S.SuggestionValue>
            <S.SuggestionNote>{t('financial.distribution.dividends_note')}</S.SuggestionNote>
          </S.SuggestionCard>
        </S.SuggestionGrid>
      </S.DistributionSection>
    </S.Container>
  );
};

export default ProfitDividends;
