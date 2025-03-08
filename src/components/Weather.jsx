import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../features/WeatherSlice';

const Weather = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) dispatch(fetchWeather(city));
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search city..."
            className="glass-input flex-1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="glass-button">
            {status === 'loading' ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {data && (
        <div className="weather-grid">
          <div className="current-weather">
            <h2 className="text-4xl font-bold mb-2">{data.name}</h2>
            <div className="temp-display">
              <span className="text-6xl font-bold">
                {(data.main.temp - 273.15).toFixed(1)}°C
              </span>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                alt="weather icon"
                className="weather-icon"
              />
            </div>
            <p className="weather-description capitalize">
              {data.weather[0].description}
            </p>
          </div>

          <div className="weather-details">
            <div className="detail-card">
              <span>🌡️ Feels Like</span>
              <span className="value">{(data.main.feels_like - 273.15).toFixed(1)}°C</span>
            </div>
            <div className="detail-card">
              <span>💧 Humidity</span>
              <span className="value">{data.main.humidity}%</span>
            </div>
            <div className="detail-card">
              <span>🌬️ Wind Speed</span>
              <span className="value">{data.wind.speed} m/s</span>
            </div>
            <div className="detail-card">
              <span>☁️ Clouds</span>
              <span className="value">{data.clouds.all}%</span>
            </div>
          </div>
        </div>
      )}

      {status === 'loading' && <div className="loading-spinner"></div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Weather;