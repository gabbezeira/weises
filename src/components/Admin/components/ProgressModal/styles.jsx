import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: var(--z-index-modal);
    padding: 1rem;
`;

export const Modal = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    width: 90%;
    max-width: 560px;
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
    font-size: 1.125rem;
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
    gap: 1.25rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem 0.75rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    font-size: 0.875rem;
    transition: all var(--transition-fast);

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }

    &::placeholder {
        color: var(--color-gray-400);
    }
`;

export const StagesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const StageRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    transition: border-color var(--transition-fast);

    &:hover {
        border-color: var(--color-primary-20);
    }
`;

export const StageCheckbox = styled.button`
    width: 24px;
    height: 24px;
    min-width: 24px;
    border-radius: var(--radius-sm);
    border: 2px solid ${({ $checked }) => ($checked ? 'var(--color-primary)' : 'var(--color-gray-500)')};
    background-color: ${({ $checked }) => ($checked ? 'var(--color-primary)' : 'transparent')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    color: white;

    &:hover {
        border-color: var(--color-primary);
    }
`;

export const StageInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
`;

export const StageName = styled.span`
    font-size: 0.9375rem;
    font-weight: 600;
    color: ${({ $completed }) => ($completed ? 'var(--color-text)' : 'var(--color-gray-400)')};
    transition: color var(--transition-fast);
    text-decoration: ${({ $completed }) => ($completed ? 'none' : 'none')};
`;

export const StageDate = styled.span`
    font-size: 0.75rem;
    color: var(--color-gray-500);
`;

export const StageStatus = styled.span`
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-full);
    white-space: nowrap;
    background-color: ${({ $completed }) => ($completed ? 'var(--color-success-10)' : 'var(--color-white-5)')};
    color: ${({ $completed }) => ($completed ? 'var(--color-success)' : 'var(--color-gray-500)')};
`;

export const EmptyState = styled.p`
    color: var(--color-gray-400);
    font-style: italic;
    text-align: center;
    padding: 2rem 0;
`;

export const Footer = styled.div`
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
`;

export const SaveButton = styled.button`
    background-color: var(--color-primary);
    color: white;
    padding: 0.5rem 1.25rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    transition: background-color var(--transition-fast);

    &:hover {
        background-color: var(--color-primary-50);
    }

    &:disabled {
        background-color: var(--color-gray-300);
        cursor: not-allowed;
    }
`;

export const CancelButton = styled.button`
    color: var(--color-gray-400);
    padding: 0.5rem 1.25rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    transition: color var(--transition-fast);

    &:hover {
        color: var(--color-text);
    }
`;

export const ProgressBar = styled.div`
    width: 100%;
    height: 6px;
    background-color: var(--color-white-5);
    border-radius: var(--radius-full);
    overflow: hidden;
`;

export const ProgressFill = styled.div`
    height: 100%;
    width: ${({ $percent }) => $percent}%;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: var(--radius-full);
    transition: width var(--transition-normal);
`;

export const ProgressText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--color-gray-500);
    margin-bottom: 0.25rem;

    span:last-child {
        color: var(--color-primary);
        font-weight: 600;
    }
`;
