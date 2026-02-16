import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h1 {
        font-size: 2rem;
        font-weight: 800;
        color: var(--color-text);
        letter-spacing: -0.03em;
    }

    p {
        color: var(--color-gray-500);
        font-size: 1rem;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    &::before {
        content: '';
        display: block;
        width: 4px;
        height: 24px;
        background-color: var(--color-primary);
        border-radius: 2px;
    }
`;

export const ServicesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

export const ServiceCard = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: all 0.2s ease;
    height: 100%;

    &:hover {
        border-color: var(--color-primary);
        transform: translateY(-4px);
    }

    .icon-box {
        width: 48px;
        height: 48px;
        background-color: var(--color-primary-10);
        color: var(--color-primary);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
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
            color: var(--color-gray-500);
            line-height: 1.6;
        }
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        border-top: 1px solid var(--color-border);

        .price {
            font-size: 1.25rem;
            font-weight: 800;
            color: var(--color-text);
        }
    }
`;

export const RequestButton = styled.button`
    background-color: var(--color-primary);
    color: white;
    border: none;
    padding: 0.625rem 1.25rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-primary);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: transparent;
        border: 1px solid var(--color-primary);
    }
`;

export const FAQSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const FAQWrapper = styled.div`
    margin-top: 2rem;
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
`;

export const FAQItem = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;

    button {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem 1.5rem;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        
        span {
            font-weight: 600;
            color: var(--color-text);
            font-size: 1rem;
        }

        svg {
            color: var(--color-gray-500);
            transition: transform 0.2s;
            transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
        }
    }

    .answer {
        padding: 0 1.5rem 1.5rem 1.5rem;
        color: var(--color-gray-500);
        line-height: 1.6;
        font-size: 0.9375rem;
        display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
        animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
