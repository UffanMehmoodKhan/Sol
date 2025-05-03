import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  phone: '',
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    resetSignup: () => initialState,
  },
});

export const {
  setName,
  setUsername,
  setEmail,
  setPassword,
  setPhone,
  resetSignup,
} = signupSlice.actions;

export default signupSlice.reducer;
