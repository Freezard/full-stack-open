import { createContext, useReducer, useContext, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSetNotification } from './NotificationContext'
import {
  useNavigate, useLocation
} from 'react-router-dom'

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
  const initialUser = (() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })()

  const [user, userDispatch] = useReducer(authenticationReducer, initialUser)

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [user])

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
  const navigate = useNavigate()
  const location = useLocation()

  return async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', payload: user })

      const redirectTo = location.state?.from || '/'
      navigate(redirectTo, { replace: true })
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
    blogService.setToken(null)
  }
}

export default AuthenticationContext