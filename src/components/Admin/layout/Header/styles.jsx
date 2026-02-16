import styled from 'styled-components';

export const HeaderContainer = styled.header`
    height: 70px;
    background-color: var(--color-background);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    position: sticky;
    top: 0;
    z-index: 40;
`;

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const MenuButton = styled.button`
    display: none;
    color: var(--color-text);
    
    @media (max-width: 1024px) {
        display: flex;
    }
`;

export const PageTitle = styled.h2`
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
`;

export const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    padding: 0.5rem 1rem;
    transition: all var(--transition-fast);
    width: 300px;

    &:focus-within {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }

    @media (max-width: 768px) {
        display: none; /* Hide on mobile for now, or use a toggle */
    }
`;

export const SearchIconWrapper = styled.div`
    display: flex;
    align-items: center;
    color: var(--color-gray-400);
    margin-right: 0.5rem;
`;

export const SearchInput = styled.input`
    background: transparent;
    border: none;
    color: var(--color-text);
    font-size: 0.875rem;
    width: 100%;
    outline: none;

    &::placeholder {
        color: var(--color-gray-500);
    }
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-full);
    color: var(--color-gray-400);
    transition: all var(--transition-fast);

    &:hover {
        background-color: var(--color-white-5);
        color: white;
    }
`;
