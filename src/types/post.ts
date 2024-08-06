import { User } from './user'

export enum STATUS_POST {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export enum CATEGORY {
  FROND_END = 'frond-end',
  BACK_END = 'back-end',
  FULL_STACK = 'full-stack',
  MOBILE = 'mobile',
  GAME = 'game'
}

export type Post = {
  id: string
  user: User

  title: string
  slug: string
  category: CATEGORY
  imageThumbnail: string

  content: string
  status: STATUS_POST

  popularity: number

  createdAt: string
  updateAt: string
}
