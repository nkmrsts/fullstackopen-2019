import React from 'react';
import WeatherInfo from '../WeatherInfo';

const CountryInfo = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>

      <p><img src={country.flag} alt={country.name} width="400"></img></p>
      
      <WeatherInfo capital={country.capital}/>
    </div>
  )
}

export default CountryInfo;