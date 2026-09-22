import './App.css'
import { CreateCards } from './components/Shows.js'
import { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')

  return (
    <>
      <input
        type="text"
        placeholder="search movie here"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <CreateCards query={query} />
    </>
  )
}

export default App
