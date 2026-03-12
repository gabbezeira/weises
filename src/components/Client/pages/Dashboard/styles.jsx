import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
`;

const pulse = keyframes`
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.12); }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    animation: ${fadeUp} 0.45s ease-out both;
`;

export const WelcomeSection = styled.div`
    position: relative;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 2rem 2.5rem;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
        background-size: 32px 32px;
        opacity: 0.25;
        pointer-events: none;
    }

    h1 {
        position: relative;
        z-index: 1;
        font-size: 2rem;
        font-weight: 800;
        color: var(--color-text);
        letter-spacing: -0.03em;
        margin-bottom: 0.375rem;
    }

    p {
        position: relative;
        z-index: 1;
        color: var(--color-gray-500);
        font-size: 1rem;
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
`;

export const StatCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-left: 3px solid
        ${({ $color }) => {
          switch ($color) {
            case 'success':
              return 'var(--color-success)';
            case 'warning':
              return '#f59e0b';
            case 'danger':
              return 'var(--color-danger)';
            default:
              return 'var(--color-primary)';
          }
        }};
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    user-select: none;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            font-size: 0.8rem;
            color: var(--color-gray-500);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.07em;
        }

        .icon-wrapper {
            width: 38px;
            height: 38px;
            border-radius: var(--radius-md);
            background-color: var(--color-primary-10);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-primary);

            &.success { background-color: rgba(16, 185, 129, 0.12); color: #10b981; }
            &.warning { background-color: rgba(245, 158, 11, 0.12); color: #f59e0b; }
            &.danger  { background-color: rgba(239, 68, 68, 0.12);  color: #ef4444; }
        }
    }

    .value {
        font-size: 2rem;
        font-weight: 800;
        color: var(--color-text);
        letter-spacing: -0.02em;
        line-height: 1;

        &.text-success { color: #10b981; }
        &.text-warning { color: #f59e0b; }
        &.text-danger  { color: #ef4444; }
    }

    .footer {
        font-size: 0.8125rem;
        color: var(--color-primary);
        display: flex;
        align-items: center;
        gap: 0.35rem;
        margin-top: auto;
        padding-top: 0.5rem;
        border-top: 1px solid var(--color-border);

        &.neutral { color: var(--color-gray-500); }
    }
`;

export const InvestedCard = styled(StatCard)`
    border-left-color: var(--color-primary);

    .icon-wrapper {
        background-color: var(--color-primary-20) !important;
        color: var(--color-primary) !important;
    }

    .value {
        font-size: 2rem;
        color: var(--color-text);
    }
`;




export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SectionTitle = styled.h2`
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 0.625rem;
    letter-spacing: -0.01em;

    &::before {
        content: '';
        display: block;
        width: 3px;
        height: 20px;
        background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary, #7c3aed));
        border-radius: 2px;
    }
`;

export const SectionBadge = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.625rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 700;
    background-color: var(--color-primary-10);
    color: var(--color-primary);
    border: 1px solid var(--color-primary-20);
    margin-left: 0.5rem;
`;

export const DualColumnGrid = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 1.25rem;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const ActionCard = styled(Link)`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.125rem;
    text-decoration: none;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--color-primary-10) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.2s;
    }

    &:hover {
        border-color: var(--color-primary);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        transform: translateX(2px);

        &::after { opacity: 1; }

        .icon-box {
            background: var(--color-primary);
            color: #fff;
            transform: scale(1.05);
        }

        .arrow { color: var(--color-primary); transform: translateX(2px); }
    }

    .icon-box {
        position: relative;
        z-index: 1;
        width: 46px;
        height: 46px;
        background-color: var(--color-primary-10);
        color: var(--color-primary);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.2s ease;
    }

    .info {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        h3 {
            font-size: 0.9375rem;
            font-weight: 600;
            color: var(--color-text);
            margin: 0;
        }

        p {
            font-size: 0.8125rem;
            color: var(--color-gray-500);
            margin: 0;
        }
    }

    .arrow {
        position: relative;
        z-index: 1;
        margin-left: auto;
        color: var(--color-gray-400);
        transition: all 0.2s ease;
        flex-shrink: 0;
    }
`;

export const SupportCard = styled.div`
    background: linear-gradient(150deg, var(--color-primary) 0%, #4f46e5 100%);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -40px; right: -40px;
        width: 130px; height: 130px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -50px; left: -30px;
        width: 160px; height: 160px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
    }

    .header {
        position: relative;
        z-index: 1;

        h3 {
            font-size: 1.125rem;
            font-weight: 700;
            margin-bottom: 0.375rem;
        }
        p {
            font-size: 0.875rem;
            opacity: 0.85;
            line-height: 1.55;
        }
    }

    .contact-btn {
        position: relative;
        z-index: 1;
        background-color: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(8px);
        color: #fff;
        padding: 0.6875rem 1rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 0.875rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.2s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.25);
            transform: translateY(-1px);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
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
    gap: 0.375rem;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 0.8125rem;
    text-decoration: none;
    padding: 0.375rem 0.875rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--color-primary-20);
    background-color: var(--color-primary-10);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-primary);
        color: #fff;
        border-color: transparent;
    }
`;

export const ProjectWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const QuickActionsColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
`;

export const SupportFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    font-size: 0.8125rem;
    opacity: 0.8;
    position: relative;
    z-index: 1;
`;
