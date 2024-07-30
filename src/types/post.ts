import { User } from './user'

export enum STATUS_POST {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export enum Category {
  FROND_END = 'frond-end',
  BACK_END = 'back-end',
  FULL_STACK = 'full-stack',
  DEV_OPS = 'dev-ops',
  MOBILE = 'mobile',
  GAME = 'game',
  DESIGN = 'design'
}

export type Post = {
  id: string
  user: User

  title: string
  slug: string
  category: Category
  imageThumbnail: string

  content: string
  status: STATUS_POST

  popularity: number

  createdAt: string
  updateAt: string
}
