import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const Introduction = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    h3 {
        color: var(--color-white);
        font-size: 1.25rem;
        margin-bottom: 0.75rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    p {
        color: var(--color-gray-400);
        margin-bottom: 1rem;
        font-size: 0.95rem;
        line-height: 1.5;
        max-width: 800px;
    }

    .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        
        span {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--color-primary);
            background: var(--color-primary-10);
            padding: 0.5rem 0.75rem;
            border-radius: var(--radius-md);
            font-size: 0.85rem;
            font-weight: 500;
        }
    }
`;

export const EndpointGroup = styled.div`
    margin-bottom: 3rem;
`;

export const GroupTitle = styled.h3`
    color: var(--color-white);
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const EndpointCard = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    margin-bottom: 1.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const HeaderRow = styled.div`
    padding: 1rem 1.5rem;
    background: var(--color-surface-hover);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;

    .left {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .desc {
        color: var(--color-gray-400);
        font-size: 0.9rem;
    }
`;

export const MethodBadge = styled.span`
    font-weight: 700;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.05em;
    font-family: 'Fira Code', monospace;
    
    ${(props) => {
      switch (props.$method) {
        case 'GET':
          return 'background: var(--color-success-10); color: var(--color-success); border: 1px solid rgba(34, 197, 94, 0.2);';
        case 'POST':
          return 'background: rgba(96, 165, 250, 0.1); color: var(--color-blue-400); border: 1px solid rgba(96, 165, 250, 0.2);';
        case 'PUT':
          return 'background: var(--color-warning-10); color: var(--color-warning); border: 1px solid rgba(245, 158, 11, 0.2);';
        case 'DELETE':
          return 'background: var(--color-danger-10); color: var(--color-danger); border: 1px solid rgba(239, 68, 68, 0.2);';
        default:
          return 'background: rgba(156, 163, 175, 0.1); color: var(--color-gray-400); border: 1px solid rgba(156, 163, 175, 0.2);';
      }
    }}
`;

export const EndpointPath = styled.code`
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    color: var(--color-white);
    
    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

export const DualPane = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

export const PaneLeft = styled.div`
    padding: 1.5rem;
    border-right: 1px solid var(--color-border);

    @media (max-width: 1024px) {
        border-right: none;
        border-bottom: 1px solid var(--color-border);
    }
`;

export const PaneRight = styled.div`
    padding: 1.5rem;
    background: var(--color-background); /* Very dark for code area */
`;

export const SectionTitle = styled.h4`
    font-size: 0.75rem;
    color: var(--color-gray-400);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
`;

export const ParamTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    
    th, td {
        text-align: left;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--color-border);
    }

    th {
        color: var(--color-white);
        font-weight: 600;
        width: 30%;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .required {
        color: var(--color-danger);
        font-size: 0.75rem;
        background: var(--color-danger-10);
        padding: 0.1rem 0.3rem;
        border-radius: 4px;
    }

    td {
        color: var(--color-gray-400);
        line-height: 1.4;
    }
`;

export const CodeTerminalWrapper = styled.div`
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const CodeTerminalHeader = styled.div`
    background: var(--color-panel-bg);
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    span {
        color: var(--color-gray-400);
        font-size: 0.75rem;
        font-family: 'Fira Code', monospace;
    }
`;

export const CodeBlock = styled.div`
    background: var(--color-background);
    padding: 1rem;
    overflow-x: auto;
    
    &::-webkit-scrollbar {
        height: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
    }
`;

export const Code = styled.pre`
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: var(--color-gray-200);
    margin: 0;
    line-height: 1.5;
`;

export const CopyButton = styled.button`
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--color-gray-400);
    transition: all 0.2s;

    &:hover {
        color: white;
    }
`;
