import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
    background: rgb(10 10 10 / 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-white-10);
    border-radius: 0.75rem;
    padding: 1.5rem;
    transition: border-color 300ms ease;

    &:hover {
        border-color: var(--color-primary-50);
    }
`;
