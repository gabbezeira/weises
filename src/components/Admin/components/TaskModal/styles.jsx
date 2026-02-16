import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 1rem;
`;

export const ModalContent = styled.div`
    background-color: var(--color-surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 1.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

    @media (max-width: 480px) {
        padding: 1rem;
        width: 95%;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

export const ModalTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
`;

export const CloseButton = styled.button`
    color: var(--color-gray-400);
    transition: color var(--transition-fast);
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: var(--color-text);
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
`;

export const Input = styled.input`
    padding: 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 0.875rem;
    transition: all var(--transition-fast);

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const TextArea = styled.textarea`
    padding: 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 0.875rem;
    min-height: 120px;
    resize: vertical;
    transition: all var(--transition-fast);

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const Select = styled.select`
    padding: 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all var(--transition-fast);

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
`;

export const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-size: 0.875rem;
    transition: all var(--transition-fast);
    
    ${({ $variant }) =>
      $variant === 'primary'
        ? `
        background-color: var(--color-primary);
        color: white;
        &:hover {
            background-color: var(--color-primary-50);
        }
    `
        : `
        background-color: transparent;
        color: var(--color-text);
        border: 1px solid var(--color-border);
        &:hover {
            background-color: var(--color-white-5);
        }
    `}
`;

export const TwoColumns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;
