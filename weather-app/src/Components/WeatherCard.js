import React from 'react';
import '../App.css';

function WeatherCard({ weather }) {
  const temperature = weather.main.temp;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;

  const iconCode = weather.weather[0].icon;
  const condition = weather.weather[0].main;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>

      {/* Weather Icon */}
      <img
        src={iconUrl}
        alt={condition}
        className="weather-icon"
      />
      <p className="condition-text">{condition}</p>

      <div className="metric-visuals">
        {/* Temperature */}
        <div className="metric">
          <div className="temp-label-above">{temperature.toFixed(1)}°C</div>
          <div className="thermometer">
            <div
              className="thermometer-fill"
              style={{ height: `${(temperature / 50) * 100}%` }}
            ></div>
          </div>
          <div>Temperature</div>
        </div>

        {/* Humidity */}
        <div className="metric">
          <div
            className="circle"
            style={{ '--value': `${humidity * 3.6}deg` }}
          >
            <span className="humidity-value">{humidity}%</span>
          </div>
          <div>Humidity</div>
        </div>

        {/* Wind */}
        <div className="metric">
          <div className="wind-bar">
            <div
              className="wind-fill"
              style={{ width: `${Math.min(wind * 10, 100)}%` }}
            ></div>
          </div>
          <span className="wind-label">{wind} km/h</span>
          <div>Wind Speed</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;