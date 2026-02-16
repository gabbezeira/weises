import styled from 'styled-components';
import { Calendar, DollarSign } from 'lucide-react';

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    width: 95%;
    max-width: 500px;
    z-index: 70;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const Title = styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
`;

export const CloseButton = styled.button`
    color: var(--color-gray-400);
    padding: 0.5rem;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    
    &:hover {
        background-color: var(--color-white-5);
        color: var(--color-text);
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-400);
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.875rem 1rem;
    border-radius: var(--radius-md);
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    transition: all var(--transition-fast);
    font-size: 0.9375rem;

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
    
    &::placeholder { color: var(--color-gray-500); }
`;

export const Select = styled.select`
    width: 100%;
    padding: 0.875rem 1rem;
    border-radius: var(--radius-md);
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    cursor: pointer;
    font-size: 0.9375rem;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
    background-size: 1.25em 1.25em;

    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

export const CurrencyIcon = styled(DollarSign)`
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray-500);
    pointer-events: none;
`;

export const CalendarIcon = styled(Calendar)`
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray-500);
    pointer-events: none;
`;

export const HintText = styled.p`
    font-size: 0.75rem;
    color: var(--color-gray-500);
`;

export const ButtonType = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: var(--radius-md);
    background-color: var(--color-primary);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    transition: all var(--transition-fast);
    
    &:hover {
        background-color: var(--color-primary-hover);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(105, 50, 226, 0.3);
    }
`;
