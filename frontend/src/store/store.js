import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import signupReducer from './signupSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
  },
});
