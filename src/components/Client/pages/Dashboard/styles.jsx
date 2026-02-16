import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const WelcomeSection = styled.div`
    margin-bottom: 1rem;

    h1 {
        font-size: 2rem;
        font-weight: 800;
        color: var(--color-text);
        letter-spacing: -0.03em;
        margin-bottom: 0.5rem;
    }

    p {
        color: var(--color-gray-500);
        font-size: 1rem;
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
`;

export const StatCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    user-select: none;

    &:hover {
        transform: translateY(-2px);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            font-size: 0.875rem;
            color: var(--color-gray-500);
            font-weight: 500;
        }

        .icon-wrapper {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--color-background);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-primary);
        }
    }

    .value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-text);
    }

    .footer {
        font-size: 0.875rem;
        color: var(--color-success);
        display: flex;
        align-items: center;
        gap: 0.25rem;

        &.neutral {
            color: var(--color-gray-500);
        }
    }
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const SectionTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 0.75rem;

    &::before {
        content: '';
        display: block;
        width: 4px;
        height: 24px;
        background-color: var(--color-primary);
        border-radius: 2px;
    }
`;

export const DualColumnGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const ActionCard = styled(Link)`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--color-primary);
    }

    .icon-box {
        width: 48px;
        height: 48px;
        background-color: var(--color-primary-10);
        color: var(--color-primary);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        h3 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-text);
            margin: 0;
        }

        p {
            font-size: 0.875rem;
            color: var(--color-gray-500);
            margin: 0;
        }
    }
    
    .arrow {
        margin-left: auto;
        color: var(--color-gray-400);
    }
`;

export const SupportCard = styled.div`
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    border-radius: var(--radius-lg);
    padding: 2rem;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -20px;
        right: -20px;
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }

    .header {
        h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        p {
            font-size: 0.9375rem;
            opacity: 0.9;
            line-height: 1.5;
        }
    }

    .contact-btn {
        background-color: white;
        color: var(--color-primary);
        border: none;
        padding: 0.75rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: transform 0.2s;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }
`;

export const ProjectsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ViewAllLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
        color: var(--color-primary-20);
        text-decoration: underline;
    }
`;

export const ProjectWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const QuickActionsColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const SupportFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    font-size: 0.875rem;
    opacity: 0.9;
`;
