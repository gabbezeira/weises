import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Lock, AlertCircle, Loader2, KeyRound, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import LogoImg from '../../assets/images/logo.svg';
import * as S from './styles';

const ChangePassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      <S.Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <S.Logo src={LogoImg} alt="Weises Logo" />
        <S.Title>{t('auth.change_password.title')}</S.Title>
        <S.Subtitle>{t('auth.change_password.subtitle')}</S.Subtitle>

        {error && (
          <S.ErrorMessage
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <AlertCircle size={18} />
            {error}
          </S.ErrorMessage>
        )}

        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <label>{t('auth.change_password.new_password')}</label>
            <div>
              <input
                type="password"
                placeholder={t('auth.change_password.placeholder_new')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <KeyRound size={18} />
            </div>
          </S.InputGroup>

          <S.InputGroup>
            <label>{t('auth.change_password.confirm_password')}</label>
            <div>
              <input
                type="password"
                placeholder={t('auth.change_password.placeholder_confirm')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <CheckCircle2 size={18} />
            </div>
          </S.InputGroup>

          <S.SubmitButton type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Lock size={20} />}
            {loading ? t('auth.change_password.btn_loading') : t('auth.change_password.btn_submit')}
          </S.SubmitButton>
        </S.Form>
      </S.Card>
    </S.Container>
  );
};

export default ChangePassword;
