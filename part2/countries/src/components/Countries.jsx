import Country from './Country'
import CountryInfo from './CountryInfo'

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return 'Too many matches, be more specific'
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  }

  return (
    <ul>
      {countries.map(c => <Country key={c.name.common} country={c} />)}
    </ul>
  )
}

export default Countries