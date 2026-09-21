import { useState } from 'react'

const Watchlist = [
  { id: 1, title: 'Silo', genre: 'Sci-fi', watched: true },
  { id: 2, title: 'Jury Duty', genre: 'Comedy', watched: true },
  { id: 3, title: 'Wednesday', genre: 'Thriller', watched: false },
  { id: 4, title: 'The Flash', genre: 'Action', watched: false },
  { id: 5, title: 'Teach You A Lesson', genre: 'Action', watched: true },
]

const ShowCard = ({ title, genre, watched }) => {
  const [markFavorite, setMarkFavorite] = useState(false)
  return (
    <div>
      <h3>{title}</h3>
      <span>{genre}</span> <br />
      {watched && <span>Watched</span>} <br />
      <button
        onClick={() => {
          setMarkFavorite((prev) => !prev)
        }}
      >
        {markFavorite ? 'Favorited' : 'Favorite'}
      </button>
    </div>
  )
}

export const RenderCards = () => {
  return Watchlist.map((show) => (
    <ShowCard key={show.id} title={show.title} genre={show.genre} watched={show.watched} />
  ))
}
