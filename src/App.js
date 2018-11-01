import React, { Component } from 'react';
import Card1 from './components/Card1.js';
import Card2 from './components/Card2.js';
import Card3 from './components/Card3.js';
import Card4 from './components/Card4.js';
import Card5 from './components/Card5.js';

import Bar from './components/Bar.js';

import {Route} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});


class App extends Component {
  
  
  handleClick = ()=> {
    console.log('prump');
  }
  render() {
    
  
    return (
      <MuiThemeProvider theme={theme}>
        
        <Route exact path="/" render ={() => (
          <div style={{width: '100%'}}>
            <Bar/>
              <List>
                <Link to={'/samanburdur1'}>
                  <ListItem button>
                    <ListItemText
                      primary="Samanburður 1"
                      secondary="Laun fullvinnandi launamanna eftir starfi."
                    />
                  </ListItem>
                </Link>
                <Link to={'/samanburdur2'}>
                  <ListItem button>
                    <ListItemText
                      primary="Samanburður 2"
                      secondary="Laun fullvinnandi launamanna eftir starfi. Heildarlaun á móti grunnlaunum"
                    />
                  </ListItem>
                </Link>
                <Link to={'/samanburdur3'}>
                  <ListItem button>
                    <ListItemText
                      primary="Samanburður 3"
                      secondary="Laun eftir starfsstétt, launþegahópi og kyni."
                      
                    />
                  </ListItem>
                </Link>
                <Link to={'/samanburdur4'}>
                  <ListItem button>
                    <ListItemText
                      primary="Samanburður 4"
                      secondary="Laun eftir starfsstétt, launþegahópi og kyni. Heildarlaun á móti grunnlaunum."
                    />
                  </ListItem>
                </Link>
                <Link to={'/samanburdur5'}>
                  <ListItem button>
                    <ListItemText
                      primary="Samanburður 5"
                      secondary="Launamunur fullvinnandi launamanna milli 2014 og 2017"
                    />
                  </ListItem>
                </Link>
              </List>
          </div>
        )}/>
        <Route exact path="/samanburdur1" render ={() => (
           <div style={{width: '100%'}}>
          <Bar/>
            <Card1/>
          </div>
        )}/>
        <Route exact path="/samanburdur2" render ={() => (
           <div style={{width: '100%'}}>
            <Bar/>
            <Card2/>
            </div>
        )}/>
        <Route exact path="/samanburdur3" render ={() => (
             <div style={{width: '100%'}}>
            <Bar/>
            <Card3/>
            </div>
        )}/>
        <Route exact path="/samanburdur4" render ={() => (
             <div style={{width: '100%'}}>
            <Bar/>
            <Card4/>
            </div>
        )}/>
        <Route exact path="/samanburdur5" render ={() => (
           <div style={{width: '100%'}}>
            <Bar/>
            <Card5/>
            </div>
        )}/>
        
      </MuiThemeProvider>
    );
  }
}

export default App;
