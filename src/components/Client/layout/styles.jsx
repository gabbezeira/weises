import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-background);
    color: var(--color-text);
`;

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--color-background);
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 50;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export const LogoGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    img {
        height: 2.5rem;
        width: auto;
    }
`;

export const UserMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--color-border);
    }

    .info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        strong {
            font-size: 0.875rem;
            color: var(--color-text);
        }
        
        span {
            font-size: 0.75rem;
            color: var(--color-gray-500);
        }
    }
`;

export const MainContent = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    animation: fadeIn 0.5s ease-out;

    @media (max-width: 640px) {
        padding: 1rem;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const NavLinks = styled.nav`
    display: flex;
    gap: 2rem;
    margin-right: auto;
    margin-left: 3rem;

    @media (max-width: 768px) {
        display: none;
    }

    a {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-gray-500);
        transition: color 0.2s;
        text-decoration: none;
        position: relative;

        &:hover, &.active {
            color: var(--color-primary);
        }

        &.active::after {
            content: '';
            position: absolute;
            bottom: -1.75rem;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: var(--color-primary);
        }
    }
`;

export const RequestButton = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--color-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover {
        background-color: var(--color-primary-50);
    }
`;

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const LogoutButton = styled.button`
    background: none;
    border: none;
    color: var(--color-gray-500);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;

    &:hover {
        color: var(--color-danger);
    }
`;

export const NotFoundContent = styled.div`
    text-align: center;
`;

export const MenuButton = styled.button`
    display: none;
    color: var(--color-text);
    padding: 0.5rem;
    transition: color var(--transition-fast);

    &:hover {
        color: var(--color-primary);
    }

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const MobileOverlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: var(--z-index-mobile-overlay);
`;

export const MobileMenu = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    max-width: 85vw;
    background-color: var(--color-surface);
    border-left: 1px solid var(--color-border);
    z-index: var(--z-index-sidebar);
    display: flex;
    flex-direction: column;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform var(--transition-normal);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
`;

export const MobileMenuHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
`;

export const CloseButton = styled.button`
    color: var(--color-gray-400);
    padding: 0.5rem;
    transition: color var(--transition-fast);

    &:hover {
        color: var(--color-text);
    }
`;

export const MobileUserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);

    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid var(--color-border);
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;

        strong {
            font-size: 0.9375rem;
            color: var(--color-text);
        }

        span {
            font-size: 0.8125rem;
            color: var(--color-gray-500);
        }
    }
`;

export const MobileNavLinks = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    flex: 1;

    a {
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        font-size: 0.9375rem;
        font-weight: 500;
        color: var(--color-gray-400);
        text-decoration: none;
        transition: all var(--transition-fast);
        border-left: 3px solid transparent;

        &:hover {
            color: var(--color-text);
            background-color: var(--color-white-5);
        }

        &.active {
            color: var(--color-primary);
            background-color: var(--color-primary-10);
            border-left-color: var(--color-primary);
        }
    }
`;

export const MobileMenuFooter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid var(--color-border);
    align-items: stretch;

    ${RequestButton} {
        justify-content: center;
    }

    ${LogoutButton} {
        justify-content: center;
        padding: 0.75rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
    }
`;
