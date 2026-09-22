import { useState } from 'react'

const AddShow = () => {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [watched, setWatched] = useState(false)

  function handleSubmit(event) {
    const [shows, setShows] = useState(initialShows)
    event.preventDefault()
    const t = title.trim().toLowerCase()
    const g = genre.trim().toLowerCase()
    if (!t || !g) {
      return window.alert('must enter something')
    }
  }
  return (
    <>
      <form id="new-show" onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="show-title"></label>
        <input
          id="show-title"
          type="text"
          placeholder="add show title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>{' '}
        <br />
        <br />
        <label htmlFor="show-genre"></label>
        <input
          id="show-genre"
          type="text"
          placeholder="add genre type"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        ></input>{' '}
        <br />
        <br />
        <label htmlFor="show-checked"> Watched</label>
        <input
          id="show-checked"
          type="checkbox"
          checked={watched}
          onChange={(event) => setWatched(event.target.checked)}
        ></input>{' '}
        <br />
        <button type="submit">Add Show</button>
      </form>
    </>
  )
}

export default AddShow
