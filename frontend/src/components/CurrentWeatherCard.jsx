import React from 'react';
import { Thermometer, Droplets, Wind } from 'lucide-react';



const CurrentWeatherCard = ({ weather, isSidebarVisible }) => {



  return (

    
    <div
      className={`inline-block px-6 py-10 rounded-2xl bg-black shadow-2xl text-green-400 transition-colors duration-300 ${
        isSidebarVisible ? 'ml-64' : 'ml-0'
      }`}
    >
      <div className="flex flex-col md:flex-row items-start justify-start gap-6">
        
        <div className="text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide mb-2 text-green-400">
            {weather.city}
          </h1>
          <p className="text-5xl md:text-6xl font-bold mb-4 text-green-300">
            {weather.temperature}
          </p>
          <p className="text-xl text-green-300 capitalize mb-6">
            {weather.condition}
          </p>

          <div className="flex flex-col gap-3 text-left text-lg">
            <div className="flex items-center gap-3 text-lg">
              <Droplets className="w-6 h-6 text-green-400" />
              <span className="text-green-300">Humidity: {weather.humidity}</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <Wind className="w-6 h-6 text-green-400" />
              <span className="text-green-300">Wind: {weather.wind || '15 km/h'}</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <Thermometer className="w-6 h-6 text-green-400" />
              <span className="text-green-300">Feels Like: {weather.feelsLike || weather.temperature}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default CurrentWeatherCard;