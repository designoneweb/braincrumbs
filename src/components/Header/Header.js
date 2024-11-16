import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};
  font-size: ${props => props.theme.typography.fontSize.large};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-left: 60px; // Space for the toggle button

  &:before {
    content: '🧠';
    font-size: 1.2em;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 600px;
  margin-left: ${props => props.theme.spacing.large};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: none;
    margin-left: ${props => props.theme.spacing.medium};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  padding-left: 2.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  font-size: ${props => props.theme.typography.fontSize.medium};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.secondary};
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: ${props => props.theme.spacing.medium};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.secondary};
  pointer-events: none;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>BrainCrumbs</Logo>
      <SearchContainer>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput 
          placeholder="Search notes, tags, or type / for commands..." 
          aria-label="Search"
        />
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;
