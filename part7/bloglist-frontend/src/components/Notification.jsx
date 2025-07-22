const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const styles = {
    base: {
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    success: { color: 'green' },
    error: { color: 'red' },
  }

  return (
    <div className="notification" style={{ ...styles.base, ...styles[type] }}>
      {message}
    </div>
  )
}

export default Notification