import styled from 'styled-components';

export const Section = styled.section.attrs({ id: 'ready' })`
    padding: 8rem 0;
    background: var(--color-background);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
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
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;
    max-width: 56rem;
`;

export const Title = styled.h2`
    font-size: 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    color: white;
    margin-bottom: 2rem;
    line-height: 1.25;
    letter-spacing: -0.025em;
    padding: 1rem;
    overflow: visible;

    @media (min-width: 768px) {
        font-size: 3rem;
    }

    @media (min-width: 1024px) {
        font-size: 4.5rem;
    }
`;

export const Highlight = styled.span.attrs({ className: 'text-highlight' })`
    position: relative;
    display: inline-block;
    padding-right: 2rem;
    padding-left: 0.25rem;
`;

export const Description = styled.p`
    font-size: 1rem;
    color: var(--color-gray-200);
    margin-bottom: 2.5rem;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const CTAButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: white;
    color: black;
    padding: 1rem 2rem;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 1.125rem;
    transition: transform 300ms ease;

    &:hover {
        transform: scale(1.05);
    }
`;
