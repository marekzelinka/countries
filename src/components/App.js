import axios from 'axios'
import { useEffect, useState } from 'react'

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
        <div>
          <h1>{selected.name}</h1>
          <div>capital {selected.capital}</div>
          <div>population {selected.population}</div>
          <h2>languages</h2>
          <ul>
            {selected.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img
            src={selected.flag}
            alt=""
            style={{ width: 250, border: '1px solid' }}
          />
        </div>
      ) : countriesToShow.length === 1 ? (
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
