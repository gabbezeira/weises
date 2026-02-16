import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 1.875rem;
        font-weight: 800;
        color: var(--color-text);
        letter-spacing: -0.02em;
    }
`;

export const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
`;

export const ProjectCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--color-gray-500);
    }
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
`;

export const TitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const ProjectTitle = styled(Link)`
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
    text-decoration: none;
    line-height: 1.4;

    &:hover {
        color: var(--color-primary);
    }
`;

export const Category = styled.span`
    font-size: 0.75rem;
    color: var(--color-gray-500);
    font-weight: 500;
`;

export const StatusBadge = styled.span`
    padding: 0.25rem 0.625rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    
    ${({ $status }) => {
      switch ($status) {
        case 'In Progress':
          return `background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2);`;
        case 'Completed':
          return `background: rgba(34, 197, 94, 0.1); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2);`;
        case 'Planning':
          return `background: rgba(168, 85, 247, 0.1); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.2);`;
        default:
          return `background: var(--color-surface); color: var(--color-gray-400); border: 1px solid var(--color-border);`;
      }
    }}
`;

export const Description = styled.p`
    font-size: 0.875rem;
    color: var(--color-gray-400);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
`;

export const CardFooter = styled.div`
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const DateInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: var(--color-gray-500);
    font-weight: 500;
`;

export const CredentialsButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius-md);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-white-5);
        color: var(--color-primary);
        border-color: var(--color-primary-20);
    }
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
`;
