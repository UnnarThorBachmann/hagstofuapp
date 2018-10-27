import React, { Component } from 'react';
import Artal from '../components/Artal.js';
import Flokkur from '../components/Flokkur.js';
import Laun from '../components/Laun.js';

import {Line,Scatter} from 'react-chartjs-2';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {d, flokkar} from '../helpers/index.js';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const litir = {
  "Störf stjórnenda": "rgb(0,0,255)",
  "Sérfræðistörf": "rgb(255,165,0)",
  "Tæknar og sérmenntað starfsfólk": 'rgb(255,255,0)',
  "Skrifstofustörf": 'rgb(0,128,0)',
  "Þjónustu-, umönnunar- og sölustörf": "rgb(128,0,128)",
  "Störf iðnaðarmanna og sérhæfðs iðnverkafólks": "rgb(165,42,42)",
  "Störf véla- og vélgæslufólks": "rgb(0,0,0)",
  "Ósérhæfð störf": 'rgb(128,128,128)',
};
const litir_background = {
  "Störf stjórnenda": "rgb(0,0,255, 0.1)",
  "Sérfræðistörf": "rgb(255,165,0,0.5)",
  "Tæknar og sérmenntað starfsfólk": 'rgb(255,255,0,0.5)',
  "Skrifstofustörf": 'rgb(0,128,0,0.5)',
  "Þjónustu-, umönnunar- og sölustörf": "rgb(128,0,128,0.5)",
  "Störf iðnaðarmanna og sérhæfðs iðnverkafólks": "rgb(165,42,42,0.5)",
  "Störf véla- og vélgæslufólks": "rgb(0,0,0,0.5)",
  "Ósérhæfð störf": 'rgb(128,128,128,0.5)',
};

const launthegahopur = {
  'Alls': 0,
  'Starfsmenn á almennum vinnumarkaði': 1,  
  'Opinberir starfsmenn - alls': 2,
  'Opinberir starfsmenn - ríkisstarfsmenn': 3, 
  'Opinberir starfsmenn - starfsmenn sveitarfélaga': 4,
};

const stett = {
  'Alls ': 0,
  'Stjórnendur (1)': 1,
  'Sérfræðingar (2)': 2,
  'Tæknar og sérmenntað starfsfólk (3)': 3,
  'Skrifstofufólk (4)': 4,
  'Þjónustu-, sölu- og afgreiðslufólk (5)': 5,
  'Iðnaðarmenn og sérhæft iðnverkafólk (7)': 6,
  'Véla- og vélgæslufólk (8)': 7,
  'Ósérhæft starfsfólk (9)': 8,
  'Iðnaðarmenn': 9,
  'Verkafólk': 10
};

const kyn = {
  'Alls': 0,
  'Karlar': 1,
  'Konur': 2
}

const launaflokkar = {
  'grunnlaunAlls': 'Grunnlaun (Alls)',
  'grunnlaunFullvinnandi': 'Grunnlaun (Fullvinnandi)',
  'reglulegLaunAlls': 'Regluleg laun (Alls)',
  'reglulegLaunFullvinnandi': 'Regluleg laun (Fullvinnandi)',
  'reglulegHeildarlaunFullvinnandi':'Regluleg heildarlaun (Fullvinnandi)',
  'heildarlaun': 'Heildarlaun',
  'greiddarStundirFullvinnandi': 'Greiddar stundir'

};

class Card3 extends Component {
  state = {
    artal: "2017",
    laun: "grunnlaunAlls",
    valdir: {},
    haed: 100
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
    console.log(valdir);


    const valdir_listi = [];
    /*Object.keys(valdir).reduce((acc,curr)=>{

      return acc.concat(valdir[curr].map(item=>{
        return {0: curr, 1: item}}));
    },[]);*/
    const labels = ["q1", "midgildi", "medaltal", "q3"] ;
    /*
    const datasets0= [{
          label: `${artal}-${laun}-${kennarar}` ,
          data: labels.map(item=> d[artal][kennarar_nr][laun][item]),
          fill: false,
          borderColor: 'red',
          pointBorderColor: 'red',
          pointRadius: 5,
          pointHoverRadius: 15,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: 'circle'
        }];
    */
    /*
    const datasets = valdir_listi.reduce((acc,curr)=> {
      if (typeof d[artal][flokkar[curr[0]][curr[1]]] === 'undefined') 
        return acc;
      else
        return acc.concat(
          [{
            label: `${artal}-${laun}-${curr[1]}` ,
            data: labels.map(item=> d[artal][flokkar[curr[0]][curr[1]]][laun][item]),
            fill: false,
            borderColor: litir[curr[0]],
            pointBorderColor: litir[curr[0]],
            pointRadius: 5,
            pointHoverRadius: 15,
            pointHitRadius: 30,
            pointBorderWidth: 0,
            pointStyle: 'circle'
          }]
        );
    },datasets0); 

    let data= {
        labels: ['Neðri fjórðungsmörk', 'Miðgildi', 'Meðaltal', "Efri fjórðungsmörk"],
        datasets: datasets
    }*/
    


    
  
    return (
      <div>
      <div style={{padding: '1%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        
        <Artal change={this.changeAr} artal={artal}/>
        <Laun change={this.changeLaun} laun={laun} launaflokkar={launaflokkar}/>
        <Flokkur name={'Kyn'} flokkur={kyn} change={this.change}/>
        <Flokkur name={'Stétt'} flokkur={stett} change={this.change}/>
        <Flokkur name={'Launþegahópur'} flokkur={launthegahopur} change={this.change}/>
      </div>
      
        <div style={{padding: '2%'}}>

        
        </div>
        
      </div>
    );
  }
}

export default Card3;