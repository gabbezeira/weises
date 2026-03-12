import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 1.5rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 0.5rem;
    }
`;

export const Section = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--color-surface-hover);

    .title-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        
        h3 {
            font-size: 1.05rem;
            font-weight: 600;
            color: var(--color-white);
        }
    }
`;

export const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s;

    &:focus-within {
        border-color: var(--color-primary);
    }

    input {
        background: none;
        border: none;
        color: var(--color-white);
        font-size: 0.85rem;
        width: 100%;
        outline: none;
        
        &::placeholder {
            color: var(--color-gray-500);
        }
    }
`;

export const TreeContainer = styled.div`
    padding: 1rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    overflow-x: auto;
    max-height: 500px;
    overflow-y: auto;
    background: var(--color-surface); /* IDE dark theme */
    
    &::-webkit-scrollbar {
        height: 6px;
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--color-gray-600);
        border-radius: 3px;
    }
`;

export const TreeNode = styled.div`
    margin-left: ${(props) => props.$depth * 1.5}rem;
`;

export const NodeLabelWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.35rem 0.5rem;
    border-radius: 4px;
    transition: all 0.2s;
    group: hover; // for copy button
    
    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }
`;

export const NodeLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: var(--color-gray-300);
    white-space: nowrap;

    &:hover {
        color: var(--color-white);
    }

    svg {
        min-width: 16px;
    }
    
    .match {
        background: rgba(234, 179, 8, 0.3);
        color: var(--color-warning);
        padding: 0 2px;
        border-radius: 2px;
    }
`;

export const CopyBtn = styled.button`
    background: none;
    border: none;
    color: var(--color-gray-500);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    opacity: 0;
    transition: all 0.2s;
    display: flex;
    align-items: center;

    ${NodeLabelWrapper}:hover & {
        opacity: 1;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--color-white);
    }
`;

export const NodeContent = styled.div`
    margin-left: 1.25rem;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 0.5rem;
    color: var(--color-gray-400);
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
`;

export const Field = styled.div`
    margin-bottom: 0.35rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    span.key { color: var(--color-blue-400); white-space: nowrap; } /* Light blue */
    span.type { color: var(--color-red-400); font-style: italic; white-space: nowrap; } /* Light red */
    span.desc { 
        color: var(--color-gray-500); /* Gray comment */
        margin-left: auto; 
    }
`;

export const DidacticSection = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    height: fit-content;

    @media (max-width: 768px) {
        padding: 1.25rem;
    }
`;

export const DidacticTitle = styled.h3`
    font-size: 1.15rem;
    color: var(--color-white);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
`;

export const DidacticText = styled.div`
    color: var(--color-gray-400);
    line-height: 1.6;
    font-size: 0.9rem;

    p { margin-bottom: 1rem; }
    ul { 
        list-style: none; /* Custom bullets */
        padding-left: 0; 
        margin-bottom: 1rem; 
    }
    li { 
        margin-bottom: 0.75rem; 
        position: relative;
        padding-left: 1.25rem;
        
        &::before {
            content: '•';
            color: var(--color-primary);
            position: absolute;
            left: 0;
            font-size: 1.25rem;
            line-height: 1;
        }
    }
    strong { color: var(--color-white); font-weight: 600; }
`;
