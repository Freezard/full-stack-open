import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectFilteredSortedAnecdotes } from '../reducers/selectors'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(selectFilteredSortedAnecdotes)

  const vote = (id) => {
    dispatch(voteOnAnecdote(id))

    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`You voted: ${anecdote.content}`, 5))
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

export default AnecdoteList