import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { logoutUser, setCurrentUser } from '../features/auth/authSlice';

const checkAuth = store => {
  // Check for token to keep user logged in
  if (localStorage.token) {
    // Set auth token header auth
    const token = localStorage.token;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded.user));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = './login';
    }
  }
};

export default checkAuth;
