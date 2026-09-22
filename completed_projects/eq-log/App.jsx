import './App.css'
import { useState } from 'react'
import EmotionCard from './components/Emotion-Card'

function App() {
  const [log, setLog] = useState([])
  const [input, setInput] = useState('')

  function handleSubmit() {
    const i = input.trim().toLowerCase()
    if (!i) {
      return window.alert('must enter an emotion')
    }
    const next = [...log, i]
    setLog(next)
    setInput('')
  }
  return (
    <>
      <div className="submission">
        <h1>Emotion Log</h1>
        <label htmlFor="emotion-input">How I'm Feeling Today</label>
        <input
          id="emotion-input"
          type="text"
          placeholder="enter emotion here"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></input>
        <button type="button" onClick={handleSubmit}>
          Submit Log
        </button>
      </div>

      <div className="display">
        {log.length === 0 ? (
          <h1>No Entries</h1>
        ) : (
          log.map((entry, index) => <EmotionCard key={index} emotion={entry} />)
        )}
      </div>
    </>
  )
}

export default App
