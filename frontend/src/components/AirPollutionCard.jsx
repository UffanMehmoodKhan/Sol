import React from 'react';



const aqiLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
const aqiColors = [
  'text-green-400',
  'text-lime-400',
  'text-yellow-400',
  'text-orange-400',
  'text-red-500',
];

const AirPollutionCard = ({ pollution, isSidebarVisible }) => {

  const { aqi, components } = pollution;


  return (

    
    <div
      className={`w-full max-w-md bg-black text-green-400 rounded-xl shadow-lg py-6 px-4 space-y-4 fixed bottom-6 transition-all duration-300 ${
        isSidebarVisible ? 'ml-64' : 'ml-0'
      } sm:max-w-sm md:max-w-md`}
    >
      <h2 className="text-xl font-bold border-b border-green-700 pb-2">Air Quality</h2>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">AQI:</span>
        <span className={`text-lg font-bold ${aqiColors[aqi - 1]}`}>
          {aqi} - {aqiLabels[aqi - 1]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-green-300">
        <div className="flex justify-between">
          <span>PM2.5</span>
          <span>{components.pm2_5} µg/m³</span>
        </div>
        <div className="flex justify-between">
          <span>PM10</span>
          <span>{components.pm10} µg/m³</span>
        </div>
        <div className="flex justify-between">
          <span>CO</span>
          <span>{components.co} µg/m³</span>
        </div>
        <div className="flex justify-between">
          <span>NO₂</span>
          <span>{components.no2} µg/m³</span>
        </div>
        <div className="flex justify-between">
          <span>O₃</span>
          <span>{components.o3} µg/m³</span>
        </div>
        <div className="flex justify-between">
          <span>SO₂</span>
          <span>{components.so2} µg/m³</span>
        </div>
      </div>
    </div>
  );
};

export default AirPollutionCard;