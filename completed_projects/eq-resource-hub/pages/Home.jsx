import { Link } from 'react-router'

function Home() {
  return (
    <section className="home">
      <p className="eyebrow">EQ Resource Hub</p>
      <h1>Learn emotional intelligence, one resource at a time</h1>
      <p className="lede">
        ApricityEQ publishes practical guides on self-awareness, regulation, empathy, and how teams
        work together. Start with the library.
      </p>
      <Link to="/resources" className="button">
        Browse resources
      </Link>
    </section>
  )
}

export default Home
