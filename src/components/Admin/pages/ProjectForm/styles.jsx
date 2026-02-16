import styled from 'styled-components';

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 2rem;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
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

    &::placeholder {
        color: var(--color-gray-500);
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    resize: none;
    min-height: 100px;
    font-family: inherit;
    transition: all var(--transition-fast);

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
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
    
    &:hover {
        border-color: var(--color-primary);
    }
`;

export const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    min-height: 46px;
    align-items: center;
    transition: all var(--transition-fast);

    &:focus-within {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const Tag = styled.span`
    background-color: var(--color-primary-10);
    color: var(--color-primary);
    border: 1px solid var(--color-primary-20);
    border-radius: var(--radius-sm);
    padding: 0.25rem 0.625rem;
    font-size: 0.8125rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.375rem;
`;

export const RemoveTag = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    opacity: 0.6;
    transition: opacity var(--transition-fast);
    
    &:hover {
        opacity: 1;
    }
`;

export const TagInput = styled.input`
    flex: 1;
    background: transparent;
    border: none;
    color: var(--color-text);
    min-width: 120px;
    padding: 0.25rem;
    font-size: 0.875rem;

    &:focus {
        outline: none;
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
    min-width: 6rem;

    ${({ $variant }) =>
      $variant === 'primary'
        ? `
        background-color: var(--color-primary);
        color: white;
        &:hover { background-color: var(--color-primary-50); box-shadow: var(--shadow-glow-primary); }
    `
        : `
        background-color: transparent;
        border: 1px solid var(--color-border);
        color: var(--color-gray-400);
        &:hover { border-color: var(--color-gray-300); color: var(--color-text); background-color: var(--color-white-5); }
    `}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }
`;

export const StageList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

export const StageItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    
    .info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        strong {
            font-size: 0.9375rem;
            color: var(--color-text);
        }

        span {
            font-size: 0.75rem;
            color: var(--color-gray-500);
        }
    }
`;

export const FileInputWrapper = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    border: 2px dashed var(--color-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    background-color: var(--color-background);
    transition: all var(--transition-fast);
    position: relative;
    overflow: hidden;

    &:hover {
        border-color: var(--color-primary);
        background-color: var(--color-primary-5);
    }
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const UploadPlaceholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-gray-400);

    span {
        font-size: 0.875rem;
    }
`;
