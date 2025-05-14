import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setPassword } from '../store/loginSlice';
import { login } from '../store/authSlice'; 
import mapImage from './map.png';
import { useNavigate } from 'react-router-dom';
import ErrorPopup from './ErrorPopup';
import axiosInstance from '../api/axiosConfig';



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);
  const isDark = useSelector((state) => state.theme.isDark);

  const [showError, setShowError] = useState(false);

  const themeStyles = isDark
    ? {
        backgroundColor: '#111111',
        textColor: 'white',
        inputBgColor: '#222222',
        buttonBgColor: '#22c55e',
        buttonHoverBgColor: '#16a34a',
        labelColor: '#22c55e',
        inputBorderColor: '#22c55e',
        inputTextColor: '#22c55e',
        boxBgColor: '#111111',
      }
    : {
        backgroundColor: '#f9f9f9',
        textColor: 'black',
        inputBgColor: '#ffffff',
        buttonBgColor: '#22c55e',
        buttonHoverBgColor: '#16a34a',
        labelColor: '#22c55e',
        inputBorderColor: '#22c55e',
        inputTextColor: '#22c55e',
        boxBgColor: '#ffffff',
      };

  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post('http://localhost:3000/users/login', { username, password });

            if (response.data.success) {
                dispatch(login({ username }));
                navigate('/dashboard');
            } else {
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

  return (
    <div className={`${themeStyles.backgroundColor} text-${themeStyles.textColor} px-4 pt-[50px]`}>
      <h1 className="text-4xl md:text-6xl font-extrabold text-green-400 text-center mb-2">
        Login
      </h1>

      <p className="text-lg md:text-xl text-gray-300 text-center max-w-xl mx-auto mb-6">
        Please log in to access your personalized weather dashboard.
      </p>

      {showError && <ErrorPopup message="Incorrect username or password" onClose={() => setShowError(false)} />}

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
            backgroundColor: themeStyles.boxBgColor,
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
            sx={{
              mb: 3,
              backgroundColor: themeStyles.inputBgColor,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: themeStyles.inputBorderColor,
                },
                '&:hover fieldset': {
                  borderColor: themeStyles.inputBorderColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: themeStyles.inputBorderColor,
                },
              },
            }}
            InputLabelProps={{ style: { color: themeStyles.labelColor } }}
            InputProps={{ style: { color: themeStyles.inputTextColor } }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            sx={{
              mb: 3,
              backgroundColor: themeStyles.inputBgColor,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: themeStyles.inputBorderColor,
                },
                '&:hover fieldset': {
                  borderColor: themeStyles.inputBorderColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: themeStyles.inputBorderColor,
                },
              },
            }}
            InputLabelProps={{ style: { color: themeStyles.labelColor } }}
            InputProps={{ style: { color: themeStyles.inputTextColor } }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 2,
              borderRadius: '8px',
              backgroundColor: themeStyles.buttonBgColor,
              '&:hover': { backgroundColor: themeStyles.buttonHoverBgColor },
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
