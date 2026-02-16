import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--color-background);
  position: relative;
  overflow: hidden;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.15;
    z-index: 0;
  }

  &::before {
    background: var(--color-primary);
    top: -100px;
    left: -100px;
  }

  &::after {
    background: var(--color-secondary);
    bottom: -100px;
    right: -100px;
  }
`;

export const Card = styled(motion.div)`
  background: rgba(10, 10, 12, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3rem;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 480px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 10;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const Logo = styled.img`
  height: 48px;
  margin-bottom: 2rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  filter: drop-shadow(0 0 20px var(--color-primary-30));
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 0.75rem;
  text-align: center;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  color: var(--color-gray-400);
  text-align: center;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: var(--color-gray-300);
    font-size: 0.875rem;
    font-weight: 500;
    margin-left: 0.25rem;
  }

  div {
      position: relative;
      display: flex;
      align-items: center;
  }

  input {
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    padding: 1rem 1rem 1rem 2.75rem; /* Space for icon */
    color: var(--color-white);
    font-size: 1rem;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      background: rgba(105, 50, 226, 0.05);
      box-shadow: 0 0 0 4px var(--color-primary-10);
    }

    &::placeholder {
      color: var(--color-gray-600);
    }
  }

  svg {
      position: absolute;
      left: 1rem;
      color: var(--color-gray-500);
      pointer-events: none;
      transition: color 0.2s;
  }

  input:focus + svg, input:not(:placeholder-shown) + svg {
      color: var(--color-primary);
  }
`;

export const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--color-red-400);
  padding: 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: var(--color-white);
  border: none;
  padding: 1rem;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;

  /* Shine effect on hover */
  &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: 0.5s;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px var(--color-primary-30);
    
    &::after {
        left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: var(--color-gray-800);
    color: var(--color-gray-500);
  }
`;
