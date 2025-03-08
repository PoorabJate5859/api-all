import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const apikey = "ed535496"

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (query, { rejectWithValue }) => {
    if (!query) return rejectWithValue("No query provided");
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${apikey}`
      );
      if (response.data.Response === "False") throw new Error(response.data.Error);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const movieSlice = createSlice({
  name: "movie",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
