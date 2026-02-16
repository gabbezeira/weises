import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Section = styled.section.attrs({ id: 'tech-stack' })`
    padding: 6rem 0;
    background: var(--color-background);
    overflow: hidden;
    position: relative;
`;

export const Separator = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-white-10), transparent);
`;

export const BackgroundGrid = styled.div.attrs({ className: 'bg-grid' })`
    position: absolute;
    inset: 0;
    opacity: 0.3;
    pointer-events: none;
    z-index: 0;
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    margin-bottom: 4rem;
    position: relative;
    z-index: 10;
`;

export const HeaderContent = styled.div`
    max-width: 56rem;
`;

export const Title = styled(motion.h2)`
    font-size: 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
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

export const Description = styled(motion.p)`
    font-size: 1rem;
    color: var(--color-gray-200);
    line-height: 1.625;
    max-width: 42rem;

    @media (min-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const MarqueeTrack = styled.div`
    display: flex;
    overflow: hidden;
    user-select: none;
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
`;

export const MarqueeContent = styled(motion.div)`
    display: flex;
    gap: 4rem;
    align-items: center;
    white-space: nowrap;
    padding: 2.5rem 0;

    @media (min-width: 768px) {
        gap: 6rem;
    }
`;

export const TechItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    opacity: 0.5;
    transition: opacity 300ms ease;

    &:hover {
        opacity: 1;
    }
`;

export const IconWrapper = styled.div`
    padding: 0.75rem;
    border-radius: 0.75rem;
    background: var(--color-white-5);
    border: 1px solid var(--color-white-10);
    color: white;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    ${TechItem}:hover & {
        color: var(--color-primary);
        border-color: var(--color-primary-50);
    }

    & > svg {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
    }
`;

export const TechName = styled.span`
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    letter-spacing: -0.025em;
`;
