import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

export const FilterBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-surface);
    padding: 1rem 1.5rem;
    border-radius: 16px;
    border: 1px solid var(--color-border);
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: stretch;
        
        select {
            width: 100%;
        }
    }
`;

export const FilterLabel = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0;
`;

export const FilterSelect = styled.select`
    background-color: var(--color-background);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    padding: 0.5rem 2.5rem 0.5rem 1rem; /* Extra padding right for arrow */
    border-radius: 8px;
    font-size: 0.875rem;
    outline: none;
    cursor: pointer;
    transition: all 0.2s;
    appearance: none; /* Remove default arrow */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1rem;

    &:hover {
        border-color: var(--color-primary);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236932e2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;

    @media (max-width: 1280px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const StatCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-color: ${({ $color }) => $color || 'var(--color-primary)'};
    }

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, ${({ $color }) => $color || 'var(--color-primary)'} 0%, transparent 70%);
        opacity: 0.05;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }

    &:hover::before {
        opacity: 0.1;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
`;

export const IconBox = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $color }) => ($color ? `${$color}15` : 'var(--color-primary-10)')};
    color: ${({ $color }) => $color || 'var(--color-primary)'};
    transition: transform 0.3s ease;

    ${StatCard}:hover & {
        transform: scale(1.1) rotate(5deg);
    }
`;

export const Title = styled.h3`
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-gray-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
`;

export const MainValue = styled.div`
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-text);
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-gray-500);
`;

export const TrendPill = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    background-color: ${({ $isPositive }) => ($isPositive ? 'var(--color-success-10)' : 'var(--color-danger-10)')};
    color: ${({ $isPositive }) => ($isPositive ? 'var(--color-success)' : 'var(--color-danger)')};
`;
