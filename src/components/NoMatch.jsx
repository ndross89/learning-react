import { Link } from 'react-router'
function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found, Bitch!</h2>
      <p>Yo! The page you searched isn't real. Leave now!</p>
      <Link to={'/'}>
        <button>Return yo broke ass home</button>
      </Link>
    </div>
  )
}

export default NoMatch
