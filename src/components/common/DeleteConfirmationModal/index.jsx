import React from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Modal from '../Modal';
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
      <Modal.Overlay onClick={onClose}>
        <Modal.Content $maxWidth="400px" onClick={(e) => e.stopPropagation()}>
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
        </Modal.Content>
      </Modal.Overlay>
    </>,
    document.body,
  );
};

export default DeleteConfirmationModal;
