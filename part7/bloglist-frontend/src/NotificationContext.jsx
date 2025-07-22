import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return { message: action.payload.message, type: action.payload.type }
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useSetNotification = () => {
  const dispatch = useNotificationDispatch()

  return (message, type = 'success', time = 5) => {
    dispatch({ type: 'SET', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, time * 1000)
  }
}

export default NotificationContext