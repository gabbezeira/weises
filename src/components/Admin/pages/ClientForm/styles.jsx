import styled from 'styled-components';

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 2rem;
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 2rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const Section = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: 768px) {
        padding: 2rem;
    }
`;

export const SectionTitle = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 0.5rem;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(${(props) => props.cols || 2}, 1fr);
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    grid-column: ${(props) => (props.fullWidth ? '1 / -1' : 'auto')};
`;

export const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-400);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    transition: all var(--transition-fast);

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 2.5rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    transition: all var(--transition-fast);
    cursor: pointer;
    appearance: none;
    
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: flex-end;
`;

export const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.875rem;
    transition: all var(--transition-fast);
    min-width: 100px;

    ${({ $variant }) =>
      $variant === 'primary'
        ? `
        background-color: var(--color-primary);
        color: white;
        &:hover { background-color: var(--color-primary-50); }
    `
        : `
        background-color: transparent;
        border: 1px solid var(--color-border);
        color: var(--color-gray-400);
        &:hover { border-color: var(--color-gray-300); color: var(--color-text); background-color: var(--color-white-5); }
    `}
`;

export const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
    cursor: pointer;
`;

export const ToggleInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
        background-color: var(--color-primary);
    }

    &:checked + span:before {
        transform: translateX(16px);
    }
`;

export const ToggleSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-gray-500);
    transition: .4s;
    border-radius: 20px;

    &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
`;

export const InputGroup = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const IconButton = styled.button`
    padding: 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-gray-400);
    transition: all var(--transition-fast);

    &:hover {
        color: var(--color-primary);
        border-color: var(--color-primary);
    }
`;

export const ToggleWrapper = styled.div`
    transform: scale(0.8);
    margin-left: 1rem;
    display: inline-block;
`;
