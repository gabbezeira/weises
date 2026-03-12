import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-height: calc(100vh - 200px);
`;

export const NavList = styled.nav`
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-border);
    
    /* Hide scrollbar but keep functionality */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        scroll-snap-type: x mandatory;
        gap: 0.75rem;
    }
`;

export const NavHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-right: 1.5rem;
    border-right: 1px solid var(--color-border);
    color: var(--color-white);
    font-weight: 600;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        display: none; // Hide title on mobile horizontal scroll
    }
`;

export const NavItem = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: ${(props) => (props.$active ? 'var(--color-primary-10)' : 'transparent')};
    border: 1px solid ${(props) => (props.$active ? 'rgba(144, 97, 249, 0.2)' : 'transparent')};
    border-radius: 999px;
    color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-gray-400)')};
    font-weight: ${(props) => (props.$active ? '600' : '500')};
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    scroll-snap-align: start;

    &:hover {
        color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-white)')};
        background: ${(props) => (props.$active ? 'var(--color-primary-10)' : 'var(--color-surface-hover)')};
    }
    
    @media (max-width: 768px) {
        border: 1px solid ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-border)')};
        background: ${(props) => (props.$active ? 'var(--color-surface)' : 'transparent')};
    }
`;

export const ContentArea = styled.main`
    flex: 1;
    background: var(--color-background);
    border-radius: var(--radius-lg);
    min-width: 0; // Fixes overflow issues in flex children
    animation: fadeIn 0.3s ease-in-out;
`;
