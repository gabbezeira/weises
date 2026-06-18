import React from 'react';
import { motion } from 'framer-motion';
import logo from '@assets/images/logo.svg';
import * as S from './styles';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <S.Container>
      <S.Grid />
      <S.GlowImageTop
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
      />
      <S.GlowImageBottom
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
      />

      <S.Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <S.LogoSection>
          <S.LogoImage src={logo} alt="Logo" />
          <S.Title>{title}</S.Title>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        </S.LogoSection>

        {children}
      </S.Card>
    </S.Container>
  );
};

export default AuthLayout;
