import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => {
          if (anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
            return (
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
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