import { CreditCard, FileText, ReceiptText } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClient } from '../../../../context/ClientContext';
import Pagination from '../../../ui/Pagination';
import PaymentModal from '../../components/PaymentModal';
import PaymentMethodsList from './PaymentMethodsList';
import * as S from './styles';

const TABS = [
  { id: 'invoices', labelKey: 'client.billing.tabs.invoices', icon: ReceiptText },
  { id: 'methods', labelKey: 'client.billing.tabs.methods', icon: CreditCard },
];

const ClientBilling = () => {
  const { clientInvoices } = useClient();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('invoices');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const itemsPerPage = 8;

  const invoices = clientInvoices || [];
  const totalPages = Math.max(1, Math.ceil(invoices.length / itemsPerPage));
  const paginatedInvoices = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const pendingCount = invoices.filter((i) => i.status === 'pending').length;
  const overdueCount = invoices.filter((i) => i.status === 'overdue').length;

  const formatCurrency = (val) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

  const handlePay = (id) => {
    const inv = invoices.find((i) => i.id === id);
    setSelectedInvoice(inv);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return t('client.billing.status.pending', 'Pendente');
      case 'paid':
        return t('client.billing.status.paid', 'Pago');
      case 'overdue':
        return t('client.billing.status.overdue', 'Vencido');
      default:
        return status;
    }
  };

  return (
    <S.Container>
      <S.PageHeader>
        <S.PageTitleGroup>
          <S.PageIcon>
            <FileText size={22} />
          </S.PageIcon>
          <div>
            <h1>{t('client.billing.title', 'Faturamento')}</h1>
            <p>{t('client.billing.subtitle', 'Gerencie faturas e métodos de pagamento.')}</p>
          </div>
        </S.PageTitleGroup>

        <S.StatPills>
          {pendingCount > 0 && (
            <S.StatPill $variant="warning">
              <span>{pendingCount}</span>
              {t('client.billing.stats.pending', 'pendente(s)')}
            </S.StatPill>
          )}
          {overdueCount > 0 && (
            <S.StatPill $variant="danger">
              <span>{overdueCount}</span>
              {t('client.billing.stats.overdue', 'vencida(s)')}
            </S.StatPill>
          )}
        </S.StatPills>
      </S.PageHeader>

      <S.TabBar>
        {TABS.map(({ id, labelKey, icon: Icon }) => (
          <S.TabBtn key={id} $active={activeTab === id} onClick={() => setActiveTab(id)}>
            <Icon size={16} />
            {t(labelKey)}
          </S.TabBtn>
        ))}
      </S.TabBar>

      <S.TabContent>
        {activeTab === 'invoices' && (
          <S.Panel>
            <S.PanelHeader>
              <S.PanelTitle>
                {t('client.billing.invoice_history', 'Histórico de Faturas')}
              </S.PanelTitle>
              <S.InvoiceCount>
                {invoices.length} {t('client.billing.stats.total', 'fatura(s)')}
              </S.InvoiceCount>
            </S.PanelHeader>

            <S.InvoiceTable>
              <table>
                <thead>
                  <tr>
                    <th>{t('client.billing.table.due_date', 'Vencimento')}</th>
                    <th>{t('client.billing.table.description', 'Descrição')}</th>
                    <th>{t('client.billing.table.amount', 'Valor')}</th>
                    <th>{t('client.billing.table.status', 'Status')}</th>
                    <th>{t('client.billing.table.actions', 'Ações')}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.length > 0 ? (
                    paginatedInvoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="date">
                          {inv.dueDate
                            ? new Date(inv.dueDate).toLocaleDateString('pt-BR')
                            : new Date(inv.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td>{inv.description}</td>
                        <td className="amount">{formatCurrency(inv.amount)}</td>
                        <td>
                          <S.StatusBadge $status={inv.status}>
                            {getStatusText(inv.status)}
                          </S.StatusBadge>
                        </td>
                        <td>
                          {inv.status === 'pending' && (
                            <S.PayButton onClick={() => handlePay(inv.id)}>
                              {t('client.billing.table.pay_now', 'Pagar')}
                            </S.PayButton>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <S.EmptyStateCell colSpan="5">
                        {t('client.billing.table.empty', 'Nenhuma fatura encontrada.')}
                      </S.EmptyStateCell>
                    </tr>
                  )}
                </tbody>
              </table>
            </S.InvoiceTable>

            {totalPages > 1 && (
              <S.PaginationWrapper>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </S.PaginationWrapper>
            )}
          </S.Panel>
        )}

        {activeTab === 'methods' && (
          <S.Panel>
            <PaymentMethodsList />
          </S.Panel>
        )}
      </S.TabContent>

      <PaymentModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
    </S.Container>
  );
};

export default ClientBilling;
