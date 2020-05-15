import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import authAPI from "api/authAPI";
import setAuthToken from "utils/setAuthToken";

let initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  loading: "idle",
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(data);
      const { token } = response;
      // Set token to local storage
      localStorage.setItem("token", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      return decoded.user;
    } catch (error) {
      console.log("ERROR: ", error.data);
      return rejectWithValue(error.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(data);
      const { token } = response;
      // Set token to local storage
      localStorage.setItem("token", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      return decoded.user;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    authFailed: (state, action) => {
      state.isAuthenticated = false;
      state.errors = action.payload;
    },
    logoutUser: (state) => {
      // Remove token from local storage
      localStorage.removeItem("token");
      // Remove auth header for future requests
      setAuthToken(false);
      // Set isAuthenticated to false and user to {}
      state.isAuthenticated = false;
      state.user = {};
      state.errors = {};
    },
    clearErrors: (state, action) => {
      // Clear errors if there are some in the state
      if (Object.keys(state.errors).length > 0) {
        state.errors = {};
      }
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [login.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [register.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    },
    [register.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.errors = action.payload;
      }
    },
    [login.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    },
    [login.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.errors = action.payload;
      }
    },
  },
});

export const {
  setCurrentUser,
  logoutUser,
  authFailed,
  clearErrors,
} = auth.actions;
export default auth.reducer;
