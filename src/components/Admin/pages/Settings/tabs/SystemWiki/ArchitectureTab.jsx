import React from 'react';
import styled from 'styled-components';
import {
  ArrowRight,
  Globe,
  Server,
  Database,
  Lock,
  HardDrive,
  Smartphone,
  Monitor,
} from 'lucide-react';

const Container = styled.div`
    padding: 1rem;
`;

const Section = styled.div`
    margin-bottom: 3rem;
`;

const Title = styled.h3`
    font-size: 1.25rem;
    color: var(--color-white);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const Flowchart = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    align-items: center;
    position: relative;
    padding: 2rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
`;

const NodeColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
`;

const Node = styled.div`
    background: var(--color-surface-hover);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    z-index: 2;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
        border-color: var(--color-primary);
    }

    h4 {
        color: var(--color-white);
        font-size: 1rem;
    }

    p {
        color: var(--color-gray-400);
        font-size: 0.875rem;
        line-height: 1.4;
    }
`;

const NodeIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: ${(props) => (props.$color ? `${props.$color}20` : 'var(--color-primary-10)')};
    color: ${(props) => props.$color || 'var(--color-primary)'};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Arrow = styled.div`
    position: absolute;
    top: 50%;
    left: 100%;
    width: 2rem;
    height: 2px;
    background: var(--color-border);
    transform: translateY(-50%);
    z-index: 1;

    &::after {
        content: '';
        position: absolute;
        right: 0;
        top: -4px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid var(--color-border);
    }

    @media (max-width: 1024px) {
        top: 100%;
        left: 50%;
        width: 2px;
        height: 3rem;
        transform: translateX(-50%);

        &::after {
            top: auto;
            bottom: 0;
            right: -4px;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid var(--color-border);
        }
    }
`;

const ArchitectureTab = () => {
  return (
    <Container>
      <Section>
        <Title>
          <Globe size={20} /> System Overview
        </Title>
        <Flowchart>
          {/* Frontend Layer */}
          <NodeColumn>
            <Node>
              <NodeIcon $color="#3b82f6">
                <Monitor size={24} />
              </NodeIcon>
              <h4>Admin Panel (React)</h4>
              <p>Administrative dashboard for managing users, projects, and finances.</p>
              <Arrow style={{ top: '50%' }} />
            </Node>
            <Node>
              <NodeIcon $color="#10b981">
                <Smartphone size={24} />
              </NodeIcon>
              <h4>Client Portal (React)</h4>
              <p>Restricted access area for clients to view projects and invoices.</p>
              <Arrow style={{ top: '50%' }} />
            </Node>
          </NodeColumn>

          {/* Backend Layer */}
          <NodeColumn>
            <Node
              style={{
                height: '100%',
                justifyContent: 'center',
                borderColor: 'var(--color-primary)',
              }}
            >
              <NodeIcon $color="#8b5cf6">
                <Server size={32} />
              </NodeIcon>
              <h4>Backend API (Node.js)</h4>
              <p>Express server running business logic, middleware, and security guards.</p>
              <Arrow />
            </Node>
          </NodeColumn>

          {/* Infrastructure Layer */}
          <NodeColumn>
            <Node>
              <NodeIcon $color="#f59e0b">
                <Database size={24} />
              </NodeIcon>
              <h4>Google Firestore</h4>
              <p>NoSQL Realtime Database storing User, Project, and Financial data.</p>
            </Node>
            <Node>
              <NodeIcon $color="#ef4444">
                <Lock size={24} />
              </NodeIcon>
              <h4>Firebase Auth</h4>
              <p>Identity Provider handling Authentication and JWT definition.</p>
            </Node>
            <Node>
              <NodeIcon $color="#06b6d4">
                <HardDrive size={24} />
              </NodeIcon>
              <h4>Firebase Storage</h4>
              <p>Object storage for Project Covers, Gallery Images, and User Avatars.</p>
            </Node>
          </NodeColumn>
        </Flowchart>
      </Section>

      <Section>
        <Title>Tech Stack</Title>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <Node>
            <h4>Frontend</h4>
            <p>React, Styled-Components, Lucide Icons, Axios</p>
          </Node>
          <Node>
            <h4>Backend</h4>
            <p>Node.js, Express, Firebase Admin SDK, CORS, Helmet</p>
          </Node>
          <Node>
            <h4>Database</h4>
            <p>Cloud Firestore (NoSQL), Firestore Rules</p>
          </Node>
        </div>
      </Section>
    </Container>
  );
};

export default ArchitectureTab;
