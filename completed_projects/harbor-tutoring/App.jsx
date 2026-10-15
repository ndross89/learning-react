import './App.css'
import students from './data/students'
import { useState } from 'react'
import StudentCard from './components/StudentCard'

function App() {
  const subjects = ['Math', 'Reading', 'Science']

  const [subjectSelection, setSubjectSelection] = useState('all')
  const [studentList, setStudentList] = useState(students)

  const filteredStudents =
    subjectSelection === 'all'
      ? studentList
      : studentList.filter((s) => s.subject === subjectSelection)

  const arrivedCount = studentList.filter((s) => s.checkedIn).length

  function handleCheckIn(id) {
    setStudentList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checkedIn: true } : s)),
    )
  }

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <p className="app__brand">Harbor Tutoring</p>
          <h1 className="app__title">Session Tracker</h1>
          <p className="app__subtitle">Today&apos;s students at the front desk</p>
        </div>
        <p className="app__tally" aria-live="polite">
          <span className="app__tally-value">
            {arrivedCount}/{studentList.length}
          </span>
          <span className="app__tally-label">checked in</span>
        </p>
      </header>

      <label className="filter">
        Filter by subject
        <select
          className="filter__select"
          value={subjectSelection}
          onChange={(event) => setSubjectSelection(event.target.value)}
        >
          <option value="all">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>

      {filteredStudents.length === 0 ? (
        <p className="empty" role="status">
          No students scheduled for this subject.
        </p>
      ) : (
        <section className="student-list" aria-label="Today's students">
          {filteredStudents.map((s, index) => (
            <StudentCard
              key={s.id}
              id={s.id}
              name={s.name}
              sessionTime={s.sessionTime}
              subject={s.subject}
              checkedIn={s.checkedIn}
              onCheckIn={handleCheckIn}
              style={{ '--card-index': index }}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default App
