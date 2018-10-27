import React, { Component } from 'react';
import Artal from '../components/Artal.js';
import Flokkur from '../components/Flokkur.js';
import Laun from '../components/Laun.js';

import {Scatter} from 'react-chartjs-2';

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

class Card4 extends Component {
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
    const {artal,valdir} = this.state;
    const kennarar = "Kennsla á framhaldsskólastigi";
    const kennarar_nr = 2320;
    const stett_sia = valdir['Stétt'].map(item=> stett[item]);
    const kyn_sia = valdir['Kyn'];
    const launthegahopur_sia = valdir['Launþegahópur'].map(item=> launthegahopur[item]); 
    
    
    let d2_listi = Object.keys(d2).map(item=> d2[item]);
    d2_listi = d2_listi.filter(item=> item.ar === artal);
  
    d2_listi = d2_listi.filter(item=> launthegahopur_sia.indexOf(item.launthegahopur) !==-1);
    
    d2_listi = d2_listi.filter(item=> stett_sia.indexOf(item.stett) !==-1);

    d2_listi = d2_listi.filter(item=> kyn_sia.indexOf(item.kyn) !==-1);
    
    d2_listi = d2_listi.map(item=> {
      return {'kyn': item.kyn, 
              'stétt': item.stett, 
              'launþegahópur': item.launthegahopur, 
              'grunnlaun': item['grunnlaunAlls'], 
              'heildarlaun': item['heildarlaun'], 
              'label': 'Grunnlaun (Alls)'}
    });
    
    
    const labels = ["q1", "midgildi", "medaltal", "q3"] ;
    
    const valdir_listi = d2_listi;
    console.log(valdir_listi);
    
    const dataHeildGrunn = {
      labels: valdir_listi.map(item=> item['launþegahópur']),
      datasets: valdir_listi.map(item=> {
      console.log(item);
      return {
            label: `${stett_rev[item['stétt']]}-${launthegahopur_rev[item['launþegahópur']]}-${item['kyn']}`,
            fill: false,
            backgroundColor: 'black',
            pointBorderColor: 'black',
            pointBackgroundColor: 'black',
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'black',
            pointHoverBorderColor: 'black',
            pointHoverBorderWidth: 2,
            pointRadius: 10,
            pointHitRadius: 10,
            data: [{y: item.heildarlaun.medaltal, x: item.grunnlaun.medaltal}]

        };

      }).concat([
        {
            label: kennarar,
            fill: true,
            backgroundColor: 'red',
            pointBorderColor: 'red',
            pointBackgroundColor: 'red',
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'red',
            pointHoverBorderColor: 'red',
            pointHoverBorderWidth: 2,
            pointRadius: 10,
            pointHitRadius: 10,
            data: [{y: d[artal][kennarar_nr].heildarlaun.medaltal, x: d[artal][kennarar_nr].grunnlaun.medaltal}]

        }
      ])
    };


    
  
    return (
      <div>
      <div style={{padding: '1%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        
        <Artal change={this.changeAr} artal={artal}/>
        
        <Flokkur name={'Kyn'} flokkur={kyn} change={this.change}/>
        <Flokkur name={'Stétt'} flokkur={stett} change={this.change}/>
        <Flokkur name={'Launþegahópur'} flokkur={launthegahopur} change={this.change}/>
      </div>
      
        <div style={{padding: '2%'}}>
          <Scatter data={dataHeildGrunn} height={130} width={300} options={{
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  console.log(tooltipItem.datasetIndex);
                  console.log(data);
                  return data.datasets[tooltipItem.datasetIndex].label;
                }
              }
            }
        }}/>
        </div>
        
      </div>
    );
  }
}

export default Card4;