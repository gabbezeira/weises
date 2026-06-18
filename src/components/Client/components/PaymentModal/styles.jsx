import styled from 'styled-components';



export const Tabs = styled.div`
    display: flex;
    border-bottom: 1px solid var(--color-border);
    gap: 1.5rem;
`;

export const Tab = styled.button`
    background: none;
    border: none;
    padding: 0.75rem 0;
    font-size: 1rem;
    font-weight: ${(props) => (props.$active ? '600' : '500')};
    color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-gray-500)')};
    border-bottom: 2px solid ${(props) => (props.$active ? 'var(--color-primary)' : 'transparent')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};

    &:hover:not(:disabled) {
        color: var(--color-primary);
    }
`;

export const PixContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
`;

export const QrCodePlaceholder = styled.div`
    width: 200px;
    height: 200px;
    background: white;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    padding: 1rem;
    border: 2px solid var(--color-border);

    svg {
        width: 100%;
        height: 100%;
    }
`;

export const InstructionBox = styled.div`
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 1rem;
    width: 100%;
    
    p {
        color: var(--color-gray-400);
        font-size: 0.875rem;

        strong {
            color: var(--color-text);
        }
    }
`;

export const CopyGroup = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

    code {
        flex: 1;
        background: var(--color-surface);
        padding: 0.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border);
        font-size: 0.875rem;
        color: var(--color-text);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    button {
        background: var(--color-primary);
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: var(--radius-sm);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s;

        &:hover {
            opacity: 0.9;
        }
    }
`;

export const AlertBox = styled.div`
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    color: #10b981;
    border-radius: var(--radius-md);
    padding: 1rem;
    width: 100%;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 500;
`;

export const ReceiptBox = styled.div`
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        color: var(--color-gray-500);

        strong {
            color: var(--color-text);
            font-weight: 600;
        }

        &.tax strong {
            color: var(--color-text);
        }

        &.total {
            padding-top: 0.75rem;
            border-top: 1px dashed var(--color-border);
            font-size: 1rem;
            color: var(--color-text);
            font-weight: 700;

            strong {
                font-size: 1.25rem;
                color: var(--color-primary);
            }
        }
    }
`;

export const CardSelect = styled.select`
    width: 100%;
    padding: 0.8125rem 2.75rem 0.8125rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-size: 0.875rem;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.875rem center;
    background-size: 16px;
    transition: border-color var(--transition-fast);

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:focus {
        border-color: var(--color-primary);
    }

    option {
        background-color: var(--color-surface);
        color: var(--color-text);
    }
`;

export const FirstTab = styled(Tab)`
    margin-left: 1.5rem;
`;

export const PixAmountBox = styled.div`
    text-align: center;

    h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 0.25rem;
    }

    p {
        color: var(--color-gray-500);
        font-size: 0.875rem;
    }
`;

export const CardSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;

    svg {
        margin-bottom: 1rem;
    }
`;

export const CardSelectGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    width: 100%;
`;

export const CardSelectLabel = styled.label`
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
`;

export const CardSelectHint = styled.p`
    font-size: 0.75rem;
    color: var(--color-gray-400);
`;

export const NoCardsWarning = styled.p`
    color: var(--color-warning);
    font-size: 0.875rem;
`;

export const CardDropdown = styled.div`
    position: relative;
    width: 100%;
`;

export const CardDropdownTrigger = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.8125rem 1rem;
    background-color: var(--color-surface);
    border: 1px solid ${({ $open }) => ($open ? 'var(--color-primary)' : 'var(--color-border)')};
    border-radius: var(--radius-md);
    color: var(--color-text);
    font-size: 0.875rem;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
    transition: border-color var(--transition-fast);


    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const CardDropdownLabel = styled.span`
    flex: 1;
    font-size: 0.875rem;
    color: var(--color-text);
`;

export const CardDropdownChevron = styled.span`
    display: flex;
    align-items: center;
    color: var(--color-gray-500);
    transition: transform 0.2s ease;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const CardDropdownMenu = styled.div`
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    z-index: 50;
    animation: dropIn 0.15s ease-out;

    @keyframes dropIn {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
    }
`;

export const CardDropdownItem = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: ${({ $selected }) => ($selected ? 'var(--color-primary-10)' : 'transparent')};
    border: none;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    font-size: 0.875rem;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s;

    &:last-child { border-bottom: none; }

    &:hover {
        background: ${({ $selected }) =>
          $selected ? 'var(--color-primary-20)' : 'var(--color-white-5)'};
    }
`;

export const PayActionGroup = styled.div`
    display: flex;
    width: 100%;
`;

export const PayActionButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background-color: var(--color-primary-20);
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
