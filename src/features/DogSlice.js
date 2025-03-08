import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDog = createAsyncThunk(
  "dog/fetchDog",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://dog.ceo/api/breeds/image/random");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch dog image", error);
    }
  }
);

const dogSlice = createSlice({
  name: "dog",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default dogSlice.reducer;
