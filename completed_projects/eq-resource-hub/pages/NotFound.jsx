import { Link } from 'react-router'

function NotFound() {
  return (
    <section className="empty-state">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>That address does not match a page in the hub.</p>
      <Link to="/" className="button">
        Back to home
      </Link>
    </section>
  )
}

export default NotFound
