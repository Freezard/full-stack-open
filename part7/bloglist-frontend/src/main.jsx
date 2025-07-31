import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthenticationContextProvider } from './AuthenticationContext'
import { NotificationContextProvider } from './NotificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthenticationContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </AuthenticationContextProvider>
  </QueryClientProvider>
)