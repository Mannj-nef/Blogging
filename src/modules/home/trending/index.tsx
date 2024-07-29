import { Col, Row } from 'antd'
import Button from '~/components/button'
import { POSTS } from '~/shared/data'
import TrendingCard from './card'
import Link from 'next/link'
import { ROUTER } from '~/shared/constants'

const TrendingPosts = () => {
  return (
    <div className="container trending">
      <div className="trending-top">
        <h2>Trending</h2>

        <Button>Button</Button>
      </div>

      <Row gutter={16} className="trending-list">
        {POSTS.map((post) => (
          <Col key={post.id} span={6}>
            <Link href={`${ROUTER.BLOG}/${post.slug}`}>
              <TrendingCard post={post} />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default TrendingPosts
