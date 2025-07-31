import { createContext, useReducer, useContext, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSetNotification } from './NotificationContext'

const authenticationReducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.payload
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

const AuthenticationContext = createContext()

export const AuthenticationContextProvider = (props) => {
  const [user, userDispatch] = useReducer(authenticationReducer, null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <AuthenticationContext.Provider value={[user, userDispatch] }>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthenticationValue = () => {
  const authenticationAndDispatch = useContext(AuthenticationContext)
  return authenticationAndDispatch[0]
}

export const useAuthenticationDispatch = () => {
  const authenticationAndDispatch = useContext(AuthenticationContext)
  return authenticationAndDispatch[1]
}

export const useLogin = () => {
  const dispatch = useAuthenticationDispatch()
  const setNotification = useSetNotification()

  return async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', payload: user })
    } catch (error) {
      setNotification(error.response.data.error, 'error')
    }
  }
}

export const useLogout = () => {
  const dispatch = useAuthenticationDispatch()

  return () => {
    dispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('loggedBlogappUser')
  }
}

export default AuthenticationContext