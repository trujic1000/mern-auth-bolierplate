import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import errorReducer from './reducers/errorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer
});

export default rootReducer;
