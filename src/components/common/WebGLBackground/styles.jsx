import styled from 'styled-components';

export const CanvasContainer = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-color: var(--color-background);
`;

export const Canvas = styled.canvas`
    width: 100%;
    height: 100%;
    display: block;
`;
