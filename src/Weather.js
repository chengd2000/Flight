import React from 'react';
import './App.css';

function Weather({ weatherData }) {
  console.log("in weather:");
  console.log(weatherData);
  
  return (
    <div>
      <h1>{weatherData.current.temp_c}°C, feels like {weatherData.current.feelslike_c}°C</h1>
      <h2>The weather is {weatherData.current.condition.text}</h2>
      <img src={weatherData.current.condition.icon} alt="Weather icon" />
    </div>
  );
};

export default Weather;
