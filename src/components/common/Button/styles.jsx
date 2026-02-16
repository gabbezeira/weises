import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.button)`
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 500;
    transition: all 300ms ease;
    transform: scale(1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    ${({ variant }) =>
      variant === 'primary' &&
      `
        background: var(--color-primary);
        color: white;
        border: 1px solid transparent;

        &:hover {
            box-shadow: var(--shadow-glow-primary);
        }
    `}

    ${({ variant }) =>
      variant === 'secondary' &&
      `
        background: transparent;
        border: 1px solid var(--color-primary);
        color: var(--color-primary);

        &:hover {
            background: var(--color-primary-10);
        }
    `}

    ${({ variant }) =>
      variant === 'glow' &&
      `
        background: white;
        color: black;

        &:hover {
            box-shadow: var(--shadow-glow-white);
        }
    `}
`;
