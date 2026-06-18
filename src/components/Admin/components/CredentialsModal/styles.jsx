import styled from 'styled-components';



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
