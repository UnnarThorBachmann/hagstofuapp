import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Artal from './components/Artal.js'
import Flokkur from './components/Flokkur.js'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {d, flokkar} from './helpers/index.js';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});


class App extends Component {
  state = {
    artal: "2017",
    valdir: {}
  }
  change = (name, value) => {
    console.log(value);
    this.setState((state)=>{

      return  {
          artal: state.artal,
          valdir: {...state.valdir, [name]: value}
      };
    });
  }
  componentDidMount() {
    console.log('Did mount');
  }

  componentDidUpdate() {
    console.log('component did update');
  }
  render() {
    const {artal,valdir} = this.state;
    console.log(this.state);
    console.log(d[artal]);
    console.log('valdir',{...valdir});
    return (
      <MuiThemeProvider theme={theme}>
        <Artal/>
        {
          Object.keys(flokkar).map(item=>
            <Flokkur key={item} name={item} flokkur={flokkar[item]} change={this.change}/>
          )  
        }
        
      </MuiThemeProvider>
    );
  }
}

export default App;
