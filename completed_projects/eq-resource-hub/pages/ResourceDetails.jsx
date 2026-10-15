import { Link, useParams } from 'react-router'
import { categoryTone } from '../data/resources'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

function ResourceDetails() {
  const { id } = useParams()
  const [resource, setResource] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getDetails() {
      setLoading(true)
      setError(null)
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .eq('id', id)
          .maybeSingle()
        if (error) throw error
        setResource(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    getDetails()
  }, [id])

  if (loading) {
    return <p>page loading...</p>
  } else if (error !== null) {
    return <p>error getting data. try again</p>
  } else if (resource === null) {
    return (
      <section className="empty-state">
        <p className="eyebrow">Missing</p>
        <h1>Resource not found</h1>
        <p>That resource is not in the library.</p>
        <Link to="/resources" className="button">
          Back to resources
        </Link>
      </section>
    )
  } else !loading && error === null && resource !== null
  return (
    <article className="resource-detail" data-tone={categoryTone[resource.category]}>
      <Link to="/resources" className="back-link">
        ← Back to resources
      </Link>
      <span className="chip">{resource.category}</span>
      <h1>{resource.title}</h1>
      <p>{resource.body}</p>
    </article>
  )
}

export default ResourceDetails
