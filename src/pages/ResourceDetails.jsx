import { Link, useParams } from 'react-router'
import { categoryTone, resources } from '../data/resources'

function ResourceDetails() {
  const { id } = useParams()
  const resource = resources.find((r) => r.id === Number(id))

  if (!resource) {
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
  }

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
