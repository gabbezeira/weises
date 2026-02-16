import React from 'react';
import Navbar from '@layout/Navbar';
import Footer from '@layout/Footer';
import * as S from './styles';

const Layout = ({ children }) => {
  return (
    <S.LayoutWrapper>
      <Navbar />
      <S.MainContent>
        <S.BackgroundEffects>
          <S.PulseCircleTop />
          <S.PulseCircleBottom style={{ animationDelay: '1s' }} />
        </S.BackgroundEffects>
        <S.ContentContainer>{children}</S.ContentContainer>
      </S.MainContent>
      <Footer />
    </S.LayoutWrapper>
  );
};

export default Layout;
