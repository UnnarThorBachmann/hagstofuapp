import React, { Component } from 'react';
import Artal from '../components/Artal.js';
import Flokkur from '../components/Flokkur.js';
import Laun from '../components/Laun.js';

import {Line,Scatter} from 'react-chartjs-2';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {d,d2, flokkar} from '../helpers/index.js';

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

const launthegahopur_rev = {
  0: 'Alls',
  1: 'Starfsmenn á almennum vinnumarkaði',  
  2: 'Opinberir starfsmenn - alls',
  3: 'Opinberir starfsmenn - ríkisstarfsmenn', 
  4: 'Opinberir starfsmenn - starfsmenn sveitarfélaga'
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

const stett_rev = {
  0: 'Alls ',
  1: 'Stjórnendur (1)',
  2: 'Sérfræðingar (2)',
  3: 'Tæknar og sérmenntað starfsfólk (3)',
  4: 'Skrifstofufólk (4)',
  5: 'Þjónustu-, sölu- og afgreiðslufólk (5)',
  6: 'Iðnaðarmenn og sérhæft iðnverkafólk (7)',
  7: 'Véla- og vélgæslufólk (8)',
  8: 'Ósérhæft starfsfólk (9)',
  9: 'Iðnaðarmenn',
  10: 'Verkafólk'
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

const launaflokkarKennara = {
  'grunnlaunAlls': 'grunnlaun',
  'grunnlaunFullvinnandi': 'grunnlaun',
  'reglulegLaunAlls': 'regluleg laun',
  'reglulegLaunFullvinnandi': 'regluleg laun',
  'reglulegHeildarlaunFullvinnandi':'regluleg heildarlaun',
  'heildarlaun': 'heildarlaun',
  'greiddarStundirFullvinnandi': 'greiddar stundir'

};

class Card3 extends Component {
  state = {
    artal: "2017",
    laun: "grunnlaunAlls",
    valdir: {
      'Kyn': [], 
      'Stétt': [],
      'Launþegahópur': []
    },
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
    console.log('valdir',valdir);
    const stett_sia = valdir['Stétt'].map(item=> stett[item]);
    const kyn_sia = valdir['Kyn'];
    const launthegahopur_sia = valdir['Launþegahópur'].map(item=> launthegahopur[item]); 
    
    
    let d2_listi = Object.keys(d2).map(item=> d2[item]);
    d2_listi = d2_listi.filter(item=> item.ar === artal);
  
    d2_listi = d2_listi.filter(item=> launthegahopur_sia.indexOf(item.launthegahopur) !==-1);
    
    d2_listi = d2_listi.filter(item=> stett_sia.indexOf(item.stett) !==-1);

    d2_listi = d2_listi.filter(item=> kyn_sia.indexOf(item.kyn) !==-1);
    
    d2_listi = d2_listi.map(item=> {
      return {'kyn': item.kyn, 'stétt': item.stett, 'launþegahópur': item.launthegahopur, 'laun': item[laun]}
    });
    
    
    const labels = ["q1", "midgildi", "medaltal", "q3"] ;
    
    const datasets0= [{
          label: `${artal}-${laun}-${kennarar}` ,
          data: labels.map(item=> d[artal][kennarar_nr][launaflokkarKennara[laun]][item]),
          fill: false,
          borderColor: 'red',
          pointBorderColor: 'red',
          pointRadius: 5,
          pointHoverRadius: 15,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: 'circle'
        }];
    
    console.log(d2_listi);
    const valdir_listi = d2_listi;
    const datasets = valdir_listi.reduce((acc,curr)=> {
        console.log(curr);
        return acc.concat(
          [{
            label: `${artal}-${launaflokkar[laun]}-${stett_rev[curr['stétt']]}-${launthegahopur_rev[curr['launþegahópur']]}-${curr.kyn}` ,
            data: labels.map(item=> curr.laun[item]),
            fill: false,
            borderColor: 'black',
            pointBorderColor: 'black',
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
    }
    


    
  
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
          <Line data={data} height={130} width={300} />
        </div>
        
      </div>
    );
  }
}

export default Card3;