import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.message
    case 'HIDE':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotifContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={ [notification, dispatch] }>
      { props.children }
    </NotificationContext.Provider>
  )
}

export const useNotificationMsg = () => {
  const msgAndDispatch = useContext(NotificationContext)
  return msgAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const msgAndDispatch = useContext(NotificationContext)
  return msgAndDispatch[1]
}

export default NotificationContext