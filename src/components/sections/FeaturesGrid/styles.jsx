import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Section = styled.section.attrs({ id: 'skills' })`
    padding: 6rem 0;
    background: var(--color-background);
    position: relative;
    z-index: 10;
`;

export const Separator = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-white-10), transparent);
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
`;

export const Header = styled.div`
    margin-bottom: 4rem;
`;

export const Title = styled.h2`
    font-size: 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    color: white;
    margin-bottom: 2rem;
    line-height: 1.25;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
        font-size: 3rem;
    }

    @media (min-width: 1024px) {
        font-size: 4.5rem;
    }
`;

export const Highlight = styled.span.attrs({ className: 'text-highlight' })``;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const FeatureCard = styled(motion.div)`
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
    border: 1px solid var(--color-white-10);
    background: rgb(10 10 10 / 0.2);
    padding: 2rem;
    transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    cursor: default;

    &:hover {
        border-color: var(--color-primary-50);
    }
`;

export const CardOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, var(--color-primary-5), transparent);
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);

    ${FeatureCard}:hover & {
        opacity: 1;
    }
`;

export const CardContent = styled.div`
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const IconWrapper = styled.div`
    margin-bottom: 1.5rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    background: var(--color-white-5);
    color: white;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

    ${FeatureCard}:hover & {
        color: var(--color-primary);
        background: var(--color-primary-20);
    }
`;

export const FeatureTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.75rem;
`;

export const FeatureDescription = styled.p`
    color: var(--color-gray-200);
    font-size: 0.875rem;
    line-height: 1.625;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    ${FeatureCard}:hover & {
        color: var(--color-gray-300);
    }
`;
