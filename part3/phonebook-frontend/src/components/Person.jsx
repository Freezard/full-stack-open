const Person = ({ person, handleDelete }) => (
  <li>
    {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
  </li>
)

export default Person