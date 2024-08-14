import './style.scss'
import Hero from '~/components/home/hero'
import TrendingPosts from '~/components/home/trending'
import MainPost from '~/components/home/mainPost'
import Footer from '~/components/footer'

const Home = () => {
  return (
    <div className='home-page'>
      <Hero />
      <TrendingPosts />
      <MainPost />
    </div>
  )
}

export default Home
