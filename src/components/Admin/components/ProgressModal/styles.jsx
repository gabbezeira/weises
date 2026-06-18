import styled from 'styled-components';

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
