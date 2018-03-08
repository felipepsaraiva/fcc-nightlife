import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { deepPurple, green, grey } from 'material-ui/colors';
import App from './App';
import './global.css';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: green,
    background: {
      default: grey[800],
    },
  },
});

const root = document.getElementById('root');
const load = () => render((
  <AppContainer>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </AppContainer>
), root);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./App', load);
}

load();
