import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch({type: 'anecdotes/newAnecdote', payload: content})
    dispatch({ type: 'notification/setNotification', payload: 'new anecdote successfully created' })
    setTimeout(() => 
      dispatch({ type: 'notification/clearNotification' }),
      5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm