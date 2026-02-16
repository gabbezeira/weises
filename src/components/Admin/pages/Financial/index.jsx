import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import FinancialDashboard from '../../components/FinancialDashboard';
import FinancialStats from '../../components/FinancialStats'; // New Import
import TransactionList from '../../components/TransactionList';
import TransactionFormModal from '../../components/TransactionFormModal';
import FixedExpenseModal from '../../components/FixedExpenseModal';
import ProfitDividends from '../../components/ProfitDividends'; // New Import
import FixedExpenseList from '../../components/FixedExpenseList';
import * as S from './styles';

const Financial = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFormatModalOpen, setIsFormModalOpen] = useState(false);
  const [isFixedModalOpen, setIsFixedModalOpen] = useState(false);

  return (
    <S.Container>
      <S.Header>
        <S.TitleGroup>
          <S.Title>{t('financial.dashboard.title')}</S.Title>
          <S.SubTitle>{t('financial.dashboard.subtitle')}</S.SubTitle>
        </S.TitleGroup>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <S.AddButton onClick={() => setIsFormModalOpen(true)}>
            <Plus size={18} strokeWidth={2.5} />
            {t('financial.dashboard.new_transaction')}
          </S.AddButton>
        </div>
      </S.Header>

      {/* Always visible Stats */}
      <FinancialStats />

      <S.Tabs>
        <S.Tab $active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
          {t('financial.dashboard.tabs.analytics')}
        </S.Tab>
        <S.Tab $active={activeTab === 'profit'} onClick={() => setActiveTab('profit')}>
          {t('financial.dashboard.tabs.profit_dividends')}
        </S.Tab>
        <S.Tab $active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')}>
          {t('financial.dashboard.tabs.transactions')}
        </S.Tab>
        <S.Tab $active={activeTab === 'fixed'} onClick={() => setActiveTab('fixed')}>
          {t('financial.dashboard.tabs.fixed_expenses')}
        </S.Tab>
      </S.Tabs>

      <S.Content>
        {activeTab === 'dashboard' && <FinancialDashboard />}
        {activeTab === 'profit' && <ProfitDividends />}
        {activeTab === 'transactions' && <TransactionList />}
        {activeTab === 'fixed' && <FixedExpenseList onAddClick={() => setIsFixedModalOpen(true)} />}
      </S.Content>

      <TransactionFormModal isOpen={isFormatModalOpen} onClose={() => setIsFormModalOpen(false)} />
      <FixedExpenseModal isOpen={isFixedModalOpen} onClose={() => setIsFixedModalOpen(false)} />
    </S.Container>
  );
};

export default Financial;
