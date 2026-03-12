import styled, { css, keyframes } from 'styled-components';

const fadeSlide = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;

  @media (max-width: 640px) {
    padding: 1.25rem;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  color: var(--color-gray-500);
  font-size: 0.9375rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
`;

export const SectionIcon = styled.div`
  width: 38px;
  height: 38px;
  min-width: 38px;
  background: var(--color-primary-10);
  border: 1px solid var(--color-primary-20);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const SectionSubtitle = styled.p`
  font-size: 0.8125rem;
  color: var(--color-gray-500);
  margin-top: 0.125rem;
`;

export const AddCardBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary-10);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-30);
  padding: 0.5rem 1.125rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-primary);
    color: white;
  }
`;

export const EmptyCards = styled.button`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  background: transparent;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  color: var(--color-gray-500);
  text-align: left;
  transition: all var(--transition-fast);

  svg {
    opacity: 0.5;
    flex-shrink: 0;
    transition: all var(--transition-fast);
  }

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: var(--color-primary-10);
    svg { opacity: 1; }
  }
`;

export const EmptyCardsText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;

  strong { font-size: 0.9375rem; font-weight: 600; }
  span { font-size: 0.8125rem; }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  gap: 1.25rem;
  animation: ${fadeSlide} 0.3s ease-out;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const AddFormSection = styled.div`
  animation: ${fadeSlide} 0.25s ease-out;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
`;

export const AddFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const CardPreviewSide = styled.div`
  background: linear-gradient(
    135deg,
    var(--color-primary-30) 0%,
    rgba(10, 10, 10, 0.97) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;
  border-right: 1px solid var(--color-border);

  @media (max-width: 680px) {
    padding: 2rem 1.5rem;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
`;

export const FormSide = styled.form`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  background: var(--color-surface);

  @media (max-width: 680px) {
    padding: 1.25rem;
  }
`;

export const FormSecurity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-success);
  font-size: 0.8125rem;
  font-weight: 500;
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.875rem;
`;

export const FormFieldFull = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const FormFieldHalf = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const FormLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gray-400);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const StripeFieldWrapper = styled.div`
  padding: 0.8125rem 0.875rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);

  &:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-20);
  }

  .StripeElement { width: 100%; }
`;

export const CepInput = styled.input`
  padding: 0.8125rem 0.875rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: 0.9375rem;
  outline: none;
  width: 100%;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-20);
  }

  &::placeholder { color: var(--color-gray-500); }
`;

export const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.875rem;
  background: var(--color-danger-10);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: var(--radius-md);
  color: var(--color-danger);
  font-size: 0.8125rem;
  font-weight: 500;
`;

export const SuccessBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.875rem;
  background: var(--color-success-10);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: var(--radius-md);
  color: var(--color-success);
  font-size: 0.8125rem;
  font-weight: 500;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.25rem;
`;

export const CancelBtn = styled.button`
  padding: 0.625rem 1.125rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  color: var(--color-gray-400);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  background: transparent;

  &:hover:not(:disabled) {
    border-color: var(--color-gray-400);
    color: var(--color-text);
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const SubmitBtn = styled.button`
  padding: 0.625rem 1.375rem;
  border-radius: var(--radius-md);
  border: none;
  background: var(--color-primary);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--color-primary-80);
    box-shadow: 0 0 14px var(--color-primary-50);
    transform: translateY(-1px);
  }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;


const cardBase = css`
  border-radius: 16px;
  padding: 1.375rem 1.5rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  background: ${({ $brand }) => getBrandGradient($brand)};
  box-shadow:
    0 12px 32px -6px rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
`;

export const CardVisual = styled.div`
  ${cardBase}
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1.586;
`;

export const CardVisualGloss = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 60%);
  pointer-events: none;
`;

export const CardVisualTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1;
  opacity: 0.85;
`;

export const CardVisualNumber = styled.div`
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.15em;
  z-index: 1;
  color: rgba(255, 255, 255, 0.92);
`;

export const CardVisualBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 1;
`;

export const CardVisualField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const CardVisualLabel = styled.span`
  font-size: 0.5625rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.55;
`;

export const CardVisualValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  opacity: 0.9;
`;

export const CardBrandLabel = styled.span`
  font-size: 1.0625rem;
  font-weight: 800;
  font-style: italic;
  opacity: 0.85;
  text-transform: uppercase;
`;


export const SavedCardVisual = styled.div`
  ${cardBase}
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1.586;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      0 20px 40px -8px rgba(0, 0, 0, 0.55),
      inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  }
`;

export const SavedCardGloss = styled(CardVisualGloss)``;

export const SavedCardTop = styled(CardVisualTop)``;
export const SavedCardNumber = styled(CardVisualNumber)``;
export const SavedCardBottom = styled(CardVisualBottom)``;
export const SavedCardField = styled(CardVisualField)``;
export const SavedCardLabel = styled(CardVisualLabel)``;
export const SavedCardValue = styled(CardVisualValue)``;
export const SavedCardBrand = styled(CardBrandLabel)``;

export const BrandIconWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
`;

export const RemoveBtn = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: var(--radius-sm);
  color: #fff;
  transition: all var(--transition-fast);
  backdrop-filter: blur(4px);

  &:hover { background: var(--color-danger); }
`;

export const ChipIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 34px;
  height: 26px;
  background: rgba(255, 220, 100, 0.65);
  border-radius: 4px;
  padding: 5px 6px;
  justify-content: center;
`;

export const ChipLine = styled.div`
  height: 2px;
  border-radius: 1px;
  background: rgba(140, 100, 0, 0.6);
`;
