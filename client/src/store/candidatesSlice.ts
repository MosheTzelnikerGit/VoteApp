import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Candidate {
  _id: string;
  name: string;
  image: string;
  votes: number;
}

interface CandidatesState {
  candidates: Candidate[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CandidatesState = {
  candidates: [],
  status: 'idle',
  error: null,
};

export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async () => {
    const response = await axios.get("http://localhost:5000/api/candidates");
    return response.data;
  }
);

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch candidates";
      });
  },
});

export default candidatesSlice.reducer;
