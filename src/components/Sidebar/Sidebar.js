import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const StyledAside = styled.aside`
  width: 250px;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.medium};
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 999;
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing.large};
  
  &:not(:first-child) {
    border-top: 1px solid ${props => props.theme.colors.border};
    padding-top: ${props => props.theme.spacing.medium};
  }
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.small};
  color: ${props => props.theme.colors.secondary};
  text-transform: uppercase;
  margin-bottom: ${props => props.theme.spacing.small};
`;

const FolderItem = styled.div`
  padding: ${props => props.theme.spacing.small};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.theme.colors.border};
  }
`;

const MenuItem = styled(FolderItem)`
  color: ${props => props.theme.colors.text};
`;

const ToggleButton = styled.button`
  position: fixed;
  left: ${props => props.$isOpen ? '270px' : '10px'};
  top: 15px;
  z-index: 1000;
  padding: 10px;
  background: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${props => props.theme.colors.primary}dd;
    transform: scale(1.05);
  }
`;

const NewNoteButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.medium};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.small};
  margin-bottom: ${props => props.theme.spacing.large};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary}dd;
  }
`;

const Sidebar = ({ onToggle, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarOverlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <ToggleButton onClick={toggleSidebar} $isOpen={isOpen} aria-label="Toggle Sidebar">
        {isOpen ? '✕' : '☰'}
      </ToggleButton>
      <StyledAside $isOpen={isOpen}>
        <NewNoteButton>
          ✚ New Note
        </NewNoteButton>

        <Section>
          <SectionTitle>Folders</SectionTitle>
          <FolderItem>📁 Personal Notes</FolderItem>
          <FolderItem>📁 Work Projects</FolderItem>
          <FolderItem>📁 Ideas</FolderItem>
        </Section>

        <Section>
          <SectionTitle>Quick Access</SectionTitle>
          <MenuItem>🕒 Recent Notes</MenuItem>
          <MenuItem>⭐ Favorites</MenuItem>
          <MenuItem>🏷️ Tags</MenuItem>
        </Section>

        <Section>
          <SectionTitle>Tools</SectionTitle>
          <MenuItem>↻ Sync Notes</MenuItem>
          <MenuItem>⚙️ Settings</MenuItem>
          <MenuItem>📤 Import/Export</MenuItem>
        </Section>
      </StyledAside>
    </>
  );
};

export default Sidebar;
