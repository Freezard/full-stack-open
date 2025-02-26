import { useState } from 'react'

const Headline = ({ title }) => <h2>{title}</h2>

const Statistic = ({ name, number }) => <div>{name} {number}</div>

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        <Headline title='statistics' />
        No feedback given
      </div>
    )
  }

  const average = (good - bad) / all
  const positive = (good / all) * 100
  
  return (
    <div>
      <Headline title='statistics' />
      <Statistic name='good' number={good} />
      <Statistic name='neutral' number={neutral} />
      <Statistic name='bad' number={bad} />
      <Statistic name='all' number={all} />
      <Statistic name='average' number={average} />
      <Statistic name='positive' number={positive + ' %'} />
    </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App