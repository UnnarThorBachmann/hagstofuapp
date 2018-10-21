import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Artal from './components/Artal.js'
import Flokkur from './components/Flokkur.js'
import Laun from './components/Laun.js'

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
    laun: "grunnlaun",
    valdir: {}
  }
  change = (name, value) => {
    
    this.setState((state)=>{

      return  {
          artal: state.artal,
          valdir: {...state.valdir, [name]: value}
      };
    });
  }

  changeAr = (ar) => {
    this.setState({artal: ar})
  }

  changeLaun = (laun) => {
    this.setState({laun: laun})
  }
  
  render() {
    const {artal,valdir,laun} = this.state;
    console.log(this.state);
    console.log(d[artal]);
    console.log('valdir',{...valdir});
    return (
      <MuiThemeProvider theme={theme}>
        <Artal change={this.changeAr} artal={artal}/>
        <Laun change={this.changeLaun} laun={laun}/>
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
