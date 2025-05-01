import React from 'react';
import mapImage from './map.png';  

const Dashboard = () => {


  // Mock Weather Data
  const weatherData = {
    city: 'New York',
    temperature: '25°C',
    humidity: '60%',
    condition: 'Clear Sky',
    icon: mapImage, 
  };

  return (
    <div className="pt-24 px-6">
      <div className="bg-black text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-green-400 mb-4">Weather Dashboard</h1>
        
        {/* Weather Information */}
        <div className="flex items-center gap-6">
          <img src={weatherData.icon} alt="weather icon" className="w-20 h-20" />
          <div>
            <h2 className="text-3xl font-semibold">{weatherData.city}</h2>
            <p className="text-lg">Temperature: {weatherData.temperature}</p>
            <p className="text-lg">Humidity: {weatherData.humidity}</p>
            <p className="text-lg">Condition: {weatherData.condition}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
