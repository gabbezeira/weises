import styled from 'styled-components';

export const Container = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

export const Title = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
`;

export const Filters = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const FilterButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    background-color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'transparent')};
    color: ${({ $active }) => ($active ? 'white' : 'var(--color-text)')};
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-border)')};
    font-size: 0.875rem;
    font-weight: 500;
    transition: all var(--transition-fast);

    &:hover {
        border-color: var(--color-primary);
        color: ${({ $active }) => ($active ? 'white' : 'var(--color-primary)')};
    }
`;

export const TableContainer = styled.div`
    overflow-x: auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    min-width: 800px;
`;

export const Th = styled.th`
    text-align: left;
    padding: 1rem 1.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--color-gray-400);
    font-weight: 600;
    letter-spacing: 0.05em;
    border-bottom: none;
`;

export const Tr = styled.tr`
    background-color: var(--color-background);
    transition: all var(--transition-fast);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    
    & td:first-child { border-top-left-radius: var(--radius-md); border-bottom-left-radius: var(--radius-md); }
    & td:last-child { border-top-right-radius: var(--radius-md); border-bottom-right-radius: var(--radius-md); }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        background-color: var(--color-surface);
        z-index: 1;
        position: relative;
    }
`;

export const Td = styled.td`
    padding: 1rem;
    font-size: 0.875rem;
    color: var(--color-text);
`;

export const TypeIcon = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $type }) => ($type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)')};
    color: ${({ $type }) => ($type === 'income' ? 'var(--color-success)' : 'var(--color-danger)')};
`;

export const Badge = styled.span`
    display: inline-flex;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    background-color: var(--color-background);
    color: var(--color-gray-600);
    border: 1px solid var(--color-border);
`;

export const ActionGroup = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-md);
    color: ${({ $danger }) => ($danger ? 'var(--color-danger)' : 'var(--color-primary)')};
    transition: all var(--transition-fast);

    &:hover {
        background-color: ${({ $danger }) => ($danger ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-primary-10)')};
    }
`;

export const StatusSelect = styled.select`
    background-color: transparent;
    border: 1px solid currentColor;
    border-radius: var(--radius-full);
    padding: 0.25rem 1.5rem 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    text-transform: capitalize;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.25rem center;
    background-repeat: no-repeat;
    background-size: 1em 1em;
    transition: all var(--transition-fast);

    &:hover {
        opacity: 0.8;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    }
    
    option {
        background-color: var(--color-surface);
        color: var(--color-text);
    }
`;
