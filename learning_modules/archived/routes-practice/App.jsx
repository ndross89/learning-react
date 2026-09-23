import './App.css'
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import NoMatch from './components/NoMatch.jsx'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ margin: 10 }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({ padding: 5, ...(isActive ? { color: 'red' } : {}) })}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => ({
            padding: 5,
            ...(isActive ? { color: 'red' } : {}),
          })}
        >
          About
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
