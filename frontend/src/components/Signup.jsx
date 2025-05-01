import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setName,
  setUsername,
  setEmail,
  setPassword,
  setPhone,
} from '../store/signupSlice';
import mapImage from './map.png';


const Signup = () => {


  const dispatch = useDispatch();
  const { name, username, email, password, phone } = useSelector((state) => state.signup);

  const handleSignup = () => {
    console.log({ name, username, email, password, phone });
  };



  return (
    <div className="bg-black text-white px-4 pt-[50px]">
      
      <h1 className="text-4xl md:text-6xl font-extrabold text-green-400 text-center mb-2">
        Signup
      </h1>
      <p className="text-lg md:text-xl text-gray-300 text-center max-w-xl mx-auto mb-6">
        Create an account to start using WEATHERDASH today!
      </p>

      
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-6">
       
        <div className="flex-1 max-w-md w-full">
          <img
            src={mapImage}
            alt="Map"
            className="w-5000 h-7000 object-cover rounded-lg max-h-[540px]"
          />
        </div>

        
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#111111',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
            maxWidth: 500,
            width: '100%',
          }}
        >
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            sx={inputStyle}
            InputProps={{ style: { color: '#22c55e' } }}
          />

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            sx={inputStyle}
            InputProps={{ style: { color: '#22c55e' } }}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            sx={inputStyle}
            InputProps={{ style: { color: '#22c55e' } }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            sx={inputStyle}
            InputProps={{ style: { color: '#22c55e' } }}
          />

          <TextField
            label="Phone Number (optional)"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => dispatch(setPhone(e.target.value))}
            sx={inputStyle}
            InputProps={{ style: { color: '#22c55e' } }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSignup}
            sx={{
              backgroundColor: '#22c55e',
              '&:hover': { backgroundColor: '#16a34a' },
              mt: 3,
              borderRadius: '8px',
              padding: '12px 0',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Create Account
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Signup;

const inputStyle = {
  mb: 3,
  '& label': { color: '#22c55e' },
  '& label.Mui-focused': { color: '#22c55e' },
  '& .MuiOutlinedInput-root': {
    color: '#22c55e',
    borderRadius: '8px',
    '& fieldset': { borderColor: '#22c55e' },
    '&:hover fieldset': { borderColor: '#22c55e' },
    '&.Mui-focused fieldset': { borderColor: '#22c55e' },
  },
};