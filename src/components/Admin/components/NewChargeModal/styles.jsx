import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
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
    max-width: 500px;
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

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
`;

export const ModalHeader = styled.div`
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const ModalBody = styled.div`
    padding: 2rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
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
        box-shadow: 0 0 0 3px var(--color-primary-10);
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
        box-shadow: 0 0 0 3px var(--color-primary-10);
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
