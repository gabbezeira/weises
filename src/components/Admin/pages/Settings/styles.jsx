import styled from 'styled-components';

export const Container = styled.div`
    padding: 2rem;
`;

export const Header = styled.div`
    margin-bottom: 2rem;
`;

export const Title = styled.h1`
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: 0.5rem;
`;

export const TabsContainer = styled.div`
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 2rem;
`;

export const Tab = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: none;
    border: none;
    border-bottom: 2px solid ${(props) => (props.$active ? 'var(--color-primary)' : 'transparent')};
    color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-gray-500)')};
    font-weight: ${(props) => (props.$active ? '600' : '400')};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-white)')};
    }
`;
