function StudentCard({ id, name, sessionTime, subject, checkedIn, onCheckIn, style }) {
  const status = checkedIn ? 'Arrived' : 'Scheduled'

  return (
    <article
      className={`student-card${checkedIn ? ' student-card--arrived' : ''}`}
      data-subject={subject.toLowerCase()}
      style={style}
    >
      <div className="student-card__top">
        <h2 className="student-card__name">{name}</h2>
        <span className={`student-card__status${checkedIn ? ' student-card__status--arrived' : ''}`}>
          {status}
        </span>
      </div>

      <dl className="student-card__meta">
        <div>
          <dt>Subject</dt>
          <dd>{subject}</dd>
        </div>
        <div>
          <dt>Session</dt>
          <dd>{sessionTime}</dd>
        </div>
      </dl>

      <button
        type="button"
        className="student-card__button"
        disabled={checkedIn}
        onClick={() => onCheckIn(id)}
      >
        {checkedIn ? 'Checked In' : 'Check In'}
      </button>
    </article>
  )
}

export default StudentCard
