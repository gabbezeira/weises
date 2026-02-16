import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Container = styled.div`
    position: relative;
`;

export const TriggerButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);

    &:hover {
        background: var(--color-white-5);
    }
`;

export const Flag = styled.span`
    font-size: 1.125rem;
    line-height: 1;
`;

export const StyledChevronDown = styled(ChevronDown)`
    color: var(--color-gray-400);
    transition: transform 150ms;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'none')};
`;

export const Dropdown = styled(motion.div)`
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-white-10);
    border-radius: var(--radius-md);
    padding: 0.5rem;
    min-width: 140px;
    box-shadow: var(--shadow-glow-white);
    z-index: 50;
    overflow: hidden;
`;

export const DropdownContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const LangButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    width: 100%;
    border-radius: var(--radius-sm);
    color: ${({ $isActive }) => ($isActive ? 'white' : 'var(--color-gray-400)')};
    background: ${({ $isActive }) => ($isActive ? 'var(--color-white-10)' : 'transparent')};
    transition: var(--transition-fast);

    &:hover {
        color: white;
        background: var(--color-white-5);
    }
`;

export const LangText = styled.span`
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 500;
`;
