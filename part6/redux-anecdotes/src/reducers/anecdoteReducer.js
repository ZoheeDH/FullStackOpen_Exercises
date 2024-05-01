import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map((anecdote) => {
        return anecdote.id === id ? action.payload : anecdote
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  return async (dispatch) => {
    const anecdote = await anecdoteService.update(updatedAnecdote)
    dispatch(updateAnecdote(anecdote))
  }
}

export default anecdotesSlice.reducer