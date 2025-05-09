import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: 'Notification here...',
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { newNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer