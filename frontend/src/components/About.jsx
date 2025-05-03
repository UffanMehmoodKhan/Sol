import React from 'react';
import { motion } from 'framer-motion';
import lahoreImage from './mern.png';
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';



const About = () => {


  const isDark = useSelector((state) => state.theme.isDark);


  return (


    <div
      className={`flex flex-col items-center justify-center text-center px-4 min-h-[60vh] py-20 space-y-32 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div>
        <h1
          className={`text-4xl md:text-6xl font-extrabold mb-4 ${
            isDark ? 'text-green-400' : 'text-green-700'
          }`}
        >
          About <span className={isDark ? 'text-white' : 'text-black'}>WEATHERDASH</span>
        </h1>
        <p className={`text-lg md:text-xl max-w-xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
          WEATHERDASH is your ultimate weather companion, providing real-time updates and forecasts.
        </p>
      </div>



      <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-20">
        <motion.img
          src={lahoreImage}
          alt="Project"
          className={`w-full md:w-1/2 rounded-xl shadow-lg border ${
            isDark ? 'border-green-600' : 'border-green-500'
          }`}
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
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-green-400' : 'text-green-700'
            }`}
          >
            Our Project for Web Engineering
          </h2>
          <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
            WeatherDash is a full-stack project built using the MERN stack (MongoDB, Express.js, React, and Node.js).
            It's part of our Web Engineering course and showcases everything we've learned—from building modern UIs with
            React to managing APIs and databases. Our goal was to create a beautiful, responsive, and functional weather
            dashboard that delivers real-time insights and a great user experience.
          </p>
        </motion.div>


      </div>




      <div className="flex flex-col items-center justify-center gap-10 px-4 md:px-20">
        <motion.div
          className="w-full max-w-3xl text-left space-y-6 flex flex-col items-center"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-green-400' : 'text-green-700'
            }`}
          >
            Contact Us
          </h2>

          {[
            { name: 'Azfar Nayyan', email: 'azfar@gmail.com' },
            { name: 'Uffan M. Khan', email: 'uffan@gmail.com' },
            { name: 'Arahim Qaiser', email: 'arahim@gmail.com' },
            { name: 'Haider Abbas Moazzam', email: 'haider@gmail.com' },
          ].map((person, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-3 rounded-lg shadow-lg border-2 w-150 justify-center ${
                isDark ? 'bg-gray-800 border-green-600' : 'bg-gray-100 border-green-700'
              }`}
            >
              <MdEmail className={`${isDark ? 'text-green-400' : 'text-green-700'} text-3xl`} />
              <div>
                <p className={`font-semibold text-xl ${isDark ? 'text-white' : 'text-black'}`}>{person.name}</p>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{person.email}</p>
              </div>
            </div>
          ))}
        </motion.div>




      </div>
    </div>
  );
};




export default About;