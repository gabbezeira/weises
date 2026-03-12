import styled, { css } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    flex-wrap: wrap;
`;

export const PageTitleGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    h1 {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--color-text);
        letter-spacing: -0.02em;
        line-height: 1.2;
    }

    p {
        color: var(--color-gray-500);
        font-size: 0.9375rem;
        margin-top: 0.25rem;
    }
`;

export const PageIcon = styled.div`
    width: 48px;
    height: 48px;
    min-width: 48px;
    background: var(--color-primary-10);
    border: 1px solid var(--color-primary-20);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
`;

export const StatPills = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
`;

export const StatPill = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.875rem;
    border-radius: var(--radius-full);
    font-size: 0.8125rem;
    font-weight: 500;

    span {
        font-weight: 700;
        font-size: 1rem;
    }

    ${({ $variant }) => {
        switch ($variant) {
            case 'warning':
                return css`
                    background-color: var(--color-warning-10);
                    border: 1px solid rgba(245, 158, 11, 0.25);
                    color: var(--color-warning);
                `;
            case 'danger':
                return css`
                    background-color: var(--color-danger-10);
                    border: 1px solid rgba(239, 68, 68, 0.25);
                    color: var(--color-danger);
                `;
            default:
                return css`
                    background-color: var(--color-white-5);
                    border: 1px solid var(--color-border);
                    color: var(--color-text);
                `;
        }
    }}
`;

export const TabBar = styled.div`
    display: flex;
    gap: 0.25rem;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 0.375rem;
    width: fit-content;
`;

export const TabBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    transition: all var(--transition-fast);
    border: none;
    cursor: pointer;
    white-space: nowrap;

    ${({ $active }) =>
        $active
            ? css`
                  background-color: var(--color-primary);
                  color: white;
              `
            : css`
                  background: transparent;
                  color: var(--color-gray-500);

                  &:hover {
                      color: var(--color-text);
                      background-color: var(--color-white-5);
                  }
              `}
`;

export const TabContent = styled.div`
    animation: tabFadeIn 0.2s ease-out;

    @keyframes tabFadeIn {
        from {
            opacity: 0;
            transform: translateY(6px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const Panel = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
`;

export const PanelHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-background);
`;

export const PanelTitle = styled.h2`
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const InvoiceCount = styled.span`
    font-size: 0.8125rem;
    color: var(--color-gray-500);
    background-color: var(--color-white-5);
    border: 1px solid var(--color-border);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
`;

export const InvoiceTable = styled.div`
    overflow-x: auto;

    table {
        width: 100%;
        border-collapse: collapse;

        @media (max-width: 768px) {
            min-width: 600px;
        }

        th,
        td {
            text-align: left;
            padding: 1rem 2rem;
            color: var(--color-text);
            border-bottom: 1px solid var(--color-border);
            font-size: 0.875rem;
        }

        th {
            background-color: var(--color-background);
            font-size: 0.6875rem;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--color-gray-500);
            letter-spacing: 0.08em;
        }

        tr {
            transition: background-color var(--transition-fast);

            &:last-child td {
                border-bottom: none;
            }
        }

        td.amount {
            font-weight: 700;
            font-size: 0.9375rem;
        }

        td.date {
            color: var(--color-gray-400);
            font-size: 0.8125rem;
        }
    }
`;

export const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;

    ${({ $status }) => {
        switch ($status) {
            case 'paid':
                return css`
                    background-color: var(--color-success-10);
                    color: var(--color-success);
                    border: 1px solid rgba(34, 197, 94, 0.2);
                `;
            case 'pending':
                return css`
                    background-color: var(--color-warning-10);
                    color: var(--color-warning);
                    border: 1px solid rgba(245, 158, 11, 0.2);
                `;
            case 'overdue':
                return css`
                    background-color: var(--color-danger-10);
                    color: var(--color-danger);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                `;
            default:
                return css`
                    background-color: var(--color-white-5);
                    color: var(--color-gray-400);
                    border: 1px solid var(--color-border);
                `;
        }
    }}
`;

export const PayButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.875rem;
    background-color: var(--color-primary);
    color: var(--color-text);
    border: 1px solid var(--color-primary-30);
    border-radius: var(--radius-md);
    font-size: 0.8125rem;
    font-weight: 600;
    transition: all var(--transition-fast);

    &:hover {
        background-color: var(--color-primary-30);
        border-color: var(--color-primary);
    }
`;

export const EmptyStateCell = styled.td`
    text-align: center !important;
    padding: 4rem 2rem !important;
    color: var(--color-gray-500) !important;
    font-size: 0.9375rem;
`;

export const PaginationWrapper = styled.div`
    padding: 1rem 2rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-end;
    background-color: var(--color-background);
`;

export const ActionWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;
