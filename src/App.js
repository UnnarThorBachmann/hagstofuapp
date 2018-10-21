import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Artal from './components/Artal.js';
import Flokkur from './components/Flokkur.js';
import Laun from './components/Laun.js';
import {Line} from 'react-chartjs-2';

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
    const kennarar = "Kennsla á framhaldsskólastigi";
    const kennarar_nr = 2320;
    console.log('valdir',{...valdir});
    
    const valdir_listi = Object.keys(valdir).reduce((acc,curr)=>{

      return acc.concat(valdir[curr].map(item=>{
        return {0: curr, 1: item}}));
    },[]);
    const labels = ["q1", "midgildi", "medaltal", "q3"] ;
    console.log(valdir_listi);
    const datasets0= [{
          label: `${artal}-${laun}-${kennarar}` ,
          data: labels.map(item=> d[artal][kennarar_nr][laun][item]),
          lineTension: 0.3,
          fill: true,
          borderColor: 'red',
          pointBorderColor: 'red',
          pointRadius: 5,
          pointHoverRadius: 15,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: 'circle'
        }];
    console.log(datasets0);
    const datasets = valdir_listi.reduce((acc,curr)=> {
      console.log(d[artal]);
      console.log(flokkar);
      console.log(curr);
      return acc.concat(
        [{
          label: `${artal}-${laun}-${curr[1]}` ,
          data: labels.map(item=> d[artal][flokkar[curr[0]][curr[1]]][laun][item]),
          lineTension: 0.3,
          fill: false,
          borderColor: 'black',
          pointBorderColor: 'black',
          pointRadius: 5,
          pointHoverRadius: 15,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: 'circle'
        }]
      );
    },datasets0); 
    console.log(datasets);    

    let data= {
        labels: labels,
        datasets: datasets
    }

   
    return (
      <MuiThemeProvider theme={theme}>
        <Artal change={this.changeAr} artal={artal}/>
        <Laun change={this.changeLaun} laun={laun}/>
        {
          Object.keys(flokkar).map(item=>
            <Flokkur key={item} name={item} flokkur={flokkar[item]} change={this.change}/>
          )  
        }
        <Line data={data} height={100} width={300} />
      </MuiThemeProvider>
    );
  }
}

export default App;
