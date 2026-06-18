import styled from 'styled-components';

export const HelperText = styled.p`
    color: var(--color-gray-400);
    font-size: 0.875rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
`;

export const FormGroup = styled.div`
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
    font-family: inherit;
    
    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }

    &::placeholder {
        color: var(--color-gray-500);
    }
`;

export const Select = styled.select`
    padding: 0.875rem 1rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-white);
    font-size: 1rem;
    transition: all 0.2s;
    font-family: inherit;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    padding-right: 2.5rem;
    
    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }
    
    option {
        background: var(--color-surface);
        color: var(--color-white);
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
        background: var(--color-gray-600);
        color: var(--color-gray-300);
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
`;

export const BillingOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const OptionCard = styled.div`
  border: 1px solid ${(props) => (props.$selected ? 'var(--color-primary)' : 'var(--color-border)')};
  border-radius: var(--radius-md);
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.$selected ? 'var(--color-primary-10)' : 'transparent')};

  &:hover {
    border-color: var(--color-primary-50);
  }
`;

export const OptionTitle = styled.div`
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
`;

export const OptionDesc = styled.div`
  font-size: 0.875rem;
  color: var(--color-gray-400);
  margin-bottom: 0px;
`;

export const CustomInstallments = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const InstallmentText = styled.span`
  font-size: 0.875rem;
  color: var(--color-text);
`;

export const InstallmentInput = styled(Input)`
  width: 100px;
  padding: 0.5rem;
`;

export const SpacedLabel = styled(Label)`
  margin-top: 0.5rem;
`;

export const DateGroup = styled(FormGroup)`
  margin-top: 0.5rem;
`;
