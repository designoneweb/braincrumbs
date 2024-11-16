// Theme configuration as specified in the blueprint
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#212529',
    border: '#dee2e6'
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem'
    }
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px'
  },
  // Support for light/dark modes as specified in blueprint
  modes: {
    light: {
      background: '#ffffff',
      text: '#212529'
    },
    dark: {
      background: '#212529',
      text: '#ffffff'
    }
  }
};

export default theme;
