import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    min-height: 100vh;
    background: var(--color-background);
    position: relative;
    overflow: hidden;
    padding-top: 10rem;
`;

export const BackgroundGrid = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
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

export const CentralGlow = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: var(--color-primary-20);
    filter: blur(120px);
    border-radius: 9999px;
    pointer-events: none;
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;
`;

export const HeroSection = styled.div`
    text-align: center;
    max-width: 56rem;
    margin: 0 auto 6rem;
`;

export const HeroTitle = styled.h1`
    font-size: 3rem;
    font-family: var(--font-sans);
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
    line-height: 1.25;

    @media (min-width: 768px) {
        font-size: 4.5rem;
    }
`;

export const Highlight = styled.span.attrs({ className: 'text-highlight' })``;

export const HeroDescription = styled.p`
    font-size: 1rem;
    color: var(--color-gray-200);
    line-height: 1.625;
    max-width: 42rem;
    margin: 0 auto;

    @media (min-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const DiagramSection = styled.div`
    position: relative;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8rem;

    @media (min-width: 768px) {
        height: 600px;
    }
`;

export const OrbitLines = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
`;

export const OrbitInner = styled.div`
    width: 280px;
    height: 280px;
    border: 1px solid var(--color-white-5);
    border-radius: 9999px;
    animation: spin 20s linear infinite;

    @media (min-width: 768px) {
        width: 400px;
        height: 400px;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

export const OrbitOuter = styled.div`
    position: absolute;
    width: 380px;
    height: 380px;
    border: 1px solid var(--color-white-5);
    border-radius: 9999px;
    animation: spin-reverse 30s linear infinite;

    @media (min-width: 768px) {
        width: 600px;
        height: 600px;
    }

    @keyframes spin-reverse {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); }
    }
`;

export const CentralCore = styled.div`
    position: relative;
    z-index: 20;
    width: 8rem;
    height: 8rem;
    background: rgb(0 0 0 / 0.8);
    backdrop-filter: blur(64px);
    border-radius: 9999px;
    border: 1px solid var(--color-primary-30);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 80px rgba(105, 50, 226, 0.25);

    @media (min-width: 768px) {
        width: 16rem;
        height: 16rem;
    }
`;

export const CoreImage = styled.img`
    width: 4rem;
    height: 4rem;
    opacity: 0.9;
    filter: drop-shadow(0 0 15px rgba(105, 50, 226, 0.5));
    user-select: none;

    @media (min-width: 768px) {
        width: 8rem;
        height: 8rem;
    }
`;

export const CorePulse = styled.div`
    position: absolute;
    inset: 0;
    background: var(--color-primary-10);
    border-radius: 9999px;
    animation: ping 4s cubic-bezier(0, 0, 0.2, 1) infinite;

    @keyframes ping {
        75%, 100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

export const SatellitesContainer = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 30;
`;

export const SatellitesWrapper = styled.div`
    position: relative;
    width: 280px;
    height: 280px;

    @media (min-width: 768px) {
        width: 400px;
        height: 400px;
    }
`;

export const SatelliteItem = styled.div`
    position: absolute;
    pointer-events: auto;
`;

export const SatelliteIcon = styled(motion.div)`
    position: relative;
    z-index: 30;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface);
    border: 1px solid var(--color-white-10);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    @media (min-width: 768px) {
        width: 5rem;
        height: 5rem;
    }

    ${({ isActive }) =>
      isActive
        ? `
            border-color: #6932E2;
            background: var(--color-primary-20);
            box-shadow: 0 0 25px var(--color-primary);
        `
        : `
            &:hover {
                border-color: #6932E2;
                background: var(--color-primary-20);
                box-shadow: 0 0 25px var(--color-primary);
            }
        `}
`;

export const Tooltip = styled(motion.div)`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 1rem;
    width: 18rem;
    background: rgb(10 10 10 / 0.9);
    backdrop-filter: blur(24px);
    border: 1px solid var(--color-white-10);
    padding: 1.25rem;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    z-index: 50;
    pointer-events: none;
`;

export const TooltipTitle = styled.h4`
    color: white;
    font-weight: 700;
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
`;

export const TooltipDesc = styled.p`
    color: var(--color-gray-300);
    font-size: 0.875rem;
    line-height: 1.625;
`;

export const NarrativeSection = styled.div`
    max-width: 72rem;
    margin: 0 auto 8rem;
    position: relative;
    z-index: 10;
`;

export const NarrativeHeader = styled.div`
    text-align: center;
    max-width: 56rem;
    margin: 0 auto 5rem;
`;

export const NarrativeTitle = styled.h3`
    font-size: 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
    max-width: 22ch;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
        font-size: 3.5rem;
        line-height: 1.1;
    }
`;

export const NarrativeDesc = styled.p`
    font-size: 1rem;
    color: var(--color-gray-300);
    line-height: 1.8;
    margin: 0 auto;
    max-width: 51rem;

    @media (min-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const NarrativeHighlight = styled.span`
    color: var(--color-primary);
    font-weight: 700;
`;

export const NarrativeGrid = styled.div`
    display: grid;
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const NarrativeCard = styled.div`
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

export const CardGradient = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, var(--color-primary-5), transparent);
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);

    ${NarrativeCard}:hover & {
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

export const CardIcon = styled.div`
    margin-bottom: 1.5rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    background: var(--color-white-5);
    color: white;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

    ${NarrativeCard}:hover & {
        color: var(--color-primary);
        background: var(--color-primary-20);
    }
`;

export const CardTitle = styled.h4`
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.75rem;
`;

export const CardDesc = styled.p`
    color: var(--color-gray-200);
    font-size: 0.875rem;
    line-height: 1.625;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    ${NarrativeCard}:hover & {
        color: var(--color-gray-300);
    }
`;

export const CtaContainer = styled.div`
    text-align: center;
    margin-top: 5rem;
`;

export const CtaLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: white;
    color: black;
    padding: 1rem 2rem;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 1.125rem;
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: scale(1.05);
    }
`;
