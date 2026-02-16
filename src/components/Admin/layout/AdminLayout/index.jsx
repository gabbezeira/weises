import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import * as S from './styles';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <S.LayoutContainer>
      <S.Overlay $isOpen={isSidebarOpen} onClick={closeSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <S.MainContent>
        <Header toggleSidebar={toggleSidebar} />
        <S.ContentWrapper>
          <Outlet />
        </S.ContentWrapper>
      </S.MainContent>
    </S.LayoutContainer>
  );
};

export default AdminLayout;
