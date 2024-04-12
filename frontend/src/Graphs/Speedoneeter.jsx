//import { color } from 'highcharts';
import React from 'react';
import GaugeChart from 'react-gauge-chart';
import { useLocation } from 'react-router-dom';

const SpeedometerChartComponent = () => {
    const location = useLocation();
    const { plannedWorkHours } = location.state || {};
    const gaugeValue = plannedWorkHours/100;
    const formatValue = () => {
        return plannedWorkHours; 
    };
    const chartStyle = {
        height: 10,

      }
    
    return (
        <div 
        className='border-2 border-black w-[530px] h-[350px] '
       //style={{ width: '400px', height: '340px',backgroundColor:'#FFFAFC',borderColor: 'black',borderWidth: 0,borderStyle: 'solid' }}
       >
            {/* style={{ fontSize:'23px', marginLeft:'100px',marginTop:'-5px'}} */}
            <h1 className='text-[23px] text-center mb-10'>Planned Work Hours</h1>
            <GaugeChart id="gauge-chart" style={chartStyle}
                className=' w-[400px] mx-auto mr-[95px]'
                nrOfLevels={30} 
                percent={gaugeValue} 
                textColor="#000000"
                needleColor="#345243"
                needleBaseColor="#345243"
                colors={["#FF5F6D", "#FFC371"]}  
                formatTextValue={formatValue}  
            />
            
        </div>
    );
}; 
 

export default SpeedometerChartComponent;
