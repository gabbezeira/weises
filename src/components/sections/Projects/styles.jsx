import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Section = styled.section`
    padding: 10rem 0;
    position: relative;
    overflow: hidden;
`;

export const GlowImage = styled(motion.img)`
    position: absolute;
    width: 800px;
    height: 800px;
    opacity: 0.3;
    filter: blur(80px);
    pointer-events: none;
    user-select: none;
    z-index: 0;
`;

export const GlowImageTop = styled(GlowImage).attrs({
  style: {
    top: '-30%',
    left: '-30%',
    transform: 'rotate(-90deg)',
  },
})``;

export const EmptyStateContainer = styled.div`
    margin-bottom: 5rem;
`;

export const GlowImageBottom = styled(GlowImage).attrs({
  style: {
    bottom: '-20%',
    right: '-40%',
    transform: 'rotate(180deg)',
  },
})``;

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
    opacity: 0.15;
    z-index: 0;
`;

export const Container = styled.div`
    width: 100%;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    position: relative;
    z-index: 10;
`;

export const Header = styled.div`
    text-align: center;
    max-width: 56rem;
    margin: 0 auto 6rem;
`;

export const Title = styled(motion.h2)`
    font-size: 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    color: white;
    margin-bottom: 2rem;
    line-height: 1.1;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
        font-size: 3rem;
    }

    @media (min-width: 1024px) {
        font-size: 4.5rem;
    }
`;

export const Highlight = styled.span.attrs({ className: 'text-highlight' })``;

export const Description = styled.p`
    color: var(--color-gray-200);
    font-size: 1rem;
    font-weight: 300;
    max-width: 32rem;
    margin: 0 auto 2.5rem;
    line-height: 1.625;

    @media (min-width: 768px) {
        font-size: 1.125rem;
    }
`;

export const ItalicText = styled.span`
    color: var(--color-text);
    font-family: var(--font-display);
    font-style: italic;
`;

export const ButtonWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const ButtonGradientMain = styled.div`
    position: absolute;
    inset: -1px;
    border-radius: var(--radius-full);
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    opacity: 0.5;
    filter: blur(8px);
    transition: opacity var(--transition-normal);

    ${ButtonWrapper}:hover & {
        opacity: 0.8;
    }
`;

export const ButtonGradientSecondary = styled.div`
    position: absolute;
    inset: -1px;
    border-radius: var(--radius-full);
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    z-index: 0;
`;

export const CaseStudyLink = styled(Link)`
    position: relative;
    z-index: 10;
    display: inline-block;
    padding: 1rem 2rem;
    background: var(--color-background);
    color: white;
    border-radius: var(--radius-full);
    font-weight: 600;
    transition: background var(--transition-normal);

    &:hover {
        background: transparent;
    }
`;

export const CarouselContainer = styled.div`
    position: relative;
`;

export const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    border-radius: var(--radius-full);
    background: var(--color-white-5);
    border: 1px solid var(--color-white-10);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
    z-index: 20;

    ${({ position }) => (position === 'left' ? 'left: -1rem;' : 'right: -1rem;')}

    @media (min-width: 1024px) {
        ${({ position }) => (position === 'left' ? 'left: -4rem;' : 'right: -4rem;')}
    }

    &:hover {
        background: var(--color-white-10);
        transform: translateY(-50%) scale(1.1);
    }
`;

export const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const ProjectCard = styled(motion.div)`
    position: relative;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    aspect-ratio: 4/5;
    background: var(--color-surface);
    border: 1px solid var(--color-white-10);
    transition: border-color var(--transition-normal);

    &:hover {
        border-color: var(--color-primary-50);
    }
`;

export const CardLink = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
`;

export const ImageContainer = styled.div`
    position: absolute;
    inset: 0;
`;

export const CardOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
    z-index: 10;
    transition: opacity 500ms ease;
    opacity: 0.6;

    ${ProjectCard}:hover & {
        opacity: 0.8;
    }
`;

export const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 700ms ease-in-out;

    ${ProjectCard}:hover & {
        transform: scale(1.1);
    }
`;

export const CardContent = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    z-index: 20;
`;

export const CategoryWrapper = styled.div`
    margin-bottom: 0.5rem;
    transform: translateY(10px);
    opacity: 0;
    transition: all 500ms ease;
    transition-delay: 50ms;

    ${ProjectCard}:hover & {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const CategoryBadge = styled.span`
    font-size: 0.75rem;
    color: var(--color-gray-300);
    letter-spacing: 0.05em;
    text-transform: uppercase;
`;

export const ProjectTitle = styled.h3`
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    ${ProjectCard}:hover & {
        color: var(--color-primary);
    }
`;

export const HoverArrow = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    background: var(--color-white-10);
    border-radius: var(--radius-full);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 30;
    opacity: 0;
    transform: rotate(45deg);
    transition: all 300ms ease;

    ${ProjectCard}:hover & {
        opacity: 1;
        transform: rotate(0deg);
    }
`;
