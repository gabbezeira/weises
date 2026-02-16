import React from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import * as S from './styles';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  itemName = '',
}) => {
  if (typeof document === 'undefined') return null;
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <S.Backdrop onClick={onClose} />
      <S.ModalContainer>
        <S.ModalContent>
          <S.IconWrapper>
            <S.WarningIcon>
              <AlertTriangle size={32} />
            </S.WarningIcon>
          </S.IconWrapper>

          <S.Title>{title}</S.Title>
          <S.Message>
            {message}
            {itemName && <S.ItemName>"{itemName}"</S.ItemName>}
          </S.Message>

          <S.ButtonGroup>
            <S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
            <S.DeleteButton onClick={onConfirm}>Delete</S.DeleteButton>
          </S.ButtonGroup>
        </S.ModalContent>
      </S.ModalContainer>
    </>,
    document.body,
  );
};

export default DeleteConfirmationModal;
