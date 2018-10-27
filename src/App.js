import React, { Component } from 'react';
import Card1 from './components/Card1.js';
import Card2 from './components/Card2.js';

import Bar from './components/Bar.js';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});


class App extends Component {
  
  
 
  render() {
    
  
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{width: '100%'}}>
        <Bar/>
        <Card2/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
