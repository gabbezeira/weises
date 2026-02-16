import React from 'react';
import { FolderOpen } from 'lucide-react';
import * as S from './styles';

const EmptyState = ({
  title = 'No Items Found',
  description = "We couldn't find any items matching your criteria.",
  icon: Icon = FolderOpen,
  children,
}) => {
  return (
    <S.Container>
      <S.IconWrapper
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <S.StyledIcon>
          <Icon size={48} strokeWidth={1.5} />
        </S.StyledIcon>
      </S.IconWrapper>

      <S.Title
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </S.Title>

      <S.Description
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {description}
      </S.Description>

      {children && <div style={{ marginTop: '2rem' }}>{children}</div>}
    </S.Container>
  );
};

export default EmptyState;
