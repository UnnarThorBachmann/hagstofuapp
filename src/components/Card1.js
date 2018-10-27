import React, { Component } from 'react';
import Artal from '../components/Artal.js';
import Flokkur from '../components/Flokkur.js';
import Laun from '../components/Laun.js';

import {Line} from 'react-chartjs-2';

import {d, flokkar} from '../helpers/index.js';


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

const yfirflokkar_dict = {
  "1": "Störf stjórnenda", 
  "2": "Sérfræðistörf", 
  "3": "Tæknar og sérmenntað starfsfólk",
  "4": "Skrifstofustörf",
  "5": "Þjónustu-, umönnunar- og sölustörf",
  "7": "Störf iðnaðarmanna og sérhæfðs iðnverkafólks",
  "8": "Störf véla- og vélgæslufólks",
  "9": "Ósérhæfð störf",
};

const launaflokkar = {     
  "grunnlaun": "Grunnlaun",
  "regluleg laun": "Regluleg laun",
  "regluleg heildarlaun": "Regluleg heildarlaun",
  "heildarlaun": "Heildarlaun",
  "greiddar stundir": 'Greiddar stundir'
};
class Card1 extends Component {
  state = {
    artal: "2017",
    laun: "grunnlaun",
    valdir: {},
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

  changeHaed = (haed) => {
    this.setState({haed: haed})
  }
  
  firdlistar = (d,artal,laun,flokkar_vidsnunir,kennarar_nr,datasets0,labels,fird)=> {

    const d_listi = Object.keys(d[artal]).map(item=> {return {...d[artal][item][laun],nr: item};});
    let d_listi_fird;
    if (fird === 'medaltal' || fird === 'midgildi')
      d_listi_fird = d_listi.map(item=> {return {'fl': parseInt(item.nr.toString()[0]), 'nr': item.nr,'dist': Math.abs(parseFloat(item[fird])-parseFloat(d[artal][kennarar_nr][laun][fird]))}})
    else {
      d_listi_fird = d_listi.map(item=> 
        {
          return {'fl': parseInt(item.nr.toString()[0]), 
                  'nr': item.nr,
                  'dist': Math.pow((parseFloat(item['q1'])-parseFloat(d[artal][kennarar_nr][laun]['q1'])),2) 
                  + Math.pow((parseFloat(item['q3'])-parseFloat(d[artal][kennarar_nr][laun]['q3'])),2)
                  + Math.pow((parseFloat(item['medaltal'])-parseFloat(d[artal][kennarar_nr][laun]['medaltal'])),2) 
                  + Math.pow((parseFloat(item['midgildi'])-parseFloat(d[artal][kennarar_nr][laun]['midgildi'])),2) 
                }
      });
    }
    d_listi_fird = d_listi_fird.sort(function(a,b){return a.dist-b.dist;}).slice(0,16);
    d_listi_fird = d_listi_fird.filter(item=> parseInt(item.nr)!==2320);
    const datasetsFird = d_listi_fird.reduce((acc,curr)=> {
      if (typeof d[artal][curr.nr] === 'undefined') 
        return acc;
      else
        return acc.concat(
          [{
            label: `${artal}-${laun}-${flokkar_vidsnunir[curr.nr]}` ,
            data: labels.map(item=> d[artal][curr.nr][laun][item]),
            fill: false,
            borderColor: litir[yfirflokkar_dict[curr.fl]],
            pointBorderColor: litir[yfirflokkar_dict[curr.fl]],
            pointRadius: 5,
            pointHoverRadius: 15,
            pointHitRadius: 30,
            pointBorderWidth: 0,
            pointStyle: 'circle'
          }]
        );
    },datasets0); 
    return {
        labels: ['Neðri fjórðungsmörk', 'Miðgildi', 'Meðaltal', "Efri fjórðungsmörk"],
        datasets: datasetsFird
    };

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
          fill: false,
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
    }
   

    
  
    return (
      <div>
      <div style={{padding: '1%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        
        <Artal change={this.changeAr} artal={artal}/>
        <Laun change={this.changeLaun} laun={laun} launaflokkar={launaflokkar}/>
        {
          Object.keys(flokkar).map(item=>
            <Flokkur key={item} name={item} flokkur={flokkar[item]} change={this.change}/>
          )  
        }
      </div>
      
        <div style={{padding: '2%'}}>
          <Line data={data} height={130} width={300} />
        </div>
        
      </div>
    );
  }
}

export default Card1;