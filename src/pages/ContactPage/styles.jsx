import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
    min-height: 100vh;
    padding-top: 6rem;
    padding-bottom: 3rem;
    position: relative;
    overflow: hidden;
`;

export const BackgroundGlowLeft = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 500px;
    background: rgb(105 50 226 / 0.1);
    filter: blur(100px);
    border-radius: 9999px;
    pointer-events: none;
    transform: translate(-50%, -50%);
`;

export const BackgroundGlowRight = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 500px;
    height: 500px;
    background: rgb(105 50 226 / 0.1);
    filter: blur(100px);
    border-radius: 9999px;
    pointer-events: none;
    transform: translate(50%, 50%);
`;

export const BackgroundGrid = styled.div.attrs({ className: 'bg-grid' })`
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.3;
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;
`;

export const HeroSection = styled(motion.div)`
    text-align: center;
    margin-bottom: 4rem;
`;

export const Badge = styled.span`
    padding: 0.375rem 1rem;
    border-radius: 9999px;
    background: rgb(255 255 255 / 0.05);
    border: 1px solid rgb(255 255 255 / 0.1);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-300);
    backdrop-filter: blur(12px);
    margin-bottom: 1.5rem;
    display: inline-block;
`;

export const HeroTitle = styled.h1`
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
        font-size: 4.5rem;
    }
`;

export const Highlight = styled.span.attrs({ className: 'text-highlight' })``;

export const HeroDesc = styled.p`
    font-size: 1.25rem;
    color: var(--color-gray-300);
    max-width: 42rem;
    margin: 0 auto;
`;

export const ContactLayout = styled.div`
    display: grid;
    gap: 3rem;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(12, 1fr);
    }
`;

export const InfoColumn = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 1024px) {
        grid-column: span 4;
    }
`;

export const InfoCard = styled.div`
    background: rgb(10 10 10 / 0.3);
    backdrop-filter: blur(12px);
    border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 1rem;
    padding: 2rem;
`;

export const InfoTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
`;

export const InfoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const InfoItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
`;

export const IconWrapper = styled.div`
    padding: 0.75rem;
    border-radius: 0.5rem;
    background: rgb(105 50 226 / 0.1);
    color: var(--color-primary);
`;

export const InfoText = styled.div``;

export const InfoLabel = styled.p`
    font-size: 0.875rem;
    color: var(--color-gray-400);
    margin-bottom: 0.25rem;
`;

export const InfoLink = styled.a`
    color: white;
    font-size: 1.125rem;
    font-weight: 500;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        color: var(--color-primary);
    }
`;

export const InfoValue = styled.p`
    color: white;
    font-size: 1.125rem;
    font-weight: 500;
`;

export const FollowTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
`;

export const SocialLinks = styled.div`
    display: flex;
    gap: 1rem;
`;

export const SocialIcon = styled.a`
    padding: 0.75rem;
    border-radius: 0.5rem;
    background: rgb(255 255 255 / 0.05);
    color: var(--color-gray-300);
    transition: all 300ms ease;

    &:hover {
        background: var(--color-primary);
        color: white;
        transform: translateY(-0.25rem);
    }
`;

export const FormColumn = styled(motion.div)`
    @media (min-width: 1024px) {
        grid-column: span 8;
    }
`;

export const ContactForm = styled.form`
    background: rgb(10 10 10 / 0.3);
    backdrop-filter: blur(12px);
    border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 1rem;
    padding: 2rem;

    .icon-button {
        display: flex; 
        gap: 0.5rem; 
        justify-content: center; 
        align-items: center; 
        width: 100%; 

        @media (min-width: 640px) { 
            width: auto; 
        }
    }

    @media (min-width: 768px) {
        padding: 2.5rem;
    }
`;

export const FormTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 2rem;
`;

export const FormGrid = styled.div`
    display: grid;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

export const MessageWrapper = styled.div`
    margin-bottom: 2rem;
`;

export const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-400);
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    width: 100%;
    background: rgb(5 5 5 / 0.5);
    border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &::placeholder {
        color: var(--color-gray-500);
    }

    &:focus {
        outline: none;
        border-color: rgb(105 50 226 / 0.5);
        box-shadow: 0 0 0 1px rgb(105 50 226 / 0.5);
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    background: rgb(5 5 5 / 0.5);
    border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    resize: none;

    &::placeholder {
        color: var(--color-gray-500);
    }

    &:focus {
        outline: none;
        border-color: rgb(105 50 226 / 0.5);
        box-shadow: 0 0 0 1px rgb(105 50 226 / 0.5);
    }
`;
