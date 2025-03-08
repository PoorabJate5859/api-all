import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/WeatherSlice";
import dogReducer from "../features/DogSlice";
import movieReducer from "../features/MovieSlice";  

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    dog: dogReducer,
    movie: movieReducer,
  },
});
