import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Section = styled.section.attrs({ id: 'inspiration' })`
    padding: 8rem 0;
    background: var(--color-background);
    position: relative;
    overflow: hidden;
`;

export const GlowImage = styled.img`
    position: absolute;
    width: 60vw;
    max-width: 900px;
    height: auto;
    pointer-events: none;
    z-index: 0;
    opacity: 0.3; 
    mix-blend-mode: screen;
    filter: blur(80px); 
    user-select: none;
`;

export const Separator = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgb(255 255 255 / 0.1), transparent);
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    max-width: 64rem;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const ImageSide = styled(motion.div)`
    width: 100%;

    @media (min-width: 768px) {
        width: 50%;
    }
`;

export const ImageContainer = styled.div`
    aspect-ratio: 1/1;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
`;

export const ImageOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgb(105 50 226 / 0.2);
    mix-blend-mode: overlay;
    z-index: 10;
`;

export const Portrait = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: all 700ms ease;

    ${ImageContainer}:hover & {
        filter: grayscale(0%);
    }
`;

export const BorderRight = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgb(105 50 226 / 0.5), transparent);
`;

export const BorderBottom = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgb(105 50 226 / 0.5), transparent);
`;

export const TextSide = styled(motion.div)`
    width: 100%;

    @media (min-width: 768px) {
        width: 50%;
    }
`;

export const Quote = styled.h2`
    font-size: 1.5rem;
    font-family: var(--font-display);
    font-weight: 500;
    color: white;
    margin-bottom: 2rem;
    line-height: 1.25;
    font-style: italic;

    @media (min-width: 768px) {
        font-size: 2.25rem;
    }

    @media (min-width: 1024px) {
        font-size: 3rem;
    }
`;

export const AuthorName = styled.p`
    color: white;
    font-weight: 700;
    font-size: 1.125rem;
`;

export const AuthorRole = styled.p`
    color: var(--color-primary);
`;
