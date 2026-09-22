import { useState } from 'react'
import './App.css'
import ReflectionCard from './components/ReflectionCard'
import ReflectionInput from './components/ReflectionInput'

function App() {
  const [entries, setEntries] = useState([])
  function newEntry(text) {
    return setEntries([...entries, text])
  }

  return (
    <>
      <ReflectionInput addEntry={newEntry} />
      <div className="display">
        {entries.length === 0 ? (
          <p className="empty">No entries yet. Add one above</p>
        ) : (
          entries.map((entry, index) => <ReflectionCard key={index} text={entry} />)
        )}
      </div>
    </>
  )
}

export default App
