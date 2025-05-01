import './index.css'
import App from './App.jsx'
import OpenWeatherMap from "./OpenWeatherMap.jsx";
import GeoApi from "./GeoApi.jsx";
import ErrorPage from "./ErrorPage.jsx";

const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />
    },
    {
        path: "weather/:name",
        element: <OpenWeatherMap />
    },
]

export default routes;

