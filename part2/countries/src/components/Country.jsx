const Country = ({ country, handleInfo}) => (
  <li>
    {country.name.common} <button onClick={() => handleInfo(country)}>Show</button>
  </li>
)

export default Country