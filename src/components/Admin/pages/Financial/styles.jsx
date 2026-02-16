import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1600px; /* Constraint for ultra-wide screens */
    margin: 0 auto;
    width: 100%;
    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
`;

export const Title = styled.h1`
    font-size: 1.875rem;
    font-weight: 800; /* Extra bold for modern headers */
    color: var(--color-text);
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    &::before {
        content: '';
        display: block;
        width: 6px;
        height: 32px;
        background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
        border-radius: 4px;
    }
`;

export const TitleGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SubTitle = styled.p`
    font-size: 0.875rem;
    color: var(--color-gray-500);
    margin-top: 0.25rem;
    margin-left: 1rem; /* Align with text start essentially */
`;

export const Tabs = styled.div`
    display: flex;
    gap: 0.5rem;
    background-color: var(--color-surface);
    padding: 0.375rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    width: fit-content;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    @media (max-width: 600px) {
        width: 100%;
        overflow-x: auto;
    }
`;

export const Tab = styled.button`
    padding: 0.625rem 1.25rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-gray-500)')};
    background-color: ${({ $active }) => ($active ? 'var(--color-primary-10)' : 'transparent')};
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &:hover {
        color: var(--color-primary);
        background-color: ${({ $active }) => ($active ? 'var(--color-primary-10)' : 'var(--color-white-5)')};
    }

    ${({ $active }) =>
      $active &&
      `
        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 2px;
            background-color: var(--color-primary);
            border-radius: 2px;
            display: none; /* Pill style prefers no underline, but kept option */
        }
    `}
`;

export const AddButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: var(--color-primary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
