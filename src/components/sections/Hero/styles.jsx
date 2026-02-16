import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Section = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 5rem;
    overflow: hidden;
`;

export const Container = styled.div`
    width: 100%;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    position: relative;
    z-index: 10;
    text-align: center;
`;

export const Grid = styled.div`
    position: absolute;
    inset: 0;
    background-image: 
        linear-gradient(to right, var(--color-white-5) 1px, transparent 1px),
        linear-gradient(to bottom, var(--color-white-5) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle at center, black 0%, transparent 70%);
    pointer-events: none;
`;

export const GradientFade = styled.div`
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, var(--color-background) 100%);
    pointer-events: none;
`;

export const GlowImage = styled(motion.img)`
    position: absolute;
    width: 800px;
    height: 800px;
    opacity: 1;
    filter: blur(60px);
    pointer-events: none;
    user-select: none;
    z-index: 0;
    mix-blend-mode: screen;
`;

export const GlowImageTop = styled(GlowImage).attrs({
  style: {
    top: '-40%',
    left: '-30%',
    transform: 'rotate(30deg)',
  },
})``;

export const GlowImageBottom = styled(GlowImage).attrs({
  style: {
    bottom: '-40%',
    right: '-30%',
    transform: 'rotate(60deg)',
  },
})``;

export const BadgeWrapper = styled(motion.div)`
    margin-bottom: 2rem;
`;

export const Badge = styled.span`
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-secondary);
    background: rgba(160, 105, 255, 0.1);
    border: 1px solid rgba(160, 105, 255, 0.2);
    backdrop-filter: blur(10px);
`;

export const Title = styled(motion.h1)`
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: white;
    margin-bottom: 2rem;
    line-height: 1.1;

    @media (min-width: 768px) {
        font-size: 3.75rem;
    }

    @media (min-width: 1024px) {
        font-size: 6rem;
    }
`;

export const Highlight = styled.span.attrs({ className: 'text-highlight' })``;

export const Description = styled(motion.p)`
    font-size: 1rem;
    color: var(--color-gray-200);
    max-width: 42rem;
    margin: 0 auto 2.5rem;
    line-height: 1.625;

    @media (min-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const CTAButton = styled.button`
    padding: 1rem 2rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    background: var(--color-primary);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: var(--transition-normal);
    box-shadow: var(--shadow-glow-primary);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 25px var(--color-primary-50);
    }
`;
