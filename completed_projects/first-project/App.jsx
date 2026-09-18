import './App.css'
import Card from './components/Card.jsx'
import { NewCard } from './components/Members.jsx'

function App() {
  return (
    <>
      <div className="cards">
        <Card label="First" date="Sept 17th" name="James" />
        <Card label="Second" date="October 17th" name="Mary" />
        <Card label="Third" date="November 17th" name="Jesse" />
        <NewCard />
      </div>
    </>
  )
}

export default App
