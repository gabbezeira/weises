import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    color: var(--color-gray-500);
    gap: 1.5rem;
    width: 100%;
    background-color: var(--color-surface); /* Contextual background */
`;

export const IconWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: var(--color-white-5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-400);
    border: 1px solid var(--color-border);
    margin-bottom: 0.5rem;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
`;

export const Title = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
`;

export const Description = styled.p`
    font-size: 0.9375rem;
    max-width: 400px;
    line-height: 1.5;
    color: var(--color-gray-400);
`;
