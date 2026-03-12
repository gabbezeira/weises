import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 2rem;
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
    font-weight: 600;
    color: var(--color-white);
`;

export const AddButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const Card = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: border-color var(--transition-fast);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    height: 100%;

    &:hover {
        border-color: var(--color-gray-500);
    }
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const IconTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary-10);
    color: var(--color-primary);
    border-radius: var(--radius-md);
`;

export const Price = styled.div`
    font-weight: 600;
    color: var(--color-success);
    font-size: 1rem;
    background: var(--color-success-10);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    display: inline-flex;
    align-items: center;
`;

export const ServiceName = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0;
`;

export const Description = styled.p`
    color: var(--color-gray-400);
    font-size: 0.95rem;
    line-height: 1.6;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
    margin-top: auto;
`;

export const CardActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const ActionButton = styled.button`
    padding: 0.25rem;
    color: var(--color-gray-400);
    transition: color var(--transition-fast);
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        color: ${({ $danger }) => ($danger ? 'var(--color-red-500)' : 'white')};
    }
`;

export const StatusBadge = styled.span`
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    
    ${({ $active }) =>
        $active
            ? `background: rgba(34, 197, 94, 0.1); color: var(--color-green-500); border: 1px solid rgba(34, 197, 94, 0.2);`
            : `background: rgba(239, 68, 68, 0.1); color: var(--color-red-500); border: 1px solid rgba(239, 68, 68, 0.2);`
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 1rem;
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

export const ModalContent = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    width: 100%;
    max-width: 550px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const ModalHeader = styled.div`
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalBody = styled.div`
    padding: 2rem;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: 4px;
    }
`;

export const ModalTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-white);
    margin: 0;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: var(--color-gray-400);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius-full);
    transition: all 0.2s;

    &:hover {
        background: var(--color-surface-hover);
        color: var(--color-white);
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const Label = styled.label`
    color: var(--color-gray-300);
    font-size: 0.9rem;
    font-weight: 500;
`;

export const Input = styled.input`
    padding: 0.875rem 1rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-white);
    font-size: 1rem;
    transition: all 0.2s;
    
    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px var(--color-primary-10);
    }

    &::placeholder {
        color: var(--color-gray-500);
    }
`;

export const TextArea = styled.textarea`
    padding: 0.875rem 1rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-white);
    min-height: 120px;
    resize: vertical;
    font-size: 1rem;
    line-height: 1.5;
    transition: all 0.2s;
    
    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px var(--color-primary-10);
    }
`;

export const IconGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
`;

export const IconOption = styled.button`
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => (props.$selected ? 'var(--color-primary)' : 'var(--color-background)')};
    color: ${(props) => (props.$selected ? 'white' : 'var(--color-gray-400)')};
    border: 1px solid ${(props) => (props.$selected ? 'var(--color-primary)' : 'var(--color-border)')};
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: var(--color-primary);
        transform: translateY(-2px);
    }
`;

export const ToggleSwitch = styled.label`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    padding: 1rem;
    background: var(--color-background);
    border: 1px solid ${(props) => (props.$checked ? 'var(--color-primary)' : 'var(--color-border)')};
    border-radius: var(--radius-lg);
    transition: all 0.2s;

    &:hover {
        border-color: var(--color-primary);
    }
`;

export const ToggleInput = styled.input`
    display: none;
`;

export const ToggleSlider = styled.div`
    width: 48px;
    height: 26px;
    background: ${(props) => (props.$checked ? 'var(--color-primary)' : 'var(--color-gray-600)')};
    border-radius: 999px;
    position: relative;
    transition: background 0.2s;

    &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        top: 3px;
        left: ${(props) => (props.$checked ? '25px' : '3px')};
        transition: left 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
`;

export const ToggleText = styled.div`
    display: flex;
    flex-direction: column;
    
    strong {
        color: var(--color-white);
        font-size: 0.95rem;
    }
    span {
        color: var(--color-gray-400);
        font-size: 0.8rem;
    }
`;

export const ModalFooter = styled.div`
    padding: 1.5rem 2rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    background: var(--color-surface);
    border-bottom-left-radius: var(--radius-xl);
    border-bottom-right-radius: var(--radius-xl);
`;

export const Button = styled.button`
    padding: 0.875rem 2rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: ${(props) => (props.$secondary ? 'transparent' : 'var(--color-primary)')};
    color: ${(props) => (props.$secondary ? 'var(--color-gray-400)' : 'white')};
    border: ${(props) => (props.$secondary ? '1px solid var(--color-border)' : 'none')};
    transition: all 0.2s;

    &:hover {
        background: ${(props) => (props.$secondary ? 'var(--color-surface-hover)' : 'var(--color-primary-20)')};
        color: ${(props) => (props.$secondary ? 'var(--color-white)' : 'white')};
        border-color: ${(props) => (props.$secondary ? 'var(--color-gray-300)' : 'none')};
        transform: translateY(-1px);
    }
    
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
