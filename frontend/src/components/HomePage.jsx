import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CloudSun, Sun, Moon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

import Home from './Home';
import About from './About';
import Login from './Login';
import Signup from './Signup';


const HomePage = () => {


  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const [activeComponent, setActiveComponent] = useState('Home');


  const renderComponent = () => {
    switch (activeComponent) {
      case 'Home':
        return <Home />;
      case 'About':
        return <About />;
      case 'Login':
        return <Login />;
      case 'Signup':
        return <Signup />;
      default:
        return <Home />;
    }
  };



  return (


    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen font-sans transition-colors duration-500`}>
      <nav className={`${isDark ? 'bg-black border-green-500' : 'bg-gray-100 border-gray-300'} fixed top-0 left-0 w-full z-50 bg-opacity-90 backdrop-blur-sm border-b flex justify-between items-center px-6 py-4`}>
    
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
          <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>WEATHERDASH</span>
        </motion.div>

      
        <div className="flex gap-4 items-center">
          {['Home', 'Signup', 'Login', 'About'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveComponent(item)}
              className={`px-4 py-2 rounded-md ${
                activeComponent === item
                  ? `${isDark ? 'text-white bg-green-600' : 'text-white bg-green-500'}`
                  : `${isDark ? 'text-green-300' : 'text-green-700'}`
              } hover:text-white hover:bg-green-600 transition duration-300`}
            >
              {item.toUpperCase()}
            </button>
          ))}

          
          <button
            onClick={() => dispatch(toggleTheme())}
            className="ml-4 p-2 rounded-full hover:bg-green-600 transition duration-300"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-6 h-6 text-green-500" /> : <Moon className="w-6 h-6 text-gray-800" />}
          </button>
        </div>
      </nav>

      
      <div className="pt-24">{renderComponent()}</div>

  
      <footer className={`py-7 mt-35 border-t ${isDark ? 'border-green-500 bg-black text-green-400' : 'border-gray-300 bg-gray-100 text-green-700'}`}>
        <div className="text-center">
          <p className="text-sm md:text-base font-extrabold">
            &copy; 2025 <span className={`${isDark ? 'text-white' : 'text-black'}`}>Web Engg Project WEATHERDASH</span> phew phew.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;