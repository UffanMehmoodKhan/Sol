import {Link} from "react-router-dom";


const GeoApi = () => {
    return (
        <>
            <h1>This is the GeoApi Page</h1>
            <p>GeoApi page content goes here.</p>
            <Link to={"/weather"}>Go to App Page</Link>
        </>
    );
}

export default GeoApi;