import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export const PageButton = styled.button`
    padding: 0.75rem;
    border-radius: 9999px;
    background: var(--color-surface);
    border: 1px solid var(--color-white-10);
    color: white;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background: var(--color-white-5);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const Info = styled.span`
    color: var(--color-gray-400);
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
`;

export const CurrentPage = styled.span`
    color: white;
`;
