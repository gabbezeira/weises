import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as S from './styles';

const flags = {
  en: (
    <S.Flag role="img" aria-label="USA Flag">
      🇺🇸
    </S.Flag>
  ),
  pt: (
    <S.Flag role="img" aria-label="Brazil Flag">
      🇧🇷
    </S.Flag>
  ),
  es: (
    <S.Flag role="img" aria-label="Spain Flag">
      🇪🇸
    </S.Flag>
  ),
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Fallback to 'en' if language is not supported or region specific (e.g., pt-BR -> pt)
  const currentLang = (i18n.language || 'en').split('-')[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <S.Container>
      <S.TriggerButton onClick={() => setIsOpen(!isOpen)}>
        {flags[currentLang] || flags.en}
        <S.StyledChevronDown size={14} $isOpen={isOpen} />
      </S.TriggerButton>

      <AnimatePresence>
        {isOpen && (
          <S.Dropdown
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <S.DropdownContent>
              {Object.keys(flags).map((lng) => (
                <S.LangButton
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  $isActive={currentLang === lng}
                >
                  {flags[lng]}
                  <S.LangText>{lng}</S.LangText>
                </S.LangButton>
              ))}
            </S.DropdownContent>
          </S.Dropdown>
        )}
      </AnimatePresence>
    </S.Container>
  );
};

export default LanguageSelector;
