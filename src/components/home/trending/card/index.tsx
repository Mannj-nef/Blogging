import Image from 'next/image'
import Button from '~/components/common/button'
import { IMAGES } from '~/shared/images'
import { Post } from '~/types/post'

interface IProps {
  post: Post
}

const TrendingCard = ({ post }: IProps) => {
  return (
    <div className='trending-item'>
      <div className='trending-item-overlay'></div>

      <Image src={post.imageThumbnail || IMAGES.IMAGE_DEFAULT} alt={post.title} width={800} height={500} />

      <div className='trending-content'>
        <div style={{ width: 'fit-content' }}>
          <Button>{post.category}</Button>
        </div>
        <h3 className='text-line-3'>{post.title}</h3>
      </div>
    </div>
  )
}

export default TrendingCard
