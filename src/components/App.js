import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const countriesToShow =
    filter.length === 0
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        )

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((res) => setCountries(res.data))
  }, [])

  return (
    <div>
      <div>
        find countries{' '}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      {countriesToShow.length === 1 ? (
        <div>
          <h1>{countriesToShow[0].name}</h1>
          <div>capital {countriesToShow[0].capital}</div>
          <div>population {countriesToShow[0].population}</div>
          <h2>languages</h2>
          <ul>
            {countriesToShow[0].languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img
            src={countriesToShow[0].flag}
            alt=""
            style={{ width: 250, border: '1px solid' }}
          />
        </div>
      ) : countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
