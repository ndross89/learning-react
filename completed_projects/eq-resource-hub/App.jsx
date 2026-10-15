import './App.css'
import { Routes, Route } from 'react-router'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Resources from './pages/Resources'
import ResourceDetails from './pages/ResourceDetails'
import NotFound from './pages/NotFound'
import SubmitResource from './pages/SubmitResources'
import { supabase } from './lib/supabaseClient'

function App() {
  if (!supabase) {
    return (
      <main className="page">
        <h1>Supabase is not configured</h1>
        <p>Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to show this demo.</p>
      </main>
    )
  }

  return (
    <div className="app">
      <NavBar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetails />} />
          <Route path="/submit" element={<SubmitResource />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
