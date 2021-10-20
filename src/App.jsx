import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({      
  typography: {
    button: {
      textTransform: 'none',
      color: 'black'
    }
  },
  palette: {
    primary: {
      main: "#000",
      contrastText: "#fff" //button text white instead of black
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <div className='container'>
      <Header/>
      <Footer/>
    </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
