import './style.scss'
import Hero from '~/modules/home/hero'
import TrendingPosts from '~/modules/home/trending'
import MainPost from '~/modules/home/mainPost'

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <TrendingPosts />
      <MainPost />
    </div>
  )
}

export default Home
