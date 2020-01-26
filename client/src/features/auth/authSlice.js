import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { signUp, login } from '../../api/authAPI';
import setAuthToken from '../../utils/setAuthToken';

let initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  isLoading: false
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.errors = {};
    },
    authFailed: (state, action) => {
      state.isAuthenticated = false;
      state.errors = action.payload;
    },
    logoutUser: state => {
      // Remove token from local storage
      localStorage.removeItem('token');
      // Remove auth header for future requests
      setAuthToken(false);
      // Set isAuthenticated to false and user to {}
      state.isAuthenticated = false;
      state.user = {};
    }
  }
});

export const { setCurrentUser, logoutUser, authFailed } = auth.actions;
export default auth.reducer;

export const registerUser = data => async dispatch => {
  try {
    const res = await signUp(data);
    // Set token to local storage
    localStorage.setItem('token', res.token);
    // Set token to Auth header
    setAuthToken(res.token);
    // Decode token to get user data
    const decoded = jwt_decode(res.token);
    // Set current user
    dispatch(setCurrentUser(decoded.user));
  } catch (err) {
    dispatch(authFailed(err.data));
    console.log(err.data);
  }
};

export const loginUser = data => async dispatch => {
  try {
    const res = await login(data);
    // Set token to local storage
    localStorage.setItem('token', res.token);
    // Set token to Auth header
    setAuthToken(res.token);
    // Decode token to get user data
    const decoded = jwt_decode(res.token);
    // Set current user
    dispatch(setCurrentUser(decoded.user));
  } catch (err) {
    dispatch(authFailed(err.data));
    console.log(err.data);
  }
};
