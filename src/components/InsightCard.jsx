function InsightCard({ title, body }) {
  return (
    <article className="insight-card">
      <h2 className="insight-card__title">{title}</h2>
      <p className="insight-card__body">{body}</p>
    </article>
  )
}

export default InsightCard
