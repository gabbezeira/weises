import styled from 'styled-components';



export const IconWrapper = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: var(--color-red-500);
`;

export const WarningIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 0.5rem;
`;

export const Message = styled.p`
    color: var(--color-muted);
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 2rem;
`;

export const ItemName = styled.span`
    display: block;
    margin-top: 0.5rem;
    font-weight: 500;
    color: var(--color-text);
    background: var(--color-background);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    word-break: break-word;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    width: 100%;
`;

export const CancelButton = styled.button`
    flex: 1;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: transparent;
    color: var(--color-text);
    font-weight: 500;
    font-size: 0.875rem;
    transition: all var(--transition-fast);

    &:hover {
        background: var(--color-white-5);
        border-color: var(--color-gray-500);
    }
`;

export const DeleteButton = styled.button`
    flex: 1;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    background: var(--color-red-500);
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all var(--transition-fast);

    &:hover {
        background: var(--color-red-600);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;
