import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
    padding: 1.5rem;
    
    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

export const Section = styled.div`
    margin-bottom: 3rem;
`;

export const Title = styled.h3`
    font-size: 1.25rem;
    color: var(--color-white);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
`;

export const Flowchart = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    align-items: stretch; /* Make columns match height */
    padding: 2.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 3rem;
        padding: 1.5rem;
    }
`;

export const NodeColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    justify-content: center;
`;

export const Node = styled.div`
    background: rgba(30, 41, 59, 0.4); /* Glassmorphism base */
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05); /* Subtle border */
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Left align for a cleaner doc feel */
    gap: 0.75rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
    overflow: hidden;

    /* Top glowing accent line */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, ${(props) => props.$color || 'var(--color-primary)'}, transparent);
        opacity: 0;
        transition: opacity 0.3s;
    }

    &:hover {
        transform: translateY(-3px);
        background: rgba(30, 41, 59, 0.7);
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

        &::before {
            opacity: 1;
        }
    }

    h4 {
        color: var(--color-white);
        font-size: 1.05rem;
        font-weight: 600;
        margin: 0;
    }

    p {
        color: var(--color-gray-400);
        font-size: 0.85rem;
        line-height: 1.5;
        margin: 0;
    }
`;

export const NodeHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
`;

export const NodeIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: ${(props) => (props.$color ? `${props.$color}15` : 'var(--color-primary-10)')};
    color: ${(props) => props.$color || 'var(--color-primary)'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const Arrow = styled.div`
    position: absolute;
    top: 50%;
    left: 100%;
    width: 2.5rem;
    height: 2px;
    background: var(--color-border);
    transform: translateY(-50%);
    z-index: 1;

    /* Animated gradient flow effect */
    background: linear-gradient(90deg, var(--color-border) 0%, var(--color-gray-600) 50%, var(--color-border) 100%);
    background-size: 200% 100%;
    animation: flow 2s linear infinite;

    @keyframes flow {
        from { background-position: 100% 0; }
        to { background-position: -100% 0; }
    }

    &::after {
        content: '';
        position: absolute;
        right: -2px;
        top: -4px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 6px solid var(--color-gray-500); /* Slightly visible head */
    }

    @media (max-width: 1024px) {
        top: 100%;
        left: 50%;
        width: 2px;
        height: 3rem;
        transform: translateX(-50%);
        background: linear-gradient(180deg, var(--color-border) 0%, var(--color-gray-600) 50%, var(--color-border) 100%);
        background-size: 100% 200%;

        @keyframes flowVertical {
            from { background-position: 0 100%; }
            to { background-position: 0 -100%; }
        }
        animation: flowVertical 2s linear infinite;

        &::after {
            top: auto;
            bottom: -2px;
            right: -4px;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid var(--color-gray-500);
        }
    }
`;

export const StackGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
`;

export const StackCard = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    transition: border-color 0.2s;

    &:hover {
        border-color: var(--color-primary);
    }
    
    .header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--color-border);
        
        h4 {
            color: var(--color-white);
            font-size: 1rem;
            font-weight: 600;
        }
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        
        span {
            font-size: 0.75rem;
            color: var(--color-primary);
            background: var(--color-primary-10);
            padding: 0.25rem 0.6rem;
            border-radius: 999px;
            font-family: 'Fira Code', monospace;
        }
    }
`;
