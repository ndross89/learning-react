const SummaryBar = ({ entries }) => {
  const frequencyMap = entries.reduce((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1
    return acc
  }, {})

  const topEmotion = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a])[0]
  return (
    <section className="summary" aria-live="polite">
      {entries.length === 0 ? (
        <p className="empty">No Entries Yet. Add Notes To See Summary of Results</p>
      ) : (
        <div className="summary-stats">
          <div className="stat">
            <p className="stat-value">{entries.length}</p>
            <p className="stat-label">Check-ins</p>
          </div>
          <div className="stat">
            <p className="stat-value">{topEmotion}</p>
            <p className="stat-label">Most common</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default SummaryBar
