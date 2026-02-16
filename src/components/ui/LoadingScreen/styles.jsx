import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
    position: fixed;
    inset: 0;
    z-index: 10001;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface);
`;

export const LogoWrapper = styled(motion.div)`
    position: relative;
`;

export const Logo = styled.img`
    width: 6rem;
    height: auto;
    position: relative;
    z-index: 10002;
`;
