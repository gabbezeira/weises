import React, { useState, useEffect } from 'react';
import * as S from './styles';
import {
  Zap,
  Monitor,
  Database,
  Shield,
  Layout,
  PenTool,
  ChevronDown,
  HelpCircle,
  Loader as LoaderIcon,
} from 'lucide-react';
import Pagination from '../../../ui/Pagination';
import { useTranslation } from 'react-i18next';
import { api } from '../../../../services/api';
import Loader from '../../../ui/Loader';
import EmptyState from '../../../ui/EmptyState';

// Icons mapping to match Admin selection
const ICON_MAP = {
  Zap,
  Layout,
  Database,
  PenTool,
  Monitor,
  Shield,
};

const ClientServices = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        if (response.success) {
          setServices(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const faqs = [
    {
      q: 'How do I request a service?',
      a: 'Simply click the "Request" button on any service card. A ticket will be created and our team will contact you to confirm details.',
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept all major credit cards, bank transfers, and Pix. You can manage payment methods in the Billing section.',
    },
    {
      q: 'Can I cancel a requested service?',
      a: 'Yes, if the service has not started yet. Please contact support via the Dashboard widget.',
    },
    {
      q: 'Are these prices final?',
      a: 'These are starting prices. Complex requirements may require a custom quote.',
    },
  ];

  // Pagination Logic
  const totalPages = Math.ceil(services.length / itemsPerPage);
  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleRequest = async (serviceId, serviceName) => {
    if (window.confirm(`Would you like to request: ${serviceName}?`)) {
      try {
        // Here we would call the Service Request API
        // For now, consistent with previous behavior, just an alert,
        // but ideally: await api.post('/services/requests', { serviceId });
        alert('Service request initiated! Our team will contact you.');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderIcon = (iconName) => {
    const IconComponent = ICON_MAP[iconName] || Zap;
    return <IconComponent size={24} />;
  };

  if (loading) return <Loader />;

  return (
    <S.Container>
      <S.Header>
        <h1>{t('client.services.title')}</h1>
        <p>{t('client.services.subtitle')}</p>
      </S.Header>

      <div>
        <S.SectionTitle>
          <Zap size={20} /> {t('client.services.available_services')}
        </S.SectionTitle>

        {services.length > 0 ? (
          <S.ServicesGrid>
            {paginatedServices.map((service) => (
              <S.ServiceCard key={service.id}>
                <div className="icon-box">{renderIcon(service.icon)}</div>
                <div className="content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="footer">
                  <span className="price">R$ {service.price}</span>
                  <S.RequestButton onClick={() => handleRequest(service.id, service.name)}>
                    {t('client.services.request_btn')}
                  </S.RequestButton>
                </div>
              </S.ServiceCard>
            ))}
          </S.ServicesGrid>
        ) : (
          <EmptyState
            title={t('projects_page.empty.title')}
            description={t('projects_page.empty.description')}
            icon={Zap}
          />
        )}

        {totalPages > 1 && (
          <S.PaginationWrapper>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </S.PaginationWrapper>
        )}
      </div>

      <S.FAQWrapper>
        <S.SectionTitle>
          <HelpCircle size={20} /> {t('client.services.faq_title')}
        </S.SectionTitle>
        <S.FAQSection>
          {faqs.map((faq, index) => (
            <S.FAQItem key={index} $isOpen={openFaqIndex === index}>
              <button onClick={() => toggleFaq(index)}>
                <span>{faq.q}</span>
                <ChevronDown size={20} />
              </button>
              <div className="answer">{faq.a}</div>
            </S.FAQItem>
          ))}
        </S.FAQSection>
      </S.FAQWrapper>
    </S.Container>
  );
};

export default ClientServices;
