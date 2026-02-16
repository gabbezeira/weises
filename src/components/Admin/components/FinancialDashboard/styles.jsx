import styled from 'styled-components';

export const DashboardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto; /* Two rows imply flexibility */
    gap: 1.5rem;
    animation: fadeIn 0.6s ease-in-out;

    @media (max-width: 1280px) {
        grid-template-columns: 1fr;
    }
`;

export const ChartCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    min-height: 400px; /* Taller charts */
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
    }
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const CardTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '';
        display: block;
        width: 4px;
        height: 16px;
        background-color: var(--color-primary);
        border-radius: 2px;
    }
`;

export const Header = styled.div`
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
    gap: 1rem;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;

        div {
            width: 100%;
        }
    }
`;

export const SpanningCard = styled(ChartCard)`
    grid-column: span 2;

    @media (max-width: 1280px) {
        grid-column: span 1;
    }
`;

export const FilterGroup = styled.div`
    display: flex;
    background-color: var(--color-background);
    padding: 0.25rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    gap: 0.25rem;

    button {
        padding: 0.375rem 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-gray-500);
        border-radius: var(--radius-md);
        transition: all 0.2s ease;

        &:hover {
            color: var(--color-text);
            background-color: var(--color-white-5);
        }

        &.active {
            background-color: var(--color-surface);
            color: var(--color-primary);
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
    }
`;
