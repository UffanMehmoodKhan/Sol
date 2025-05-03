import React from 'react';
import { Thermometer } from 'lucide-react';


const ForecastCard = ({ forecast }) => {


  const getIconForCondition = (condition) => {
    const normalized = condition.toLowerCase();
    if (normalized.includes('sun')) return '☀️';
    if (normalized.includes('cloud')) return '☁️';
    if (normalized.includes('rain')) return '🌧️';
    if (normalized.includes('storm')) return '⛈️';
    if (normalized.includes('snow')) return '❄️';
    return '🌡️';
  };

  return (
    <div className="absolute bottom-6 right-6 w-full max-w-md bg-black text-green-400 rounded-xl shadow-lg py-6 px-4 space-y-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 border-b border-green-700 last:border-b-0"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">{getIconForCondition(day.condition)}</span>
            <div>
              <h3 className="text-lg font-semibold">{day.date}</h3>
              <p className="text-sm text-green-300">{day.condition}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-300">
            <Thermometer className="w-4 h-4" />
            <span>{day.minTemp}° / {day.maxTemp}°</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;