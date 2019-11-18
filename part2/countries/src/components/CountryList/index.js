import React from 'react';

const CountryList = ({countries, handleClick}) => {
  return (
    <ul>{
      countries.map(country => (
        <li key={country.name}>
          {country.name} <button onClick={()=> handleClick(country.name)}>show</button>
        </li>
      ))
    }</ul>
  )
}

export default CountryList