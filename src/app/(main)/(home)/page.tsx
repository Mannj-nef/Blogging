import Link from 'next/link'
import Hero from '~/modules/home/hero'
import TrendingPosts from '~/modules/home/trending'
import './style.scss'

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <TrendingPosts />
      <p>
        <Link href="/blog">Blog</Link>
      </p>
    </div>
  )
}

export default Home
