import { Link, NavLink } from 'react-router'

const NavBar = () => {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary">
        <Link to="/" className="site-nav__brand">
          Alder & Oaks Coffee
        </Link>
        <div className="site-nav__links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
