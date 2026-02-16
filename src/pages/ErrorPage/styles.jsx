import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
    min-height: 100vh;
    background: var(--color-background);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
`;

export const BackgroundGlowLeft = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 500px;
    background: rgb(105 50 226 / 0.1);
    filter: blur(100px);
    border-radius: 9999px;
    pointer-events: none;
    transform: translate(-50%, -50%);
`;

export const BackgroundGlowRight = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 500px;
    height: 500px;
    background: rgb(105 50 226 / 0.1);
    filter: blur(100px);
    border-radius: 9999px;
    pointer-events: none;
    transform: translate(50%, 50%);
`;

export const BackgroundGrid = styled.div.attrs({ className: 'bg-grid' })`
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.3;
`;

export const BackgroundFade = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 0%, var(--color-background) 100%);
    pointer-events: none;
    z-index: 10;
`;

export const ContentContainer = styled.div`
    position: relative;
    z-index: 20;
    max-width: 56rem;
    width: 100%;
`;

export const ErrorContent = styled(motion.div)`
    text-align: center;
    margin-bottom: 3rem;
`;

export const Badge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 1rem;
    border-radius: 9999px;
    background: rgb(255 255 255 / 0.05);
    border: 1px solid rgb(255 255 255 / 0.1);
    font-size: 0.875rem;
    font-weight: 500;
    color: #d1d5db;
    backdrop-filter: blur(12px);
    margin-bottom: 2rem;
`;

export const PulseDot = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: #ef4444;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const ErrorCode = styled.h1`
    font-size: 4.5rem;
    font-weight: 700;
    letter-spacing: -0.05em;
    color: white;
    margin-bottom: 1.5rem;
    line-height: 1;

    @media (min-width: 768px) {
        font-size: 8rem;
    }
`;

export const ErrorStatusText = styled.h2`
    font-size: 1.875rem;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    color: white;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
        font-size: 2.25rem;
    }
`;

export const Highlight = styled.span.attrs({ className: 'text-highlight' })``;

export const ErrorMessage = styled.p`
    font-size: 1.25rem;
    color: #9ca3af;
    max-width: 42rem;
    margin: 0 auto;
    font-weight: 300;
    line-height: 1.625;
`;

export const Actions = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    .icon-button {
        display: flex; 
        gap: 0.5rem; 
        justify-content: center; 
        align-items: center; 
        width: 100%; 

        @media (min-width: 640px) { 
            width: auto; 
        }
    }

    @media (min-width: 640px) {
        flex-direction: row;
    }
`;
