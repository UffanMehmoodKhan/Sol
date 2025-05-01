import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import HomePage from './components/HomePage';  
import Dashboard from './components/Dashboard';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {


  const [showDashboard, setShowDashboard] = useState(false);

  const handleAnimationComplete = () => {
    setShowDashboard(true);
  };

  if (!showDashboard) {
    return <LandingPage onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />  
          </Routes>
        </Provider>
      </div>
    </Router>
  );
}

export default App;