import styled from 'styled-components';

export const LayoutWrapper = styled.div`
    background: var(--color-background);
    min-height: 100vh;
    color: var(--color-text);
    font-family: var(--font-sans);

    &::selection {
        background: var(--color-primary-30);
        color: white;
    }

    & *::selection {
        background: var(--color-primary-30);
        color: white;
    }
`;

export const MainContent = styled.main`
    position: relative;
    padding-top: 5rem;
`;

export const BackgroundEffects = styled.div`
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
`;

export const PulseCircleTop = styled.div`
    position: absolute;
    top: -10%;
    left: -10%;
    width: 40%;
    height: 40%;
    background: var(--color-primary-20);
    border-radius: 9999px;
    filter: blur(120px);
    opacity: 0.3;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const PulseCircleBottom = styled.div`
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 40%;
    height: 40%;
    background: rgb(160 105 255 / 0.2);
    border-radius: 9999px;
    filter: blur(120px);
    opacity: 0.3;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const ContentContainer = styled.div`
    position: relative;
    z-index: 10;
`;
