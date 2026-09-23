import { useState, useEffect } from 'react'
import './App.css'
import CheckInForm from './components/CheckInForm'
import SummaryBar from './components/SummaryBar'
import CheckInList from './components/CheckInList'

function App() {
  const [entries, setEntries] = useState([])

  function handleAddEntry(entry) {
    setEntries([...entries, entry])
  }

  useEffect(() => {
    console.log(entries)
  }, [entries])
  return (
    <main className="board">
      <header className="board-header">
        <p className="board-kicker">ApricityEQ</p>
        <h1>EQ Check-In Board</h1>
        <p>Log how you feel. The summary and the log stay in sync.</p>
      </header>
      <CheckInForm onAddEntry={handleAddEntry} />
      <SummaryBar entries={entries} />
      <CheckInList entries={entries} />
    </main>
  )
}

export default App
