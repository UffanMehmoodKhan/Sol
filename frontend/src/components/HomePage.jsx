import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CloudSun } from 'lucide-react';
import Home from './Home'; 
import About from './About'; 
import Login from './Login'; 
import Signup from './Signup'; 

const HomePage = () => {


  const [activeComponent, setActiveComponent] = useState('Home'); 
  const [user, setUser] = useState(null);  

  // Simulated mock data for login
  const mockUser = {
    username: 'user123',
    password: 'password123',
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Home':
        return <Home />;
      case 'About':
        return <About />;
      case 'Login':
        return <Login mockUser={mockUser} setUser={setUser} />;
      case 'Signup':
        return <Signup />;
      default:
        return <Home />;
    }
  };


  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90 backdrop-blur-sm border-b border-green-500 flex justify-between items-center px-6 py-4">
       
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-2 text-2xl font-bold text-green-400 tracking-widest"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
            className="text-green-400 drop-shadow-lg"
          >
            <CloudSun className="w-8 h-8" />
          </motion.div>
          WEATHERDASH
        </motion.div>

        
        <div className="flex gap-4">
          {['Home', 'Signup', 'Login', 'About'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveComponent(item)}
              className={`px-4 py-2 rounded-md ${activeComponent === item ? 'text-white bg-green-600' : 'text-green-300'} hover:text-white hover:bg-green-600 transition duration-300`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <div className="pt-24">{renderComponent()}</div>

   
      <footer className="bg-black text-green-400 py-7 mt-35 border-t border-green-500">
        <div className="text-center">
          <p className="text-sm md:text-base font-extrabold">
            &copy; 2025 <span className="text-white">Web Engg Project WEATHERDASH</span> phew phew.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;