import CheckInCard from './CheckInCard'

const CheckInList = ({ entries }) => {
  return (
    <section className="check-in-list">
      <h2>Check-in log</h2>
      {entries.length === 0 ? (
        <p className="empty">Library of Notes Will Appear Here Once You Add Entries</p>
      ) : (
        <ul className="check-in-list-items">
          {entries.map((entry) => (
            <CheckInCard key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default CheckInList
