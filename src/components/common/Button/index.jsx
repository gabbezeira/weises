import React from 'react';
import * as S from './styles';

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  return (
    <S.Container
      variant={variant}
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </S.Container>
  );
};

export default Button;
