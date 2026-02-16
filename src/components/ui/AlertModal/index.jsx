import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Overlay = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

const ModalContainer = styled(motion.div)`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    
    ${(props) =>
      props.$type === 'error' &&
      `
        background: rgba(239, 68, 68, 0.1);
        color: var(--color-red-500);
    `}
    
    ${(props) =>
      props.$type === 'success' &&
      `
        background: rgba(16, 185, 129, 0.1);
        color: var(--color-emerald-500);
    `}

    ${(props) =>
      props.$type === 'info' &&
      `
        background: rgba(59, 130, 246, 0.1);
        color: var(--color-blue-500);
    `}
`;

const Title = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-white);
    margin-bottom: 0.5rem;
`;

const Message = styled.p`
    color: var(--color-gray-400);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 2rem;
`;

const Button = styled.button`
    width: 100%;
    padding: 0.75rem;
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

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--color-gray-500);
    cursor: pointer;
    padding: 0.25rem;
    
    &:hover {
        color: var(--color-white);
    }
`;

const AlertModal = ({ isOpen, onClose, title, message, type = 'error' }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={32} />;
      case 'info':
        return <Info size={32} />;
      case 'error':
      default:
        return <AlertCircle size={32} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <X size={20} />
            </CloseButton>

            <IconWrapper $type={type}>{getIcon()}</IconWrapper>

            <Title>{title}</Title>
            <Message>{message}</Message>

            <Button onClick={onClose}>{type === 'error' ? 'Try Again' : 'Close'}</Button>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
