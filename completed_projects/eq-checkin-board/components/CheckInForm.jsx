import { useState } from 'react'

const CheckInForm = ({ onAddEntry }) => {
  const [emotion, setEmotion] = useState('')
  const [note, setNote] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (emotion === '' || !note.trim()) {
      window.alert('must select an emotion')
      return
    }
    onAddEntry({ id: Date.now(), emotion, note, timestamp: new Date().toLocaleTimeString() })
    setNote('')
    setEmotion('')
  }

  return (
    <form className="check-in-form" onSubmit={handleSubmit}>
      <h2>How Are You Feeling Today?</h2>
      <label htmlFor="emotion">Emotion</label>
      <select id="emotion" value={emotion} onChange={(event) => setEmotion(event.target.value)}>
        <option value="" disabled>
          select option
        </option>
        {['sad', 'happy', 'scared', 'anxious', 'excited', 'worried', 'loved'].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label htmlFor="note">Note</label>
      <input
        id="note"
        type="text"
        value={note}
        placeholder="enter a note"
        onChange={(event) => setNote(event.target.value)}
      />
      <button type="submit">Submit Entry</button>
    </form>
  )
}

export default CheckInForm
