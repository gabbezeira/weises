import React from 'react';
import * as S from './styles';

const Card = ({ children, className = '', ...props }) => {
  return (
    <S.Container whileHover={{ y: -5 }} className={className} {...props}>
      {children}
    </S.Container>
  );
};

export default Card;
