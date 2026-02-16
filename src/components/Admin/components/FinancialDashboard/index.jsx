import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';
import * as S from './styles';
import { useAdmin } from '../../../../context/AdminContext';

// --- Professional Color Palette ---
const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']; // Indigo, Violet, Pink, Emerald, Amber
const INCOME_GRADIENT = ['#10b981', '#34d399']; // Emerald
const EXPENSE_GRADIENT = ['#ef4444', '#f87171']; // Red

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-background)',
          border: '1px solid var(--color-gray-700)',
          padding: '1rem',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-sans)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--color-gray-500)',
            marginBottom: '0.5rem',
          }}
        >
          {label}
        </p>
        {payload.map((entry, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.25rem',
            }}
          >
            <div
              style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color }}
            ></div>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>
              {entry.name}:
            </span>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: entry.color,
                marginLeft: 'auto',
              }}
            >
              R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const FinancialDashboard = () => {
  const { t } = useTranslation();
  const { transactions } = useAdmin();
  const [timeRange, setTimeRange] = useState('year'); // month, quarter, year, all

  // --- Filter Logic ---
  // --- Filter Logic ---
  const filterTransactionsByDate = (txs) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return txs.filter((tx) => {
      if (tx.status !== 'paid') return false;

      const txDate = new Date(tx.date);

      if (timeRange === 'month') {
        return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
      }
      if (timeRange === 'quarter') {
        // Last 3 Months
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 2);
        threeMonthsAgo.setDate(1);
        return txDate >= threeMonthsAgo && txDate <= now;
      }
      if (timeRange === 'year') {
        // Current Year
        return txDate.getFullYear() === currentYear;
      }
      if (timeRange === 'all') {
        return true;
      }
      return false;
    });
  };

  const filteredTransactions = filterTransactionsByDate(transactions);

  // --- Data Processing for Charts ---
  // 1. Cash Flow (Grouping by Month)
  const getCashFlowData = () => {
    const data = {};
    filteredTransactions.forEach((tx) => {
      const dateObj = new Date(tx.date);
      const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
      const label = dateObj.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

      if (!data[key]) data[key] = { key, label, income: 0, expense: 0 };
      if (tx.type === 'income') data[key].income += tx.amount;
      else data[key].expense += tx.amount;
    });
    return Object.values(data).sort((a, b) => a.key.localeCompare(b.key));
  };

  // 2. Revenue Mix
  const getRevenueMixData = () => {
    const data = {};
    filteredTransactions
      .filter((tx) => tx.type === 'income')
      .forEach((tx) => {
        if (!data[tx.category]) data[tx.category] = 0;
        data[tx.category] += tx.amount;
      });
    return Object.keys(data).map((key) => ({ name: key, value: data[key] }));
  };

  const cashFlowData = getCashFlowData();
  const revenueMixData = getRevenueMixData();

  return (
    <S.DashboardContainer>
      <S.Header>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>
            {t('financial.overview.title')}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
            {t('financial.dashboard.description')}
          </p>
        </div>
        <S.FilterGroup>
          {['month', 'quarter', 'year', 'all'].map((range) => (
            <button
              key={range}
              className={timeRange === range ? 'active' : ''}
              onClick={() => setTimeRange(range)}
            >
              {t(`financial.dashboard.filters.${range}`)}
            </button>
          ))}
        </S.FilterGroup>
      </S.Header>

      {/* Main Cash Flow Chart - Takes 2 Columns */}
      <S.SpanningCard>
        <S.CardHeader>
          <S.CardTitle>{t('financial.dashboard.cash_flow_timeline')}</S.CardTitle>
        </S.CardHeader>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={INCOME_GRADIENT[0]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={INCOME_GRADIENT[0]} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={EXPENSE_GRADIENT[0]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={EXPENSE_GRADIENT[0]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }}
              tickFormatter={(value) => `R$${value / 1000}k`}
              dx={-10}
              width={45} /* Fixed width to prevent scroll jitter */
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
              opacity={0.5}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'var(--color-gray-400)', strokeDasharray: '5 5' }}
            />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke={INCOME_GRADIENT[0]}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke={EXPENSE_GRADIENT[0]}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </S.SpanningCard>

      {/* Revenue Sources Donut - Takes 1 Column */}
      <S.ChartCard>
        <S.CardHeader>
          <S.CardTitle>{t('financial.dashboard.revenue_sources')}</S.CardTitle>
        </S.CardHeader>
        <div
          style={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={revenueMixData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                cornerRadius={6}
              >
                {revenueMixData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-gray-500)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </S.ChartCard>
    </S.DashboardContainer>
  );
};

export default FinancialDashboard;
