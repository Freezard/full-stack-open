import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectSortedAnecdotes } from '../reducers/selectors'
import { voteOn } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(selectSortedAnecdotes)

  const vote = (id) => {
    dispatch(voteOn(id))
  }

  return (
    <div>
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
    </div>
  )
}

export default AnecdoteForm