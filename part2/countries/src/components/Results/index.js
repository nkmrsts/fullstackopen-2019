import React from 'react';
import CountryInfo from '../CountryInfo';
import CountryList from '../CountryList';

const Results = ({countries, setQuery}) => {
  const countriesLength = countries.length

  const handleClick = (value) => {
    setQuery(value)
  }

  const Content = () => {
    if(countriesLength > 10 ) {
      return <p>Too many matches, specify anothre filter</p>
    } else if(countriesLength === 1) {
      return <CountryInfo country={countries[0]}/>
    } else {
      return <CountryList countries={countries} handleClick={handleClick}/>
    }
  }
  
  return (
    <div>
      <Content/>
    </div>
  )
}

export default Results;