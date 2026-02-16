import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '@common/Button';

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-index-sidebar);
    transition: all 500ms ease;
    border-bottom: 1px solid;

    ${({ $scrolled }) =>
      $scrolled
        ? `
            background: rgb(5 5 5 / 0.6);
            backdrop-filter: blur(40px);
            border-color: var(--color-white-5);
            padding: 1rem 0;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        `
        : `
            background: transparent;
            border-color: transparent;
            padding: 1.5rem 0;
        `}
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const LogoLink = styled.a`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const LogoImage = styled.img`
    height: 2.5rem;
    width: auto;
    transition: transform 300ms ease;

    ${LogoLink}:hover & {
        transform: scale(1.05);
        filter: brightness(1.1);
    }
`;

export const DesktopMenu = styled.div`
    display: none;

    @media (min-width: 1024px) {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
`;

export const NavLink = styled.a`
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-200);
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    cursor: pointer;

    &:hover {
        color: white;
    }
`;

export const NavLinkBar = styled.span`
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-primary);
    border-radius: 9999px;
    transition: all 300ms ease;

    ${NavLink}:hover & {
        width: 100%;
    }
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const ContactButton = styled(Button).attrs({ variant: 'primary' })`
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
`;

export const MobileMenuToggle = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (min-width: 1024px) {
        display: none;
    }
`;

export const ToggleButton = styled.button`
    color: white;
    padding: 0.5rem;
`;

export const MobileMenuOverlay = styled(motion.div)`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgb(5 5 5 / 0.95);
    backdrop-filter: blur(24px);
    border-top: 1px solid var(--color-white-10);
    overflow: hidden;

    @media (min-width: 1024px) {
        display: none;
    }
`;

export const MobileMenuContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    align-items: center;
    text-align: center;
`;

export const MobileNavLink = styled.a`
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--color-gray-300);
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &:hover {
        color: var(--color-primary);
    }
`;

export const MobileContactButton = styled(Button).attrs({ variant: 'primary' })`
    width: 100%;
    max-width: 20rem;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
`;
