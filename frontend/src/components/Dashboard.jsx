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
import Settings from '../components/Settings';
import About from '../components/About';

const Dashboard = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('current-weather');
  const userName = useSelector((state) => state.login.username);

  // Update your tabContent object in Dashboard
const tabContent = {
  'current-weather': <CurrentWeatherCard isDark={isDark} />,
  'weather-forecast': <ForecastCard isDark={isDark} />,
  'air-pollution': <AirPollutionCard isDark={isDark} />,
  'settings': <Settings />,
  'about': <About />,
};

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen font-sans transition-colors duration-500`}>
      
      <div className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center shadow-md border-b transition-colors duration-300
          ${isDark ? 'bg-black border-green-500' : 'bg-gray-100 border-green-300'}`}>
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
            className={`${isDark ? 'text-green-400' : 'text-green-600'} drop-shadow-lg`}
          >
            <CloudSun className="w-8 h-8" />
          </motion.div>
          <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>
            SOL
          </span>
        </motion.div>

        <IconButton
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-green-400 md:hidden"
        >
          {menuOpen ? <Close sx={{ color: '#22c55e' }} /> : <Menu sx={{ color: '#22c55e' }} />}
        </IconButton>
      </div>

     
      <div className={`fixed top-[64px] left-0 bottom-0 w-64 shadow-lg z-40 flex flex-col transition-transform duration-300
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isDark ? 'bg-black border-r border-green-700' : 'bg-gray-100 border-r border-green-300'}`}>
        
        
        <div className="p-6 flex items-center gap-3 border-b border-green-500">
          <AccountCircle
            sx={{ fontSize: 40 }}
            className={`${isDark ? 'text-green-400' : 'text-green-600'}`}
          />
          <p className={`text-lg font-semibold tracking-wide ${isDark ? 'text-green-400' : 'text-green-700'}`}>
            {userName}
          </p>
        </div>

        
        <div className="flex-1 p-6 pt-4 flex flex-col gap-4">
          <button
            onClick={() => setActiveTab('current-weather')}
            className={`w-full text-left px-4 py-3 rounded-md transition duration-300 font-semibold tracking-wide shadow-sm ${
              activeTab === 'current-weather'
                ? 'bg-green-600 text-white'
                : `${isDark ? 'text-green-400 hover:bg-green-800' : 'text-green-600 hover:bg-green-100'}`
            }`}
          >
            Current Weather
          </button>
          
          <button
            onClick={() => setActiveTab('weather-forecast')}
            className={`w-full text-left px-4 py-3 rounded-md transition duration-300 font-semibold tracking-wide shadow-sm ${
              activeTab === 'weather-forecast'
                ? 'bg-green-600 text-white'
                : `${isDark ? 'text-green-400 hover:bg-green-800' : 'text-green-600 hover:bg-green-100'}`
            }`}
          >
            Weather Forecast
          </button>
          
          <button
            onClick={() => setActiveTab('air-pollution')}
            className={`w-full text-left px-4 py-3 rounded-md transition duration-300 font-semibold tracking-wide shadow-sm ${
              activeTab === 'air-pollution'
                ? 'bg-green-600 text-white'
                : `${isDark ? 'text-green-400 hover:bg-green-800' : 'text-green-600 hover:bg-green-100'}`
            }`}
          >
            Air Pollution
          </button>

          
<button
  onClick={() => setActiveTab('settings')}
  className={`w-full text-left px-4 py-3 rounded-md transition duration-300 font-semibold tracking-wide shadow-sm ${
    activeTab === 'settings'
      ? 'bg-green-600 text-white'
      : `${isDark ? 'text-green-400 hover:bg-gray-800' : 'text-green-600 hover:bg-gray-200'}`
  }`}
>
  Settings
</button>


<button
  onClick={() => setActiveTab('about')}
  className={`w-full text-left px-4 py-3 rounded-md transition duration-300 font-semibold tracking-wide shadow-sm ${
    activeTab === 'about'
      ? 'bg-green-600 text-white'
      : `${isDark ? 'text-green-400 hover:bg-gray-800' : 'text-green-600 hover:bg-gray-200'}`
  }`}
>
  About
</button>
        </div>

      
        <div className={`p-6 border-t transition-colors duration-300 ${isDark ? 'border-green-700' : 'border-green-300'}`}>
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
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;