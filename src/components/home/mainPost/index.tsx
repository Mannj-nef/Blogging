'use client'
import Link from 'next/link'
import { IconDashboard } from '~/components/common/icons'
import { QUERY_KEY, ROUTER } from '~/shared/constants'
import Search from './search'
import { CATEGORY as CATEGORY_ENUM_DATA } from '~/shared/data'
import { Col, PaginationProps, Row } from 'antd'
import CardPost from './cardPost'
import Category from './category'
import LatePost from './latePost'
import Pagination from '~/components/common/pagination'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '~/apis/posts'
import { useEffect, useState } from 'react'
import { Post } from '~/types/post'

interface IProps {
  isBlogAll?: boolean
}

const MainPost = ({ isBlogAll = false }: IProps) => {
  const [searchTitle, setSearchTitle] = useState('')
  const [limit, setLimit] = useState(4)
  const [category, setCategory] = useState(undefined)
  const [postData, setPostData] = useState<Post[]>([])
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_POSTS, page, searchTitle, category, limit],
    queryFn: () =>
      getPosts({
        limit,
        page,
        title: searchTitle,
        category
      })
  })

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current) => {
    setPage(current)
  }

  useEffect(() => {
    if (data) {
      setPostData(data.posts)
    }
  }, [data])

  useEffect(() => {
    if (isBlogAll) {
      setLimit(20)
    }
  }, [isBlogAll])

  return (
    <div className='main-post container'>
      <div className='main-post-content' style={{ flexDirection: isBlogAll ? 'row-reverse' : 'row' }}>
        <div style={{ width: isBlogAll ? '80%' : '75%' }} className='main-post-content-left'>
          {!isBlogAll && (
            <div className='main-post-content-top-left'>
              <span>
                <IconDashboard />
              </span>
              <h3>
                Showing <Link href={ROUTER.BLOG}>{data?.total} result</Link>
              </h3>
            </div>
          )}

          <Row gutter={[16, 16]} className='main-content-post'>
            {postData.length > 0 &&
              postData.map((post) => (
                <Col span={isBlogAll ? 8 : 12} key={post.id} className='gutter-row'>
                  <Link href={`${ROUTER.BLOG}/${post.slug} ${post.id}`}>
                    <CardPost post={post} />
                  </Link>
                </Col>
              ))}
          </Row>

          <Pagination
            pageSize={limit}
            currantPage={page}
            totalPage={data?.totalPage || 0}
            onChange={onShowSizeChange}
          />
        </div>

        <div style={{ width: isBlogAll ? '20%' : '25%' }} className='main-post-content-right'>
          <Search onSearch={setSearchTitle} />

          <Category category={CATEGORY_ENUM_DATA} onSearch={setCategory as any} categorySelected={category} />

          <LatePost />
        </div>
      </div>
    </div>
  )
}

export default MainPost
