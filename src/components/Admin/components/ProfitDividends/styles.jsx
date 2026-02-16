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
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
    gap: 1rem;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        
        div {
            width: 100%;
            overflow-x: auto;
        }
    }
`;

export const FilterContainer = styled.div`
    display: flex;
    background-color: var(--color-background);
    padding: 0.25rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    gap: 0.25rem;
`;

export const FilterButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-gray-400)')};
    background-color: ${({ $active }) => ($active ? 'var(--color-surface)' : 'transparent')};
    border-radius: var(--radius-sm);
    box-shadow: ${({ $active }) => ($active ? '0 1px 2px rgba(0,0,0,0.1)' : 'none')};
    transition: all 0.2s ease;

    &:hover {
        color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-text)')};
    }
`;

export const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
`;

export const SubTitle = styled.p`
    font-size: 0.9375rem;
    color: var(--color-gray-400);
    margin-top: 0.25rem;
`;

/* Summary Section */
export const SummaryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
`;

export const Card = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: ${({ $color }) => $color || 'var(--color-primary)'};
    }
`;

export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-gray-400);
    }
`;

export const IconBox = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: ${({ $bg }) => $bg || 'var(--color-white-5)'};
    color: ${({ $color }) => $color || 'var(--color-text)'};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CardValue = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.02em;
    
    span {
        font-size: 1rem;
        color: var(--color-gray-500);
        font-weight: 500;
        margin-right: 0.25rem;
    }
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: var(--color-gray-500);
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);

    strong {
        color: ${({ $color }) => $color || 'var(--color-text)'};
    }
`;

/* Distribution Section */
export const DistributionSection = styled.div`
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
`;

export const SectionTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const SuggestionGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const SuggestionCard = styled.div`
    background-color: var(--color-background);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    border: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
        border-color: ${({ $color }) => $color};
        transform: translateY(-2px);
    }
`;

export const SuggestionLabel = styled.span`
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-gray-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const SuggestionValue = styled.div`
    font-size: 2.25rem;
    font-weight: 700;
    color: ${({ $color }) => $color || 'var(--color-text)'};
    margin: 0.5rem 0;
`;

export const SuggestionNote = styled.p`
    font-size: 0.875rem;
    color: var(--color-gray-500);
    line-height: 1.5;
`;

export const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background-color: var(--color-white-5);
    border-radius: 4px;
    margin-bottom: 2rem;
    overflow: hidden;
    display: flex;
`;

export const ProgressSegment = styled.div`
    height: 100%;
    background-color: ${({ $color }) => $color};
    width: ${({ $width }) => $width}%;
    transition: width 0.5s ease-in-out;
`;

export const Legend = styled.div`
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
`;

export const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-gray-400);

    span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${({ $color }) => $color};
    }
`;

export const AlertBox = styled.div`
    background-color: rgba(245, 158, 11, 0.1); /* Warning / Amber */
    border: 1px solid rgba(245, 158, 11, 0.2);
    color: var(--color-warning);
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    width: fit-content;
`;
