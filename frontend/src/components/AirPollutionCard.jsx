import React, { useState } from 'react';
import { Search, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import axios from "axios";

const aqiLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
const aqiColors = [
  'text-green-400',
  'text-lime-400',
  'text-yellow-400',
  'text-orange-400',
  'text-red-500',
];

const AirPollutionCard = ({ isDark }) => {
  const [city, setCity] = useState('Lahore');
  const [pollution, setPollution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const mockPollutionData = {
    coord: [7.6869, 45.0703], 
    list: [
      {
        dt: Math.floor(Date.now() / 1000),
        main: {
          aqi: Math.floor(Math.random() * 5) + 1
        },
        components: {
          co: (Math.random() * 300).toFixed(2),
          no: (Math.random() * 0.5).toFixed(2),
          no2: (Math.random() * 50).toFixed(2),
          o3: (Math.random() * 100).toFixed(2),
          so2: (Math.random() * 10).toFixed(2),
          pm2_5: (Math.random() * 35).toFixed(2),
          pm10: (Math.random() * 50).toFixed(2),
          nh3: (Math.random() * 5).toFixed(2)
        }
      }
    ]
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  //
  //   // In a real implementation API CALL BACKEND
  //   // fetch(`/api/pollution?city=${city}`)
  //   //   .then(res => res.json())
  //   //   .then(data => {
  //   //     setPollution(data);
  //   //     setLoading(false);
  //   //   })
  //   //   .catch(err => {
  //   //     setError('Failed to fetch pollution data');
  //   //     setLoading(false);
  //   //   });
  //
  //   // For now MOCK DATA
  //   setTimeout(() => {
  //     setPollution(mockPollutionData);
  //     setLoading(false);
  //   }, 500);
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/pollution',{ city });
      setPollution(response.data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  if (loading) {
    return (
      <div className={`w-full p-6 rounded-xl ${isDark ? 'bg-black text-green-400' : 'bg-white text-green-800'}`}>
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full p-6 rounded-xl ${isDark ? 'bg-black text-red-400' : 'bg-white text-red-600'}`}>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const displayData = pollution || mockPollutionData;
  const airQuality = displayData.list[0];

  return (
    <div className={`w-full rounded-xl p-6 ${isDark ? 'bg-black text-green-400' : 'bg-white text-green-800'}`}>
      
      <form onSubmit={handleFormSubmit} className="mb-6">
        <div className={`flex items-center rounded-lg overflow-hidden ${
          isDark ? 'bg-gray-900 border border-gray-800' : 'bg-gray-100'
        }`}>
          <MapPin className={`ml-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className={`flex-1 py-3 px-4 bg-transparent focus:outline-none ${
              isDark ? 'placeholder-gray-500' : 'placeholder-gray-400'
            }`}
          />
          <button 
            type="submit"
            className={`px-4 py-3 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
          >
            <Search className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">Air Quality in {city}</h2>
      
      <div className={`p-4 rounded-lg mb-6 ${
        isDark ? 'bg-gray-900 border border-gray-800' : 'bg-gray-100'
      }`}>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Air Quality Index (AQI):</span>
          <span className={`text-xl font-bold ${aqiColors[airQuality.main.aqi - 1]}`}>
            {airQuality.main.aqi} - {aqiLabels[airQuality.main.aqi - 1]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${
          isDark ? 'bg-gray-900 border border-gray-800' : 'bg-gray-100'
        }`}>
          <h3 className="font-semibold mb-3">Particulate Matter</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>PM₂.₅</span>
              <span>{airQuality.components.pm2_5} µg/m³</span>
            </div>
            <div className="flex justify-between">
              <span>PM₁₀</span>
              <span>{airQuality.components.pm10} µg/m³</span>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${
          isDark ? 'bg-gray-900 border border-gray-800' : 'bg-gray-100'
        }`}>
          <h3 className="font-semibold mb-3">Gases</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>CO</span>
              <span>{airQuality.components.co} µg/m³</span>
            </div>
            <div className="flex justify-between">
              <span>NO₂</span>
              <span>{airQuality.components.no2} µg/m³</span>
            </div>
            <div className="flex justify-between">
              <span>O₃</span>
              <span>{airQuality.components.o3} µg/m³</span>
            </div>
            <div className="flex justify-between">
              <span>SO₂</span>
              <span>{airQuality.components.so2} µg/m³</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirPollutionCard;