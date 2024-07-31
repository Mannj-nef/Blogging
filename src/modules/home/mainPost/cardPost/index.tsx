import { Card } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '~/types/post'
interface ICardPost {
  post: Post
}

const CardPost = ({
  post: { user, slug, title, imageThumbnail, updateAt }
}: ICardPost) => {
  return (
    <Card
      className="card-post"
      cover={
        <Image
          width={840}
          height={360}
          alt={slug}
          src={imageThumbnail}
          style={{ objectFit: 'cover' }}
        />
      }
    >
      <div>
        <h3 className="text-line-2">{title}</h3>
        <p>
          {updateAt} <span className="author">by {user.userName}</span>
        </p>
      </div>
    </Card>
  )
}

export default CardPost
