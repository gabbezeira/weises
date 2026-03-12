import Loader from '@ui/Loader';
import { AlertCircle, Calendar, CreditCard, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../context/AuthContext';
import { useClient } from '../../../../context/ClientContext';
import { api } from '../../../../services/api';
import Pagination from '../../../ui/Pagination';
import * as S from './styles';

const ITEMS_PER_PAGE = 6;

const formatCurrency = (val) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const Subscriptions = () => {
  const { t, i18n } = useTranslation();
  const { profile } = useAuth();
  const clientId = profile?.clientId;
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchSubscriptions();
  }, [clientId]);

  const fetchSubscriptions = async () => {
    if (!clientId) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await api.get(`/stripe/subscriptions/${clientId}`);
      setSubscriptions(res?.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch subscriptions', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (subId) => {
    if (!window.confirm(t('client.subscriptions.confirm_cancel'))) return;
    setCancelingId(subId);
    try {
      await api.del(`/stripe/subscriptions/${subId}`);
      await fetchSubscriptions();
    } catch (error) {
      console.error('Failed to cancel subscription', error);
    } finally {
      setCancelingId(null);
    }
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat(i18n.language, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);

  const totalPages = Math.max(1, Math.ceil(subscriptions.length / ITEMS_PER_PAGE));
  const paginatedSubs = subscriptions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (isLoading) return <Loader />;

  return (
    <S.Container>
      <S.Header>
        <h1>{t('client.subscriptions.title')}</h1>
        <p>{t('client.subscriptions.description')}</p>
      </S.Header>

      {subscriptions.length === 0 ? (
        <S.EmptyState>
          <AlertCircle size={48} opacity={0.5} className="empty-icon" />
          <p>{t('client.subscriptions.empty')}</p>
        </S.EmptyState>
      ) : (
        <>
          <S.SubscriptionsGrid>
            {paginatedSubs.map((sub) => {
              const planDetails = sub.items.data[0]?.price;
              const amount = planDetails?.unit_amount / 100 || 0;
              const name = planDetails?.product?.name || t('client.subscriptions.monthly_plan');
              const nextBilling = sub.current_period_end * 1000;
              const card = sub.default_payment_method?.card;
              const interval = planDetails?.recurring?.interval;

              return (
                <S.SubscriptionCard key={sub.id}>
                  <S.CardHeader>
                    <div>
                      <h3>{name}</h3>
                      <S.StatusBadge $status={sub.status}>
                        {t(`client.subscriptions.status.${sub.status}`, sub.status)}
                      </S.StatusBadge>
                    </div>
                    <S.BillingInfo>
                      <div className="amount">{formatCurrency(amount)}</div>
                      <div className="interval">
                        / {interval ? t(`client.subscriptions.interval.${interval}`, interval) : ''}
                      </div>
                    </S.BillingInfo>
                  </S.CardHeader>

                  <S.DetailRow>
                    <span className="label">{t('client.subscriptions.next_billing')}</span>
                    <span className="value">
                      <Calendar size={14} />
                      {formatDate(new Date(nextBilling))}
                    </span>
                  </S.DetailRow>

                  <S.DetailRow>
                    <span className="label">{t('client.subscriptions.payment_method')}</span>
                    <span className="value">
                      <CreditCard size={14} />
                      {card ? `•••• ${card.last4}` : t('client.subscriptions.default_card')}
                    </span>
                  </S.DetailRow>

                  {sub.status === 'active' && (
                    <S.CardActions>
                      <S.Button
                        $variant="danger"
                        onClick={() => handleCancel(sub.id)}
                        disabled={cancelingId === sub.id}
                      >
                        {cancelingId === sub.id ? (
                          <>
                            <Loader size={16} />
                            {t('client.subscriptions.canceling', 'Cancelando...')}
                          </>
                        ) : (
                          <>
                            <XCircle size={16} />
                            {t('client.subscriptions.cancel')}
                          </>
                        )}
                      </S.Button>
                    </S.CardActions>
                  )}
                </S.SubscriptionCard>
              );
            })}
          </S.SubscriptionsGrid>

          {totalPages > 1 && (
            <S.PaginationWrapper>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </S.PaginationWrapper>
          )}
        </>
      )}
    </S.Container>
  );
};

export default Subscriptions;
