import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 24px;
    padding: 2rem;
    width: 95%;
    max-width: 550px;
    z-index: 70;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { transform: translate(-50%, -40%); opacity: 0; }
        to { transform: translate(-50%, -50%); opacity: 1; }
    }

    &::-webkit-scrollbar { width: 0px; }
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
    letter-spacing: -0.02em;
`;

export const CloseButton = styled.button`
    color: var(--color-gray-400);
    padding: 0.5rem;
    border-radius: 50%;
    background-color: var(--color-white-5);
    transition: all 0.2s ease;
    
    &:hover {
        background-color: var(--color-white-10);
        color: var(--color-text);
        transform: rotate(90deg);
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

/* --- PREMIUM COMPONENTS --- */

export const SegmentedControl = styled.div`
    display: flex;
    background-color: var(--color-background);
    padding: 0.25rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    border: 1px solid var(--color-border);
`;

export const SegmentedButton = styled.button`
    flex: 1;
    padding: 0.75rem;
    border-radius: 10px;
    font-size: 0.9375rem;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: var(--color-gray-500);
    position: relative;
    overflow: hidden;

    ${({ $active, $type }) =>
      $active &&
      `
        background-color: var(--color-surface);
        color: ${$type === 'income' ? 'var(--color-success)' : 'var(--color-danger)'};
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    `}

    &:hover {
        color: ${({ $active, $type }) =>
          $active
            ? ($type === 'income' ? 'var(--color-success)' : 'var(--color-danger)')
            : 'var(--color-text)'};
    }
`;

export const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    position: relative;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 1rem;
    transition: all 0.2s ease;

    &:focus-within {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const CurrencyPrefix = styled.span`
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--color-gray-500);
    margin-right: 0.5rem;
`;

export const LargeAmountInput = styled.input`
    background: transparent;
    border: none;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text);
    width: 200px;
    outline: none;
    text-align: left; /* Changed from center to accommodate prefix */

    &::placeholder {
        color: var(--color-gray-600);
    }
    
    /* Remove arrows/spinners */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const Divider = styled.div`
    height: 1px;
    background-color: var(--color-border);
    margin: 0.5rem 0;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    color: var(--color-gray-400);
    margin-left: 0.25rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    transition: all 0.2s;

    &:focus {
        border-color: var(--color-primary);
        outline: none;
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    transition: all 0.2s;
    appearance: none; /* We would add a custom arrow here too ideally */

    &:focus {
        border-color: var(--color-primary);
        outline: none;
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const ToggleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-background);
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid var(--color-border);
`;

export const ToggleLabel = styled.div`
    display: flex;
    flex-direction: column;
    
    span {
        font-weight: 500;
        color: var(--color-text);
    }
    
    small {
        color: var(--color-gray-500);
        font-size: 0.8rem;
    }
`;

export const ToggleSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-background-subtle); /* Neutral off state */
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 99px; /* Pill shape */
    border: 1px solid var(--color-border);

    &:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 2px; /* Centered visually with border */
        background-color: white;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
`;

export const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 52px; /* Fixed width */
    height: 28px; /* Fixed height */
    flex-shrink: 0; /* Prevent squishing */
`;

export const ToggleInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${ToggleSlider} {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
    }

    &:checked + ${ToggleSlider}:before {
        transform: translateX(24px);
    }
    
    &:focus + ${ToggleSlider} {
        box-shadow: 0 0 0 2px var(--color-primary-20);
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 1rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: var(--color-primary); /* Always primary */
    box-shadow: 0 4px 12px var(--color-primary-30);
    transition: all 0.2s ease;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        transform: translateY(-2px);
        filter: brightness(1.1);
        box-shadow: 0 8px 16px var(--color-primary-40);
        background-color: var(--color-primary);
    }

    &:active {
        transform: translateY(0);
    }
`;
