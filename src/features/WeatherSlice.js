import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const apiKey = "8960247aec26873c4654424b3af505b0";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const WeatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch weather data";
      });
  },
});

export default WeatherSlice.reducer;