import React, { useState, useEffect } from 'react';
import axios from 'axios'
const access_key = process.env.REACT_APP_ACCESS_KEY

const WeatherInfo = ({capital}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const endpoint = `http://api.weatherstack.com/current?access_key=${access_key}&query=${capital}`
    axios
      .get(endpoint)
      .then(response => {
        if(response.data && response.data.error) {
          console.error(response.data.error)
        } else {
          setWeather(response.data)
        }
    })
  },[capital])

  if(weather === null) return false

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p><strong>temperature:</strong> {weather.current.temperature}</p>
      <p>{
        weather.current.weather_icons.map(icon =>
          <img src={icon} key={icon} alt={weather.current.weather_descriptions}/>
          )
        }
      </p>
      <p><strong>wind:</strong> {weather.current.wind_speed}</p>
    </div>
  )
}

export default WeatherInfo