import React from 'react';
import { Home } from 'lucide-react';
import Button from '@common/Button';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

const ErrorPage = ({ error: propError, resetError }) => {
  const navigate = useNavigate();

  const error = propError || {
    status: 404,
    statusText: 'Page Not Found',
    message: 'The requested page could not be located in our system.',
    stack: 'Error: 404 Not Found\n    at Route (src/App.jsx:85:1)',
  };

  const handleHome = () => {
    if (resetError) resetError();
    navigate('/');
  };

  return (
    <S.Wrapper>
      <S.BackgroundGlowLeft />
      <S.BackgroundGlowRight />
      <S.BackgroundGrid />
      <S.BackgroundFade />

      <S.ContentContainer>
        <S.ErrorContent
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <S.Badge>
            <S.PulseDot />
            System Anomaly Detected
          </S.Badge>

          <S.ErrorCode>{error?.status || 'Error'}</S.ErrorCode>

          <S.ErrorStatusText>
            <S.Highlight>{error?.statusText || 'Unknown Error'}</S.Highlight>
          </S.ErrorStatusText>

          <S.ErrorMessage>
            {error?.message || 'Critical system failure. Our engineers have been notified.'}
          </S.ErrorMessage>
        </S.ErrorContent>

        <S.Actions
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button variant="primary" onClick={handleHome}>
            <Home size={18} />
            Return to Base
          </Button>
        </S.Actions>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default ErrorPage;
