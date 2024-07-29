import Image from 'next/image'
import Button from '~/components/button'
import { Post } from '~/types/post'

interface IProps {
  post: Post
}

const TrendingCard = ({ post }: IProps) => {
  return (
    <div className="trending-item">
      <div className="trending-item-overlay"></div>

      <Image
        src={post.imageThumbnail}
        alt={post.title}
        width={800}
        height={500}
      />

      <div className="trending-content">
        <Button>{post.category}</Button>
        <h3 className="text-line-3">{post.title}</h3>
      </div>
    </div>
  )
}

export default TrendingCard
