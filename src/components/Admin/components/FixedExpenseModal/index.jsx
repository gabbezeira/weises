import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../../../../context/AdminContext';
import * as S from './styles';
import { Overlay } from '../../layout/AdminLayout/styles';

const FixedExpenseModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { addTransaction } = useAdmin();

  const [formData, setFormData] = useState({
    description: '',
    category: 'Subscription',
    amount: '',
    dayOfMonth: new Date().getDate(), // Default to today's day
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (!amount) return;

    // Calculate next occurrence date based on day of month
    const today = new Date();
    let nextDate = new Date(today.getFullYear(), today.getMonth(), formData.dayOfMonth);
    if (nextDate < today) {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }

    const newExpense = {
      date: nextDate.toISOString().split('T')[0],
      type: 'expense',
      category: formData.category,
      amount: amount,
      description: formData.description,
      status: 'pending',
      projectId: null,
      clientId: null,
      isRecurring: true,
    };

    addTransaction(newExpense);
    onClose();
    setFormData({
      description: '',
      category: 'Subscription',
      amount: '',
      dayOfMonth: new Date().getDate(),
    });
  };

  return (
    <>
      <Overlay $isOpen={true} onClick={onClose} style={{ zIndex: 60 }} />
      <S.ModalContainer>
        <S.Header>
          <S.Title>{t('financial.modals.fixed_expense.title')}</S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.Header>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label>{t('financial.modals.fixed_expense.description')}</S.Label>
            <S.Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder={t('financial.modals.fixed_expense.placeholder_desc')}
              autoFocus
            />
          </S.FormGroup>

          <S.Grid>
            <S.FormGroup>
              <S.Label>{t('financial.modals.fixed_expense.category')}</S.Label>
              <S.Select name="category" value={formData.category} onChange={handleChange}>
                <option value="Subscription">{t('financial.categories.subscription')}</option>
                <option value="Rent">{t('financial.categories.rent')}</option>
                <option value="Server">{t('financial.categories.server')}</option>
                <option value="Tax">{t('financial.categories.tax')}</option>
                <option value="Salary">{t('financial.categories.salary')}</option>
                <option value="Other">{t('financial.categories.other')}</option>
              </S.Select>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>{t('financial.modals.fixed_expense.amount')}</S.Label>
              <S.InputWrapper>
                <S.CurrencyIcon size={14} />
                <S.Input
                  type="number"
                  name="amount"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  style={{ paddingLeft: '2rem' }}
                />
              </S.InputWrapper>
            </S.FormGroup>
          </S.Grid>

          <S.FormGroup>
            <S.Label>{t('financial.modals.fixed_expense.day_of_month')}</S.Label>
            <S.InputWrapper>
              <S.CalendarIcon size={14} />
              <S.Input
                type="number"
                name="dayOfMonth"
                min="1"
                max="31"
                value={formData.dayOfMonth}
                onChange={handleChange}
                required
                style={{ paddingLeft: '2rem' }}
              />
            </S.InputWrapper>
            <S.HintText>{t('financial.modals.fixed_expense.hint')}</S.HintText>
          </S.FormGroup>

          <S.ButtonType type="submit">
            <Save size={18} />
            {t('financial.modals.fixed_expense.save')}
          </S.ButtonType>
        </S.Form>
      </S.ModalContainer>
    </>
  );
};

export default FixedExpenseModal;
