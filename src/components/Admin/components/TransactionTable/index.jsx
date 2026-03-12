import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../../../../context/AdminContext';
import {
  MoreVertical,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Trash2,
  Check,
  Filter,
} from 'lucide-react';
import * as S from './styles';
import Pagination from '../../ui/Pagination';

const TransactionTable = () => {
  const { t } = useTranslation();
  const { transactions, updateTransaction, deleteTransaction, clients, projects, searchTerm } =
    useAdmin();
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter Logic: Type + Search
  const filteredTransactions = transactions
    .filter((tx) => {
      // 1. Type Filter
      if (filterType !== 'all' && tx.type !== filterType) return false;

      // 2. Search Filter (Global searchTerm)
      if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        const matchDescription = tx.description.toLowerCase().includes(lowerTerm);
        const matchCategory = tx.category.toLowerCase().includes(lowerTerm);
        const matchAmount = tx.amount.toString().includes(lowerTerm);
        return matchDescription || matchCategory || matchAmount;
      }

      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleStatusChange = (id, newStatus) => {
    updateTransaction(id, { status: newStatus });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  // Helper to get Client/Project name
  const getContextName = (tx) => {
    if (tx.projectId)
      return projects.find((p) => p.id === tx.projectId)?.title || 'Unknown Project';
    if (tx.clientId) return clients.find((c) => c.id === tx.clientId)?.name || 'Unknown Client';
    return '-';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'var(--color-success)';
      case 'pending':
        return 'var(--color-warning)';
      case 'overdue':
        return 'var(--color-danger)';
      case 'cancelled':
        return 'var(--color-gray-400)';
      default:
        return 'var(--color-text)';
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>{t('financial.transactions.title')}</S.Title>
        <S.Filters>
          <S.FilterButton
            $active={filterType === 'all'}
            onClick={() => {
              setFilterType('all');
              setCurrentPage(1);
            }}
          >
            {t('financial.transactions.all')}
          </S.FilterButton>
          <S.FilterButton
            $active={filterType === 'income'}
            onClick={() => {
              setFilterType('income');
              setCurrentPage(1);
            }}
          >
            {t('financial.transactions.income')}
          </S.FilterButton>
          <S.FilterButton
            $active={filterType === 'expense'}
            onClick={() => {
              setFilterType('expense');
              setCurrentPage(1);
            }}
          >
            {t('financial.transactions.expense')}
          </S.FilterButton>
        </S.Filters>
      </S.Header>

      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <S.Th>{t('financial.transactions.type')}</S.Th>
              <S.Th>{t('financial.transactions.date')}</S.Th>
              <S.Th>{t('financial.transactions.category')}</S.Th>
              <S.Th>{t('financial.transactions.description')}</S.Th>
              <S.Th>{t('financial.transactions.context')}</S.Th>
              <S.Th>{t('financial.transactions.amount')}</S.Th>
              <S.Th>{t('financial.transactions.status')}</S.Th>
              <S.Th>{t('financial.transactions.actions')}</S.Th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <S.Tr key={tx.id}>
                  <S.Td>
                    <S.TypeIcon $type={tx.type}>
                      {tx.type === 'income' ? (
                        <ArrowDownLeft size={16} />
                      ) : (
                        <ArrowUpRight size={16} />
                      )}
                    </S.TypeIcon>
                  </S.Td>
                  <S.Td>{tx.date}</S.Td>
                  <S.Td>
                    <S.Badge>{tx.category}</S.Badge>
                  </S.Td>
                  <S.Td>{tx.description}</S.Td>
                  <S.Td>{getContextName(tx)}</S.Td>
                  <S.Td
                    style={{
                      fontWeight: 600,
                      color: tx.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)',
                    }}
                  >
                    {tx.type === 'income' ? '+' : '-'} R${' '}
                    {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </S.Td>
                  <S.Td>
                    <S.StatusSelect
                      value={tx.status}
                      onChange={(e) => handleStatusChange(tx.id, e.target.value)}
                      style={{
                        color: getStatusColor(tx.status),
                        borderColor: getStatusColor(tx.status),
                      }}
                    >
                      <option value="pending">Pendente</option>
                      <option value="paid">Pago</option>
                      <option value="completed">Concluído</option>
                      <option value="overdue">Atrasado</option>
                      <option value="cancelled">Cancelado</option>
                    </S.StatusSelect>
                  </S.Td>
                  <S.Td>
                    <S.ActionGroup>
                      <S.ActionButton $danger onClick={() => handleDelete(tx.id)} title="Delete">
                        <Trash2 size={16} />
                      </S.ActionButton>
                    </S.ActionGroup>
                  </S.Td>
                </S.Tr>
              ))
            ) : (
              <tr>
                <S.Td
                  colSpan="8"
                  style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-gray-500)' }}
                >
                  {t('financial.transactions.empty.title_default')}
                </S.Td>
              </tr>
            )}
          </tbody>
        </S.Table>
      </S.TableContainer>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </S.Container>
  );
};

export default TransactionTable;
