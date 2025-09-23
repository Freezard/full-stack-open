import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthenticationContextProvider } from './AuthenticationContext'
import { NotificationContextProvider } from './NotificationContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <AuthenticationContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </AuthenticationContextProvider>
    </QueryClientProvider>
  </Router>
)