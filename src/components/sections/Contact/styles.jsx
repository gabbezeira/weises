import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Section = styled.section.attrs({ id: 'contact' })`
    padding: 6rem 0;
    position: relative;
    overflow: hidden;
`;

export const GradientLeft = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 33.333%;
    height: 100%;
    background: linear-gradient(to left, var(--color-primary-10), transparent);
    pointer-events: none;
`;

export const GradientRight = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 33.333%;
    height: 100%;
    background: linear-gradient(to right, rgb(160 105 255 / 0.05), transparent);
    pointer-events: none;
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;
`;

export const FormWrapper = styled(motion.div)`
    background: rgb(10 10 10 / 0.5);
    backdrop-filter: blur(24px);
    border: 1px solid var(--color-white-10);
    border-radius: 1.5rem;
    padding: 2rem;
    max-width: 56rem;
    margin: 0 auto;

    @media (min-width: 768px) {
        padding: 3rem;
    }
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: 2.5rem;
`;

export const Title = styled.h2`
    font-size: 2.5rem;
    font-family: var(--font-display);
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
        font-size: 3rem;
    }
`;

export const StartDescription = styled.p`
    color: var(--color-gray-200);
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-200);
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    width: 100%;
    background: rgb(0 0 0 / 0.5);
    border: 1px solid var(--color-white-10);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    background: rgb(0 0 0 / 0.5);
    border: 1px solid var(--color-white-10);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }
`;

export const SubmitWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const SubmitButton = styled(Button)`
    width: 100%;
    padding: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    @media (min-width: 768px) {
        width: auto;
    }
`;

export const ContactInfo = styled.div`
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    gap: 3rem;
    color: var(--color-gray-200);
`;

export const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
