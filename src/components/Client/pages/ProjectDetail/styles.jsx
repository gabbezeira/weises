import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 100%;
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: var(--color-gray-500);
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    width: fit-content;
    padding: 0;
    transition: color 0.2s;
    
    &:hover {
        color: var(--color-primary);
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

export const TitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h1 {
        font-size: 2rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: var(--color-text);
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;

        &::before {
            content: '';
            display: block;
            width: 6px;
            height: 32px;
            background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
            border-radius: 4px;
        }
    }

    .meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        font-size: 0.875rem;
        color: var(--color-gray-500);
        margin-left: 1rem;
    }
`;

export const StatusBadge = styled.div`
    padding: 0.375rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    
    ${({ $status }) => {
      switch ($status) {
        case 'In Progress':
          return `background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2);`;
        case 'Completed':
          return `background: rgba(34, 197, 94, 0.1); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2);`;
        case 'Planning':
          return `background: rgba(168, 85, 247, 0.1); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.2);`;
        default:
          return `background: var(--color-border); color: var(--color-gray-500); border: 1px solid var(--color-border);`;
      }
    }}
`;

// -- Timeline/Stepper Styles --
export const TimelineSection = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const TimelineHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1rem;

    h3 {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--color-text);
    }
    
    span {
        font-size: 0.875rem;
        color: var(--color-gray-500);
    }
`;

export const Stepper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    margin-top: 1rem;

    &::before {
        content: '';
        position: absolute;
        top: 15px; /* Half of circle size (30px) */
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--color-border);
        z-index: 0;
    }
`;

export const StepItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    z-index: 1;
    flex: 1;
    
    &:first-child { align-items: flex-start; }
    &:last-child { align-items: flex-end; }
`;

export const StepCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ $active, $completed }) =>
      $completed
        ? 'var(--color-primary)'
        : $active
          ? 'var(--color-surface)'
          : 'var(--color-surface)'};
    border: 2px solid ${({ $active, $completed }) =>
      $completed
        ? 'var(--color-primary)'
        : $active
          ? 'var(--color-primary)'
          : 'var(--color-border)'};
    color: ${({ $completed }) => ($completed ? 'white' : 'var(--color-text)')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
`;

export const StepLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${({ $align }) => $align || 'center'};
    gap: 0.25rem;
    
    strong {
        font-size: 0.875rem;
        color: ${({ $active, $completed }) => ($active || $completed ? 'var(--color-text)' : 'var(--color-gray-500)')};
        font-weight: ${({ $active }) => ($active ? '700' : '500')};
    }
    
    span {
        font-size: 0.75rem;
        color: var(--color-gray-500);
    }
`;

export const Tabs = styled.div`
    display: flex;
    gap: 0.5rem;
    background-color: var(--color-surface);
    padding: 0.375rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    width: fit-content;
    
    @media (max-width: 600px) {
        width: 100%;
        overflow-x: auto;
    }
`;

export const Tab = styled.button`
    padding: 0.625rem 1.25rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-gray-500)')};
    background-color: ${({ $active }) => ($active ? 'var(--color-primary-10)' : 'transparent')};
    border: none;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        color: var(--color-primary);
        background-color: ${({ $active }) => ($active ? 'var(--color-primary-10)' : 'var(--color-white-5)')};
    }
`;

export const TabContent = styled.div`
    animation: fadeIn 0.3s ease-out;
`;

// -- Credentials Tab Styles --
export const VaultGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
`;

export const CredentialCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--color-gray-500);
        transform: translateY(-2px);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        h3 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-text);
            margin-bottom: 0.25rem;
        }
        
        a {
            font-size: 0.75rem;
            color: var(--color-primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

export const CredentialField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        font-size: 0.75rem;
        color: var(--color-gray-500);
        font-weight: 500;
        text-transform: uppercase;
    }

    .value-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background-color: var(--color-background);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 0.5rem 0.75rem;
        
        code {
            flex: 1;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            color: var(--color-text);
        }

        button {
            background: none;
            border: none;
            color: var(--color-gray-500);
            cursor: pointer;
            padding: 0.25rem;
            display: flex;
            align-items: center;
            transition: color 0.2s;

            &:hover {
                color: var(--color-primary);
            }
        }
    }
`;

// -- Overview Tab Styles --
export const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const Section = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    h2 {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--color-text);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    p {
        color: var(--color-gray-400);
        line-height: 1.7;
        font-size: 0.9375rem;
    }
    
    h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text);
        margin-top: 0.5rem;
    }
`;

export const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;

    span {
        background-color: var(--color-background);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        padding: 0.375rem 0.875rem;
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: 500;
    }
`;

// -- Financials Tab Styles --
export const InvoiceList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const InvoiceItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.25rem;
    transition: border-color 0.2s;
    
    &:hover {
        border-color: var(--color-gray-500);
    }
    
    .info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        
        strong {
            color: var(--color-text);
            font-size: 0.9375rem;
        }
        
        span {
            color: var(--color-gray-500);
            font-size: 0.8125rem;
        }
    }
    
    .amount-group {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        
        .amount {
            font-weight: 700;
            color: var(--color-text);
            font-size: 1rem;
        }
    }
`;

// -- Contract Tab Styles --
export const ContractCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
    }

    .icon-box {
        width: 64px;
        height: 64px;
        background-color: var(--color-primary-10);
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        
        h3 {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--color-text);
        }
        
        p {
            font-size: 0.875rem;
            color: var(--color-gray-400);
            line-height: 1.5;
        }
    }

    .actions {
        display: flex;
        gap: 1rem;
    }
`;

export const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    
    background-color: ${({ $primary }) => ($primary ? 'var(--color-primary)' : 'transparent')};
    color: ${({ $primary }) => ($primary ? 'white' : 'var(--color-text)')};
    border: 1px solid ${({ $primary }) => ($primary ? 'transparent' : 'var(--color-border)')};
    
    &:hover {
        background-color: ${({ $primary }) => ($primary ? 'var(--color-primary-50)' : 'var(--color-surface)')};
        border-color: ${({ $primary }) => ($primary ? 'transparent' : 'var(--color-gray-500)')};
    }
`;

export const NotFound = styled.div`
    padding: 2rem;
    color: var(--color-gray-500);
    text-align: center;
`;

export const SideColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const DeliverablesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const IconRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-gray-400);

    &.header {
        font-size: 1rem;
        color: var(--color-text);
        font-weight: 600;
    }
`;
