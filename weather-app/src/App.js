import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import WeatherCard from './Components/WeatherCard';
import './App.css';

const API_KEY = 'e9830c9a3199f1c8084e5c74b643a00d';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedMode);
    document.body.classList.toggle('dark-mode', storedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode);
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="title">Weather Dashboard</h1>
        <div className="theme-toggle" onClick={toggleDarkMode}>
          <div className={`theme-toggle-circle ${darkMode ? 'dark' : ''}`}></div>
        </div>
      </div>

      <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;