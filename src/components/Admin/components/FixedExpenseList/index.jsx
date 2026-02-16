import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '@context/AdminContext';
import { Trash2, TrendingDown, Plus, Percent, CalendarClock } from 'lucide-react';
import EmptyState from '../EmptyState';
import * as S from './styles';
import Pagination from '@ui/Pagination';

const FixedExpenseList = ({ onAddClick }) => {
  const { t } = useTranslation();
  const { transactions, deleteTransaction, taxSettings, setTaxSettings } = useAdmin();

  // Filter for Fixed Expenses (Recurring + Expense)
  const fixedExpenses = transactions
    .filter((tx) => tx.isRecurring && tx.type === 'expense')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this fixed expense?')) {
      deleteTransaction(id);
    }
  };

  const handleTaxChange = (key, value) => {
    setTaxSettings((prev) => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  const totalFixedCost = fixedExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(fixedExpenses.length / itemsPerPage);
  const paginatedExpenses = fixedExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <S.Container>
      {/* Tax Settings Section */}
      <S.TaxContainer>
        <S.TaxHeader>
          <h3>
            <Percent size={20} /> Tax Configuration
          </h3>
        </S.TaxHeader>
        <S.TaxGrid>
          {Object.entries(taxSettings).map(([key, value]) => (
            <S.TaxItem key={key}>
              <S.TaxLabel>{key.toUpperCase()}</S.TaxLabel>
              <S.TaxInputWrapper>
                <S.TaxInput
                  type="number"
                  value={value}
                  onChange={(e) => handleTaxChange(key, e.target.value)}
                  step="0.1"
                  min="0"
                />
                <span>%</span>
              </S.TaxInputWrapper>
            </S.TaxItem>
          ))}
        </S.TaxGrid>
        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>
          * These percentages are estimated values applied to Total Revenue for Net Profit
          calculation.
        </p>
      </S.TaxContainer>

      <S.Header>
        <S.SummaryCard>
          <div className="icon">
            <TrendingDown size={24} />
          </div>
          <div className="info">
            <h3>Total Fixed Monthly Costs</h3>
            <p>R$ {totalFixedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </S.SummaryCard>
        <S.AddButton onClick={onAddClick}>
          <Plus size={16} /> Add Fixed Expense
        </S.AddButton>
      </S.Header>

      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <S.Th>Next Due Date</S.Th>
              <S.Th>Category</S.Th>
              <S.Th>Description</S.Th>
              <S.Th>Amount</S.Th>
              <S.Th>Actions</S.Th>
            </tr>
          </thead>
          <tbody>
            {paginatedExpenses.length > 0 ? (
              paginatedExpenses.map((tx) => (
                <S.Tr key={tx.id}>
                  <S.Td>{tx.date}</S.Td>
                  <S.Td>
                    <S.Badge>{tx.category}</S.Badge>
                  </S.Td>
                  <S.Td>{tx.description}</S.Td>
                  <S.Td style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                    R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </S.Td>
                  <S.Td>
                    <S.ActionButton $danger onClick={() => handleDelete(tx.id)} title="Delete">
                      <Trash2 size={16} />
                    </S.ActionButton>
                  </S.Td>
                </S.Tr>
              ))
            ) : (
              <tr>
                <S.Td colSpan="5" style={{ padding: 0 }}>
                  <EmptyState
                    title="No fixed expenses yet"
                    description="Add recurring expenses like rent, salaries, or subscriptions to track your monthly fixed costs."
                    icon={CalendarClock}
                  />
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

export default FixedExpenseList;
