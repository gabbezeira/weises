import Loader from '@ui/Loader';
import Pagination from '@ui/Pagination';
import { Copy, ExternalLink, Eye, EyeOff, X } from 'lucide-react';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../../../../services/api';
import Modal from '../../../../components/common/Modal';
import * as S from './styles';

const CredentialsModal = ({ project, onClose }) => {
  const { t } = useTranslation();
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const togglePassword = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const [fetchedCredentials, setFetchedCredentials] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  React.useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await api.get(`/projects/${project.id}/credentials`);
        if (response && Array.isArray(response)) {
          setFetchedCredentials(response);
        } else if (response && response.data) {
          setFetchedCredentials(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch credentials', error);
      } finally {
        setLoading(false);
      }
    };

    if (project?.id) {
      fetchCredentials();
    }
  }, [project]);

  const totalPages = Math.ceil((fetchedCredentials.length || 0) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCredentials = fetchedCredentials.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return createPortal(
    <Modal.Overlay onClick={onClose}>
      <Modal.Content $maxWidth="600px" onClick={(e) => e.stopPropagation()}>
        <Modal.Header>
          <Modal.Title>{t('admin.projects.credentials_modal.title', { title: project.title })}</Modal.Title>
          <Modal.CloseButton onClick={onClose}>
            <X size={20} />
          </Modal.CloseButton>
        </Modal.Header>
        <Modal.Body>
          <S.Section>
            <S.SectionTitle>
              {t('admin.projects.form.credentials')} ({fetchedCredentials.length || 0})
            </S.SectionTitle>
            {loading ? (
              <Loader
                text={t('admin.projects.credentials_modal.decrypting', 'Decrypting keys...')}
              />
            ) : fetchedCredentials.length > 0 ? (
              <>
                {currentCredentials.map((cred) => (
                  <S.CredentialCard key={cred.id}>
                    <S.Row>
                      <S.CredentialName>{cred.name}</S.CredentialName>
                      {cred.url && (
                        <a
                          href={cred.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: 'var(--color-primary)',
                            fontSize: '0.875rem',
                          }}
                        >
                          {t('admin.projects.credentials_modal.open')} <ExternalLink size={12} />
                        </a>
                      )}
                    </S.Row>

                    <S.Field>
                      <S.Label>{t('admin.projects.credentials_modal.username')}</S.Label>
                      <S.ValueRow>
                        <span style={{ flex: 1 }}>{cred.username}</span>
                        <S.IconButton
                          onClick={() => copyToClipboard(cred.username)}
                          title={t('admin.projects.credentials_modal.copy_username')}
                        >
                          <Copy size={14} />
                        </S.IconButton>
                      </S.ValueRow>
                    </S.Field>

                    <S.Field>
                      <S.Label>{t('admin.projects.credentials_modal.password')}</S.Label>
                      <S.ValueRow>
                        <span style={{ flex: 1 }}>
                          {visiblePasswords[cred.id] ? cred.password : '••••••••••••••••'}
                        </span>
                        <S.IconButton
                          onClick={() => togglePassword(cred.id)}
                          title={
                            visiblePasswords[cred.id]
                              ? t('admin.projects.credentials_modal.hide')
                              : t('admin.projects.credentials_modal.show')
                          }
                        >
                          {visiblePasswords[cred.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </S.IconButton>
                        <S.IconButton
                          onClick={() => copyToClipboard(cred.password)}
                          title={t('admin.projects.credentials_modal.copy_password')}
                        >
                          <Copy size={14} />
                        </S.IconButton>
                      </S.ValueRow>
                    </S.Field>
                  </S.CredentialCard>
                ))}

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <p style={{ color: 'var(--color-gray-400)', fontStyle: 'italic' }}>
                {t('admin.projects.credentials_modal.no_credentials')}
              </p>
            )}
          </S.Section>
        </Modal.Body>
      </Modal.Content>
    </Modal.Overlay>,
    document.body,
  );
};

export default CredentialsModal;
