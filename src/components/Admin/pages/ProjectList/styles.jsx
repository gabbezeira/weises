import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
`;

export const AddButton = styled(Link)`
    background-color: var(--color-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-size: 0.875rem;
    transition: background-color var(--transition-fast);

    &:hover {
        background-color: var(--color-primary-50);
    }
`;

export const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
`;

export const ProjectCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: border-color var(--transition-fast);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    &:hover {
        border-color: var(--color-gray-500);
    }
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const ProjectTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.25rem;
`;

export const ClientName = styled.p`
    font-size: 0.875rem;
    color: var(--color-gray-400);
`;

export const StatusBadge = styled.span`
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    
    ${({ $status }) => {
      switch ($status) {
        case 'In Progress':
          return `background: rgba(96, 165, 250, 0.1); color: var(--color-blue-400); border: 1px solid rgba(96, 165, 250, 0.2);`;
        case 'Completed':
          return `background: rgba(34, 197, 94, 0.1); color: var(--color-green-500); border: 1px solid rgba(34, 197, 94, 0.2);`;
        case 'Planning':
          return `background: rgba(192, 132, 252, 0.1); color: var(--color-purple-500); border: 1px solid rgba(192, 132, 252, 0.2);`;
        default:
          return `background: var(--color-white-5); color: var(--color-gray-400);`;
      }
    }}
`;

export const CardDescription = styled.p`
    font-size: 0.875rem;
    color: var(--color-gray-400);
    line-height: 1.5;
    flex: 1;
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
`;

export const TaskCount = styled(Link)`
    font-size: 0.875rem;
    color: var(--color-primary);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        text-decoration: underline;
    }
`;

export const Actions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const ActionButton = styled.button`
    padding: 0.25rem;
    color: var(--color-gray-400);
    transition: color var(--transition-fast);

    &:hover {
        color: ${({ $danger }) => ($danger ? 'var(--color-red-500)' : 'white')};
    }
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;
