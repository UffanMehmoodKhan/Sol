import './App.css'
import { Link } from "react-router-dom";

const App = () => {


  return (

      <>
        <h1>This is the Main App Page</h1>
        <Link to="/weather">Go to Weather Page</Link>
    </>
  );
}

export default App
