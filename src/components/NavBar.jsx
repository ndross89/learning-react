import { Link, NavLink } from 'react-router'

function NavBar() {
  return (
    <header className="site-header">
      <nav className="nav">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          EQ Hub
        </Link>
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/resources">Resources</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
