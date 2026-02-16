import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const slideUp = keyframes`
    from { opacity: 0; transform: translate(-50%, -40%) scale(0.95); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    z-index: 9999;
    animation: ${fadeIn} 0.2s ease-out forwards;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 400px;
    z-index: 10000;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    animation: ${slideUp} 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

export const ModalContent = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const IconWrapper = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: var(--color-red-500);
`;

export const WarningIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 0.5rem;
`;

export const Message = styled.p`
    color: var(--color-muted);
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 2rem;
`;

export const ItemName = styled.span`
    display: block;
    margin-top: 0.5rem;
    font-weight: 500;
    color: var(--color-text);
    background: var(--color-background);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    word-break: break-word;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    width: 100%;
`;

export const CancelButton = styled.button`
    flex: 1;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: transparent;
    color: var(--color-text);
    font-weight: 500;
    font-size: 0.875rem;
    transition: all var(--transition-fast);

    &:hover {
        background: var(--color-white-5);
        border-color: var(--color-gray-500);
    }
`;

export const DeleteButton = styled.button`
    flex: 1;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    background: var(--color-red-500);
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all var(--transition-fast);
    box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2);

    &:hover {
        background: var(--color-red-600);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;
