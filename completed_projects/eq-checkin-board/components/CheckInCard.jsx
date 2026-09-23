const CheckInCard = ({ entry }) => {
  return (
    <li className="check-in-card">
      <p className="check-in-card-emotion">{entry.emotion}</p>
      <p className="check-in-card-note">{entry.note}</p>
      <p className="check-in-card-time">{entry.timestamp}</p>
    </li>
  )
}

export default CheckInCard
