import { Link, useParams } from 'react-router'
import menu from '../data/menu'

const MenuDetails = () => {
  const { id } = useParams()
  const item = menu.find((menuItem) => menuItem.id === Number(id))

  if (!item) {
    return (
      <div className="details">
        <Link to="/menu" className="btn btn--ghost">
          Back to menu
        </Link>
        <p className="menu-empty">Item not found</p>
      </div>
    )
  }

  return (
    <article className="details">
      <Link to="/menu" className="btn btn--ghost">
        Back to menu
      </Link>
      <div className="details__card">
        <img className="details__media" src={item.image} alt={item.imageAlt} />
        <h1>{item.name}</h1>
        <div className="details__row">
          <span className="menu-card__category">{item.category}</span>
          {item.available ? (
            <span className="details__price">${item.price}</span>
          ) : (
            <span className="badge badge--sold-out">Sold out today</span>
          )}
        </div>
        <p>{item.description}</p>
      </div>
    </article>
  )
}

export default MenuDetails
