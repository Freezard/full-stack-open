import { useState, useEffect } from 'react'

import Countries from './components/Countries'
import Filter from './components/Filter'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')

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

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value.toLowerCase())
  }

  return (
    <div>
      <Filter name={filterName} onChange={handleFilterNameChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App