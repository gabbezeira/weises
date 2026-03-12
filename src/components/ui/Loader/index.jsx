import React from 'react';
import * as S from './styles';

const Loader = ({ text }) => {
  return (
    <S.Container>
      <S.SpinnerWrapper>
        <S.Spinner />
        {text && <S.SpinnerText>{text}</S.SpinnerText>}
      </S.SpinnerWrapper>
    </S.Container>
  );
};

export default Loader;
