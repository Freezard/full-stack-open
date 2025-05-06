import { useSelector, useDispatch } from 'react-redux'
import { voteOn } from './reducers/anecdoteReducer'
import { selectSortedAnecdotes } from './reducers/selectors'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(selectSortedAnecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteOn(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App