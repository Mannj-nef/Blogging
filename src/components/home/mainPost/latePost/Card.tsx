import Image from 'next/image'
import { IMAGES } from '~/shared/images'
import { Post } from '~/types/post'

interface IProps {
  post: Post
}

const CardLatePost = ({ post }: IProps) => {
  return (
    <div className="card-late-post-item">
      <div className="image-wrapper">
        <Image
          src={post.imageThumbnail || IMAGES.IMAGE_DEFAULT}
          alt={post.slug}
          width={800}
          height={800}
        />
      </div>

      <div className="post-info">
        <p>{post?.updateAt}</p>

        <p className="text-line-3">{post?.title}</p>

        <p className="author">by {post?.user?.userName}</p>
      </div>
    </div>
  )
}

export default CardLatePost
