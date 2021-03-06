import React, { Component } from 'react';
import Artal from '../components/Artal.js';
import Flokkur from '../components/Flokkur.js';

import {Scatter} from 'react-chartjs-2';

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
class Card2 extends Component {
  state = {
    artal: "2017",
    laun: "grunnlaun",
    valdir: [],
    haed: 100
  }
  change = (name,value) => {
   
    this.setState((state)=>{

      return  {
          
          valdir: value
      };
    });
  }

  changeAr = (ar) => {
    this.setState({artal: ar})
  }
  
 
  render() {
    const {artal,valdir} = this.state;
    const kennarar = "Kennsla á framhaldsskólastigi";
    const kennarar_nr = 2320;
    const flokkar_listi = Object.keys(flokkar).reduce((acc,curr)=>{
      return {...acc, ...flokkar[curr]}; 
    },{});
    
    
    const flokkar_vidsnunir = Object.keys(flokkar_listi).reduce((acc,curr)=> {
      return {...acc, [flokkar_listi[curr]]: curr};
    },{});



    let heildarGrunnData = Object.keys(d[artal]).map(item=> {
      return {yfirflokkar: item.toString()[0],nr: item, heildarlaun: d[artal][item].heildarlaun.medaltal,grunnlaun: d[artal][item].grunnlaun.medaltal };
    });
    
    heildarGrunnData = heildarGrunnData.filter(item=> valdir.indexOf(yfirflokkar_dict[item.yfirflokkar])!==-1); 
    const dataHeildGrunnObject0 = Object.keys(yfirflokkar_dict).reduce((acc,curr)=> {return {...acc, [curr]: []};},{});
    
    const dataHeildGrunnObject = heildarGrunnData.reduce((acc,curr)=> {
      
      return {...acc, [curr.yfirflokkar]: acc[curr.yfirflokkar].concat([{y: curr.heildarlaun, x:curr.grunnlaun}]) };
    },dataHeildGrunnObject0);

    const dataHeildGrunnLabels = heildarGrunnData.reduce((acc,curr)=> {
      
      return {...acc, [curr.yfirflokkar]: acc[curr.yfirflokkar].concat([curr.nr]) };
    },dataHeildGrunnObject0);   
    const dataHeildGrunn = {
      labels: dataHeildGrunnLabels,
      datasets: Object.keys(dataHeildGrunnObject).map(item=> {
      return {
            label: yfirflokkar_dict[item],
            fill: false,
            backgroundColor: litir_background[yfirflokkar_dict[item]],
            pointBorderColor: litir[yfirflokkar_dict[item]],
            pointBackgroundColor: litir_background[yfirflokkar_dict[item]],
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: litir[yfirflokkar_dict[item]],
            pointHoverBorderColor: litir[yfirflokkar_dict[item]],
            pointHoverBorderWidth: 2,
            pointRadius: 10,
            pointHitRadius: 10,
            data: dataHeildGrunnObject[item]

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
        <Flokkur flokkur={
          {
            "Störf stjórnenda": 1, 
            "Sérfræðistörf": 2, 
            "Tæknar og sérmenntað starfsfólk": 3,
            "Skrifstofustörf": 4,
            "Þjónustu-, umönnunar- og sölustörf": 5,
            "Störf iðnaðarmanna og sérhæfðs iðnverkafólks": 7,
            "Störf véla- og vélgæslufólks": 8,
            "Ósérhæfð störf": 9,
          }
        } change={this.change}/>
      
      </div>
      <div style={{padding: '2%'}}>
        <h2>Heildarlaun (þús. krónur) á móti grunnlaunum (þús. krónur)</h2>
          <Scatter data={dataHeildGrunn} height={130} width={300} options={{
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                 
                
                  let i = parseInt(tooltipItem.datasetIndex);
                  if (i===8)
                    i = 2;
                  else if (i < 5)
                    i = i + 1;
                  else
                    i = i + 2;
                  
                  const l = flokkar_vidsnunir[data.labels[i][tooltipItem.index]]?flokkar_vidsnunir[data.labels[i][tooltipItem.index]]:kennarar; 
                  return l + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
                }
              }
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                display: true,
                labelString: 'Meðaltal heildarlauna (þúsund kr.)'
                }
              }],
              xAxes: [{
                scaleLabel: {
                display: true,
                labelString: 'Meðaltal grunnlauna (þúsund kr.)'
                }
              }]
            }     
          
        }}/>
        </div>
        
      </div>
    );
  }
}

export default Card2;