import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setPassword } from '../store/loginSlice';
import mapImage from './map.png';
import { useNavigate } from 'react-router-dom';  

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);

  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };



  const handleLogin = () => {
    // Here, you can add actual validation logic if needed
    // For now, just log in if username and password are not empty
    if (username && password) {
      console.log('Logged in with:', { username, password });
      navigate('/dashboard');  // Redirect to the Dashboard page after login
    } else {
      console.log('Please enter valid credentials');
    }
  };



  return (
    <div className="bg-black text-white px-4 pt-[50px]">
     
      <h1 className="text-4xl md:text-6xl font-extrabold text-green-400 text-center mb-2">
        Login
      </h1>


      <p className="text-lg md:text-xl text-gray-300 text-center max-w-xl mx-auto mb-6">
        Please log in to access your personalized weather dashboard.
      </p>

     
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-6xl mx-auto">
       
        <div className="flex-1 max-w-md w-full">
          <img
            src={mapImage}
            alt="Map"
            className="w-full h-full object-cover rounded-lg max-h-[400px]"
          />
        </div>

        <Box
          sx={{
            flex: 1,
            backgroundColor: '#111111',
            borderRadius: 2,
            padding: 4,
            boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
            maxWidth: 400,
            width: '100%',
          }}
        >
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            sx={inputStyle}
            InputLabelProps={{ style: { color: '#22c55e' } }}
            InputProps={{ style: { color: '#22c55e' } }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            sx={inputStyle}
            InputLabelProps={{ style: { color: '#22c55e' } }}
            InputProps={{ style: { color: '#22c55e' } }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 2,
              borderRadius: '8px',
              backgroundColor: '#22c55e',
              '&:hover': { backgroundColor: '#16a34a' },
              padding: '12px 0',
            }}
          >
            Log In
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;

const inputStyle = {
  mb: 3,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': {
      borderColor: '#22c55e',
    },
    '&:hover fieldset': {
      borderColor: '#22c55e',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#22c55e',
    },
  },
};