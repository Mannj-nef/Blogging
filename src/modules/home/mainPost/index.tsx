'use client'
import Link from 'next/link'
import { IconDashboard } from '~/components/icons'
import { ROUTER } from '~/shared/constants'
import Search from './search'
import { CATEGORY, POSTS } from '~/shared/data'
import { Col, Row } from 'antd'
import CardPost from './cardPost'
import Category from './category'
import LatePost from './latePost'
import Pagination from '~/components/pagination'

const MainPost = () => {
  return (
    <div className="main-post container">
      <div className="main-post-content">
        <div style={{ width: '75%' }} className="main-post-content-left">
          <div className="main-post-content-top-left">
            <span>
              <IconDashboard />
            </span>
            <h3>
              Showing <Link href={ROUTER.BLOG}>212 result</Link>
            </h3>
          </div>

          <Row gutter={[16, 16]} className="main-content-post">
            {POSTS.map((post) => (
              <Col span={12} key={post.id} className="gutter-row">
                <Link href={`${ROUTER.BLOG}/${post.slug}`}>
                  <CardPost post={post} />
                </Link>
              </Col>
            ))}
          </Row>

          <Pagination currantPage={1} totalPage={250} onChange={() => {}} />
        </div>

        <div style={{ width: '25%' }} className="main-post-content-right">
          <Search />

          <Category category={CATEGORY} />

          <LatePost />
        </div>
      </div>
    </div>
  )
}

export default MainPost
