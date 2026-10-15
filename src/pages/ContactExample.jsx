import { useState } from 'react'

const ContactExample = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'General',
    message: '',
    newsletter: false,
  })
  const [submitted, setSubmitted] = useState(null)

  function handleChange(event) {
    const field = event.target.name
    const nextValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    setForm((current) => ({
      ...current,
      [field]: nextValue,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(form)
  }

  return (
    <section className="contact stack">
      <header className="page__header">
        <h1 className="page__title">Contact example</h1>
        <p className="page__lede">This is a copy of the contact form. One state object stores every field.</p>
      </header>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="form-field">
          Name
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>

        <label className="form-field">
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </label>

        <label className="form-field">
          Topic
          <select name="topic" value={form.topic} onChange={handleChange}>
            {['General', 'Catering', 'Wholesale'].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          Message
          <textarea name="message" value={form.message} onChange={handleChange} />
        </label>

        <label className="form-field form-field--checkbox">
          <input
            type="checkbox"
            name="newsletter"
            checked={form.newsletter}
            onChange={handleChange}
          />
          Join the Newsletter
        </label>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      <h2>What React is storing right now</h2>
      <pre>{JSON.stringify(form, null, 2)}</pre>

      {submitted && (
        <>
          <h2>Submitted</h2>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </>
      )}
    </section>
  )
}

export default ContactExample
