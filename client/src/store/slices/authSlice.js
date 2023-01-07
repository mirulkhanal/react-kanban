import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserStart, getUserSuccess, getUserFailure } =
  authSlice.actions;

export const getUser = () => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const res = await axios.get('http://localhost:3000/auth/user', {
      withCredentials: true,
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export default authSlice.reducer;
