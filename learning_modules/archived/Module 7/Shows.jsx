import { useState } from 'react'

import { initialShows } from './Data'

export const updateShows = ({ title, genre, watched }) => {
  const newCard = {
    title: { title },
    genre: { genre },
    watched,
  }
}

const ShowCard = ({ title, genre, watched }) => {
  const [markFavorite, setMarkFavorite] = useState(false)

  return (
    <>
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
    </>
  )
}

export const CreateCards = ({ query }) => {
  const q = query.trim().toLowerCase()
  const visibleShows = Watchlist.filter((show) => show.title.toLocaleLowerCase().includes(q))
  return visibleShows.map((show) => <ShowCard key={show.id} {...show} />)
}
