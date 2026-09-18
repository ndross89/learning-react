import { useState } from 'react'

const Card = ({ label, date, name }) => {
  const [backgroundColor, setBackgroundColor] = useState(true)
  return (
    <>
      <div className="container">
        <div className={backgroundColor ? 'alt-card' : 'card'}>
          <h2>My {label} Card</h2>
          <span>Created by {name}</span>
          <p>Added {date}</p>
          <button className="button" onClick={() => setBackgroundColor(!backgroundColor)}>
            Change Color
          </button>
          <br />
          <input typeof="text" placeholder="enter name"></input>
        </div>
      </div>
    </>
  )
}

export default Card
