import { createSelector } from 'reselect'

const selectAnecdotes = state => state.anecdotes
const selectFilter = state => state.filter
const selectNotification = state => state.notifications

const filterAnecdotes = (anecdotes, filter) => {
  const lower = filter.toLowerCase()
  return anecdotes.filter(a => a.content.toLowerCase().includes(lower))
}

const sortAnecdotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

const selectFilteredSortedAnecdotes = createSelector(
  [selectAnecdotes, selectFilter],
  (anecdotes, filter) => {
    const filtered = filterAnecdotes(anecdotes, filter)
    return sortAnecdotes(filtered)
  }
)

export { selectFilteredSortedAnecdotes, selectNotification }