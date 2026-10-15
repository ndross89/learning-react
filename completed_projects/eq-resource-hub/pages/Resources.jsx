import { useState, useEffect } from 'react'
import ResourceCard from '../components/ResourceCard'
import { supabase } from '../lib/supabaseClient'

function Resources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getData() {
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .order('created_at', { ascending: true })
        if (error) {
          throw error
        } else {
          setResources(data)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Library</p>
        <h1>Resources</h1>
        {loading && <p>page loading...</p>}
        {error !== null && <p>error getting data. try again</p>}
        {!loading && error === null && (
          <div className="resource-grid">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </header>
    </section>
  )
}

export default Resources
