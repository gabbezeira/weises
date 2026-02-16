import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: calc(100vh - 140px); /* Adjust based on header/padding */
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
`;

export const SubTitle = styled.p`
    font-size: 0.875rem;
    color: var(--color-gray-400);
`;

export const AddButton = styled.button`
    background-color: var(--color-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-size: 0.875rem;
    transition: background-color var(--transition-fast);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background-color: var(--color-primary-50);
    }
`;

export const Board = styled.div`
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    height: 100%;
    padding-bottom: 1rem;
    
    /* Custom Scrollbar for horizontal scrolling */
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

export const Column = styled.div`
    flex: 0 0 350px;
    background-color: var(--color-white-5);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    max-height: 100%;
`;

export const ColumnHeader = styled.div`
    padding: 1rem;
    border-bottom: 1px solid var(--color-white-5);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ColumnTitle = styled.h3`
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-gray-400);
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const TaskCount = styled.span`
    background-color: var(--color-white-10);
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
`;

export const TaskList = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow-y: auto;
    flex: 1;

    /* Custom Scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
`;

export const TaskCard = styled(motion.div)`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 1rem;
    cursor: grab;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    &:active {
        cursor: grabbing;
    }

    &:hover {
        border-color: var(--color-primary-50);
    }
`;

export const TaskHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
`;

export const TaskTitle = styled.h4`
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    line-height: 1.4;
`;

export const PriorityBadge = styled.span`
    font-size: 0.625rem;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    text-transform: uppercase;
    font-weight: 600;

    ${({ $priority }) => {
      switch ($priority) {
        case 'high':
          return `background: rgba(239, 68, 68, 0.1); color: var(--color-red-400);`;
        case 'critical':
          return `background: rgba(220, 38, 38, 0.1); color: var(--color-red-600);`;
        case 'medium':
          return `background: rgba(245, 158, 11, 0.1); color: #fbbf24;`; // Yellow/Orange
        default:
          return `background: rgba(107, 114, 128, 0.1); color: var(--color-gray-400);`;
      }
    }}
`;

export const TaskMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--color-gray-500);
`;

export const Assignee = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
`;

export const AssigneeAvatar = styled.div`
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--radius-full);
    background-color: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.625rem;
    font-weight: 700;
`;

export const TaskActions = styled.div`
    display: flex;
    gap: 0.25rem;
`;

export const TaskActionButton = styled.button`
    padding: 0.25rem;
    color: var(--color-gray-500);
    border-radius: var(--radius-sm);
    
    opacity: ${({ $secondary }) => ($secondary ? 0.6 : 1)};
    transition: all var(--transition-fast);

    &:hover {
        background-color: var(--color-white-5);
        color: var(--color-text);
        opacity: 1;
    }
`;

// Modal Styles
export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-index-modal);
`;

export const ModalContent = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const ModalTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
`;
