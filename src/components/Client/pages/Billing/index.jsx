import React, { useState } from 'react';
import * as S from './styles';
import { useClient } from '../../../../context/ClientContext';
import { Download, Plus, CreditCard, ShoppingBag } from 'lucide-react';
import Pagination from '../../../ui/Pagination';
import { useTranslation } from 'react-i18next';

const ClientBilling = () => {
  const { clientInvoices } = useClient();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [creditCard, setCreditCard] = useState(null);
  const itemsPerPage = 5;

  const invoices = clientInvoices.filter((t) => t.type === 'income');
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const paginatedInvoices = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDownload = (id) => alert(`Downloading invoice #${id}...`);
  const handlePay = (id) => alert(`Redirecting to payment gateway for invoice #${id}...`);

  const handleAddCard = () => {
    const mockCard = {
      number: '•••• •••• •••• 4242',
      holder: 'ACME CORP',
      expiry: '12/28',
      brand: 'VISA',
    };
    setCreditCard(mockCard);
    alert('Card added successfully!');
  };

  return (
    <S.Container>
      <S.Header>
        <h1>{t('client.billing.title')}</h1>
        <p>{t('client.billing.subtitle')}</p>
      </S.Header>

      <div>
        <S.SectionTitle>
          <CreditCard size={20} /> {t('client.billing.payment_methods')}
        </S.SectionTitle>
        {creditCard ? (
          <S.CreditCard>
            <div className="chip"></div>
            <div className="number">{creditCard.number}</div>
            <div className="footer">
              <div className="holder">
                <span>{t('client.billing.card_holder')}</span>
                <strong>{creditCard.holder}</strong>
              </div>
              <div className="brand">{creditCard.brand}</div>
            </div>
          </S.CreditCard>
        ) : (
          <S.CreditCard className="empty" onClick={handleAddCard}>
            <S.AddCardWrapper>
              <Plus size={32} />
              <S.AddCardText>{t('client.billing.add_card')}</S.AddCardText>
            </S.AddCardWrapper>
          </S.CreditCard>
        )}
      </div>

      <div>
        <S.SectionTitle>{t('client.billing.invoice_history')}</S.SectionTitle>
        <S.InvoiceTable>
          <table>
            <thead>
              <tr>
                <th>{t('client.billing.table.date')}</th>
                <th>{t('client.billing.table.description')}</th>
                <th>{t('client.billing.table.amount')}</th>
                <th>{t('client.billing.table.status')}</th>
                <th>{t('client.billing.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>{new Date(inv.date).toLocaleDateString()}</td>
                    <td>{inv.description}</td>
                    <td className="amount">
                      R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <S.StatusBadge $status={inv.status}>{inv.status}</S.StatusBadge>
                    </td>
                    <td>
                      <S.ActionWrapper>
                        <S.DownloadButton
                          onClick={() => handleDownload(inv.id)}
                          title="Download PDF"
                        >
                          <Download size={18} />
                        </S.DownloadButton>
                        {inv.status === 'pending' && (
                          <S.PayButton onClick={() => handlePay(inv.id)}>
                            {t('client.billing.table.pay_now')}
                          </S.PayButton>
                        )}
                      </S.ActionWrapper>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <S.EmptyStateCell colSpan="5">{t('client.billing.table.empty')}</S.EmptyStateCell>
                </tr>
              )}
            </tbody>
          </table>
        </S.InvoiceTable>

        <S.PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </S.PaginationWrapper>
      </div>
    </S.Container>
  );
};

export default ClientBilling;
