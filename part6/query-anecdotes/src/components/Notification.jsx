import { useContext } from 'react'
import { useNotificationMsg, useNotificationDispatch } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useNotificationDispatch()
  const message = useNotificationMsg()
  
  if (message) {
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
    return (
      <div style={style}>
        {message}
      </div>
    )
  } else {
    return null
  }   
}

export default Notification
