// userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: null | { username: string; isAdmin: boolean };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

// פונקציה לרישום משתמש חדש
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: { username: string; password: string; isAdmin: boolean }) => {
    const response = await axios.post("http://localhost:5000/api/register", userData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);

// פונקציה להתחברות משתמש קיים
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { username: string; password: string }) => {
    const response = await axios.post("http://localhost:5000/api/login", credentials);
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Error registering user: " + action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Error logging in: " + action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
