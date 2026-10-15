import { Link } from 'react-router'
import { WhyUsCards } from '../components/WhyUs'

const Home = () => {
  return (
    <div className="page">
      <section className="hero">
        <h1 className="hero__title">Small-batch coffee, made slow</h1>
        <div className="hero__actions">
          <Link to="/menu" className="btn">
            See the menu
          </Link>
        </div>
      </section>
      <WhyUsCards />
    </div>
  )
}

export default Home
