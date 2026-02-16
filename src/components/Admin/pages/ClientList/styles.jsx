import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const FilterGroup = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

export const FilterButton = styled.button`
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid var(--color-border);
    background-color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'transparent')};
    color: ${({ $active }) => ($active ? 'white' : 'var(--color-gray-400)')};
    transition: all var(--transition-fast);

    &:hover {
        border-color: var(--color-primary);
        color: ${({ $active }) => ($active ? 'white' : 'var(--color-primary)')};
    }
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
`;

export const AddButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--color-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-size: 0.875rem;
    transition: background-color var(--transition-fast);

    &:hover {
        background-color: var(--color-primary-50);
    }
`;

export const TableWrapper = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow-x: auto; /* Enable horizontal scroll on mobile */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; /* Ensure table doesn't collapse too much */
`;

export const Thead = styled.thead`
    background-color: var(--color-white-5);
    border-bottom: 1px solid var(--color-border);
`;

export const Th = styled.th`
    padding: 1rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-gray-400);
    letter-spacing: 0.05em;
    white-space: nowrap;
`;

export const Tr = styled.tr`
    border-bottom: 1px solid var(--color-border);
    
    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: var(--color-white-5);
    }
`;

export const Td = styled.td`
    padding: 1rem;
    font-size: 0.875rem;
    color: var(--color-text);
    white-space: nowrap;
`;

export const ClientInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const Avatar = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-full);
    `;

export const StatusBadge = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    
    ${({ $status }) => {
        switch ($status) {
            case 'Active':
                return `
                    background-color: rgba(34, 197, 94, 0.1);
                    color: var(--color-green-500);
                    border: 1px solid rgba(34, 197, 94, 0.2);
                `;
            case 'Cancelled':
                return `
                    background-color: rgba(239, 68, 68, 0.1);
                    color: var(--color-red-500);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                `;
            default: // Inactive
                return `
                    background-color: rgba(107, 114, 128, 0.1);
                    color: var(--color-gray-400);
                    border: 1px solid rgba(107, 114, 128, 0.2);
                `;
        }
    }}

    &:hover {
        filter: brightness(1.2);
        transform: scale(1.05);
    }
`;

export const StatusWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const Dropdown = styled.div`
    position: fixed;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    z-index: 1000;
    min-width: 120px;
`;

export const DropdownItem = styled.button`
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: var(--color-text);
    transition: background-color var(--transition-fast);
    
    &:first-child {
        border-radius: 0.75rem 0.75rem 0rem 0rem;
    }

    &:last-child {
        border-radius: 0rem 0rem 0.75rem 0.75rem;
    }

    &:hover {
        background-color: var(--color-white-5);
    }
    
    ${({ $active }) =>
        $active &&
        `
        background-color: var(--color-primary-10);
        color: var(--color-primary);
        font-weight: 500;
    `}
`;

export const Actions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const ActionButton = styled.button`
    padding: 0.25rem;
    color: var(--color-gray-400);
    transition: color var(--transition-fast);

    &:hover {
        color: ${({ $danger }) => ($danger ? 'var(--color-red-500)' : 'white')};
    }
`;
