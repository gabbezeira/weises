import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../../../../context/AdminContext';
import * as S from './styles';

const BillingOptionsModal = ({ project, onClose }) => {
    const { t } = useTranslation();
    const { addInvoice } = useAdmin();
    const [option, setOption] = useState('single');
    const [installments, setInstallments] = useState(3);
    const [isProcessing, setIsProcessing] = useState(false);

    const projectValue = parseFloat(project?.privateDetails?.value) || 0;

    const handleGenerate = async () => {
        if (projectValue <= 0) {
            onClose();
            return;
        }

        setIsProcessing(true);
        try {
            const today = new Date();
            let charges = [];

            if (option === 'single') {
                charges.push({
                    amount: projectValue,
                    description: `Single payment for project: ${project.title}`,
                    date: today.toISOString().split('T')[0],
                    dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                });
            } else if (option === 'split') {
                charges.push({
                    amount: projectValue / 2,
                    description: `Deposit (50%) for project: ${project.title}`,
                    date: today.toISOString().split('T')[0],
                    dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                });
                charges.push({
                    amount: projectValue / 2,
                    description: `Final Payment (50%) for project: ${project.title}`,
                    date: project.estimatedCompletion || new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    dueDate: project.estimatedCompletion || new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                });
            } else if (option === 'custom') {
                const amountPerInst = projectValue / installments;
                for (let i = 0; i < installments; i++) {
                    const instDate = new Date(today.getTime() + i * 30 * 24 * 60 * 60 * 1000);
                    charges.push({
                        amount: amountPerInst,
                        description: `Installment ${i + 1}/${installments} for project: ${project.title}`,
                        date: instDate.toISOString().split('T')[0],
                        dueDate: instDate.toISOString().split('T')[0],
                    });
                }
            }

            for (const charge of charges) {
                await addInvoice({
                    ...charge,
                    clientId: project.clientId,
                    projectId: project.id,
                    status: 'pending',
                });
            }

            onClose();
        } catch (err) {
            console.error('Failed to generate invoices:', err);
            alert('Failed to generate invoices. Please try again.');
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

    if (projectValue <= 0) {
        return (
            <S.ModalOverlay>
                <S.ModalContent>
                    <S.ModalHeader>
                        <S.ModalTitle>{t('admin.billing.options.no_value_title', 'Billing Options')}</S.ModalTitle>
                        <S.CloseButton type="button" onClick={onClose}><X size={20} /></S.CloseButton>
                    </S.ModalHeader>
                    <S.ModalBody>
                        <S.HelperText>
                            {t('admin.billing.options.no_value_desc', 'No financial value set for this project.')}
                        </S.HelperText>
                    </S.ModalBody>
                    <S.ModalFooter>
                        <S.Button type="button" $secondary onClick={onClose}>{t('common.actions.cancel', 'Cancel')}</S.Button>
                    </S.ModalFooter>
                </S.ModalContent>
            </S.ModalOverlay>
        );
    }

    return (
        <S.ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
            <S.ModalContent>
                <S.ModalHeader>
                    <S.ModalTitle>{t('admin.billing.generate_options_title', 'Generate Billing')}</S.ModalTitle>
                    <S.CloseButton type="button" onClick={onClose} disabled={isProcessing}>
                        <X size={24} />
                    </S.CloseButton>
                </S.ModalHeader>

                <S.FormContainer>
                    <S.ModalBody>
                        <S.HelperText dangerouslySetInnerHTML={{ __html: t('admin.billing.generate_options_desc', { value: formatCurrency(projectValue) }) }} />

                        <S.BillingOptions>
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
                                            ({formatCurrency(projectValue / installments)}/mo)
                                        </S.InstallmentText>
                                    </S.CustomInstallments>
                                )}
                            </S.OptionCard>
                        </S.BillingOptions>
                    </S.ModalBody>

                    <S.ModalFooter>
                        <S.Button type="button" $secondary onClick={onClose} disabled={isProcessing}>
                            {t('common.actions.cancel', 'Cancel')}
                        </S.Button>
                        <S.Button type="button" onClick={handleGenerate} disabled={isProcessing}>
                            {isProcessing ? t('common.actions.generating', 'Generating...') : t('admin.billing.generate_btn', 'Generate Invoices')}
                        </S.Button>
                    </S.ModalFooter>
                </S.FormContainer>
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default BillingOptionsModal;
