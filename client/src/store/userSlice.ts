// userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: null | { username: string; isAdmin: boolean };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
  token: localStorage.getItem("token") || null,
};

// פונקציה לרישום משתמש חדש
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: { username: string; password: string; isAdmin: boolean }) => {
    const response = await axios.post("http://localhost:3000/api/register", userData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);

// פונקציה להתחברות משתמש קיים
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { username: string; password: string }) => {
    const response = await axios.post("http://localhost:3000/api/login", credentials);

    // בדיקה אם המשתמש הוא מנהל או לא, והדפסת התוצאה לקונסול
    if (response.data.user.isAdmin) {
      console.log("TRUE");  // משתמש הוא מנהל
    } else {
      console.log("FALSE");  // משתמש רגיל
    }

    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);

// פונקציה להבאת המידע על המשתמש הנוכחי
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { getState }) => {
    const state = getState() as { user: UserState };
    const response = await axios.get("http://localhost:3000/api/currentUser", {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    });
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
      state.token = null;
      localStorage.removeItem("token");
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
        state.token = action.payload.accessToken;
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
        state.user = action.payload.user; // שמירה של מידע המשתמש
        state.token = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Error logging in: " + action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.status = "succeeded";
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Error fetching current user data: " + action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
