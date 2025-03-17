import Language from './Language'

const Languages = ({ languages }) => (
  <ul>
    {Object.values(languages).map(l => <Language key={l} language={l} />)}
  </ul>
)

export default Languages