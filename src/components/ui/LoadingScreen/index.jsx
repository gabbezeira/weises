import React from 'react';
import logo from '@assets/images/logo.svg';
import * as S from './styles';

const LoadingScreen = () => {
  return (
    <S.Container>
      <S.LogoWrapper
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <S.Logo src={logo} alt="Loading..." />
      </S.LogoWrapper>
    </S.Container>
  );
};

export default LoadingScreen;
