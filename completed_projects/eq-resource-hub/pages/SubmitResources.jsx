import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../lib/supabaseClient'

function SubmitResource() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const newResource = {
      title: title.trim(),
      category,
      summary: summary.trim(),
      body: body.trim(),
    }
    if (!newResource.title || !newResource.category || !newResource.summary || !newResource.body) {
      setError('Fill in every field')
      return
    }
    setSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase.from('resources').insert([newResource])
      if (error) throw error
      navigate('/resources')
    } catch (err) {
      setError(err)
      setSubmitting(false)
    }
  }

  return (
    <section className="submit-panel">
      <header className="page-header">
        <p className="eyebrow">Contribute</p>
        <h1>Submit a resource</h1>
        <p className="lede">
          Share a practical guide. It appears in the library as soon as you submit.
        </p>
      </header>
      <form className="submit-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            placeholder="A short, specific title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>
              Choose a category
            </option>
            {['Self-Awareness', 'Self-Regulation', 'Empathy', 'Social Skills', 'Team Health'].map(
              (emotion) => {
                return (
                  <option key={emotion} value={emotion}>
                    {emotion}
                  </option>
                )
              }
            )}
          </select>
        </label>

        <label>
          Summary
          <textarea
            value={summary}
            rows={3}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="One or two sentences a reader sees on the card"
          />
        </label>

        <label>
          Body
          <textarea
            className="field-tall"
            value={body}
            rows={8}
            onChange={(e) => setBody(e.target.value)}
            placeholder="The full guide, in plain language"
          />
        </label>

        {error && (
          <p className="form-error" role="alert">
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
        <button className="button" type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit resource'}
        </button>
      </form>
    </section>
  )
}

export default SubmitResource
