import { Link } from 'react-router'
import { categoryTone } from '../data/resources'

function ResourceCard({ resource }) {
  return (
    <Link
      to={`/resources/${resource.id}`}
      className="resource-card"
      data-tone={categoryTone[resource.category]}
    >
      <span className="chip">{resource.category}</span>
      <h3>{resource.title}</h3>
      <p>{resource.summary}</p>
    </Link>
  )
}

export default ResourceCard
