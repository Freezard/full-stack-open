import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const anecdotes = queryClient.getQueryData(['anecdotes'])

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecotes = anecdotes.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecotes)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
