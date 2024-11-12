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
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/candidates" ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    
  }
);

export const voteCandidate = createAsyncThunk(
"candidates/voteCandidate",
async (candidateId: string,) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`http://localhost:3000/api/candidates/${candidateId}/vote`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  
  return response.data;
}
)

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
    })
    .addCase(voteCandidate.pending, (state) => {
      state.status = "loading";
    })
    .addCase(voteCandidate.fulfilled, (state, action) => {
      const updatedCandidate = action.payload;
      state.candidates = state.candidates.map(candidate =>
        candidate._id === updatedCandidate._id ? updatedCandidate : candidate
      );
      state.status = "succeeded";
    })
    .addCase(voteCandidate.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to vote";
      console.error("Error while voting:", action.error);
    });
  
  },
});

export default candidatesSlice.reducer;
