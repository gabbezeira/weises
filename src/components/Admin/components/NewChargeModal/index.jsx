import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../../../../context/AdminContext';
import Modal from '../../../../components/common/Modal';
import * as S from './styles';

const NewChargeModal = ({ client, projects, onClose }) => {
    const { t } = useTranslation();
    const { addInvoice, services } = useAdmin();

    const [isProcessing, setIsProcessing] = useState(false);
    const [option, setOption] = useState('single');
    const [installments, setInstallments] = useState(3);

    const [formData, setFormData] = useState({
        serviceId: '',
        title: '',
        amount: '',
        dueDate: '',
        projectId: '',
        paymentMethod: 'pix',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'serviceId') {
            const selectedService = (services || []).find(s => s.id === value);
            if (selectedService) {
                setFormData(prev => ({
                    ...prev,
                    serviceId: value,
                    title: selectedService.name,
                    amount: selectedService.price
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    serviceId: '',
                    title: '',
                    amount: ''
                }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.amount || (option === 'single' && !formData.dueDate)) {
            alert(t('common.errors.fill_all_fields', 'Please fill out all required fields.'));
            return;
        }

        const value = parseFloat(formData.amount);
        if (value <= 0 || isNaN(value)) {
            alert(t('common.errors.invalid_amount', 'Amount must be greater than zero.'));
            return;
        }

        setIsProcessing(true);
        try {
            const today = new Date();
            let charges = [];
            const baseDateStr = today.toISOString().split('T')[0];
            const dueDateStr = formData.dueDate || baseDateStr;

            if (option === 'single') {
                charges.push({
                    amount: value,
                    description: formData.title,
                    date: baseDateStr,
                    dueDate: dueDateStr,
                });
            } else if (option === 'split') {
                charges.push({
                    amount: value / 2,
                    description: `Deposit (50%) - ${formData.title}`,
                    date: baseDateStr,
                    dueDate: baseDateStr,
                });

                const secondDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                charges.push({
                    amount: value / 2,
                    description: `Final Payment (50%) - ${formData.title}`,
                    date: baseDateStr,
                    dueDate: formData.dueDate ? formData.dueDate : secondDate,
                });
            } else if (option === 'custom') {
                const amountPerInst = value / installments;
                for (let i = 0; i < installments; i++) {
                    const instDate = new Date(today.getTime() + i * 30 * 24 * 60 * 60 * 1000);
                    charges.push({
                        amount: amountPerInst,
                        description: `Installment ${i + 1}/${installments} - ${formData.title}`,
                        date: baseDateStr,
                        dueDate: instDate.toISOString().split('T')[0],
                    });
                }
            }

            for (const charge of charges) {
                await addInvoice({
                    ...charge,
                    projectId: formData.projectId || null,
                    clientId: client.id,
                    status: 'pending',
                    paymentMethod: formData.paymentMethod,
                });
            }

            onClose();
        } catch (err) {
            console.error('Failed to generate ad-hoc charge:', err);
            alert(t('common.errors.generate_charge_failed', 'Failed to generate charge. Please try again.'));
        } finally {
            setIsProcessing(false);
        }
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat((navigator.language || 'pt-BR'), {
            style: 'currency',
            currency: 'BRL',
        }).format(val || 0);
    };

    const parsedAmount = parseFloat(formData.amount) || 0;

    return (
        <Modal.Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
            <Modal.Content $maxWidth="500px">
                <Modal.Header>
                    <Modal.Title>{t('admin.billing.new_charge_title', 'New Ad-hoc Charge for')} {client.name}</Modal.Title>
                    <Modal.CloseButton type="button" onClick={onClose} disabled={isProcessing}>
                        <X size={24} />
                    </Modal.CloseButton>
                </Modal.Header>

                <Modal.FormContainer onSubmit={handleGenerate}>
                    <Modal.Body>
                        <S.HelperText>
                            {t('admin.billing.new_charge_desc', 'Generate a new invoice manually. Once marked as paid, it will become an income transaction.')}
                        </S.HelperText>

                        <S.FormGroup>
                            <S.Label>{t('admin.billing.select_service', 'Select Service')} ({t('common.optional', 'Optional')})</S.Label>
                            <S.Select name="serviceId" value={formData.serviceId} onChange={handleChange}>
                                <option value="">{t('admin.billing.custom_service', '-- Custom Item / Ad-hoc --')}</option>
                                {(services || []).map(s => (
                                    <option key={s.id} value={s.id}>{s.name} - {formatCurrency(s.price)}</option>
                                ))}
                            </S.Select>
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>{t('admin.billing.fields.description', 'Description / Title')} *</S.Label>
                            <S.Input
                                name="title"
                                placeholder={t('admin.billing.placeholders.description', "e.g. Extra Server Setup")}
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>{t('admin.billing.fields.amount', 'Total Amount')} (R$)</S.Label>
                            <S.Input
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="150.00"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>{t('admin.billing.fields.project_link', 'Link to Project')} ({t('common.optional', 'Optional')})</S.Label>
                            <S.Select name="projectId" value={formData.projectId} onChange={handleChange}>
                                <option value="">{t('admin.billing.no_project', '-- No Project (Ad-hoc) --')}</option>
                                {projects.filter(p => p.clientId === client.id).map(p => (
                                    <option key={p.id} value={p.id}>{p.title}</option>
                                ))}
                            </S.Select>
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>{t('admin.billing.fields.payment_method', 'Payment Method')} *</S.Label>
                            <S.Select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                                <option value="pix">{t('admin.billing.options.pix', 'Pix')}</option>
                                <option value="credit_card">{t('admin.billing.options.credit_card', 'Credit Card')}</option>
                            </S.Select>
                        </S.FormGroup>

                        {/* Billing Options Selection */}
                        {parsedAmount > 0 && (
                            <S.BillingOptions>
                                <S.SpacedLabel>{t('admin.billing.fields.payment_structure', 'Payment Structure')}</S.SpacedLabel>

                                <S.OptionCard
                                    $selected={option === 'single'}
                                    onClick={() => setOption('single')}
                                >
                                    <S.OptionTitle>{t('admin.billing.options.single', 'Single Payment')}</S.OptionTitle>
                                    <S.OptionDesc>{t('admin.billing.options.single_desc', 'Generate 1 invoice for the full amount immediately.')}</S.OptionDesc>
                                </S.OptionCard>

                                <S.OptionCard
                                    $selected={option === 'split'}
                                    onClick={() => setOption('split')}
                                >
                                    <S.OptionTitle>{t('admin.billing.options.split', '50/50 Split')}</S.OptionTitle>
                                    <S.OptionDesc>{t('admin.billing.options.split_desc', 'Generate 1 deposit invoice now and 1 for later.')}</S.OptionDesc>
                                </S.OptionCard>

                                <S.OptionCard
                                    $selected={option === 'custom'}
                                    onClick={() => setOption('custom')}
                                >
                                    <S.OptionTitle>{t('admin.billing.options.installments', 'Monthly Installments')}</S.OptionTitle>
                                    <S.OptionDesc>{t('admin.billing.options.installments_desc', 'Split evenly into multiple monthly invoices.')}</S.OptionDesc>

                                    {option === 'custom' && (
                                        <S.CustomInstallments onClick={(e) => e.stopPropagation()}>
                                            <S.InstallmentText>
                                                {t('admin.billing.options.months_label', 'Months')}:
                                            </S.InstallmentText>
                                            <S.InstallmentInput
                                                type="number"
                                                min="2"
                                                max="24"
                                                value={installments}
                                                onChange={(e) => setInstallments(parseInt(e.target.value) || 2)}
                                            />
                                            <S.InstallmentText>
                                                ({formatCurrency(parsedAmount / installments)}/mo)
                                            </S.InstallmentText>
                                        </S.CustomInstallments>
                                    )}
                                </S.OptionCard>
                            </S.BillingOptions>
                        )}

                        {/* Conditionally show Due Date for Single or final split payment */}
                        {(option === 'single' || option === 'split') && (
                            <S.DateGroup>
                                <S.Label>
                                    {option === 'single' ? t('admin.billing.fields.due_date', 'Due Date') : t('admin.billing.fields.split_due_date', 'Final Payment Due Date')} *
                                </S.Label>
                                <S.Input
                                    name="dueDate"
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    required={option === 'single'}
                                />
                            </S.DateGroup>
                        )}

                    </Modal.Body>

                    <Modal.Footer>
                        <S.Button type="button" $secondary onClick={onClose} disabled={isProcessing}>
                            {t('common.actions.cancel', 'Cancel')}
                        </S.Button>
                        <S.Button type="submit" disabled={isProcessing}>
                            {isProcessing ? t('common.actions.generating', 'Generating...') : t('admin.billing.generate_btn', 'Generate Invoice')}
                        </S.Button>
                    </Modal.Footer>
                </Modal.FormContainer>
            </Modal.Content>
        </Modal.Overlay>
    );
};

export default NewChargeModal;
