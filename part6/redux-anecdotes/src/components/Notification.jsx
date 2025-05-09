import { useSelector } from 'react-redux'
import { selectNotification } from '../reducers/selectors'

const Notification = () => {
  const notification = useSelector(selectNotification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification