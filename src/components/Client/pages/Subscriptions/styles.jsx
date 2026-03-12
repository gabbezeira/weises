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

export const SubscriptionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
`;

export const SubscriptionCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h3 {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 0.25rem;
    }

    .amount {
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--color-primary);
    }
    
    .interval {
        font-size: 0.875rem;
        color: var(--color-gray-500);
        font-weight: 400;
    }
`;

export const BillingInfo = styled.div`
    text-align: right;
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
        case 'active':
          return `
                    background-color: var(--color-success-10);
                    color: var(--color-success);
                `;
        case 'past_due':
        case 'unpaid':
          return `
                    background-color: var(--color-warning-10);
                    color: var(--color-warning);
                `;
        case 'canceled':
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

export const DetailRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--color-border);

    span.label {
        color: var(--color-gray-500);
    }

    span.value {
        font-weight: 600;
        color: var(--color-text);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const CardActions = styled.div`
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
`;

export const Button = styled.button`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    ${({ $variant }) => {
      switch ($variant) {
        case 'primary':
          return `
                    background-color: var(--color-primary);
                    color: white;
                    border: none;
                    &:hover:not(:disabled) { background-color: var(--color-primary-20); }
                `;
        case 'danger':
          return `
                    background-color: transparent;
                    color: var(--color-danger);
                    border: 1px solid var(--color-danger);
                    &:hover:not(:disabled) { 
                        background-color: var(--color-danger-10); 
                    }
                `;
        default:
          return `
                    background-color: transparent;
                    color: var(--color-text);
                    border: 1px solid var(--color-border);
                    &:hover:not(:disabled) { background-color: var(--color-background); }
                `;
      }
    }}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const EmptyState = styled.div`
    background-color: var(--color-surface);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-lg);
    padding: 4rem 2rem;
    text-align: center;
    color: var(--color-gray-500);

    .empty-icon {
        margin: 0 auto;
    }

    p {
        margin-top: 1rem;
        font-size: 1.125rem;
    }
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 0.5rem;
`;
