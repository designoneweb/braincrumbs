import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  margin-left: ${props => props.$sidebarOpen ? '250px' : '0'};
  padding: ${props => props.theme.spacing.large};
  flex: 1;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
  background-color: ${props => props.theme.colors.background};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${props => props.theme.spacing.medium};
  }
`;

const HeaderWrapper = styled.div`
  margin-left: ${props => props.$sidebarOpen ? '250px' : '0'};
  transition: margin-left 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar onToggle={handleSidebarToggle} defaultOpen={sidebarOpen} />
      <ContentWrapper>
        <HeaderWrapper $sidebarOpen={sidebarOpen}>
          <Header />
        </HeaderWrapper>
        <MainContent $sidebarOpen={sidebarOpen}>
          {children}
        </MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;
