import { Card } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Post } from '~/types/post'
interface ICardPost {
  post: Post
}

const CardPost = ({
  post: { user, slug, title, imageThumbnail, updatedAt }
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
      <div className="card-post-info">
        <h3 className="text-line-2">{title}</h3>
        <p>
          {dayjs(updatedAt).format('DD/MM/YYYY')}{' '}
          <span className="author">by {user.userName}</span>
        </p>
      </div>
    </Card>
  )
}

export default CardPost
