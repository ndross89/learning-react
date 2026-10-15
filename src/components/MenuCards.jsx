import { Link } from 'react-router'

const MenuCard = ({ id, name, category, price, available, image, imageAlt }) => {
  return (
    <Link to={`/menu/${id}`} className="menu-card-link">
      <article className="menu-card">
        <img className="menu-card__media" src={image} alt={imageAlt} />
        <div className="menu-card__body">
          <h3>{name}</h3>
          <div className="menu-card__meta">
            {available ? (
              <span className="menu-card__price">${price}</span>
            ) : (
              <span className="badge badge--sold-out">Sold out</span>
            )}
            <span className="menu-card__category">{category}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default MenuCard
