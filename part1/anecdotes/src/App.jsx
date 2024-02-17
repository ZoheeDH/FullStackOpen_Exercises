import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Display = (props) => {
  return (
    <>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const initialVotes = Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const randomInt = () => {return Math.floor(Math.random() * anecdotes.length)}
  const handleNext = () => {
    console.log('nv', votes)
    setSelected(randomInt())
  }
  const handleVote = () => {
    const updatedVotes = votes.map((v,i) => {
      if (i === selected) {
        return v + 1
      } else {
        return v
      }
    })
    console.log('u', updatedVotes)
    setVotes(updatedVotes)
    console.log('v', votes)
  }

  return (
    <div>
      <Header title='Anecdote of the day' />
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVote} text= 'vote' />
      <Button handleClick={handleNext} text='next anecdote' />
      <Header title='Anecdote with most votes' />
      <Display anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} votes={votes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

export default App