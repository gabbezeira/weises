import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 60;
    padding: 1rem;
`;

export const Modal = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

    @media (max-width: 480px) {
        width: 95%;
    }
`;

export const Header = styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const CloseButton = styled.button`
    color: var(--color-gray-400);
    transition: color var(--transition-fast);
    &:hover { color: var(--color-text); }
`;

export const Content = styled.div`
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const SectionTitle = styled.h3`
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-gray-400);
    letter-spacing: 0.05em;
`;

export const ValueBox = styled.div`
    background-color: var(--color-background);
    padding: 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-green-500);
    font-family: monospace;
`;

export const CredentialCard = styled.div`
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CredentialName = styled.h4`
    font-weight: 600;
    color: var(--color-text);
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const Label = styled.div`
    font-size: 0.75rem;
    color: var(--color-gray-400);
`;

export const ValueRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: monospace;
    font-size: 0.875rem;
    color: var(--color-text);
    background-color: var(--color-surface);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
`;

export const IconButton = styled.button`
    color: var(--color-gray-400);
    transition: color var(--transition-fast);
    &:hover { color: var(--color-text); }
    padding: 0.25rem;
`;
