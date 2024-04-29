import { useDispatch, useSelector } from "react-redux"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = () => {
    const anecdote = anecdotes.find(a => a.id === event.target.id)
    const msg = `you voted '${anecdote.content}'`
    dispatch({ type: 'anecdotes/voteAnecdote', payload: anecdote.id })
    dispatch({ type: 'notification/setNotification', payload: msg })
    setTimeout(() => 
      dispatch({ type: 'notification/clearNotification' }),
      5000)
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => {
          if (anecdote.content.toLowerCase().includes(filter)) {
            return (
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button id={anecdote.id} onClick={handleVote}>vote</button>
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default AnecdoteList