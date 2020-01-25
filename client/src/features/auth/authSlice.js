import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import isEmpty from 'is-empty';
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
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = action.payload;
    },
    authFailed: (state, action) => {
      state.errors = action.payload;
    },
    logoutUser: () => {
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

export const registerUser = (data, history) => async dispatch => {
  try {
    await signUp(data);
    // dispatch(setCurrentUser(user));
    history.push('/login');
  } catch (err) {
    dispatch(authFailed(err.data));
    console.log(err.data);
  }
};

export const loginUser = data => async dispatch => {
  try {
    const res = await login(data);
    const token = res.token;
    // Set token to local storage
    localStorage.setItem('token', token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch(authFailed(err.data));
    console.log(err.data);
  }
};
