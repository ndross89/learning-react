import { useState, useEffect } from 'react'
import './App.css'
import InsightCard from './components/InsightCard'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterUserId, setFilterUserId] = useState('all')

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!response.ok) throw new Error('Failed to fetch posts.')
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])
  const filteredPosts =
    filterUserId === 'all' ? posts : posts.filter((post) => post.userId === Number(filterUserId))

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <p className="app__eyebrow">ApricityEQ</p>
          <h1 className="app__title">Team Insight Feed</h1>
        </div>
        <label className="filter">
          Team member
          <select
            className="filter__select"
            value={filterUserId}
            onChange={(event) => setFilterUserId(event.target.value)}
          >
            <option value={'all'}>All Users</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
        </label>
      </header>
      {loading && <p className="status">Data is loading...</p>}
      {error && (
        <p className="status status--error" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && (
        <section className="feed" aria-label="Team insights">
          {filteredPosts.map((post) => (
            <InsightCard key={post.id} title={post.title} body={post.body} />
          ))}
        </section>
      )}
    </main>
  )
}

export default App
