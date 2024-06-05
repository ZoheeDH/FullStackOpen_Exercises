import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const notificationStyle = {
    color: notification.type==='error'? 'red' : 'green',
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontStyle: 'italic',
    fontSize: 16
  }

  if (notification.message !== '') {
    return (
      <div style={notificationStyle}>
        {notification.message}
      </div>
    )
  }
}

export default Notification