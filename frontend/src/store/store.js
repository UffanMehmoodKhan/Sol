import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import signupReducer from './signupSlice';
import themeReducer from './themeSlice';
import authReducer from './authSlice';  

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    theme: themeReducer,
    auth: authReducer,  
  },
});
