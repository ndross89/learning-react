import './App.css'
import { Routes, Route } from 'react-router'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Resources from './pages/Resources'
import ResourceDetails from './pages/ResourceDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
