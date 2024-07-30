import { POSTS } from '~/shared/data/posts'
import CardLatePost from './Card'
import Link from 'next/link'
import { ROUTER } from '~/shared/constants'

const LatePost = () => {
  return (
    <div className="late-post">
      <h2>Late Posts</h2>

      <div className="list-post-wrapper">
        {POSTS.map((post) => (
          <Link href={`${ROUTER.BLOG}/${post.slug}`} key={post.id}>
            <CardLatePost post={post} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LatePost
