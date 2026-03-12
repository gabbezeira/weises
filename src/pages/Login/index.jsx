import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import glow from '@assets/images/glow.svg';
import logo from '@assets/images/logo.svg';
import * as S from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const profile = await login(email, password);

      if (profile.mustChangePassword) {
        navigate('/change-password', { replace: true });
      } else if (profile.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/client', { replace: true });
      }
    } catch (err) {
      const code = err?.code;
      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        setError(t('login.errors.invalid_credentials'));
      } else if (code === 'auth/too-many-requests') {
        setError(t('login.errors.too_many_requests'));
      } else {
        setError(t('login.errors.unexpected'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.LoginPage>
      <S.Grid />
      <S.GlowImageTop
        src={glow}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
      />
      <S.GlowImageBottom
        src={glow}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
      />

      <S.LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <S.LogoSection>
          <S.LogoImage src={logo} alt="Weises Logo" />
          <S.LogoSubtext>{t('login.sign_in_account')}</S.LogoSubtext>
        </S.LogoSection>

        <S.Form onSubmit={handleSubmit}>
          {error && (
            <S.ErrorMessage
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <AlertCircle size={16} />
              {error}
            </S.ErrorMessage>
          )}

          <S.InputGroup>
            <S.Label htmlFor="email">{t('login.email')}</S.Label>
            <S.InputWrapper>
              <S.Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <S.InputIcon>
                <Mail size={18} />
              </S.InputIcon>
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="password">{t('login.password')}</S.Label>
            <S.InputWrapper>
              <S.Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <S.InputIcon>
                <Lock size={18} />
              </S.InputIcon>
              <S.PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </S.PasswordToggle>
            </S.InputWrapper>
          </S.InputGroup>

          <S.SubmitButton
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? <S.Spinner /> : <S.ButtonContent>{t('login.sign_in')}</S.ButtonContent>}
          </S.SubmitButton>
        </S.Form>

        <S.Divider />

        <S.FooterText>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <ArrowLeft size={14} /> {t('login.back_website')}
          </a>
        </S.FooterText>
      </S.LoginCard>
    </S.LoginPage>
  );
};

export default Login;
