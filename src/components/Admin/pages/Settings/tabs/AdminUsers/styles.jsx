import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
`;

export const Header = styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-white);
`;

export const AddButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: var(--color-primary-20);
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Th = styled.th`
    text-align: left;
    padding: 1rem 1.5rem;
    color: var(--color-gray-400);
    font-size: 0.875rem;
    font-weight: 500;
    border-bottom: 1px solid var(--color-border);
`;

export const Td = styled.td`
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    vertical-align: middle;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    background: var(--color-primary-10);
`;

export const UserMeta = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Name = styled.span`
    font-weight: 500;
    color: var(--color-white);
`;

export const Email = styled.span`
    font-size: 0.875rem;
    color: var(--color-gray-500);
`;

export const RoleBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
`;

export const ActionButton = styled.button`
    background: none;
    border: none;
    color: var(--color-gray-500);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius-md);
    transition: all 0.2s;

    &:hover {
        background: var(--color-danger-10);
        color: var(--color-red-500);
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
`;

export const ModalContent = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 500px;
    padding: 2rem;
`;

export const ModalTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-white);
    margin-bottom: 1.5rem;
`;

export const FormGroup = styled.div`
    margin-bottom: 1.25rem;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-gray-400);
    font-size: 0.875rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-white);
    
    &:focus {
        border-color: var(--color-primary);
        outline: none;
    }
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
`;

export const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    cursor: pointer;
    border: none;
    
    ${(props) =>
      props.$variant === 'secondary'
        ? `
        background: transparent;
        border: 1px solid var(--color-border);
        color: var(--color-gray-400);
        &:hover { border-color: var(--color-gray-300); color: var(--color-white); }
    `
        : `
        background: var(--color-primary);
        color: white;
        &:hover { background: var(--color-primary-20); }
    `}
`;

export const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
`;

export const UploadCircle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px dashed var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: var(--color-background);
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--color-primary);
        background: var(--color-primary-5);
    }
`;

export const UploadPreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

export const UploadPlaceholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-gray-400);
    
    svg {
        width: 24px;
        height: 24px;
    }
`;

export const HiddenInput = styled.input`
    display: none;
`;
