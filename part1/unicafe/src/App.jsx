import { useState } from 'react'

const Headline = ({ title }) => <h2>{title}</h2>

const Statistics = ({ name, number }) => <div>{name} {number}</div>

const Button = ( {onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Headline title='give feedback' />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Headline title='statistics' />
      <Statistics name='good' number={good} />
      <Statistics name='neutral' number={neutral} />
      <Statistics name='bad' number={bad} />
    </div>
  )
}

export default App