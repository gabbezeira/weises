import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
    padding: 1.5rem;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

export const Introduction = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    margin-bottom: 2rem;

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
        margin-bottom: 0;
        font-size: 0.95rem;
        line-height: 1.5;
        max-width: 800px;
    }
`;

export const Section = styled.div`
    margin-bottom: 2rem;
`;

export const RBACGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
`;

export const ResourceCard = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const ResourceHeader = styled.div`
    padding: 1.25rem 1.5rem;
    background: var(--color-surface-hover);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    gap: 0.75rem;

    h4 {
        color: var(--color-white);
        font-size: 1.05rem;
        font-weight: 600;
        margin: 0;
    }
    
    svg {
        color: var(--color-primary);
    }
`;

export const RoleSection = styled.div`
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &:last-child {
        border-bottom: none;
    }
`;

export const RoleHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h5 {
        color: var(--color-gray-300);
        font-size: 0.9rem;
        font-weight: 500;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const RoleBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    
    ${(props) =>
      props.$role === 'admin'
        ? `
        background: var(--color-primary-10);
        color: var(--color-primary);
        border: 1px solid var(--color-primary-20);
    `
        : `
        background: var(--color-success-10);
        color: var(--color-success);
        border: 1px solid rgba(34, 197, 94, 0.2);
    `}
`;

export const PermissionList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const PermissionItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.85rem;
    color: ${(props) => (props.$allowed ? 'var(--color-gray-300)' : 'var(--color-gray-500)')};
    text-decoration: ${(props) => (props.$allowed ? 'none' : 'line-through')};

    svg {
        margin-top: 0.1rem;
        flex-shrink: 0;
        color: ${(props) => (props.$allowed ? 'var(--color-success)' : 'var(--color-gray-500)')};
    }
`;
