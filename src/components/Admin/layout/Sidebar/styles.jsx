import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarContainer = styled.aside`
    width: 250px;
    background-color: var(--color-panel-bg);
    border-right: 1px solid var(--color-panel-border);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    display: flex;
    flex-direction: column;
    transition: transform var(--transition-normal);

    @media (max-width: 1024px) {
        transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    }
`;

export const SidebarHeader = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    border-bottom: 1px solid var(--color-panel-border);
`;

export const Logo = styled.img`
    max-height: 40px;
    max-width: 150px;
    object-fit: contain;
`;

export const CloseButton = styled.button`
    display: none;
    color: var(--color-gray-400);
    
    @media (max-width: 1024px) {
        display: flex;
    }
`;

export const Nav = styled.nav`
    flex: 1;
    padding: 1.5rem 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const NavSection = styled.div`
    margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--color-muted);
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
    padding-left: 0.75rem;
`;

export const NavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    color: var(--color-gray-400);
    transition: all var(--transition-fast);
    font-size: 0.875rem;
    font-weight: 500;

    &:hover {
        background-color: var(--color-white-5);
        color: white;
    }

    &.active {
        background-color: var(--color-primary-10);
        color: var(--color-primary);
    }
`;

export const Label = styled.span`
    font-weight: 500;
`;

export const Footer = styled.div`
    padding: 1rem;
    border-top: 1px solid var(--color-panel-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
`;

export const UserProfile = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    overflow: hidden;
`;

export const UserAvatar = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--color-panel-border);
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const UserName = styled.span`
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const UserRole = styled.span`
    font-size: 0.75rem;
    color: var(--color-gray-400);
`;

export const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: var(--radius-md);
    color: var(--color-gray-400);
    transition: all var(--transition-fast);

    &:hover {
        background-color: var(--color-white-5);
        color: var(--color-danger);
    }
`;
