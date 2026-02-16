import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoginPage = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  position: relative;
  overflow: hidden;
`;

export const Grid = styled.div`
    position: absolute;
    inset: 0;
    background-image: 
        linear-gradient(to right, var(--color-white-5) 1px, transparent 1px),
        linear-gradient(to bottom, var(--color-white-5) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
    -webkit-mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
    pointer-events: none;
    opacity: 0.6;
    z-index: 0;
`;

export const GlowImage = styled(motion.img)`
    position: absolute;
    width: 1000px;
    height: 1000px;
    opacity: 0.6;
    filter: blur(80px);
    pointer-events: none;
    user-select: none;
    z-index: 0;
    mix-blend-mode: screen;
`;

export const GlowImageTop = styled(GlowImage).attrs({
  style: {
    top: '-50%',
    left: '-20%',
    transform: 'rotate(20deg)',
  },
})``;

export const GlowImageBottom = styled(GlowImage).attrs({
  style: {
    bottom: '-50%',
    right: '-20%',
    transform: 'rotate(45deg)',
  },
})``;

export const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 440px;
  background: rgba(15, 15, 20, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 3.5rem 2.5rem;
  position: relative;
  z-index: 10;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  margin: 1rem;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    margin: 1rem;
    max-width: 100%;
    border-radius: 20px;
  }
`;

export const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoImage = styled.img`
  height: 48px;
  width: auto;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    height: 40px;
  }
`;

export const LogoText = styled.h1`
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #fff 0%, var(--color-gray-400) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
`;

export const LogoSubtext = styled.p`
  font-size: 0.9375rem;
  color: var(--color-gray-400);
  font-weight: 400;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gray-400);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-left: 0.25rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 1.25rem;
  color: var(--color-gray-500);
  display: flex;
  pointer-events: none;
  transition: color 0.2s ease;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  color: var(--color-white);
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  outline: none;

  &::placeholder {
    color: #5b5b5bff;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--color-primary-50);
    box-shadow: 0 0 0 4px var(--color-primary-10);
  }

  &:focus ~ ${InputIcon},
  &:focus + ${InputIcon} {
    color: var(--color-white);
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1.25rem;
  color: var(--color-gray-500);
  display: flex;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-white);
  }
`;

export const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: var(--color-primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-glow-primary);
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ButtonContent = styled.span`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.5rem;
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  margin: 2rem 0;
`;

export const FooterText = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-gray-500);

  a {
    color: var(--color-white);
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.5rem;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: var(--color-white);
        transition: width 0.2s ease;
    }

    &:hover::after {
        width: 100%;
    }
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite;
`;
