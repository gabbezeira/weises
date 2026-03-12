import { useTranslation } from 'react-i18next';
import React from 'react';
import * as S from './styles';
import {
  ArrowRight,
  Globe,
  Server,
  Database,
  Lock,
  HardDrive,
  Smartphone,
  Monitor,
  Zap
} from 'lucide-react';

const ArchitectureTab = () => {
  const { t } = useTranslation();
  return (
    <S.Container>
      <S.Section>
        <S.Title>
          <Globe size={22} color="var(--color-primary)" /> {t('admin.settings.wiki.tabs.architecture', 'System Architecture')}
        </S.Title>
        <S.Flowchart>
          {/* Frontend Layer */}
          <S.NodeColumn>
            <S.Node $color="var(--color-blue-400)">
              <S.NodeHeader>
                <S.NodeIcon $color="var(--color-blue-400)">
                  <Monitor size={20} />
                </S.NodeIcon>
                <h4>{t('admin.settings.wiki.admin_panel', 'Admin Panel')}</h4>
              </S.NodeHeader>
              <p>{t('admin.settings.wiki.admin_panel_desc', 'React SPA for management and operations.')}</p>
              <S.Arrow />
            </S.Node>
            <S.Node $color="var(--color-success)">
              <S.NodeHeader>
                <S.NodeIcon $color="var(--color-success)">
                  <Smartphone size={20} />
                </S.NodeIcon>
                <h4>{t('admin.settings.wiki.client_portal', 'Client Portal')}</h4>
              </S.NodeHeader>
              <p>{t('admin.settings.wiki.client_portal_desc', 'Customer-facing dashboard and services.')}</p>
              <S.Arrow />
            </S.Node>
          </S.NodeColumn>

          {/* Backend Layer */}
          <S.NodeColumn>
            <S.Node
              $color="var(--color-primary)"
              style={{
                height: '100%',
                justifyContent: 'center',
                background: 'var(--color-primary-10)',
                borderColor: 'var(--color-primary-20)'
              }}
            >
              <S.NodeHeader>
                <S.NodeIcon $color="var(--color-primary)">
                  <Server size={24} />
                </S.NodeIcon>
                <h4>{t('admin.settings.wiki.backend_api', 'Backend Core API')}</h4>
              </S.NodeHeader>
              <p>{t('admin.settings.wiki.backend_api_desc', 'Node.js/Express REST API processing business logic and DB orchestration.')}</p>
              <S.Arrow />
            </S.Node>
          </S.NodeColumn>

          {/* Infrastructure Layer */}
          <S.NodeColumn style={{ gap: '1.25rem' }}>
            <S.Node $color="var(--color-warning)">
              <S.NodeHeader>
                <S.NodeIcon $color="var(--color-warning)">
                  <Database size={18} />
                </S.NodeIcon>
                <h4>{t('admin.settings.wiki.firestore', 'Cloud Firestore')}</h4>
              </S.NodeHeader>
              <p>{t('admin.settings.wiki.firestore_desc', 'Primary NoSQL database.')}</p>
            </S.Node>
            <S.Node $color="var(--color-danger)">
              <S.NodeHeader>
                <S.NodeIcon $color="var(--color-danger)">
                  <Lock size={18} />
                </S.NodeIcon>
                <h4>{t('admin.settings.wiki.auth', 'Firebase Auth')}</h4>
              </S.NodeHeader>
              <p>{t('admin.settings.wiki.auth_desc', 'Authentication and tokens.')}</p>
            </S.Node>
            <S.Node $color="var(--color-blue-400)">
              <S.NodeHeader>
                <S.NodeIcon $color="var(--color-blue-400)">
                  <HardDrive size={18} />
                </S.NodeIcon>
                <h4>{t('admin.settings.wiki.storage', 'Cloud Storage')}</h4>
              </S.NodeHeader>
              <p>{t('admin.settings.wiki.storage_desc', 'Binary files and media.')}</p>
            </S.Node>
          </S.NodeColumn>
        </S.Flowchart>
      </S.Section>

      <S.Section>
        <S.Title><Zap size={22} color="var(--color-warning)" /> {t('admin.settings.wiki.tech_stack', 'Tech Stack & Integrations')}</S.Title>
        <S.StackGrid>
          <S.StackCard>
            <div className="header">
              <Monitor size={20} color="var(--color-primary)" />
              <h4>{t('admin.settings.wiki.frontend', 'Frontend')}</h4>
            </div>
            <div className="tags">
              <span>React 18</span>
              <span>Vite</span>
              <span>Styled Components</span>
              <span>i18next</span>
              <span>Lucide React</span>
            </div>
          </S.StackCard>

          <S.StackCard>
            <div className="header">
              <Server size={20} color="var(--color-success)" />
              <h4>{t('admin.settings.wiki.backend', 'Backend')}</h4>
            </div>
            <div className="tags">
              <span>Node.js</span>
              <span>Express</span>
              <span>Firebase Admin SDK</span>
              <span>Helmet</span>
              <span>CORS</span>
            </div>
          </S.StackCard>

          <S.StackCard>
            <div className="header">
              <Globe size={20} color="var(--color-blue-400)" />
              <h4>{t('admin.settings.wiki.integrations', 'Integrations')}</h4>
            </div>
            <div className="tags">
              <span>Stripe (Payments)</span>
              <span>AES-256 (Crypto)</span>
            </div>
          </S.StackCard>
        </S.StackGrid>
      </S.Section>
    </S.Container>
  );
};

export default ArchitectureTab;
