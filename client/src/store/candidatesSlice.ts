// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// interface Candidate {
//   name: string;
//   image: string;
//   votes: number;
// }

// interface CandidatesState {
//   candidates: Candidate[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: CandidatesState = {
//   candidates: [],
//   status: 'idle',
//   error: null,
// };

// export const fetchCandidates = createAsyncThunk("candidates/fetchCandidates", async () => {
//   const response = await fetch("/api/candidates");
//   const data = await response.json();
//   return data;
// });

// export const candidatesSlice = createSlice({
//   name: "candidates",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCandidates.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCandidates.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.candidates = action.payload;
//       })
//       .addCase(fetchCandidates.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = "Error fetching candidates: " + action.error.message;
//       });
//   },
// });

// export default candidatesSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Candidate {
  id: string;
  name: string;
  party: string;
  [key: string]: any;
}

interface CandidatesState {
  candidates: Candidate[];
}

const initialState: CandidatesState = {
  candidates: [],
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCandidates(state, action: PayloadAction<Candidate[]>) {
      state.candidates = action.payload;
    },
    addCandidate(state, action: PayloadAction<Candidate>) {
      state.candidates.push(action.payload);
    },
    updateCandidate(state, action: PayloadAction<Candidate>) {
      const index = state.candidates.findIndex((candidate) => candidate.id === action.payload.id);
      if (index !== -1) {
        state.candidates[index] = action.payload;
      }
    },
  },
});

export const { setCandidates, addCandidate, updateCandidate } = candidatesSlice.actions;
export default candidatesSlice.reducer;

