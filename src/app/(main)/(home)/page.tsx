import './style.scss'
import Hero from '~/modules/home/hero'
import TrendingPosts from '~/modules/home/trending'
import MainPost from '~/modules/home/mainPost'
import Footer from '~/components/footer'

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <TrendingPosts />
      <MainPost />
      <Footer />
    </div>
  )
}

export default Home
