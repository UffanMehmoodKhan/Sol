import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CloudSun, Sun, Moon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { Menu, Close, AccountCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import mapImage from './map.png';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import ForecastCard from '../components/ForecastCard';
import AirPollutionCard from '../components/AirPollutionCard';


const Dashboard = () => {


  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = 'John Doe';

  ///////////  MOCK DATA  /////////////
  // Replace this with actual data fetching logic

  const weatherData = {
    city: 'New York',
    temperature: '25°C',
    humidity: '60%',
    condition: 'Clear Sky',
    icon: mapImage,
  };

  const pollutionData = {
    aqi: 3,
    components: {
      pm2_5: 16.8,
      pm10: 22.4,
      co: 340.7,
      no2: 18.5,
      o3: 45.3,
      so2: 4.6,
    },
  };

  const forecastData = [
    {
      date: 'Monday',
      condition: 'Sunny',
      icon: 'path_to_sunny_icon.png',
      minTemp: 18,
      maxTemp: 24,
    },
    {
      date: 'Tuesday',
      condition: 'Cloudy',
      icon: 'path_to_cloudy_icon.png',
      minTemp: 19,
      maxTemp: 23,
    },
    {
      date: 'Wednesday',
      condition: 'Rainy',
      icon: 'path_to_rainy_icon.png',
      minTemp: 17,
      maxTemp: 21,
    },
    {
      date: 'Thursday',
      condition: 'Stormy',
      icon: 'path_to_stormy_icon.png',
      minTemp: 16,
      maxTemp: 20,
    },
    {
      date: 'Friday',
      condition: 'Clear Sky',
      icon: 'path_to_clear_icon.png',
      minTemp: 20,
      maxTemp: 25,
    },
  ];

  ///////////  END OF MOCK DATA  /////////////


  return (


    <div
      className={`${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      } min-h-screen font-sans transition-colors duration-500`}
    >
      
      <div
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center shadow-md border-b transition-colors duration-300
          ${isDark ? 'bg-black border-green-500' : 'bg-gray-100 border-green-300'}
        `}
      >
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-2 text-2xl font-bold tracking-widest"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
            className={`${
              isDark ? 'text-green-400' : 'text-green-600'
            } drop-shadow-lg`}
          >
            <CloudSun className="w-8 h-8" />
          </motion.div>
          <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>
            WEATHERDASH
          </span>
        </motion.div>

        
        <IconButton
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-green-400 md:hidden"
        >
          {menuOpen ? <Close sx={{ color: '#22c55e' }} /> : <Menu sx={{ color: '#22c55e' }} />}
        </IconButton>
      </div>


      <div
        className={`fixed top-[64px] left-0 bottom-0 w-64 shadow-lg z-40 flex flex-col transition-transform duration-300
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isDark ? 'bg-black border-r border-green-700' : 'bg-gray-100 border-r border-green-300'}
        `}
      >
        
        <div className="p-6 flex items-center gap-3 border-b border-green-500">
          <AccountCircle
            sx={{ fontSize: 40 }}
            className={`${isDark ? 'text-green-400' : 'text-green-600'}`}
          />
          <p
            className={`text-lg font-semibold tracking-wide ${isDark ? 'text-green-400' : 'text-green-700'}`}
          >
            {userName}
          </p>
        </div>

       
        <div className="flex-1 p-6 pt-4 flex flex-col gap-4">
          {['Home', 'Settings', 'About'].map((label) => (
            <button
              key={label}
              className="w-full text-left px-4 py-3 rounded-md text-green-400 hover:bg-green-600 hover:text-white transition duration-300 font-semibold tracking-wide shadow-sm"
            >
              {label}
            </button>
          ))}
        </div>

        
        <div
          className={`p-6 border-t transition-colors duration-300 ${
            isDark ? 'border-green-700' : 'border-green-300'
          }`}
        >
          <button
            onClick={() => dispatch(toggleTheme())}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-green-400 hover:bg-green-600 hover:text-white rounded-md transition duration-300"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      
      <div className={`pt-[80px] px-6 transition-all duration-300 ${menuOpen ? 'ml-64' : 'ml-0'}`}>
      
        <div className="space-y-6">
          <CurrentWeatherCard weather={weatherData} isDark={isDark} />
          <ForecastCard forecast={forecastData} />
          <AirPollutionCard pollution={pollutionData} />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;