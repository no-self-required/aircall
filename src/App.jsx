import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({      
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <div className='container'>
      <Header/>
      <div className="container-view"></div>
    </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
