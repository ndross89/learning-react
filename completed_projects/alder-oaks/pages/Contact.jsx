import { useState } from 'react'

const emptyErrors = { name: '', email: '', message: '' }

function getErrors(values) {
  const nextErrors = { ...emptyErrors }
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  const messageLength = values.message.trim().length

  if (!values.name.trim()) {
    nextErrors.name = 'Enter your name.'
  }

  if (!emailLooksValid) {
    nextErrors.email = 'Enter a valid email.'
  }

  if (messageLength < 20) {
    nextErrors.message = 'Message must be at least 20 characters.'
  }

  return nextErrors
}

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'General',
    message: '',
    newsletter: false,
  })
  const [errors, setErrors] = useState(emptyErrors)

  function handleChange(event) {
    const field = event.target.name
    const fieldValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    setForm((current) => ({
      ...current,
      [field]: fieldValue,
    }))

    if (field === 'name' || field === 'email' || field === 'message') {
      setErrors((current) => ({
        ...current,
        [field]: '',
      }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = getErrors(form)
    setErrors(nextErrors)

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      return
    }

    setSubmitStatus(true)
  }

  function newSubmission() {
    setSubmitStatus(false)
    setErrors(emptyErrors)
    setForm({
      name: '',
      email: '',
      topic: 'General',
      message: '',
      newsletter: false,
    })
  }

  if (submitStatus === true) {
    return (
      <section className="contact-success">
        <h1>{`Thank you for your submission, ${form.name}`}</h1>
        <p>We will contact you soon</p>
        <button type="button" className="btn" onClick={newSubmission}>
          Submit another form
        </button>
      </section>
    )
  }

  const messageLength = form.message.trim().length

  return (
    <section className="contact">
      <header className="page__header">
        <h1 className="page__title">Contact Us</h1>
        <p className="page__lede">Questions about catering, wholesale, or a visit? Send us a note.</p>
      </header>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label className="form-field">
          Name
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>
        {errors.name && (
          <p className="form-error" role="alert">
            {errors.name}
          </p>
        )}

        <label className="form-field">
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </label>
        {errors.email && (
          <p className="form-error" role="alert">
            {errors.email}
          </p>
        )}

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
        <p className={`form-hint${messageLength >= 20 ? ' is-complete' : ''}`}>
          {messageLength} / 20
        </p>
        {errors.message && (
          <p className="form-error" role="alert">
            {errors.message}
          </p>
        )}

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
    </section>
  )
}

export default Contact
