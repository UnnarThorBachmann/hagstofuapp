import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Artal from './components/Artal.js';
import Flokkur from './components/Flokkur.js';
import Laun from './components/Laun.js';
import Bar from './components/Bar.js';
import {Line} from 'react-chartjs-2';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {d, flokkar} from './helpers/index.js';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const litir = {
  "Störf stjórnenda": "blue",
  "Sérfræðistörf": "orange",
  "Tæknar og sérmenntað starfsfólk": 'yellow',
  "Skrifstofustörf": 'green',
  "Þjónustu-, umönnunar- og sölustörf": "pink",
  "Störf iðnaðarmanna og sérhæfðs iðnverkafólks": "brown",
  "Störf véla- og vélgæslufólks": "black",
  "Ósérhæfð störf": 'grey',
}
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
    
    const valdir_listi = Object.keys(valdir).reduce((acc,curr)=>{

      return acc.concat(valdir[curr].map(item=>{
        return {0: curr, 1: item}}));
    },[]);
    const labels = ["q1", "midgildi", "medaltal", "q3"] ;
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
    const datasets = valdir_listi.reduce((acc,curr)=> {
      if (typeof d[artal][flokkar[curr[0]][curr[1]]] === 'undefined') 
        return acc;
      else
        return acc.concat(
          [{
            label: `${artal}-${laun}-${curr[1]}` ,
            data: labels.map(item=> d[artal][flokkar[curr[0]][curr[1]]][laun][item]),
            lineTension: 0.3,
            fill: false,
            borderColor: litir[curr[0]],
            pointBorderColor: litir[curr[0]],
            pointRadius: 5,
            pointHoverRadius: 15,
            pointHitRadius: 30,
            pointBorderWidth: 2,
            pointStyle: 'circle'
          }]
        );
    },datasets0); 

    let data= {
        labels: ['Neðri fjórðungsmörk', 'Miðgildi', 'Meðaltal', "Efri fjórðungsmörk"],
        datasets: datasets
    }

   
    return (
      <MuiThemeProvider theme={theme}>
      <div style={{width: '100%'}}>
      <Bar/>
      <div style={{padding: '1%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        
        <Artal change={this.changeAr} artal={artal}/>
        <Laun change={this.changeLaun} laun={laun}/>
        {
          Object.keys(flokkar).map(item=>
            <Flokkur key={item} name={item} flokkur={flokkar[item]} change={this.change}/>
          )  
        }
        <Line data={data} height={100} width={300} />
      </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
