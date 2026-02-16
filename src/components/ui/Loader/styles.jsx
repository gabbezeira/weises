import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 200px; /* Ensure visibility in empty lists */
  flex: 1;
`;

export const Spinner = styled.div`
  width: 3rem; /* 48px */
  height: 3rem;
  border: 4px solid var(--color-white-10);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
