import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../../../../context/AdminContext';
import { ArrowUpRight, ArrowDownLeft, Trash2, SearchX, Receipt } from 'lucide-react';
import EmptyState from '../EmptyState';
import * as S from './styles';
import Pagination from '../../../ui/Pagination';
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal';

const TransactionList = () => {
  const { t } = useTranslation();
  const { transactions, updateTransaction, deleteTransaction, clients, projects, searchTerm } =
    useAdmin();
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const itemsPerPage = 5;

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Filter Logic: Type + Search
  const filteredTransactions = transactions
    .filter((tx) => {
      if (filterType !== 'all' && tx.type !== filterType) return false;
      if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        return (
          tx.description.toLowerCase().includes(lowerTerm) ||
          tx.category.toLowerCase().includes(lowerTerm) ||
          tx.amount.toString().includes(lowerTerm)
        );
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
    setOpenDropdownId(null);
  };

  const handleDeleteClick = (id) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete);
      setIsDeleteModalOpen(false);
      setTransactionToDelete(null);
    }
  };

  const getContextName = (tx) => {
    if (tx.projectId)
      return projects.find((p) => p.id === tx.projectId)?.title || 'Unknown Project';
    if (tx.clientId) return clients.find((c) => c.id === tx.clientId)?.name || 'Unknown Client';
    return '-';
  };

  const handleDropdownTrigger = (e, id) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 8,
      left: rect.left,
    });
    setOpenDropdownId(openDropdownId === id ? null : id);
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
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownLeft size={16} />
                      )}
                    </S.TypeIcon>
                  </S.Td>
                  <S.Td>{tx.date}</S.Td>
                  <S.Td>
                    <S.Badge>
                      {t(`financial.categories.${tx.category.toLowerCase()}`, tx.category)}
                    </S.Badge>
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
                    <S.StatusWrapper>
                      <S.StatusBadge
                        $status={tx.status}
                        onClick={(e) => handleDropdownTrigger(e, tx.id)}
                      >
                        {t(`financial.status.${tx.status}`)}
                      </S.StatusBadge>

                      {openDropdownId === tx.id && (
                        <S.Dropdown
                          onClick={(e) => e.stopPropagation()}
                          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
                        >
                          {['pending', 'paid', 'overdue', 'cancelled'].map((status) => (
                            <S.DropdownItem
                              key={status}
                              $active={tx.status === status}
                              onClick={() => handleStatusChange(tx.id, status)}
                            >
                              {t(`financial.status.${status}`)}
                            </S.DropdownItem>
                          ))}
                        </S.Dropdown>
                      )}
                    </S.StatusWrapper>
                  </S.Td>
                  <S.Td>
                    <S.ActionGroup>
                      <S.ActionButton
                        $danger
                        onClick={() => handleDeleteClick(tx.id)}
                        title={t('common.actions.delete')}
                      >
                        <Trash2 size={16} />
                      </S.ActionButton>
                    </S.ActionGroup>
                  </S.Td>
                </S.Tr>
              ))
            ) : (
              <tr>
                <S.Td colSpan="8" style={{ padding: 0 }}>
                  <EmptyState
                    title={
                      searchTerm
                        ? t('financial.transactions.empty.title')
                        : t('financial.transactions.empty.title_default')
                    }
                    description={
                      searchTerm
                        ? t('financial.transactions.empty.description', { term: searchTerm })
                        : t('financial.transactions.empty.description_default')
                    }
                    icon={searchTerm ? SearchX : Receipt}
                  />
                </S.Td>
              </tr>
            )}
          </tbody>
        </S.Table>
      </S.TableContainer>

      <S.Footer>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </S.Footer>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('financial.transactions.delete_modal.title')}
        message={t('financial.transactions.delete_modal.message')}
      />
    </S.Container>
  );
};

export default TransactionList;
