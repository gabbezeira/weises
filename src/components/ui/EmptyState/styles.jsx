import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    text-align: center;
    border-radius: 2rem;
    border: 1px solid var(--color-white-5);
    background: rgb(10 10 10 / 0.3);
    backdrop-filter: blur(4px);
    min-height: 400px;
`;

export const StyledIcon = styled.div`
    position: relative;
    z-index: 10;
    color: var(--color-gray-400);
`;

export const IconWrapper = styled(motion.div)`
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    border-radius: 9999px;
    background: var(--color-white-5);
    border: 1px solid var(--color-white-10);
    box-shadow: 0 0 30px var(--color-primary-10);
    position: relative;
`;

export const Title = styled(motion.h3)`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.75rem;
`;

export const Description = styled(motion.p)`
    color: var(--color-gray-400);
    max-width: 28rem;
    line-height: 1.625;
`;
