import styled from 'styled-components';

export const FooterWrapper = styled.footer`
    background: black;
    padding: 6rem 0;
    position: relative;
    overflow: hidden;
`;

export const SeparatorTop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, rgb(255 255 255 / 0), var(--color-white-10), rgb(255 255 255 / 0));
`;

export const BackgroundGlow = styled.div`
    position: absolute;
    bottom: -250px;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 500px;
    filter: blur(120px);
    opacity: 0.6;
    border-radius: 100%;
    pointer-events: none;
    mix-blend-mode: screen;
    background: radial-gradient(circle at bottom, #ffffff 0%, #6932E2 40%, #A069FF 70%, rgb(160 105 255 / 0) 100%);
`;

export const SeparatorBottom = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, rgb(255 255 255 / 0), rgb(255 255 255 / 0.5), rgb(255 255 255 / 0));
`;

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    text-align: center;

    @media (min-width: 1024px) {
        flex-direction: row;
        align-items: flex-start;
        text-align: left;
    }
`;

export const BrandColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1024px) {
        width: 33.333%;
        align-items: flex-start;
    }
`;

export const LogoLink = styled.a`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
`;

export const LogoImage = styled.img`
    height: 3rem;
    width: auto;
    opacity: 0.9;
`;

export const CompanyDesc = styled.p`
    color: var(--color-gray-200);
    font-size: 0.875rem;
    line-height: 1.625;
    max-width: 20rem;
    margin: 0 auto;

    @media (min-width: 1024px) {
        margin: 0;
    }
`;

export const LinksColumns = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    width: 100%;
    text-align: left;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1024px) {
        width: 66.667%;
    }
`;

export const ColumnTitle = styled.h4`
    color: white;
    font-weight: 700;
    margin-bottom: 1.5rem;
`;

export const LinkList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const FooterLink = styled.a`
    color: var(--color-gray-200);
    font-size: 0.875rem;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        color: white;
    }
`;

export const GroupLink = styled.a`
    display: block;
`;

export const GroupSpan = styled.span`
    color: var(--color-gray-200);
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.875rem;
    font-weight: 500;

    ${GroupLink}:hover & {
        color: white;
    }
`;

export const FooterBottom = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    margin-top: 4rem;
    border-top: 1px solid var(--color-white-5);
    text-align: center;

    @media (min-width: 768px) {
        flex-direction: row;
        text-align: left;
    }
`;

export const Copyright = styled.p`
    color: var(--color-gray-200);
    font-size: 0.75rem;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
        margin-bottom: 0;
    }
`;

export const SocialIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

export const SocialIcon = styled.div`
    color: var(--color-gray-200);
    cursor: pointer;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        color: var(--color-primary);
    }
`;
