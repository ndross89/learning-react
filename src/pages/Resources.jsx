import { resources } from '../data/resources'
import ResourceCard from '../components/ResourceCard'

function Resources() {
  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Library</p>
        <h1>Resources</h1>
      </header>
      <div className="resource-grid">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  )
}

export default Resources
