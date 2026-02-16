import styled from 'styled-components';

export const AppLayout = styled.div`
    background-color: var(--color-background);
    min-height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;

    &::selection {
        background-color: rgb(105 50 226 / 0.3);
        color: white;
    }
`;

export const Main = styled.main`
    flex-grow: 1;
`;
