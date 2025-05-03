import React from 'react';
import { motion } from 'framer-motion';
import lahoreImage from './lahore.png';
import { useSelector } from 'react-redux';

const Home = () => {
  
  const isDark = useSelector((state) => state.theme.isDark);


  const themeStyles = isDark
    ? {
        backgroundColor: '#1a1a1a',
        color: 'white',
        textColor: 'green-400',
        sectionBackground: 'bg-black',
        featureBackground: 'bg-gray-900',
        textParaColor: 'text-gray-300',
      }
    : {
        backgroundColor: '#f9f9f9',
        color: 'black',
        textColor: 'green-600',
        sectionBackground: 'bg-white',
        featureBackground: 'bg-gray-100',
        textParaColor: 'text-gray-800',
      };



  return (
    <div className={`${themeStyles.backgroundColor} text-${themeStyles.textColor}`}>
      <div className="relative flex flex-col items-center justify-center text-center px-4 min-h-[60vh]">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-fixed opacity-70"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${lahoreImage})`,
            backgroundSize: 'cover',
          }}
        ></div>

        <h1 className="relative text-4xl md:text-6xl font-extrabold text-green-400 mb-4 z-10">
          Welcome to <span className="text-white">WEATHERDASH</span>
        </h1>
        <p className={`relative text-lg md:text-xl ${themeStyles.textParaColor} max-w-xl z-10`}>
          Your one-stop solution for all weather data. Accurate, real-time updates, wherever you are.
        </p>
      </div>

      <section className={`mt-20 px-6 py-16 ${themeStyles.sectionBackground} text-${themeStyles.textColor}`}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Powerful Weather Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: 'Current Weather API',
              description: 'Get real-time weather updates for any location on Earth.',
            },
            {
              title: '3-Hour Forecast (5 Days)',
              description: 'Track weather changes in 3-hour intervals for the next 5 days.',
            },
            {
              title: 'Weather Maps & Layers',
              description: 'Visualize temperature, wind, clouds, and more on interactive maps.',
            },
            {
              title: 'Air Pollution API',
              description: 'Monitor air quality index and pollutants like PM2.5, PM10, CO, and more.',
            },
            {
              title: 'Geocoding API',
              description: 'Convert city names to coordinates and vice versa instantly.',
            },
            {
              title: 'Weather Alerts',
              description: 'Receive notifications for severe weather conditions in your area.',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`${
                themeStyles.featureBackground
              } border border-green-600 rounded-xl p-6 shadow-lg hover:shadow-green-500/40 transition duration-300`}
            >
              <h3 className="text-xl font-semibold text-green-400 mb-2">{feature.title}</h3>
              <p className={`text-${themeStyles.textParaColor}`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={`flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-20 ${themeStyles.sectionBackground}`}>
        <motion.img
          src={lahoreImage}
          alt="Lahore"
          className="w-full md:w-1/2 rounded-xl shadow-lg border border-green-600"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        <motion.div
          className="md:w-1/2 text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">WeatherDash</h2>
          <p className={`text-lg ${themeStyles.textParaColor} leading-relaxed`}>
            WeatherDash is your intelligent dashboard for real-time weather tracking. Whether you're a traveler, farmer,
            or just planning your week, our platform provides the latest updates on temperature, humidity, forecasts,
            pollution, and more. Designed with precision and powered by modern APIs, WeatherDash ensures that you're
            never caught off guard by sudden climate changes.
          </p>
        </motion.div>
      </section>
    </div>
  );
};



export default Home;