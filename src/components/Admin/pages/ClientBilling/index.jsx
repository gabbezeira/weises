import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../../context/AdminContext';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, CheckCircle, FileText } from 'lucide-react';
import Loader from '../../../ui/Loader';
import NewChargeModal from '../../components/NewChargeModal';
import * as S from './styles';

const ClientBilling = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { clients, projects, invoices, updateInvoice, isLoading } = useAdmin();

    const [client, setClient] = useState(null);
    const [clientInvoices, setClientInvoices] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isNewChargeModalOpen, setIsNewChargeModalOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && clients.length) {
            const foundClient = clients.find((c) => c.id === id);
            setClient(foundClient);

            const filteredInvoices = invoices.filter((inv) => inv.clientId === id);
            filteredInvoices.sort((a, b) => new Date(b.date) - new Date(a.date));
            setClientInvoices(filteredInvoices);
        }
    }, [id, clients, invoices, isLoading]);

    const handleMarkAsPaid = async (invoiceId) => {
        if (!window.confirm(t('admin.clients.billing.mark_paid_confirm'))) {
            return;
        }

        setIsProcessing(true);
        try {
            await updateInvoice(invoiceId, { status: 'paid' });
        } catch (err) {
            alert('Failed to update invoice status.');
        } finally {
            setIsProcessing(false);
        }
    };

    const getProjectName = (projectId) => {
        if (!projectId) return 'Ad-hoc Service';
        const proj = projects.find((p) => p.id === projectId);
        return proj ? proj.title : 'Deleted Project';
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat((navigator.language || 'pt-BR'), {
            style: 'currency',
            currency: 'BRL',
        }).format(val || 0);
    };

    if (isLoading || !client) {
        return <Loader />;
    }

    return (
        <S.Container>
            <S.Header>
                <S.TitleGroup>
                    <S.BackButton onClick={() => navigate('/admin/clients')}>
                        <ArrowLeft size={16} /> {t('admin.clients.billing.back')}
                    </S.BackButton>
                    <S.Title>{t('admin.clients.billing.title')}</S.Title>
                    <S.SubTitle>{client.name} - {client.company}</S.SubTitle>
                </S.TitleGroup>

                <S.ActionGroup>
                    <S.Button $primary onClick={() => setIsNewChargeModalOpen(true)}>
                        <Plus size={16} /> {t('admin.clients.billing.new_charge')}
                    </S.Button>
                </S.ActionGroup>
            </S.Header>

            <S.Content>
                {clientInvoices.length === 0 ? (
                    <S.EmptyState>
                        <FileText size={48} style={{ opacity: 0.5 }} />
                        <p>{t('admin.clients.billing.empty')}</p>
                    </S.EmptyState>
                ) : (
                    <S.Table>
                        <thead>
                            <tr>
                                <S.Th>{t('admin.clients.billing.table.date')}</S.Th>
                                <S.Th>{t('admin.clients.billing.table.description')}</S.Th>
                                <S.Th>{t('admin.clients.billing.table.project')}</S.Th>
                                <S.Th>{t('admin.clients.billing.table.amount')}</S.Th>
                                <S.Th>{t('admin.clients.billing.table.status')}</S.Th>
                                <S.Th>{t('admin.clients.billing.table.actions')}</S.Th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientInvoices.map((inv) => (
                                <tr key={inv.id}>
                                    <S.Td>{new Date(inv.date).toLocaleDateString()}</S.Td>
                                    <S.Td><strong>{inv.description}</strong></S.Td>
                                    <S.Td>{getProjectName(inv.projectId)}</S.Td>
                                    <S.Td>{formatCurrency(inv.amount)}</S.Td>
                                    <S.Td>
                                        <S.StatusBadge $status={inv.status}>
                                            {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                                        </S.StatusBadge>
                                    </S.Td>
                                    <S.Td>
                                        {inv.status !== 'paid' && (
                                            <S.Button
                                                $primary
                                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                                onClick={() => handleMarkAsPaid(inv.id)}
                                                disabled={isProcessing}
                                            >
                                                <CheckCircle size={14} /> {t('admin.clients.billing.mark_paid')}
                                            </S.Button>
                                        )}
                                    </S.Td>
                                </tr>
                            ))}
                        </tbody>
                    </S.Table>
                )}
            </S.Content>

            {isNewChargeModalOpen && client && (
                <NewChargeModal
                    client={client}
                    projects={projects}
                    onClose={() => setIsNewChargeModalOpen(false)}
                />
            )}
        </S.Container>
    );
};

export default ClientBilling;
