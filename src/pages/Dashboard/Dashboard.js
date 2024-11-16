import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.large};
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  max-width: 1400px;
  margin: 0 auto;
`;

const Section = styled.section`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.large};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.large};
  margin-bottom: ${props => props.theme.spacing.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};

  &:before {
    content: '${props => props.icon}';
  }
`;

const NoteCard = styled.div`
  padding: ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  margin-bottom: ${props => props.theme.spacing.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.theme.colors.background};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.primary};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const NoteTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.medium};
  margin-bottom: ${props => props.theme.spacing.small};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NotePreview = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.typography.fontSize.small};
  line-height: 1.5;
  margin-bottom: ${props => props.theme.spacing.small};
`;

const NoteMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.medium};
  font-size: ${props => props.theme.typography.fontSize.small};
  color: ${props => props.theme.colors.secondary};
`;

const TagList = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.small};
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacing.small};
`;

const Tag = styled.span`
  background: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: ${props => props.theme.typography.fontSize.small};
`;

const QuickActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.small};
  margin-top: ${props => props.theme.spacing.medium};
`;

const ActionButton = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};

  &:hover {
    background: ${props => props.theme.colors.primary}15;
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const Dashboard = () => {
  // Placeholder data - will be replaced with Redux state
  const recentNotes = [
    {
      id: 1,
      title: 'Meeting Notes',
      preview: 'Discussion about new project requirements...',
      date: '2 hours ago',
      tags: ['work', 'meeting']
    },
    {
      id: 2,
      title: 'Ideas for Blog',
      preview: 'Potential topics for upcoming blog posts...',
      date: '5 hours ago',
      tags: ['blog', 'ideas']
    }
  ];

  const favorites = [
    {
      id: 3,
      title: 'Project Roadmap',
      preview: 'Q1 and Q2 milestones and deliverables...',
      date: '1 day ago',
      tags: ['project', 'planning']
    },
    {
      id: 4,
      title: 'Research Notes',
      preview: 'Key findings from literature review...',
      date: '2 days ago',
      tags: ['research', 'academic']
    }
  ];

  return (
    <DashboardContainer>
      <Section>
        <SectionTitle icon="🕒">Recent Notes</SectionTitle>
        {recentNotes.map(note => (
          <NoteCard key={note.id}>
            <NoteTitle>
              {note.title}
              <span>📝</span>
            </NoteTitle>
            <NotePreview>{note.preview}</NotePreview>
            <NoteMetadata>
              <span>📅 {note.date}</span>
            </NoteMetadata>
            <TagList>
              {note.tags.map(tag => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </TagList>
          </NoteCard>
        ))}
        <QuickActions>
          <ActionButton>📝 New Note</ActionButton>
          <ActionButton>📂 View All</ActionButton>
        </QuickActions>
      </Section>

      <Section>
        <SectionTitle icon="⭐">Favorites</SectionTitle>
        {favorites.map(note => (
          <NoteCard key={note.id}>
            <NoteTitle>
              {note.title}
              <span>📌</span>
            </NoteTitle>
            <NotePreview>{note.preview}</NotePreview>
            <NoteMetadata>
              <span>📅 {note.date}</span>
            </NoteMetadata>
            <TagList>
              {note.tags.map(tag => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </TagList>
          </NoteCard>
        ))}
        <QuickActions>
          <ActionButton>📌 Manage Favorites</ActionButton>
        </QuickActions>
      </Section>
    </DashboardContainer>
  );
};

export default Dashboard;
