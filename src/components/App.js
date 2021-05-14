import axios from 'axios'
import { useEffect, useState } from 'react'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const WEATHERSTACK_ACCESS_KEY =
      process.env.REACT_APP_WEATHERSTACK_ACCESS_KEY
    if (WEATHERSTACK_ACCESS_KEY === undefined) {
      throw new Error('Define the WEATHERSTACK_ACCESS_KEY env var.')
    }

    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_ACCESS_KEY}&query=${country.capital}`
      )
      .then((res) => setWeather(res.data))
  }, [country.capital])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt=""
        style={{ width: 250, border: '1px solid' }}
      />
      <h2>Weather in {country.capital}</h2>
      {weather === null ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <strong>temperature:</strong> {weather.current.temperature} Celcius
          </div>
          <img
            src={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions}
          />
          <div>
            <strong>wind:</strong> {weather.current.wind_speed} mph direction{' '}
            {weather.current.wind_dir}
          </div>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((res) => setCountries(res.data))
  }, [])

  const countriesToShow =
    filter.length === 0
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <div>
        find countries{' '}
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onFocus={() => setSelected(null)}
        />
      </div>
      {selected !== null ? (
        <CountryDetails country={selected} />
      ) : countriesToShow.length === 1 ? (
        <CountryDetails country={countriesToShow[0]} />
      ) : countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.name}>
              {country.name}{' '}
              <button onClick={() => setSelected(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
