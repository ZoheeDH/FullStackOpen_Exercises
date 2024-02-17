import { useState } from 'react'

const Header = (props) => {
	return (
		<>
			<h1>{props.title}</h1>
		</>
	);
};

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
		<>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    ) 
  }
	return (
		<div>
      <table className='statistics'>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="total" value={props.total} />
          <StatisticLine text="average" value={props.avg} />
          <StatisticLine text="positive" value={`${props.positive}%`} />
        </tbody>
      </table>
		</div>
	);
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = bad+good+neutral
  let avg = (good-bad)/total
  let positive = good*100/total

  return (
    <div>
      <Header title='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} positive={positive}/>
    </div>
  )
}

export default App