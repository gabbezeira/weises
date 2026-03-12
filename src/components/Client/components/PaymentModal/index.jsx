import {
  CheckCircle,
  ChevronDown,
  Copy,
  CreditCard,
  QrCode,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AmexIcon from '../../../../assets/images/card-icons/amex.svg';
import DinersIcon from '../../../../assets/images/card-icons/diners.svg';
import DiscoverIcon from '../../../../assets/images/card-icons/discover.svg';
import EloIcon from '../../../../assets/images/card-icons/elo.svg';
import GenericIcon from '../../../../assets/images/card-icons/generic.svg';
import HipercardIcon from '../../../../assets/images/card-icons/hipercard.svg';
import JcbIcon from '../../../../assets/images/card-icons/jcb.svg';
import MaestroIcon from '../../../../assets/images/card-icons/maestro.svg';
import MastercardIcon from '../../../../assets/images/card-icons/mastercard.svg';
import UnionpayIcon from '../../../../assets/images/card-icons/unionpay.svg';
import VisaIcon from '../../../../assets/images/card-icons/visa.svg';
import { useAuth } from '../../../../context/AuthContext';
import { api } from '../../../../services/api';
import * as S from './styles';

const CARD_ICONS = {
  amex: AmexIcon,
  diners: DinersIcon,
  discover: DiscoverIcon,
  elo: EloIcon,
  hipercard: HipercardIcon,
  jcb: JcbIcon,
  maestro: MaestroIcon,
  mastercard: MastercardIcon,
  unionpay: UnionpayIcon,
  visa: VisaIcon,
};

const BrandIcon = ({ brand, size = 36 }) => {
  const iconSrc = CARD_ICONS[brand?.toLowerCase()] || GenericIcon;
  return (
    <img
      src={iconSrc}
      alt={brand || 'Card'}
      style={{ width: size, height: 'auto', objectFit: 'contain' }}
    />
  );
};

const PaymentModal = ({ invoice, onClose }) => {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('pix');
  const [copied, setCopied] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [stripeFee, setStripeFee] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeTab === 'card' && profile?.clientId && invoice) {
      fetchMethods();
    }
  }, [activeTab, user, invoice]);

  useEffect(() => {
    if (invoice) {
      const fee = invoice.amount * 0.0399 + 0.39;
      setStripeFee(fee);
    }
  }, [invoice]);

  const fetchMethods = async () => {
    try {
      const response = await api.get(`/stripe/payment-methods/${profile.clientId}`);
      const cards = response?.data?.data || [];
      setMethods(cards);
      if (cards.length > 0) {
        setSelectedMethod(cards[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch methods:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val || 0);
  };

  if (!invoice) return null;

  const pixKey = '70021944610';

  const handleStripePayment = async () => {
    if (!selectedMethod) return alert(t('client.billing.payment.select_card_first'));

    try {
      setIsCheckoutLoading(true);
      const response = await api.post('/stripe/payment-intent', {
        invoiceId: invoice.id,
        paymentMethodId: selectedMethod,
      });

      const result = response?.data;
      if (result?.status === 'succeeded' || result?.clientSecret) {
        alert(t('client.billing.payment.success'));
        window.location.reload();
      }
    } catch (error) {
      console.error('Stripe Exception:', error);
      alert(error.message || t('client.billing.payment.stripe_error'));
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <S.ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>{t('client.billing.payment.title')}</h2>
          <S.CloseButton onClick={onClose}>
            <X size={24} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.Tabs>
          <S.FirstTab $active={activeTab === 'pix'} onClick={() => setActiveTab('pix')}>
            <QrCode size={18} /> Pix
          </S.FirstTab>
          <S.Tab $active={activeTab === 'card'} onClick={() => setActiveTab('card')}>
            <Smartphone size={18} /> {t('client.billing.payment.credit_card')}
          </S.Tab>
        </S.Tabs>

        <S.ModalBody>
          {activeTab === 'pix' && (
            <S.PixContainer>
              <S.PixAmountBox>
                <h3>{formatCurrency(invoice.amount)}</h3>
                <p>{invoice.description}</p>
              </S.PixAmountBox>

              <S.QrCodePlaceholder>
                <QrCode />
              </S.QrCodePlaceholder>

              <S.InstructionBox>
                <p>{t('client.billing.payment.pix.step1')}</p>
                <p>{t('client.billing.payment.pix.step2')}</p>
                <p>
                  {t('client.billing.payment.pix.step3')}
                  <br />
                  <strong>+55 34 99675-4222</strong>
                </p>
              </S.InstructionBox>

              <S.CopyGroup>
                <code>{pixKey}</code>
                <button onClick={handleCopy} title={t('client.billing.payment.pix.copy_title')}>
                  {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                </button>
              </S.CopyGroup>

              {copied && (
                <S.AlertBox>
                  <CheckCircle size={16} /> {t('client.billing.payment.pix.copied')}
                </S.AlertBox>
              )}
            </S.PixContainer>
          )}

          {activeTab === 'card' && (
            <S.PixContainer>
              <S.CardSection>
                <ShieldCheck size={48} color="var(--color-primary)" />
                <S.ReceiptBox>
                  <div className="line">
                    <span>
                      {t('client.billing.payment.receipt.original')} ({invoice.description})
                    </span>
                    <strong>{formatCurrency(invoice.amount)}</strong>
                  </div>
                  <div className="line tax">
                    <span>{t('client.billing.payment.receipt.fee')}</span>
                    <strong>+ {formatCurrency(stripeFee)}</strong>
                  </div>
                  <div className="line total">
                    <span>{t('client.billing.payment.receipt.total')}</span>
                    <strong>{formatCurrency(invoice.amount + stripeFee)}</strong>
                  </div>
                </S.ReceiptBox>
              </S.CardSection>

              <S.InstructionBox>
                {methods.length > 0 ? (
                  <S.CardSelectGroup>
                    <S.CardSelectLabel>{t('client.billing.payment.select_card')}</S.CardSelectLabel>
                    <S.CardDropdown ref={dropdownRef}>
                      <S.CardDropdownTrigger
                        type="button"
                        $open={isDropdownOpen}
                        disabled={isCheckoutLoading}
                        onClick={() => setIsDropdownOpen((o) => !o)}
                      >
                        {(() => {
                          const current = methods.find((m) => m.id === selectedMethod);
                          return current ? (
                            <>
                              <BrandIcon brand={current.card.brand} size={36} />
                              <S.CardDropdownLabel>
                                {current.card.brand.toUpperCase()} •••• {current.card.last4}
                                &nbsp;(Exp: {String(current.card.exp_month).padStart(2, '0')}/
                                {current.card.exp_year})
                              </S.CardDropdownLabel>
                            </>
                          ) : (
                            <S.CardDropdownLabel>
                              {t('client.billing.payment.select_card')}
                            </S.CardDropdownLabel>
                          );
                        })()}
                        <S.CardDropdownChevron $open={isDropdownOpen}>
                          <ChevronDown size={16} />
                        </S.CardDropdownChevron>
                      </S.CardDropdownTrigger>

                      {isDropdownOpen && (
                        <S.CardDropdownMenu>
                          {methods.map((pm) => (
                            <S.CardDropdownItem
                              key={pm.id}
                              type="button"
                              $selected={pm.id === selectedMethod}
                              onClick={() => {
                                setSelectedMethod(pm.id);
                                setIsDropdownOpen(false);
                              }}
                            >
                              <BrandIcon brand={pm.card.brand} size={36} />
                              <span>
                                {pm.card.brand.toUpperCase()} •••• {pm.card.last4}
                                &nbsp;(Exp: {String(pm.card.exp_month).padStart(2, '0')}/
                                {pm.card.exp_year})
                              </span>
                            </S.CardDropdownItem>
                          ))}
                        </S.CardDropdownMenu>
                      )}
                    </S.CardDropdown>
                    <S.CardSelectHint>{t('client.billing.payment.fee_hint')}</S.CardSelectHint>
                  </S.CardSelectGroup>
                ) : (
                  <S.NoCardsWarning>{t('client.billing.payment.no_cards')}</S.NoCardsWarning>
                )}
              </S.InstructionBox>

              <S.PayActionButton
                onClick={handleStripePayment}
                disabled={isCheckoutLoading || methods.length === 0 || !selectedMethod}
              >
                {isCheckoutLoading ? (
                  t('client.billing.payment.processing')
                ) : (
                  <>
                    {t('client.billing.payment.pay_now')}
                    <CreditCard size={18} />
                  </>
                )}
              </S.PayActionButton>
            </S.PixContainer>
          )}
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default PaymentModal;
