import React from 'react';
import styled from 'styled-components';

export const Overlay = styled.div`
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

export const Content = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    width: 100%;
    max-width: ${({ $maxWidth }) => $maxWidth || '500px'};
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const Header = styled.div`
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.h2`
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
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: var(--color-surface-hover);
        color: var(--color-white);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const Body = styled.div`
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

export const Footer = styled.div`
    padding: 1.5rem 2rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
`;

const Modal = {
  Overlay,
  Content,
  Header,
  Title,
  CloseButton,
  Body,
  Footer,
  FormContainer
};

export default Modal;
