import CardLatePost from './Card'
import Link from 'next/link'
import { QUERY_KEY, ROUTER } from '~/shared/constants'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '~/apis/posts'

const LatePost = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.LATEST_POSTS],
    queryFn: () => getPosts({ isLatest: true })
  })
  return (
    <div className='late-post'>
      <h2>Latest Posts</h2>

      <div className='list-post-wrapper'>
        {data && data.posts?.length > 0
          ? data.posts.map((post) => (
              <Link href={`${ROUTER.BLOG}/${post.slug} ${post.id}`} key={post.id} scroll={false}>
                <CardLatePost post={post} />
              </Link>
            ))
          : null}
      </div>
    </div>
  )
}

export default LatePost
