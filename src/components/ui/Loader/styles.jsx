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
  min-height: 200px;
  flex: 1;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 4px solid var(--color-white-10);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const SpinnerText = styled.p`
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin: 0;
`;
