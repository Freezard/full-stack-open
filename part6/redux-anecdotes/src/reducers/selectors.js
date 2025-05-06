import { createSelector } from 'reselect'

const selectAnecdotes = state => state

export const selectSortedAnecdotes = createSelector(
  [selectAnecdotes],
  anecdotes => [...anecdotes].sort((a, b) => b.votes - a.votes)
)