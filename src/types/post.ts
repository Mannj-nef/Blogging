export enum STATUS_POST {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export type Post = {
  id: string
  userId: string

  title: string
  slug: string
  category: string
  imageThumbnail: string

  content: string
  status: STATUS_POST

  popularity: number

  createdAt: string
  updateAt: string
}
