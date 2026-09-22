import { useState } from 'react'

function ReflectionInput({ addEntry }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) {
      return window.alert('must enter a reflection')
    }
    addEntry(text)
    setText('')
  }
  return (
    <form className="submission" onSubmit={handleSubmit}>
      <h1>Reflection Log</h1>
      <label htmlFor="reflection-input">Check-in With Yourself</label>
      <input
        type="text"
        placeholder="enter reflection here"
        id="reflection-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Submit Reflection</button>
    </form>
  )
}

export default ReflectionInput
