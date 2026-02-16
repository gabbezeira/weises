import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const Header = styled.div`
    h1 {
        font-size: 1.875rem;
        font-weight: 800;
        color: var(--color-text);
    }
    p {
        color: var(--color-gray-500);
        margin-top: 0.5rem;
    }
`;

export const InvoiceTable = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;

    table {
        width: 100%;
        border-collapse: collapse;
        
        @media (max-width: 768px) {
            display: block;
            overflow-x: auto;
        }

        th, td {
            text-align: left;
            padding: 1.25rem 1.5rem;
            color: var(--color-text);
            border-bottom: 1px solid var(--color-border);
        }

        th {
            background-color: var(--color-background);
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 600;
            color: var(--color-gray-500);
            letter-spacing: 0.05em;
        }

        tr:last-child td {
            border-bottom: none;
        }

        td.amount {
            font-weight: 600;
        }
    }
`;

export const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    
    ${({ $status }) => {
      switch ($status) {
        case 'paid':
          return `
                    background-color: var(--color-success-10);
                    color: var(--color-success);
                `;
        case 'pending':
          return `
                    background-color: var(--color-warning-10);
                    color: var(--color-warning);
                `;
        case 'overdue':
          return `
                    background-color: var(--color-danger-10);
                    color: var(--color-danger);
                `;
        default:
          return `
                    background-color: var(--color-gray-200);
                    color: var(--color-gray-600);
                `;
      }
    }}
`;

export const PayButton = styled.button`
    background-color: var(--color-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-primary-20);
        transform: translateY(-1px);
    }

    .disabled {
        background-color: var(--color-gray-300);
        cursor: not-allowed;
        transform: none;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const CreditCard = styled.div`
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-radius: 16px;
    padding: 2rem;
    color: white;
    width: 100%;
    max-width: 400px;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
        transform: rotate(30deg);
        pointer-events: none;
    }

    .chip {
        width: 50px;
        height: 36px;
        background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
        border-radius: 6px;
        margin-bottom: 2rem;
        position: relative;
        z-index: 1;
    }

    .number {
        font-size: 1.5rem;
        font-family: monospace;
        letter-spacing: 0.1em;
        margin-bottom: 2rem;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        z-index: 1;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        z-index: 1;

        .holder {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            
            span {
                font-size: 0.625rem;
                opacity: 0.7;
                text-transform: uppercase;
            }
            strong {
                font-size: 0.875rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
        }

        .brand {
            font-size: 1.5rem;
            font-weight: 800;
            font-style: italic;
        }
    }
    
    /* Empty State / Add Card */
    &.empty {
        background: var(--color-surface);
        border: 2px dashed var(--color-border);
        color: var(--color-gray-500);
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: none;

        &:hover {
            border-color: var(--color-primary);
            color: var(--color-primary);
            background-color: var(--color-primary-10);
        }

        &::before { display: none; }
    }
`;

export const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const DownloadButton = styled.button`
    color: var(--color-gray-400);
    transition: color var(--transition-fast);
    padding: 0.25rem;

    &:hover {
        color: var(--color-text);
    }
`;

export const AddCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

export const AddCardText = styled.span`
    font-size: 0.875rem;
    font-weight: 600;
`;

export const EmptyStateCell = styled.td`
    text-align: center;
    color: var(--color-gray-500);
    font-style: italic;
    padding: 2rem 1.5rem;
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
`;
