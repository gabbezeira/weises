import styled from 'styled-components';

export const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: var(--color-background);
    color: var(--color-text);
`;

export const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 250px;
    min-height: 100vh;
    transition: margin-left var(--transition-normal);
    width: 100%;

    @media (max-width: 1024px) {
        margin-left: 0;
    }
`;

export const ContentWrapper = styled.div`
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    position: relative;
    max-width: 1600px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 45; /* Below sidebar (50) but above header (40) */
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
    transition: opacity var(--transition-normal);
`;
