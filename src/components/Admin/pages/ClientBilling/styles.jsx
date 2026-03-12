import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
`;

export const SubTitle = styled.span`
  font-size: 0.875rem;
  color: var(--color-gray-400);
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-500);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  &:hover {
    color: var(--color-text);
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  
  ${(props) => props.$primary ? `
    background: var(--color-primary);
    color: white;
    border: none;
    
    &:hover {
      background: var(--color-primary-60);
    }
  ` : `
    background: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-border);
    
    &:hover {
      background: var(--color-border);
    }
  `}
`;

export const Content = styled.div`
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gray-500);
  text-transform: uppercase;
  border-bottom: 1px solid var(--color-border);
`;

export const Td = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-flex;
  
  ${(props) => {
        switch (props.$status) {
            case 'paid':
                return `
          background: var(--color-green-500-10);
          color: var(--color-green-500);
        `;
            case 'overdue':
                return `
          background: var(--color-red-500-10);
          color: var(--color-red-500);
        `;
            default:
                return `
          background: var(--color-yellow-500-10);
          color: var(--color-yellow-500);
        `;
        }
    }}
`;

export const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: var(--color-gray-500);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
