import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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
        setError('Invalid email or password.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
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
          <S.LogoSubtext>Sign in to your account</S.LogoSubtext>
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
            <S.Label htmlFor="email">Email</S.Label>
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
            <S.Label htmlFor="password">Password</S.Label>
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
            {isLoading ? <S.Spinner /> : <S.ButtonContent>Sign In</S.ButtonContent>}
          </S.SubmitButton>
        </S.Form>

        <S.Divider />

        <S.FooterText>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <ArrowLeft size={14} /> Back to website
          </a>
        </S.FooterText>
      </S.LoginCard>
    </S.LoginPage>
  );
};

export default Login;
