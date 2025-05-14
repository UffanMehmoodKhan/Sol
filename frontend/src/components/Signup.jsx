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
import axios from "axios";
import {login} from "@/store/authSlice.js";
import {useNavigate} from "react-router-dom";
import axiosInstance from "@/api/axiosConfig.js";

const Signup = () => {
    const navigate = useNavigate();

  const dispatch = useDispatch();
  const { name, username, password, email, phone_no } = useSelector((state) => state.signup);
  const isDark = useSelector((state) => state.theme.isDark); 


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


    const postSignUp = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            console.log("Form data:", {
                name, username, password, email, phone_no
            })
            const response = await axiosInstance.post('http://localhost:3000/users/register', {
                name,
                username,
                password,
                email,
                phone_no,
            });
            console.log("Response data:", response.data); // Log the response
            if (response.status === 201) {
                console.log("SignUp successful:", response.data);
                dispatch(login({ username }));
                navigate('/dashboard');
            } else{
                console.error("SignUp failed:", response.data);
            }
            // dispatch(login({ username }));
            // navigate('/dashboard');
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

  return (
    <div className={`${themeStyles.backgroundColor} text-${themeStyles.textColor} px-4 pt-[50px]`}>
      <h1 className="text-4xl md:text-6xl font-extrabold text-green-400 text-center mb-2">
        Signup
      </h1>
      <p className="text-lg md:text-xl text-gray-300 text-center max-w-xl mx-auto mb-6">
        Create an account to start using WEATHERDASH today!
      </p>

        <form onSubmit={postSignUp}>
            <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-6">
                <div className="flex-1 max-w-md w-full">
                    <img
                        src={mapImage}
                        alt="Map"
                        className="w-800 h-900 object-cover rounded-lg max-h-[540px]"
                    />
                </div>

                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: themeStyles.boxBgColor,
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
                        sx={{
                            ...inputStyle,
                            backgroundColor: themeStyles.inputBgColor,
                        }}
                        InputProps={{style: {color: themeStyles.inputTextColor}}}
                        InputLabelProps={{style: {color: themeStyles.labelColor}}}
                    />

                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => dispatch(setUsername(e.target.value))}
                        sx={{
                            ...inputStyle,
                            backgroundColor: themeStyles.inputBgColor,
                        }}
                        InputProps={{style: {color: themeStyles.inputTextColor}}}
                        InputLabelProps={{style: {color: themeStyles.labelColor}}}
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        sx={{
                            ...inputStyle,
                            backgroundColor: themeStyles.inputBgColor,
                        }}
                        InputProps={{style: {color: themeStyles.inputTextColor}}}
                        InputLabelProps={{style: {color: themeStyles.labelColor}}}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        sx={{
                            ...inputStyle,
                            backgroundColor: themeStyles.inputBgColor,
                        }}
                        InputProps={{style: {color: themeStyles.inputTextColor}}}
                        InputLabelProps={{style: {color: themeStyles.labelColor}}}
                    />

                    <TextField
                        label="Phone Number (optional)"
                        variant="outlined"
                        fullWidth
                        value={phone_no}
                        onChange={(e) => dispatch(setPhone(e.target.value))}
                        sx={{
                            ...inputStyle,
                            backgroundColor: themeStyles.inputBgColor,
                        }}
                        InputProps={{style: {color: themeStyles.inputTextColor}}}
                        InputLabelProps={{style: {color: themeStyles.labelColor}}}
                    />

                    <Button
                        type="submit" // Ensure the button is of type submit
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: themeStyles.buttonBgColor,
                            '&:hover': { backgroundColor: themeStyles.buttonHoverBgColor },
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
        </form>


    </div>
  );
};

export default Signup;

const inputStyle = {
    mb: 3,
    '& label': {color: '#22c55e'},
    '& label.Mui-focused': {color: '#22c55e'},
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '& fieldset': {borderColor: '#22c55e'},
        '&:hover fieldset': {borderColor: '#22c55e'},
        '&.Mui-focused fieldset': {borderColor: '#22c55e'},
    },
};