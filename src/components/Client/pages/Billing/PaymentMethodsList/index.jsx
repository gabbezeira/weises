import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  Lock,
  Plus,
  ShieldCheck,
  Trash2,
  Wifi,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { useTranslation } from 'react-i18next';
import AmexIcon from '../../../../../assets/images/card-icons/amex.svg';
import DinersIcon from '../../../../../assets/images/card-icons/diners.svg';
import DiscoverIcon from '../../../../../assets/images/card-icons/discover.svg';
import EloIcon from '../../../../../assets/images/card-icons/elo.svg';
import GenericIcon from '../../../../../assets/images/card-icons/generic.svg';
import HipercardIcon from '../../../../../assets/images/card-icons/hipercard.svg';
import JcbIcon from '../../../../../assets/images/card-icons/jcb.svg';
import MaestroIcon from '../../../../../assets/images/card-icons/maestro.svg';
import MastercardIcon from '../../../../../assets/images/card-icons/mastercard.svg';
import UnionpayIcon from '../../../../../assets/images/card-icons/unionpay.svg';
import VisaIcon from '../../../../../assets/images/card-icons/visa.svg';
import { useAuth } from '../../../../../context/AuthContext';
import { api } from '../../../../../services/api';

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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_sample');

const STRIPE_STYLE = {
  style: {
    base: {
      color: '#e2e8f0',
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '15px',
      '::placeholder': { color: '#4b5563' },
    },
    invalid: { color: '#ef4444', iconColor: '#ef4444' },
  },
};

const BrandIcon = ({ brand, size = 44 }) => {
  const iconSrc = CARD_ICONS[brand?.toLowerCase()] || GenericIcon;
  return (
    <img
      src={iconSrc}
      alt={brand || 'Card'}
      style={{ width: size, height: 'auto', objectFit: 'contain' }}
    />
  );
};

const formatCardNumber = (last4) => (last4 ? `•••• •••• •••• ${last4}` : '•••• •••• •••• ••••');

const AddCardForm = ({ clientId, onCardAdded, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cep, setCep] = useState('');

  const [cardBrand, setCardBrand] = useState('default');
  const [cardLast4, setCardLast4] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  const [numberComplete, setNumberComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);
  const [cvcComplete, setCvcComplete] = useState(false);

  const isFormComplete = numberComplete && expiryComplete && cvcComplete && cep.length >= 5;

  const handleNumberChange = (e) => {
    if (e.brand && e.brand !== 'unknown') setCardBrand(e.brand);
    setNumberComplete(e.complete);
    if (e.error) setError(e.error.message);
    else setError(null);
    if (!e.complete) setCardLast4('');
  };

  const handleExpiryChange = (e) => {
    setExpiryComplete(e.complete);
    if (e.complete && e.value) {
      const [month, year] = e.value.split('/').map((s) => s.trim());
      setCardExpiry(month && year ? `${month}/${year}` : '');
    } else {
      setCardExpiry('');
    }
    if (e.error) setError(e.error.message);
    else setError(null);
  };

  const handleCvcChange = (e) => {
    setCvcComplete(e.complete);
    if (e.error) setError(e.error.message);
    else setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !isFormComplete) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/stripe/setup-intent', { clientId });
      const clientSecret = response?.data?.clientSecret;
      if (!clientSecret) throw new Error('Não foi possível iniciar a configuração de segurança.');

      const cardNumberElement = elements.getElement(CardNumberElement);
      const { setupIntent, error: stripeError } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: { address: { postal_code: cep } },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (setupIntent?.status === 'succeeded') {
        setSuccess(true);
        setTimeout(() => onCardAdded(), 1400);
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.AddFormWrapper>
      <S.CardPreviewSide>
        <S.CardVisual $brand={cardBrand}>
          <S.CardVisualGloss />
          <S.CardVisualTop>
            <S.ChipIcon>
              <S.ChipLine />
              <S.ChipLine />
              <S.ChipLine />
            </S.ChipIcon>
            <Wifi size={20} />
          </S.CardVisualTop>
          <S.CardVisualNumber>{formatCardNumber(cardLast4)}</S.CardVisualNumber>
          <S.CardVisualBottom>
            <S.CardVisualField>
              <S.CardVisualLabel>Vencimento</S.CardVisualLabel>
              <S.CardVisualValue>{cardExpiry || 'MM / AA'}</S.CardVisualValue>
            </S.CardVisualField>
            <S.CardBrandLabel>
              {cardBrand !== 'default' ? cardBrand.toUpperCase() : 'CARTÃO'}
            </S.CardBrandLabel>
          </S.CardVisualBottom>
        </S.CardVisual>
      </S.CardPreviewSide>

      <S.FormSide onSubmit={handleSubmit}>
        <S.FormSecurity>
          <ShieldCheck size={14} />
          <span>Dados protegidos — Stripe PCI DSS</span>
        </S.FormSecurity>

        <S.FieldsGrid>
          <S.FormFieldFull>
            <S.FormLabel>Número do Cartão</S.FormLabel>
            <S.StripeFieldWrapper>
              <CardNumberElement options={STRIPE_STYLE} onChange={handleNumberChange} />
            </S.StripeFieldWrapper>
          </S.FormFieldFull>

          <S.FormFieldHalf>
            <S.FormLabel>Validade</S.FormLabel>
            <S.StripeFieldWrapper>
              <CardExpiryElement options={STRIPE_STYLE} onChange={handleExpiryChange} />
            </S.StripeFieldWrapper>
          </S.FormFieldHalf>

          <S.FormFieldHalf>
            <S.FormLabel>CVC</S.FormLabel>
            <S.StripeFieldWrapper>
              <CardCvcElement options={STRIPE_STYLE} onChange={handleCvcChange} />
            </S.StripeFieldWrapper>
          </S.FormFieldHalf>

          <S.FormFieldFull>
            <S.FormLabel>
              <Lock size={12} />
              CEP de Cobrança
            </S.FormLabel>
            <S.CepInput
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
              maxLength={8}
              inputMode="numeric"
            />
          </S.FormFieldFull>
        </S.FieldsGrid>

        {error && (
          <S.ErrorBanner>
            <AlertCircle size={14} />
            <span>{error}</span>
          </S.ErrorBanner>
        )}

        {success && (
          <S.SuccessBanner>
            <CheckCircle size={14} />
            <span>Cartão salvo com sucesso!</span>
          </S.SuccessBanner>
        )}

        <S.FormActions>
          <S.CancelBtn type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </S.CancelBtn>
          <S.SubmitBtn type="submit" disabled={!stripe || loading || !isFormComplete}>
            {loading ? 'Salvando...' : 'Salvar Cartão'}
          </S.SubmitBtn>
        </S.FormActions>
      </S.FormSide>
    </S.AddFormWrapper>
  );
};

const PaymentMethodsList = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const clientId = profile?.clientId;

  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchMethods = async () => {
    if (!clientId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/stripe/payment-methods/${clientId}`);
      setMethods(response?.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch payment methods', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, [clientId]);

  const handleRemoveCard = async (methodId) => {
    if (!window.confirm('Remover este cartão?')) return;
    try {
      await api.del(`/stripe/payment-methods/${methodId}`);
      fetchMethods();
    } catch (err) {
      alert('Erro ao remover cartão: ' + err.message);
    }
  };

  if (loading) {
    return (
      <S.LoadingWrapper>
        <CreditCard size={22} />
        <span>Carregando métodos de pagamento...</span>
      </S.LoadingWrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.SectionHeader>
        <S.SectionTitleGroup>
          <S.SectionIcon>
            <CreditCard size={17} />
          </S.SectionIcon>
          <div>
            <S.SectionTitle>Cartões Salvos</S.SectionTitle>
            <S.SectionSubtitle>
              {methods.length > 0
                ? `${methods.length} cartão(ões) na sua conta`
                : 'Nenhum cartão cadastrado'}
            </S.SectionSubtitle>
          </div>
        </S.SectionTitleGroup>

        {!showAddForm && (
          <S.AddCardBtn onClick={() => setShowAddForm(true)}>
            <Plus size={15} />
            Adicionar Cartão
          </S.AddCardBtn>
        )}
      </S.SectionHeader>

      {showAddForm && (
        <S.AddFormSection>
          <Elements stripe={stripePromise}>
            <AddCardForm
              clientId={clientId}
              onCardAdded={() => {
                setShowAddForm(false);
                fetchMethods();
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </Elements>
        </S.AddFormSection>
      )}

      {!showAddForm && methods.length === 0 && (
        <S.EmptyCards onClick={() => setShowAddForm(true)}>
          <CreditCard size={34} />
          <S.EmptyCardsText>
            <strong>Nenhum cartão salvo</strong>
            <span>Clique para adicionar um novo cartão de forma 100% segura.</span>
          </S.EmptyCardsText>
        </S.EmptyCards>
      )}

      {!showAddForm && methods.length > 0 && (
        <S.CardsGrid>
          {methods.map((pm) => (
            <S.SavedCardVisual key={pm.id} $brand={pm.card.brand}>
              <S.SavedCardGloss />
              <S.SavedCardTop>
                <S.ChipIcon>
                  <S.ChipLine />
                  <S.ChipLine />
                  <S.ChipLine />
                </S.ChipIcon>
                <S.RemoveBtn onClick={() => handleRemoveCard(pm.id)} title="Remover Cartão">
                  <Trash2 size={14} />
                </S.RemoveBtn>
              </S.SavedCardTop>
              <S.SavedCardNumber>{formatCardNumber(pm.card.last4)}</S.SavedCardNumber>
              <S.SavedCardBottom>
                <S.SavedCardField>
                  <S.SavedCardLabel>Expira em</S.SavedCardLabel>
                  <S.SavedCardValue>
                    {String(pm.card.exp_month).padStart(2, '0')}/{pm.card.exp_year}
                  </S.SavedCardValue>
                </S.SavedCardField>
                <S.BrandIconWrapper>
                  <BrandIcon brand={pm.card.brand} size={52} />
                </S.BrandIconWrapper>
              </S.SavedCardBottom>
            </S.SavedCardVisual>
          ))}
        </S.CardsGrid>
      )}
    </S.Wrapper>
  );
};

export default PaymentMethodsList;