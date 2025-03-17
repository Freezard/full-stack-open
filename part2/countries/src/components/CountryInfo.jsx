import Languages from './Languages'

const CountryInfo = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    Capital: {country.capital}<br />
    Area: {country.area}
    <h2>Languages</h2>
    <Languages languages={country.languages} />
    <img src={country.flags.png} alt="Country flag" />
  </div>
)

export default CountryInfo