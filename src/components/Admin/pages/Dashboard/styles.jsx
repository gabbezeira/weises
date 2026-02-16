import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const StatCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: transform var(--transition-fast);

    &:hover {
        transform: translateY(-2px);
    }
`;

export const StatIconWrapper = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: var(--radius-md);
    background-color: ${({ color }) => (color ? `${color}15` : 'var(--color-primary-10)')};
    color: ${({ color }) => color || 'var(--color-primary)'};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StatInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const StatTitle = styled.h3`
    font-size: 0.875rem;
    color: var(--color-gray-400);
    font-weight: 500;
`;

export const StatValue = styled.p`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
`;

export const StatTrend = styled.span`
    font-size: 0.75rem;
    color: ${({ $positive }) => ($positive ? 'var(--color-success)' : 'var(--color-danger)')};
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

export const Section = styled.section`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SectionTitle = styled.h2`
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
`;

export const ActionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    font-weight: 500;
    transition: all var(--transition-fast);

    &:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
        background-color: var(--color-primary-5);
    }
`;
