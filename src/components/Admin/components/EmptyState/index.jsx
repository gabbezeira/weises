import React from 'react';
import { PackageOpen } from 'lucide-react';
import * as S from './styles';

const EmptyState = ({ title, description, icon: Icon = PackageOpen }) => {
  return (
    <S.Container>
      <S.IconWrapper>
        <Icon size={40} strokeWidth={1.5} />
      </S.IconWrapper>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.Content>
    </S.Container>
  );
};

export default EmptyState;
