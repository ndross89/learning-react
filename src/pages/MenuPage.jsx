import { useState } from 'react'
import menu from '../data/menu'
import MenuCard from '../components/MenuCards'

const MenuPage = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchCategory, setSearchCategory] = useState('all')

  const categories = ['Brewed', 'Tea', 'Pastry', 'Espresso']

  const filteredItem = menu.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchInput.toLowerCase())
    const matchesCategory = searchCategory === 'all' || item.category === searchCategory
    return matchesName && matchesCategory
  })

  function handleClear() {
    setSearchInput('')
    setSearchCategory('all')
  }

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Menu</h1>
        <p className="page__lede">Search and filter our daily drinks and pastries.</p>
      </header>

      <div className="menu-toolbar">
        <label className="menu-search">
          Search
          <input
            type="search"
            placeholder="Search menu items"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </label>

        <div className="menu-filters" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`btn btn--filter${searchCategory === 'all' ? ' is-active' : ''}`}
            onClick={() => setSearchCategory('all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              type="button"
              className={`btn btn--filter${searchCategory === category ? ' is-active' : ''}`}
              key={category}
              onClick={() => setSearchCategory(category)}
            >
              {category}
            </button>
          ))}
          <button type="button" className="btn btn--ghost" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <p className="menu-count">
        Showing {filteredItem.length} {filteredItem.length === 1 ? 'item' : 'items'}
      </p>

      {filteredItem.length === 0 ? (
        <p className="menu-empty">There are no matching items</p>
      ) : (
        <section className="menu-grid" aria-label="Menu items">
          {filteredItem.map((item) => (
            <MenuCard
              key={item.id}
              id={item.id}
              name={item.name}
              category={item.category}
              price={item.price}
              available={item.available}
              image={item.image}
              imageAlt={item.imageAlt}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export default MenuPage
