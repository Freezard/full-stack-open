import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterByContent(state, action) {
      return action.payload
    }
  }
})

export const { filterByContent } = filterSlice.actions
export default filterSlice.reducer