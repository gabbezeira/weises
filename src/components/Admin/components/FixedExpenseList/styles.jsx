import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const SummaryCard = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    max-width: 400px;

    .icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: rgba(239, 68, 68, 0.1);
        color: var(--color-red-500);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .info {
        h3 {
            font-size: 0.875rem;
            color: var(--color-gray-400);
            margin-bottom: 0.25rem;
        }
        p {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-text);
        }
    }
`;

export const TableContainer = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    overflow-x: auto; /* Allow horizontal scroll */
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; /* Ensure table forces scroll on small screens */
`;

export const Th = styled.th`
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-gray-400);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
`;

export const Tr = styled.tr`
    border-bottom: 1px solid var(--color-border);
    &:last-child { border-bottom: none; }
    
    &:hover {
        background-color: var(--color-white-5);
    }
`;

export const Td = styled.td`
    padding: 1rem;
    font-size: 0.875rem;
    color: var(--color-text);
`;

export const Badge = styled.span`
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    background-color: var(--color-white-5);
    color: var(--color-gray-300);
    font-size: 0.75rem;
    border: 1px solid var(--color-border);
`;

export const ActionButton = styled.button`
    padding: 0.5rem;
    border-radius: var(--radius-md);
    color: ${({ $danger }) => ($danger ? 'var(--color-red-500)' : 'var(--color-gray-400)')};
    transition: all var(--transition-fast);

    &:hover {
        background-color: ${({ $danger }) => ($danger ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-white-5)')};
        color: ${({ $danger }) => ($danger ? 'var(--color-red-600)' : 'var(--color-text)')};
    }
`;

export const AddButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--color-surface);
    color: var(--color-text);
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all var(--transition-fast);

    &:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
        background-color: var(--color-white-5);
    }
`;

/* Tax Configuration Styles */
export const TaxContainer = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    margin-bottom: 2rem;
`;

export const TaxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        
        button {
            width: 100%;
            justify-content: center;
        }
    }

    h3 {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-text);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const TaxGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
`;

export const TaxItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--color-background);
    padding: 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;

    &:focus-within {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const TaxLabel = styled.label`
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-gray-500);
    text-transform: uppercase;
`;

export const TaxInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    span {
        position: absolute;
        right: 0.5rem;
        font-size: 0.75rem;
        color: var(--color-gray-500);
        pointer-events: none;
    }
`;

export const TaxInput = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
    text-align: right;
    padding-right: 1.25rem; /* Space for % */
    outline: none;

    /* Remove Spinners */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: stretch;

        ${SummaryCard} {
            max-width: 100%;
        }

        ${AddButton} {
            width: 100%;
            justify-content: center;
        }
    }
`;
