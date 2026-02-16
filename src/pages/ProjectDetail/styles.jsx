import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
    min-height: 100vh;
    background: var(--color-background);
    position: relative;
`;

export const BackgroundMesh = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
    position: fixed;
`;

export const MeshPattern = styled.div`
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(to right, rgb(105 50 226 / 0.063) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(105 50 226 / 0.063) 1px, transparent 1px);
    background-size: 4rem 4rem;
    opacity: 0.3;
    mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%);
`;

export const HeroSection = styled.div`
    position: relative;
    height: 60vh;
    width: 100%;
    overflow: hidden;

    @media (min-width: 768px) {
        height: 70vh;
    }
`;

export const HeroBackground = styled.div`
    position: absolute;
    inset: 0;
    z-index: 0;
`;

export const HeroImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const HeroOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgb(0 0 0 / 0.6), rgb(0 0 0 / 0.4), var(--color-background));
`;

export const HeroContent = styled.div`
    position: relative;
    z-index: 10;
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 5rem;
`;

import { Link } from 'react-router-dom';

export const BackLink = styled.div`
    position: absolute;
    top: 6rem;
`;

export const BackLinkInner = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-white);
    font-weight: 500;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {

    svg {
        display: block; // Ensure no line-height weirdness on icon
    }
`;

export const HeroText = styled(motion.div)``;

export const Category = styled.span`
    color: var(--color-primary);
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: block;
`;

export const Title = styled.h1`
    font-size: 2.25rem;
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
    line-height: 1.25;
    max-width: 56rem;

    @media (min-width: 768px) {
        font-size: 3.75rem;
    }

    @media (min-width: 1024px) {
        font-size: 6rem;
    }
`;

export const ContentSection = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem 8rem;
    position: relative;
    z-index: 10;
`;

export const StatsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 6rem;
    border-bottom: 1px solid rgb(255 255 255 / 0.1);
    padding-bottom: 3rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const StatItem = styled(motion.div)``;

export const StatValue = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
        font-size: 2.25rem;
    }

    @media (min-width: 1024px) {
        font-size: 3rem;
    }
`;

export const StatLabel = styled.div`
    font-size: 0.75rem;
    color: var(--color-gray-200);
    text-transform: uppercase;
    letter-spacing: 0.1em;

    @media (min-width: 768px) {
        font-size: 0.875rem;
    }
`;

export const MainGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(12, 1fr);
        gap: 6rem;
    }
`;

export const MainContent = styled.div`
    @media (min-width: 1024px) {
        grid-column: span 8;
    }
`;

export const Description = styled.div`
    color: var(--color-gray-300);
    font-size: 1.125rem;
    line-height: 1.75;
`;

export const DescriptionText = styled.p`
    font-size: 1.5rem;
    color: var(--color-gray-300);
    line-height: 1.625;
    margin-bottom: 3rem;
    font-weight: 300;
`;

export const ChallengeSolutionGrid = styled.div`
    display: grid;
    gap: 3rem;
    margin-bottom: 4rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const ContentBlock = styled.div``;

export const BlockTitle = styled.h3`
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

export const BlockText = styled.p`
    color: var(--color-gray-200);
`;

export const GallerySection = styled.div`
    margin-top: 4rem;
`;

export const GalleryTitle = styled.h3`
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;

export const GalleryGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const GalleryItem = styled(motion.div)`
    aspect-ratio: 4/3;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 0.1);
`;

export const GalleryImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 500ms ease;

    ${GalleryItem}:hover & {
        transform: scale(1.1);
    }
`;

export const Sidebar = styled.div`
    @media (min-width: 1024px) {
        grid-column: span 4;
    }
`;

export const SidebarCard = styled.div`
    background: rgb(10 10 10 / 0.5);
    backdrop-filter: blur(4px);
    border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 1rem;
    padding: 2rem;
    position: sticky;
    top: 8rem;
`;

export const SidebarSection = styled.div`
    margin-bottom: 2rem;
`;

export const SidebarTitle = styled.h3`
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 1rem;
`;

export const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

export const ServiceTag = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 0.375rem;
    background: rgb(105 50 226 / 0.1);
    border: 1px solid rgb(105 50 226 / 0.2);
    font-size: 0.875rem;
    color: var(--color-primary);
    font-weight: 500;
`;

export const TechTag = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 0.375rem;
    background: rgb(255 255 255 / 0.05);
    border: 1px solid rgb(255 255 255 / 0.1);
    font-size: 0.875rem;
    color: var(--color-gray-300);
`;

export const InfoSection = styled.div`
    border-top: 1px solid rgb(255 255 255 / 0.1);
    padding-top: 2rem;
`;

export const InfoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: var(--color-gray-200);
`;

export const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const InfoValue = styled.span`
    color: white;
    font-weight: 500;
`;

export const VisitButton = styled.button`
    width: 100%;
    margin-top: 2rem;
    padding: 1rem;
    background: white;
    color: black;
    font-weight: 700;
    border-radius: 0.75rem;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        background: var(--color-gray-200);
    }
`;

export const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    color: var(--color-gray-300);
    font-size: 1.5rem;
    gap: 1rem;
`;
