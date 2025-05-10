import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Link, Outlet, useParams} from "react-router-dom";
import GeoApi from "./GeoApi.jsx";


export default function OpenWeatherMap(){

    axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/"
    const AUTH_TOKEN = "78ee01d74dd6f38bce176713941f0ea2"

    // Get the weather data from OpenWeatherMap API
    useMemo(() => {
        async function getWeatherData(){
            try{
                const response = axios
                    .get("weather?lat=3.1&lon=3.1&appid=".concat(AUTH_TOKEN))
                    .then(response.data)

            } catch (err){
                console.error("Error fetching weather data:", err);
            }
        }
        getWeatherData().then();
    }, []);

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const key = setInterval(() => {
            setCounter(count => count + 1)
        }, 1000);

        return () => {
            clearInterval(key);
        };
    }, [])

    const {name} = useParams();

    return (
        <>
            <h1>This is the OpenWeatherMap Page.</h1>
            <p>{counter} seconds have passed.</p>
            <Link to="/">Go to App Page</Link><br />
            <Link to="/weather/geo">Go to GeoApi Page</Link>

            {name === "geo" ? (
                <GeoApi/>
            ) : (
                    <p>OpenWeatherMap page content goes here.</p>
                )
            };
        </>

    );

}