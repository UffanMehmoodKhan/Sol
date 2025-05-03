import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import HomePage from './components/HomePage';  
import Dashboard from './components/Dashboard';  
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

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
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Provider>
      </div>
    </Router>
  );
}

export default App;