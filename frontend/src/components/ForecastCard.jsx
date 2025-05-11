import React, { useState } from "react";
import axios from "axios";
import {
  Thermometer,
  Droplet,
  CloudRain,
  Cloud,
  Sun,
  Moon,
  Umbrella,
  Wind,
  Search,
  MapPin,
} from "lucide-react";

const ForecastCard = ({ isDark }) => {
  const [city, setCity] = useState("Lahore");
  const [forecast, setForecast] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/forecast", {
        city,
      });

      setForecast(response.data); // Update state with the API response
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  const getWeatherIcon = (iconCode, main) => {
    const isDay = iconCode.includes("d");
    switch (main.toLowerCase()) {
      case "clear":
        return isDay ? (
          <Sun className="w-8 h-8 text-yellow-400" />
        ) : (
          <Moon className="w-8 h-8 text-blue-300" />
        );
      case "rain":
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case "clouds":
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case "thunderstorm":
        return <CloudRain className="w-8 h-8 text-purple-400" />;
      default:
        return isDay ? (
          <Sun className="w-8 h-8 text-yellow-400" />
        ) : (
          <Moon className="w-8 h-8 text-blue-300" />
        );
    }
  };

  return (
    <div
      className={`w-full min-h-screen p-6 ${
        isDark ? "bg-black text-green-400" : "bg-white text-green-800"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <form onSubmit={handleFormSubmit} className="mb-8">
          <div
            className={`flex items-center rounded-lg overflow-hidden ${
              isDark ? "bg-gray-900 border border-gray-800" : "bg-gray-100"
            }`}
          >
            <MapPin
              className={`ml-4 ${isDark ? "text-green-400" : "text-green-600"}`}
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              className={`flex-1 py-3 px-4 bg-transparent focus:outline-none ${
                isDark ? "placeholder-gray-500" : "placeholder-gray-400"
              }`}
            />
            <button
              type="submit"
              className={`px-4 py-3 ${
                isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"
              } transition-colors`}
            >
              <Search
                className={`w-5 h-5 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              />
            </button>
          </div>
        </form>

        {forecast ? (
          <>
            <h2 className="text-2xl font-bold mb-6">
              5-Day Forecast for {forecast.city}
            </h2>

            <div className="space-y-4">
              {forecast.forecast.map((day, index) => {
                const date = new Date(day.dt * 1000);
                const weekday = date.toLocaleDateString("en-US", {
                  weekday: "short",
                });

                return (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg ${
                      isDark
                        ? "bg-gray-900 hover:bg-gray-800 border border-gray-800"
                        : "bg-gray-100 hover:bg-gray-50"
                    } transition-colors duration-200 gap-4 sm:gap-0`}
                  >
                    <div className="flex items-center gap-4 w-full sm:w-40">
                      <span className="font-medium min-w-[60px]">
                        {index === 0 ? "Today" : weekday}
                      </span>
                      <div className="flex items-center gap-2">
                        {getWeatherIcon(
                          day.weather[0].icon,
                          day.weather[0].main
                        )}
                        <span className="capitalize text-sm hidden sm:block">
                          {day.weather[0].main}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-between gap-4 w-full sm:w-auto sm:flex-nowrap sm:gap-8">
                      <div className="flex items-center gap-2">
                        <Thermometer
                          className={`w-5 h-5 ${
                            isDark ? "text-green-400" : "text-green-600"
                          }`}
                        />
                        <span className="font-medium">
                          {Math.floor(day.main.temp_min) - 273}° /{" "}
                          {Math.floor(day.main.temp_max) - 273}°
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Umbrella
                          className={`w-5 h-5 ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                        <span className="text-sm">
                          {(day.pop * 100).toFixed(0)}%
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Droplet
                          className={`w-5 h-5 ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                        <span className="text-sm">{day.main.humidity}%</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Wind
                          className={`w-5 h-5 ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                        <span className="text-sm">{day.wind.speed} m/s</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p>Loading forecast...</p>
        )}
      </div>
    </div>
  );
};

export default ForecastCard;
