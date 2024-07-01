import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    isLoggedIn: false,
    token: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { name: '', isLoggedIn: false, token: null };
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
