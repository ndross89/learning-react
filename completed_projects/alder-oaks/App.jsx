import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import MenuPage from './pages/MenuPage'
import Contact from './pages/Contact'
import ContactExample from './pages/ContactExample'
import Footer from './components/Footer'
import MenuDetails from './pages/MenuDetails'

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<MenuDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-example" element={<ContactExample />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
