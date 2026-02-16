import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    min-height: 100vh;
    background: var(--color-background);
    position: relative;
    padding-top: 10rem;
    padding-bottom: 5rem;
`;

export const BackgroundGrid = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
    position: fixed;
`;

export const GridLayer = styled.div.attrs({ className: 'bg-grid' })`
    position: absolute;
    inset: 0;
    opacity: 0.2;
`;

export const GradientLayer = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, var(--color-background), transparent, var(--color-background));
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;
`;

export const Header = styled.div`
    text-align: center;
    max-width: 56rem;
    margin: 0 auto 5rem;
`;

export const Title = styled(motion.h1)`
    font-size: 3rem;
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
        font-size: 4.5rem;
    }
`;

export const Highlight = styled.span.attrs({ className: 'text-highlight' })``;

export const Description = styled.p`
    color: var(--color-gray-200);
    font-size: 1.25rem;
    line-height: 1.625;
    max-width: 42rem;
    margin: 0 auto;
`;

export const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 5rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const ProjectCard = styled(motion.div)`
    position: relative;
    aspect-ratio: 1/1;
    border-radius: 2rem;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 0.1);
    background: var(--color-surface);
    box-shadow: 0 8px 30px rgb(0 0 0 / 0.12);
    transition: all 500ms ease;

    &:hover {
        box-shadow: 0 8px 30px rgb(105 50 226 / 0.15);
    }
`;

export const CardLink = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

export const CardImageContainer = styled.div`
    position: absolute;
    inset: 0;
`;

export const CardOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgb(0 0 0 / 0.8), rgb(0 0 0 / 0.2), transparent);
    z-index: 10;
    opacity: 0.6;
    transition: opacity 500ms ease;

    ${ProjectCard}:hover & {
        opacity: 0.4;
    }
`;

export const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: transform 700ms ease-in-out;

    ${ProjectCard}:hover & {
        transform: scale(1.1);
    }
`;

export const CardContent = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    padding: 2rem;
    transform: translateY(0.5rem);
    transition: transform 300ms ease;

    ${ProjectCard}:hover & {
        transform: translateY(0);
    }
`;

export const CardCategory = styled.span`
    display: inline-block;
    padding: 0.25rem 0.75rem;
    margin-bottom: 0.75rem;
    border-radius: 9999px;
    background: rgb(105 50 226 / 0.2);
    border: 1px solid rgb(105 50 226 / 0.3);
    color: var(--color-primary);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    backdrop-filter: blur(12px);
`;

export const CardTitle = styled.h3`
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.25rem;
`;

export const HoverArrow = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 30;
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    background: rgb(255 255 255 / 0.1);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(-0.5rem);
    transition: all 300ms ease;
    border: 1px solid rgb(255 255 255 / 0.2);

    ${ProjectCard}:hover & {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const EmptyStateContainer = styled.div`
    margin-bottom: 5rem;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export const PaginationButton = styled.button`
    padding: 0.75rem;
    border-radius: 9999px;
    background: var(--color-surface);
    border: 1px solid rgb(255 255 255 / 0.1);
    color: white;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background: rgb(255 255 255 / 0.05);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const PaginationInfo = styled.span`
    color: var(--color-gray-400);
    font-weight: 500;
`;

export const PaginationCurrent = styled.span`
    color: white;
`;
