import React from 'react';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

// Custom shouldForwardProp function to handle transient props
const shouldForwardProp = (prop) => !prop.startsWith('$');

function App() {
  return (
    <Provider store={store}>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Dashboard />
          </Layout>
        </ThemeProvider>
      </StyleSheetManager>
    </Provider>
  );
}

export default App;
