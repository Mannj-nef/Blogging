import { User } from './user'

export enum STATUS_POST {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export enum CATEGORY {
  FRONT_END = 'front-end',
  BACK_END = 'back-end',
  FULL_STACK = 'full-stack',
  MOBILE = 'mobile',
  GAME = 'game'
}

export enum REACTION_TYPE {
  LIKE = 'like',
  LOVE = 'love',
  CRUSH = 'crush',
  HAHA = 'haha',
  WOW = 'wow',
  SAD = 'sad',
  ANGRY = 'angry'
}

export type Post = {
  id: string
  user: Pick<
    User,
    'id' | 'email' | 'firstName' | 'lastName' | 'coverPhoto' | 'userName'
  >

  title: string
  slug: string
  category: CATEGORY
  imageThumbnail: string

  content: string
  status: STATUS_POST

  popularity: number

  createdAt: string
  updatedAt: string
}

export type PostDetail = Post & {
  commentTotal: number
  reaction: {
    total: number
    type: REACTION_TYPE | null
  }
}
