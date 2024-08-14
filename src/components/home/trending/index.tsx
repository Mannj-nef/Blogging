'use client'

import { Col, Row } from 'antd'
import Button from '~/components/common/button'
import TrendingCard from './card'
import Link from 'next/link'
import { QUERY_KEY, ROUTER } from '~/shared/constants'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '~/apis/posts'

const TrendingPosts = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.TRENDING_POSTS],
    queryFn: () => getPosts({ trending: true })
  })

  return (
    <div className='container trending'>
      <div className='trending-top'>
        <h2>Trending</h2>
      </div>

      <Row gutter={16} className='trending-list'>
        {data && data.posts?.length > 0
          ? data.posts.map((post) => (
              <Col key={post.id} span={6}>
                <Link href={`${ROUTER.BLOG}/${post.slug} ${post.id}`}>
                  <TrendingCard post={post} />
                </Link>
              </Col>
            ))
          : null}
      </Row>
    </div>
  )
}

export default TrendingPosts
