import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Tag, FileText, Briefcase, User, Percent } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../../../../context/AdminContext';
import * as S from './styles';
import { Overlay } from '../../layout/AdminLayout/styles';

const TransactionFormModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { addTransaction, clients, projects } = useAdmin();
  const [shouldRender, setShouldRender] = useState(false);

  // Animation mount logic
  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Project',
    description: '',
    projectId: '',
    clientId: '',
    isRecurring: false,
    hasTax: false,
    taxRate: 6,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      type,
      category: type === 'income' ? 'Project' : 'Operational',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (!amount) return;

    const mainTransaction = {
      date: formData.date,
      type: formData.type,
      category: formData.category,
      amount: amount,
      description: formData.description,
      status: 'pending',
      projectId: formData.projectId || null,
      clientId: formData.clientId || null,
      isRecurring: formData.isRecurring,
    };

    const transactionsToAdd = [mainTransaction];

    if (formData.type === 'income' && formData.hasTax && formData.taxRate > 0) {
      const taxAmount = amount * (formData.taxRate / 100);
      transactionsToAdd.push({
        date: formData.date,
        type: 'expense',
        category: 'Tax',
        amount: taxAmount,
        description: `Tax Provision (${formData.taxRate}%) for: ${formData.description}`,
        status: 'pending',
        projectId: formData.projectId || null,
        clientId: null,
        isRecurring: false,
      });
    }

    addTransaction(transactionsToAdd);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      type: 'income',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Project',
      description: '',
      projectId: '',
      clientId: '',
      isRecurring: false,
      hasTax: false,
      taxRate: 6,
    });
    onClose();
  };

  if (!shouldRender && !isOpen) return null;

  return (
    <>
      <Overlay
        $isOpen={isOpen}
        onClick={handleClose}
        style={{ zIndex: 60 }}
        onAnimationEnd={handleAnimationEnd}
      />
      {isOpen && (
        <S.ModalContainer>
          <S.Header>
            <S.Title>{t('financial.modals.transaction.title')}</S.Title>
            <S.CloseButton onClick={handleClose}>
              <X size={20} />
            </S.CloseButton>
          </S.Header>

          <S.Form onSubmit={handleSubmit}>
            {/* Segmented Type Control */}
            <S.SegmentedControl>
              <S.SegmentedButton
                type="button"
                $active={formData.type === 'income'}
                $type="income"
                onClick={() => handleTypeChange('income')}
              >
                {t('financial.modals.transaction.income')}
              </S.SegmentedButton>
              <S.SegmentedButton
                type="button"
                $active={formData.type === 'expense'}
                $type="expense"
                onClick={() => handleTypeChange('expense')}
              >
                {t('financial.modals.transaction.expense')}
              </S.SegmentedButton>
            </S.SegmentedControl>

            {/* Large Amount Input */}
            <S.AmountContainer>
              <S.CurrencyPrefix>R$</S.CurrencyPrefix>
              <S.LargeAmountInput
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                autoFocus
                required
                step="0.01"
              />
            </S.AmountContainer>

            {/* Main Info */}
            <S.FormGroup>
              <S.Label>{t('financial.modals.transaction.description')}</S.Label>
              <div style={{ position: 'relative' }}>
                <S.Input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={t('financial.modals.transaction.placeholder_desc')}
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
                <FileText
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-gray-500)',
                  }}
                />
              </div>
            </S.FormGroup>

            <S.Grid>
              <S.FormGroup>
                <S.Label>{t('financial.modals.transaction.category')}</S.Label>
                <div style={{ position: 'relative' }}>
                  <S.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{ paddingLeft: '2.5rem' }}
                  >
                    {formData.type === 'income' ? (
                      <>
                        <option value="Project">{t('financial.categories.project')}</option>
                        <option value="Retainer">{t('financial.categories.retainer')}</option>
                        <option value="Consulting">{t('financial.categories.consulting')}</option>
                        <option value="Other">{t('financial.categories.other')}</option>
                      </>
                    ) : (
                      <>
                        <option value="Operational">{t('financial.categories.operational')}</option>
                        <option value="Freelance">{t('financial.categories.freelance')}</option>
                        <option value="Tax">{t('financial.categories.tax')}</option>
                        <option value="Marketing">{t('financial.categories.marketing')}</option>
                        <option value="Other">{t('financial.categories.other')}</option>
                      </>
                    )}
                  </S.Select>
                  <Tag
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-gray-500)',
                    }}
                  />
                </div>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>{t('financial.modals.transaction.date')}</S.Label>
                <div style={{ position: 'relative' }}>
                  <S.Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <Calendar
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-gray-500)',
                    }}
                  />
                </div>
              </S.FormGroup>
            </S.Grid>

            <S.Divider />

            {/* Context Links */}
            <S.Grid>
              <S.FormGroup>
                <S.Label>{t('financial.modals.transaction.project_opt')}</S.Label>
                <div style={{ position: 'relative' }}>
                  <S.Select
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    style={{ paddingLeft: '2.5rem' }}
                  >
                    <option value="">None</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </S.Select>
                  <Briefcase
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-gray-500)',
                    }}
                  />
                </div>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>{t('financial.modals.transaction.client_opt')}</S.Label>
                <div style={{ position: 'relative' }}>
                  <S.Select
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    style={{ paddingLeft: '2.5rem' }}
                  >
                    <option value="">None</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </S.Select>
                  <User
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-gray-500)',
                    }}
                  />
                </div>
              </S.FormGroup>
            </S.Grid>

            <S.SubmitButton type="submit">
              {t('financial.modals.transaction.save', {
                type:
                  formData.type === 'income'
                    ? t('financial.modals.transaction.income')
                    : t('financial.modals.transaction.expense'),
              })}
            </S.SubmitButton>
          </S.Form>
        </S.ModalContainer>
      )}
    </>
  );
};

export default TransactionFormModal;
