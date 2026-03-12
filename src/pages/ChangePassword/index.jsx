import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Lock, AlertCircle, Loader2, KeyRound, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { api } from '../../services/api';
import LogoImg from '../../assets/images/logo.svg';
import glow from '../../assets/images/glow.svg';
import * as S from './styles';

const ChangePassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError(t('auth.change_password.error_length'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('auth.change_password.error_match'));
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/change-password', { newPassword: password });

      await logout();
      navigate('/login', {
        replace: true,
        state: { message: t('auth.change_password.success') },
      });
    } catch (err) {
      setError(err.response?.data?.message || t('auth.change_password.error_generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
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

      <S.Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <S.LogoSection>
          <S.LogoImage src={LogoImg} alt="Weises Logo" />
          <S.Title>{t('auth.change_password.title')}</S.Title>
          <S.Subtitle>{t('auth.change_password.subtitle')}</S.Subtitle>
        </S.LogoSection>

        <S.Form onSubmit={handleSubmit}>
          {error && (
            <S.ErrorMessage
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <AlertCircle size={18} />
              {error}
            </S.ErrorMessage>
          )}

          <S.InputGroup>
            <S.Label>{t('auth.change_password.new_password')}</S.Label>
            <S.InputWrapper>
              <S.Input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.change_password.placeholder_new')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <S.InputIcon>
                <KeyRound size={18} />
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

          <S.InputGroup>
            <S.Label>{t('auth.change_password.confirm_password')}</S.Label>
            <S.InputWrapper>
              <S.Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('auth.change_password.placeholder_confirm')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <S.InputIcon>
                <CheckCircle2 size={18} />
              </S.InputIcon>
              <S.PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </S.PasswordToggle>
            </S.InputWrapper>
          </S.InputGroup>

          <S.SubmitButton 
              type="submit" 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
          >
            {loading ? <S.Spinner /> : <S.ButtonContent><Lock size={20} />{t('auth.change_password.btn_submit')}</S.ButtonContent>}
          </S.SubmitButton>
        </S.Form>
      </S.Card>
    </S.Container>
  );
};

export default ChangePassword;
