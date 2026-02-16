import styled from 'styled-components';

export const Container = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    overflow: hidden; /* Contains the internal table */
    animation: fadeIn 0.4s ease-in-out;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    gap: 1rem;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end; /* Right align pagination */
    align-items: center;
    padding: 1.5rem;
    border-top: 1px solid var(--color-border);
    background-color: var(--color-surface);

    @media (max-width: 640px) {
        justify-content: center;
    }
`;

export const Title = styled.h3`
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
`;

export const Filters = styled.div`
    display: flex;
    gap: 0.5rem;
    background-color: var(--color-background);
    padding: 0.25rem;
    border-radius: var(--radius-lg);
    flex-wrap: wrap;

    @media (max-width: 640px) {
        width: 100%;
        overflow-x: auto;
    }
`;

export const FilterButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-gray-500)')};
    background-color: ${({ $active }) => ($active ? 'var(--color-surface)' : 'transparent')};
    border-radius: var(--radius-md);
    box-shadow: ${({ $active }) => ($active ? '0 1px 2px rgba(0,0,0,0.1)' : 'none')};
    transition: all 0.2s ease;

    &:hover {
        color: var(--color-text);
    }
`;

export const TableContainer = styled.div`
    overflow-x: auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 900px;
`;

export const Th = styled.th`
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.6875rem; /* Reduced from 0.75rem */
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-gray-400);
    background-color: var(--color-white-5);
    border-bottom: 1px solid var(--color-border);
`;

export const Tr = styled.tr`
    border-bottom: 1px solid var(--color-border);
    transition: background-color 0.15s ease;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: var(--color-white-5);
    }
`;

export const Td = styled.td`
    padding: 0.75rem 1rem;
    font-size: 0.8125rem; /* Reduced from 0.875rem */
    color: var(--color-text);
    vertical-align: middle;
`;

export const TypeIcon = styled.div`
    width: 32px; /* Slightly smaller */
    height: 32px;
    border-radius: 50%; /* Circle */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $type }) => ($type === 'income' ? 'var(--color-success-10)' : 'var(--color-danger-10)')};
    color: ${({ $type }) => ($type === 'income' ? 'var(--color-success)' : 'var(--color-danger)')};
    font-weight: bold;
`;

export const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-gray-600);
`;

/* --- Dropdown Logic (Copied from ClientList & Refined) --- */

export const StatusWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.875rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    text-transform: capitalize;
    transition: all 0.2s ease;
    border: 1px solid transparent;

    ${({ $status }) => {
      switch ($status) {
        case 'paid':
          return `
                    background-color: var(--color-success-10);
                    color: var(--color-success);
                    border-color: rgba(16, 185, 129, 0.2);
                `;
        case 'pending':
          return `
                    background-color: var(--color-warning-10);
                    color: var(--color-warning);
                    border-color: rgba(245, 158, 11, 0.2);
                `;
        case 'overdue':
          return `
                    background-color: var(--color-danger-10);
                    color: var(--color-danger);
                    border-color: rgba(239, 68, 68, 0.2);
                `;
        case 'cancelled':
          return `
                    background-color: var(--color-gray-200);
                    color: var(--color-gray-600);
                `;
        default:
          return `
                    background-color: var(--color-surface);
                    border-color: var(--color-border);
                `;
      }
    }}

    &:hover {
        transform: translateY(-1px);
        filter: brightness(0.97);
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    &::after {
        content: '▼';
        font-size: 0.5em;
        opacity: 0.6;
        margin-left: 0.25rem;
    }
`;

export const Dropdown = styled.div`
    position: fixed; /* Fixed to allow overflowing container */
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 9999;
    min-width: 150px;
    padding: 0.5rem;
    animation: fadeIn 0.2s ease-out;
`;

export const DropdownItem = styled.div`
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.15s ease;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background-color: var(--color-white-5);
        color: var(--color-primary);
    }

    ${({ $active }) =>
      $active &&
      `
        background-color: var(--color-primary-10);
        color: var(--color-primary);
        font-weight: 700;
        
        &::before {
            content: '•';
            color: var(--color-primary);
            font-size: 1.5em;
            line-height: 0;
        }
    `}
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
    border-radius: 8px;
    color: var(--color-gray-400);
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--color-danger-10);
        color: var(--color-danger);
    }
`;
