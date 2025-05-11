import React, { useState } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sunrise, 
  Sunset, 
  CloudRain, 
  Gauge, 
  Search,
  MapPin,
  Eye
} from 'lucide-react';

const CurrentWeatherCard = ({ isDark }) => {
  // Mock data matching your API response structure
  const mockWeather = {
    coord: { lon: 7.367, lat: 45.133 },
    weather: [{ id: 501, main: "Rain", description: "moderate rain", icon: "10d" }],
    main: {
      temp: 16.2,
      feels_like: 14.9,
      temp_min: 15.1,
      temp_max: 18.8,
      pressure: 1021,
      humidity: 60
    },
    visibility: 10000,
    wind: { speed: 4.09, deg: 121, gust: 3.47 },
    rain: { "1h": 2.73 },
    clouds: { all: 83 },
    dt: Date.now() / 1000,
    sys: {
      country: "IT",
      sunrise: 1726636384,
      sunset: 1726680975
    },
    timezone: 7200,
    name: "Lahore",
  };

  const [city, setCity] = useState('Lahore');
  const [weather] = useState(mockWeather);
  
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className={`w-full min-h-screen p-6 transition-colors duration-300 ${
      isDark ? 'bg-black text-green-400' : 'bg-white text-green-800'
    }`}>
      
      <div className={`flex items-center mb-8 p-2 rounded-lg max-w-2xl mx-auto ${
        isDark ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <MapPin className={`mx-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className={`flex-1 py-2 bg-transparent focus:outline-none ${
            isDark ? 'placeholder-gray-500' : 'placeholder-gray-400'
          }`}
        />
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Search className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
        </button>
      </div>

      
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold">{weather.name}</h1>
              <p className="text-lg opacity-75 mt-2">
                {new Date(weather.dt * 1000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-6xl font-bold mt-6">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="text-2xl capitalize mt-3">
                {weather.weather[0].description}
              </p>
            </div>
            <img 
              src={getWeatherIcon(weather.weather[0].icon)} 
              alt={weather.weather[0].main}
              className="w-32 h-32"
            />
          </div>

        
          <div className={`mt-8 p-6 rounded-xl ${
            isDark ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <div className="flex items-center justify-between text-xl">
              <div className="flex items-center gap-3">
                <Thermometer className="w-6 h-6" />
                <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="flex items-center gap-3">
                <Gauge className="w-6 h-6" />
                <span>{weather.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
          
          <div className={`p-6 rounded-xl flex flex-col items-center ${
            isDark ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <Droplets className="w-10 h-10 mb-3" />
            <p className="text-3xl font-bold">{weather.main.humidity}%</p>
            <p className="text-sm opacity-75 mt-1">Humidity</p>
          </div>

          
          <div className={`p-6 rounded-xl flex flex-col items-center ${
            isDark ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <Wind className="w-10 h-10 mb-3" />
            <p className="text-3xl font-bold">{weather.wind.speed} m/s</p>
            <p className="text-sm opacity-75 mt-1">Wind</p>
          </div>

         
          <div className={`p-6 rounded-xl flex flex-col items-center ${
            isDark ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <Sunrise className="w-10 h-10 mb-3" />
            <p className="text-2xl font-medium">{formatTime(weather.sys.sunrise)}</p>
            <p className="text-sm opacity-75 mt-1">Sunrise</p>
          </div>

          
          <div className={`p-6 rounded-xl flex flex-col items-center ${
            isDark ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <Sunset className="w-10 h-10 mb-3" />
            <p className="text-2xl font-medium">{formatTime(weather.sys.sunset)}</p>
            <p className="text-sm opacity-75 mt-1">Sunset</p>
          </div>

         
          {weather.rain && (
            <div className={`p-6 rounded-xl flex flex-col items-center ${
              isDark ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              <CloudRain className="w-10 h-10 mb-3" />
              <p className="text-3xl font-bold">{weather.rain['1h']} mm</p>
              <p className="text-sm opacity-75 mt-1">Last hour</p>
            </div>
          )}

         
          <div className={`p-6 rounded-xl flex flex-col items-center ${
            isDark ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <Eye className="w-10 h-10 mb-3" />
            <p className="text-2xl font-medium">{(weather.visibility / 1000).toFixed(1)} km</p>
            <p className="text-sm opacity-75 mt-1">Visibility</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;