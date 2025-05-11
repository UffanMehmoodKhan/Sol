// import React, { useState } from 'react';
// import axios from 'axios';
//
//
// export default function Weather() {
//
//     const [city, setCity] = useState('');
//     const [weatherData, setWeatherData] = useState(null);
//
//     const handleInputChange = (e) => {
//         setCity(e.target.value);
//     };
//
//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/weather',{ city });
//             setWeatherData(response.data);
//         } catch (err) {
//             console.error("Error fetching weather data:", err);
//         }
//     };
//
//     return (
//         <>
//             <h1>Weather Information</h1>
//             <form onSubmit={handleFormSubmit}>
//                 <input
//                     type="text"
//                     value={city}
//                     onChange={handleInputChange}
//                     placeholder="Enter city name"
//                 />
//                 <button type="submit">Get Weather</button>
//             </form>
//             {weatherData && (
//                 <ul>
//                     <li>City: {weatherData.name}</li>
//                     <li>City Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</li>
//                     <li>Country: {weatherData.sys.country}</li>
//                     <li>Coordinates: {weatherData.coord.lat}, {weatherData.coord.lon}</li>
//                     <li>Temperature: {weatherData.main.temp} K</li>
//                     <li>Weather: {weatherData.weather[0].main} | {weatherData.weather[0].description}</li>
//                     <li>Pressure: {weatherData.main.pressure} hPa</li>
//                     <li>Humidity: {weatherData.main.humidity}%</li>
//                     <li>Wind Speed: {weatherData.wind.speed} m/s</li>
//                 </ul>
//             )}
//         </>
//     );
// }