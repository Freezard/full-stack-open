import { useState, useEffect } from 'react'

import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'
import Filter from './components/Filter'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const countriesToShow = !filterName
    ? []
    : countries.filter(c => c.name.common.toLowerCase().includes(filterName))

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setSelectedCountry(null)
    }
  }, [countriesToShow])

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value.toLowerCase())
  }

  const handleInfo = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <Filter name={filterName} onChange={handleFilterNameChange} />
      <Countries countries={countriesToShow} handleInfo={handleInfo} />
      {selectedCountry && <CountryInfo country={selectedCountry} />}
    </div>
  )
}

export default App