import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) return null

  const style = {
    color: notification.type === 'error' ? 'crimson' : 'green',
    background: notification.type === 'error' ? '#FBCEB1' : 'lightgreen',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
